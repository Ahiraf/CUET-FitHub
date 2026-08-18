using CuetFitHub.Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CuetFitHub.Api.Data;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Exercise> Exercises => Set<Exercise>();
    public DbSet<GymClass> GymClasses => Set<GymClass>();
    public DbSet<ClassEnrollment> ClassEnrollments => Set<ClassEnrollment>();
    public DbSet<TrainerProfile> Trainers => Set<TrainerProfile>();
    public DbSet<Booking> Bookings => Set<Booking>();
    public DbSet<Routine> Routines => Set<Routine>();
    public DbSet<RoutineItem> RoutineItems => Set<RoutineItem>();
    public DbSet<PlanItem> PlanItems => Set<PlanItem>();
    public DbSet<CheckIn> CheckIns => Set<CheckIn>();
    public DbSet<Ticket> Tickets => Set<Ticket>();
    public DbSet<Announcement> Announcements => Set<Announcement>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Routine>()
            .HasMany(r => r.Items)
            .WithOne(i => i.Routine!)
            .HasForeignKey(i => i.RoutineId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<ClassEnrollment>()
            .HasIndex(e => new { e.GymClassId, e.UserId })
            .IsUnique();

        builder.Entity<PlanItem>()
            .HasIndex(p => new { p.UserId, p.ExerciseName })
            .IsUnique();
    }
}
