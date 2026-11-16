using System.ComponentModel.DataAnnotations;
using CuetFitHub.Api.Data;
using CuetFitHub.Api.Dtos;
using CuetFitHub.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CuetFitHub.Api.Controllers;

public record TrainerApplicationInput(
    [Required] string Name, [Required, EmailAddress] string Email, [Required] string Specialty,
    [Required] string Experience, [Required] string Motivation);

public record TrainerApplicationRow(int Id, string Name, string Email, string Specialty,
    string Experience, string Motivation, string Status);

[ApiController]
[Authorize(Roles = Roles.Admin)]
[Route("api/trainer-applications")]
public class TrainerApplicationsController(AppDbContext db) : ControllerBase
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
        await db.Database.ExecuteSqlInterpolatedAsync($"""
            INSERT INTO trainer_applications (name, email, specialty, experience, motivation)
            VALUES ({input.Name.Trim()}, {input.Email.Trim()}, {input.Specialty.Trim()},
                    {input.Experience.Trim()}, {input.Motivation.Trim()})
            """);
        return StatusCode(StatusCodes.Status201Created, new { status = "Pending" });
    }

    [HttpGet]
    public async Task<List<TrainerApplicationRow>> List() =>
        await Applications.OrderByDescending(row => row.Id).ToListAsync();

    [HttpPatch("{id:int}/status")]
    public async Task<ActionResult<TrainerApplicationRow>> Review(int id, UpdateStatusDto input)
    {
        if (input.Status is not ("Approved" or "Rejected")) return BadRequest();
        await db.Database.ExecuteSqlInterpolatedAsync($"""
            UPDATE trainer_applications SET status = {input.Status} WHERE id = {id} AND status = 'Pending'
            """);
        var row = await Applications.SingleOrDefaultAsync(row => row.Id == id);
        if (row is null) return NotFound();
        if (row.Status != input.Status) return Conflict(new { message = "This application was already reviewed." });
        return row;
    }
}
