using CuetFitHub.Api.Data;
using CuetFitHub.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CuetFitHub.Api.Controllers;

public record ExerciseCheckoff(string ExerciseKey, bool Completed);
public record HistoricalCheckoff(string ExerciseKey, DateOnly Day);
public record DailyActivity(DateOnly Date, int Exercises, int Minutes, int Sessions);

[ApiController]
[Authorize]
[Route("api/workout-activity")]
public class WorkoutActivityController(AppDbContext db) : ControllerBase
{
    internal static readonly TimeZoneInfo CampusZone = TimeZoneInfo.FindSystemTimeZoneById("Asia/Dhaka");
    internal static DateOnly Today => DateOnly.FromDateTime(TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, CampusZone));

    internal static Task Save(AppDbContext db, string user, string key, DateOnly day, bool completed) =>
        completed
            ? db.Database.ExecuteSqlInterpolatedAsync($"""
                INSERT INTO workout_activity (user_id, exercise_key, day) VALUES ({user}, {key}, {day})
                ON CONFLICT DO NOTHING
                """)
            : db.Database.ExecuteSqlInterpolatedAsync($"DELETE FROM workout_activity WHERE user_id = {user} AND exercise_key = {key}");

    [HttpPut]
    public async Task<IActionResult> Put(ExerciseCheckoff input)
    {
        if (string.IsNullOrWhiteSpace(input.ExerciseKey) || input.ExerciseKey.Length > 180 ||
            !input.ExerciseKey.StartsWith("plan:", StringComparison.Ordinal)) return BadRequest();
        await Save(db, User.UserId(), input.ExerciseKey, Today, input.Completed);
        return NoContent();
    }

    [HttpPost("history")]
    public async Task<IActionResult> ImportHistory(List<HistoricalCheckoff> entries)
    {
        if (entries.Count > 200 || entries.Any(entry => string.IsNullOrWhiteSpace(entry.ExerciseKey)
            || entry.ExerciseKey.Length > 180 || !entry.ExerciseKey.StartsWith("plan:", StringComparison.Ordinal)
            || entry.Day == default || entry.Day > Today)) return BadRequest();
        var user = User.UserId();
        await using var transaction = await db.Database.BeginTransactionAsync();
        foreach (var entry in entries)
            await Save(db, user, entry.ExerciseKey, entry.Day, true);
        await transaction.CommitAsync();
        return NoContent();
    }

    [HttpGet]
    public async Task<ActionResult<List<DailyActivity>>> Get(DateOnly start, DateOnly end)
    {
        if (end < start || end.DayNumber - start.DayNumber > 366) return BadRequest();
        return await db.Database.SqlQuery<DailyActivity>($"""
            SELECT day AS "Date", count(*)::int AS "Exercises", (count(*) * 12)::int AS "Minutes", 1 AS "Sessions"
            FROM workout_activity WHERE user_id = {User.UserId()} AND day BETWEEN {start} AND {end}
            GROUP BY day ORDER BY day
            """).ToListAsync();
    }
}
