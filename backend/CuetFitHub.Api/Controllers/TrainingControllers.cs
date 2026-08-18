using CuetFitHub.Api.Data;
using CuetFitHub.Api.Dtos;
using CuetFitHub.Api.Models;
using CuetFitHub.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CuetFitHub.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/plan")]
public class PlanController : ControllerBase
{
    private readonly AppDbContext _db;
    public PlanController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<PlanDto>> Get()
    {
        var uid = User.UserId();
        var names = await _db.PlanItems.Where(p => p.UserId == uid).Select(p => p.ExerciseName).ToListAsync();
        return new PlanDto(names);
    }

    // Replace the whole plan with the provided list of exercise names.
    [HttpPut]
    public async Task<ActionResult<PlanDto>> Replace(PlanDto dto)
    {
        var uid = User.UserId();
        var existing = _db.PlanItems.Where(p => p.UserId == uid);
        _db.PlanItems.RemoveRange(existing);
        foreach (var name in dto.Exercises.Distinct())
            _db.PlanItems.Add(new PlanItem { UserId = uid, ExerciseName = name });
        await _db.SaveChangesAsync();
        return new PlanDto(dto.Exercises.Distinct().ToList());
    }
}

[ApiController]
[Authorize]
[Route("api/bookings")]
public class BookingsController : ControllerBase
{
    private readonly AppDbContext _db;
    public BookingsController(AppDbContext db) => _db = db;

    [HttpGet("mine")]
    public async Task<ActionResult<IEnumerable<BookingDto>>> Mine()
    {
        var uid = User.UserId();
        return await _db.Bookings.Where(b => b.UserId == uid)
            .OrderByDescending(b => b.CreatedAt).Select(ToDto).ToListAsync();
    }

    [HttpGet]
    [Authorize(Roles = $"{Roles.Trainer},{Roles.Admin}")]
    public async Task<ActionResult<IEnumerable<BookingDto>>> All() =>
        await _db.Bookings.OrderByDescending(b => b.CreatedAt).Select(ToDto).ToListAsync();

    [HttpPost]
    public async Task<ActionResult<BookingDto>> Create(CreateBookingDto dto)
    {
        var uid = User.UserId();
        var me = await _db.Users.FindAsync(uid);
        var booking = new Booking
        {
            UserId = uid,
            MemberName = me?.FullName ?? User.DisplayName(),
            Department = me?.Department ?? "CUET",
            TrainerName = dto.TrainerName,
            Goal = dto.Goal,
            Slot = string.IsNullOrWhiteSpace(dto.Slot) ? "To be confirmed" : dto.Slot,
            Status = "Pending",
        };
        _db.Bookings.Add(booking);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Mine), ToDtoFn(booking));
    }

    [HttpPatch("{id:int}/status")]
    [Authorize(Roles = $"{Roles.Trainer},{Roles.Admin}")]
    public async Task<ActionResult<BookingDto>> SetStatus(int id, UpdateStatusDto dto)
    {
        var booking = await _db.Bookings.FindAsync(id);
        if (booking is null) return NotFound();
        booking.Status = dto.Status;
        await _db.SaveChangesAsync();
        return ToDtoFn(booking);
    }

    private static readonly System.Linq.Expressions.Expression<Func<Booking, BookingDto>> ToDto =
        b => new BookingDto(b.Id, b.MemberName, b.Department, b.TrainerName, b.Goal, b.Slot, b.Status);
    private static BookingDto ToDtoFn(Booking b) =>
        new(b.Id, b.MemberName, b.Department, b.TrainerName, b.Goal, b.Slot, b.Status);
}

[ApiController]
[Authorize]
[Route("api/routines")]
public class RoutinesController : ControllerBase
{
    private readonly AppDbContext _db;
    public RoutinesController(AppDbContext db) => _db = db;

    // The routine assigned to the current user (student), if any.
    [HttpGet("mine")]
    public async Task<ActionResult<RoutineDto>> Mine()
    {
        var uid = User.UserId();
        var routine = await _db.Routines.Include(r => r.Items)
            .OrderByDescending(r => r.CreatedAt)
            .FirstOrDefaultAsync(r => r.OwnerUserId == uid);
        if (routine is null) return NoContent();
        return ToDto(routine);
    }

    [HttpPost("items/{itemId:int}/toggle")]
    public async Task<IActionResult> Toggle(int itemId)
    {
        var uid = User.UserId();
        var item = await _db.RoutineItems.Include(i => i.Routine)
            .FirstOrDefaultAsync(i => i.Id == itemId);
        if (item is null || item.Routine!.OwnerUserId != uid) return NotFound();
        item.Done = !item.Done;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // Trainer assigns a routine to a member (by email). Replaces any existing one.
    [HttpPost("assign")]
    [Authorize(Roles = Roles.Trainer)]
    public async Task<ActionResult<RoutineDto>> Assign(AssignRoutineDto dto)
    {
        var member = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.MemberEmail);
        if (member is null) return NotFound(new { message = "No member with that email." });

        var existing = _db.Routines.Include(r => r.Items).Where(r => r.OwnerUserId == member.Id);
        _db.Routines.RemoveRange(existing);

        var routine = new Routine
        {
            OwnerUserId = member.Id,
            Coach = dto.Coach ?? User.DisplayName(),
            Items = dto.Items.Select(i => new RoutineItem { Name = i.Name, Target = i.Target }).ToList(),
        };
        _db.Routines.Add(routine);
        await _db.SaveChangesAsync();
        return ToDto(routine);
    }

    private static RoutineDto ToDto(Routine r) =>
        new(r.Id, r.Coach, r.Items.Select(i => new RoutineItemDto(i.Id, i.Name, i.Target, i.Done)).ToList());
}
