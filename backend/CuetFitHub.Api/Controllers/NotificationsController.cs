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
[Route("api/notifications")]
public class NotificationsController : ControllerBase
{
    private readonly AppDbContext _db;

    public NotificationsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<NotificationDto>>> Get()
    {
        var userId = User.UserId();
        var isAdmin = User.IsInRole(Roles.Admin);
        var tickets = await _db.Tickets
            .Where(t => t.Status != "Resolved" && (isAdmin || t.ReportedByUserId == userId))
            .OrderByDescending(t => t.CreatedAt)
            .Take(20)
            .ToListAsync();

        var announcements = await _db.Announcements
            .OrderByDescending(a => a.CreatedAt)
            .Take(5)
            .ToListAsync();

        var notifications = tickets.Select(ticket => new NotificationDto(
            $"ticket-{ticket.Id}",
            isAdmin ? $"New equipment complaint: {ticket.Item}" : $"{ticket.Item} report {ticket.Status.ToLowerInvariant()}",
            $"{ticket.ReportedBy} reported: {ticket.Issue}",
            "maintenance",
            false));

        var news = announcements.Select(item => new NotificationDto(
            $"announcement-{item.Id}", item.Title, item.Body, "notice", false));

        return notifications.Concat(news).ToList();
    }

    // The client marks notifications read locally; keep this endpoint so the
    // action is valid for the real backend as well as the mock implementation.
    [HttpPost("read")]
    public IActionResult Read() => NoContent();
}
