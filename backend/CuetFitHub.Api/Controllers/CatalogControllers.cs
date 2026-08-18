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
[Route("api/exercises")]
public class ExercisesController : ControllerBase
{
    private readonly AppDbContext _db;
    public ExercisesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Exercise>>> Get() =>
        await _db.Exercises.OrderBy(e => e.Name).ToListAsync();
}

[ApiController]
[Authorize]
[Route("api/trainers")]
public class TrainersController : ControllerBase
{
    private readonly AppDbContext _db;
    public TrainersController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TrainerProfile>>> Get() =>
        await _db.Trainers.OrderByDescending(t => t.Rating).ToListAsync();
}

[ApiController]
[Authorize]
[Route("api/classes")]
public class ClassesController : ControllerBase
{
    private readonly AppDbContext _db;
    public ClassesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GymClassDto>>> Get()
    {
        var uid = User.UserId();
        var classes = await _db.GymClasses.Include(c => c.Enrollments).ToListAsync();
        return classes.Select(c => new GymClassDto(
            c.Id, c.Slug, c.Title, c.Type, c.Coach, c.Day, c.Time, c.Spots,
            c.BaselineFilled + c.Enrollments.Count, c.Color,
            c.Enrollments.Any(e => e.UserId == uid))).ToList();
    }

    // Toggle the current user's enrollment in a class.
    [HttpPost("{id:int}/enroll")]
    public async Task<ActionResult<GymClassDto>> Toggle(int id)
    {
        var uid = User.UserId();
        var cls = await _db.GymClasses.Include(c => c.Enrollments).FirstOrDefaultAsync(c => c.Id == id);
        if (cls is null) return NotFound();

        var existing = cls.Enrollments.FirstOrDefault(e => e.UserId == uid);
        if (existing is not null)
        {
            _db.ClassEnrollments.Remove(existing);
        }
        else
        {
            if (cls.BaselineFilled + cls.Enrollments.Count >= cls.Spots)
                return Conflict(new { message = "This class is full." });
            _db.ClassEnrollments.Add(new ClassEnrollment { GymClassId = id, UserId = uid });
        }
        await _db.SaveChangesAsync();

        var filled = cls.BaselineFilled + await _db.ClassEnrollments.CountAsync(e => e.GymClassId == id);
        var enrolled = await _db.ClassEnrollments.AnyAsync(e => e.GymClassId == id && e.UserId == uid);
        return new GymClassDto(cls.Id, cls.Slug, cls.Title, cls.Type, cls.Coach, cls.Day, cls.Time, cls.Spots, filled, cls.Color, enrolled);
    }
}
