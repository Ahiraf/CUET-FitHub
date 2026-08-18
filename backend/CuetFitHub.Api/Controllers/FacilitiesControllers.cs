using System.Globalization;
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
[Route("api/tickets")]
public class TicketsController : ControllerBase
{
    private readonly AppDbContext _db;
    public TicketsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TicketDto>>> Get()
    {
        var tickets = await _db.Tickets.OrderByDescending(t => t.CreatedAt).ToListAsync();
        return tickets.Select(ToDto).ToList();
    }

    [HttpPost]
    public async Task<ActionResult<TicketDto>> Create(CreateTicketDto dto)
    {
        var ticket = new Ticket
        {
            Item = dto.Item,
            Issue = dto.Issue,
            ReportedBy = User.DisplayName(),
            ReportedByUserId = User.UserId(),
            Status = "Open",
        };
        _db.Tickets.Add(ticket);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), ToDto(ticket));
    }

    [HttpPatch("{id:int}/status")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<TicketDto>> SetStatus(int id, UpdateStatusDto dto)
    {
        var ticket = await _db.Tickets.FindAsync(id);
        if (ticket is null) return NotFound();
        ticket.Status = dto.Status;
        await _db.SaveChangesAsync();
        return ToDto(ticket);
    }

    private static TicketDto ToDto(Ticket t) =>
        new(t.Id, t.Item, t.Issue, t.ReportedBy, t.Status, t.CreatedAt.ToString("MMM d", CultureInfo.InvariantCulture));
}

[ApiController]
[Authorize]
[Route("api/announcements")]
public class AnnouncementsController : ControllerBase
{
    private readonly AppDbContext _db;
    public AnnouncementsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AnnouncementDto>>> Get()
    {
        var items = await _db.Announcements.OrderByDescending(a => a.CreatedAt).ToListAsync();
        return items.Select(ToDto).ToList();
    }

    [HttpPost]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<AnnouncementDto>> Create(CreateAnnouncementDto dto)
    {
        var a = new Announcement { Title = dto.Title, Body = dto.Body, Type = dto.Type };
        _db.Announcements.Add(a);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), ToDto(a));
    }

    private static AnnouncementDto ToDto(Announcement a) =>
        new(a.Id, a.Title, a.Body, a.Type, a.CreatedAt.ToString("MMM d", CultureInfo.InvariantCulture));
}

[ApiController]
[Authorize(Roles = Roles.Admin)]
[Route("api/members")]
public class MembersController : ControllerBase
{
    private readonly AppDbContext _db;
    public MembersController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> Get()
    {
        var users = await _db.Users.OrderBy(u => u.FullName).ToListAsync();
        return users.Select(u => new MemberDto(u.Id, u.FullName, u.Email ?? "", u.Role, u.StudentId, u.Department, u.IsVerified)).ToList();
    }

    [HttpPatch("{id}/verify")]
    public async Task<ActionResult<MemberDto>> Verify(string id, VerifyDto dto)
    {
        var user = await _db.Users.FindAsync(id);
        if (user is null) return NotFound();
        user.IsVerified = dto.Verified;
        await _db.SaveChangesAsync();
        return new MemberDto(user.Id, user.FullName, user.Email ?? "", user.Role, user.StudentId, user.Department, user.IsVerified);
    }
}
