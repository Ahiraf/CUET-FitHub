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
[Route("api/occupancy")]
public class OccupancyController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public OccupancyController(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    private int Capacity => _config.GetValue<int?>("Gym:Capacity") ?? 50;
    private int Baseline => _config.GetValue<int?>("Gym:BaselineOccupancy") ?? 0;

    [HttpGet]
    public async Task<ActionResult<OccupancyDto>> Get() => await BuildAsync();

    [HttpPost("checkin")]
    public async Task<ActionResult<OccupancyDto>> CheckIn()
    {
        var uid = User.UserId();
        var active = await _db.CheckIns.AnyAsync(c => c.UserId == uid && c.CheckOutTime == null);
        var current = Baseline + await _db.CheckIns.CountAsync(c => c.CheckOutTime == null);

        if (!active)
        {
            if (current >= Capacity) return await BuildAsync(); // gym is full — no-op
            _db.CheckIns.Add(new CheckIn { UserId = uid });
            await _db.SaveChangesAsync();
        }
        return await BuildAsync();
    }

    [HttpPost("checkout")]
    public async Task<ActionResult<OccupancyDto>> CheckOut()
    {
        var uid = User.UserId();
        var active = await _db.CheckIns
            .Where(c => c.UserId == uid && c.CheckOutTime == null)
            .OrderByDescending(c => c.CheckInTime)
            .FirstOrDefaultAsync();
        if (active is not null)
        {
            active.CheckOutTime = DateTime.UtcNow;
            await _db.SaveChangesAsync();
        }
        return await BuildAsync();
    }

    private async Task<OccupancyDto> BuildAsync()
    {
        var uid = User.UserId();
        var active = await _db.CheckIns.CountAsync(c => c.CheckOutTime == null);
        var count = Math.Min(Capacity, Baseline + active);
        var checkedIn = await _db.CheckIns.AnyAsync(c => c.UserId == uid && c.CheckOutTime == null);
        var percent = (int)Math.Round(count / (double)Capacity * 100);
        return new OccupancyDto(count, Capacity, count >= Capacity, checkedIn, percent);
    }
}
