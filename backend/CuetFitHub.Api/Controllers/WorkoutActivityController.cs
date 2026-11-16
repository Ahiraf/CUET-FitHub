using CuetFitHub.Api.Data;
using CuetFitHub.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CuetFitHub.Api.Controllers;

public record ExerciseCheckoff(string ExerciseKey, bool Completed);
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
