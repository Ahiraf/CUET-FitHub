using System.ComponentModel.DataAnnotations;
using CuetFitHub.Api.Data;
using CuetFitHub.Api.Dtos;
using CuetFitHub.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CuetFitHub.Api.Controllers;

public record TrainerApplicationInput(
    [Required] string Name, [Required, EmailAddress] string Email, [Required] string Specialty,
    [Required] string Experience, [Required] string Motivation, [Required] string Password);

public record TrainerApplicationRow(int Id, string Name, string Email, string Specialty,
    string Experience, string Motivation, string Status);

[ApiController]
[Authorize(Roles = Roles.Admin)]
[Route("api/trainer-applications")]
public class TrainerApplicationsController(AppDbContext db, UserManager<ApplicationUser> users) : ControllerBase
{
    private IQueryable<TrainerApplicationRow> Applications => db.Database.SqlQuery<TrainerApplicationRow>($"""
        SELECT id AS "Id", name AS "Name", email AS "Email", specialty AS "Specialty",
               experience AS "Experience", motivation AS "Motivation", status AS "Status"
        FROM trainer_applications
        """);

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Submit(TrainerApplicationInput input)
    {
        var email = input.Email.Trim();
        if (await users.FindByEmailAsync(email) is not null)
            return Conflict(new { message = "An account with this email already exists." });
        var candidate = new ApplicationUser { UserName = email, Email = email };
        foreach (var validator in users.PasswordValidators)
        {
            var result = await validator.ValidateAsync(users, candidate, input.Password);
            if (!result.Succeeded)
                return BadRequest(new { message = string.Join(" ", result.Errors.Select(e => e.Description)) });
        }
        var hash = users.PasswordHasher.HashPassword(candidate, input.Password);
        var inserted = await db.Database.ExecuteSqlInterpolatedAsync($"""
            INSERT INTO trainer_applications (name, email, specialty, experience, motivation, password_hash)
            VALUES ({input.Name.Trim()}, {input.Email.Trim()}, {input.Specialty.Trim()},
                    {input.Experience.Trim()}, {input.Motivation.Trim()}, {hash})
            ON CONFLICT DO NOTHING
            """);
        if (inserted == 0) return Conflict(new { message = "An application for this email is awaiting review." });
        return StatusCode(StatusCodes.Status201Created, new { status = "Pending" });
    }

    [HttpGet]
    public async Task<List<TrainerApplicationRow>> List() =>
        await Applications.OrderByDescending(row => row.Id).ToListAsync();

    [HttpPatch("{id:int}/status")]
    public async Task<ActionResult<TrainerApplicationRow>> Review(int id, UpdateStatusDto input)
    {
        if (input.Status is not ("Approved" or "Rejected")) return BadRequest();
        await using var transaction = await db.Database.BeginTransactionAsync();
        var changed = await db.Database.ExecuteSqlInterpolatedAsync($"""
            UPDATE trainer_applications SET status = {input.Status} WHERE id = {id} AND status = 'Pending'
            """);
        var row = await Applications.SingleOrDefaultAsync(row => row.Id == id);
        if (row is null) return NotFound();
        if (row.Status != input.Status) return Conflict(new { message = "This application was already reviewed." });
        if (changed == 1)
        {
            var hash = await db.Database.SqlQuery<string?>($"""
                SELECT password_hash AS "Value" FROM trainer_applications WHERE id = {id}
                """).SingleAsync();
            if (row.Status == "Approved" && hash is not null)
            {
                var trainer = new ApplicationUser { UserName = row.Email, Email = row.Email,
                    FullName = row.Name, Role = Roles.Trainer, IsVerified = true, PasswordHash = hash };
                var created = await users.CreateAsync(trainer);
                if (!created.Succeeded)
                    return Conflict(new { message = string.Join(" ", created.Errors.Select(e => e.Description)) });
                var assigned = await users.AddToRoleAsync(trainer, Roles.Trainer);
                if (!assigned.Succeeded) return Problem("Could not assign the trainer role.");
            }
            await db.Database.ExecuteSqlInterpolatedAsync($"UPDATE trainer_applications SET password_hash = NULL WHERE id = {id}");
        }
        await transaction.CommitAsync();
        return row;
    }
}
