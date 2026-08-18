using CuetFitHub.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CuetFitHub.Api.Data;

// Seeds roles, demo accounts and reference data on startup (idempotent).
public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var sp = scope.ServiceProvider;
        var db = sp.GetRequiredService<AppDbContext>();
        var userManager = sp.GetRequiredService<UserManager<ApplicationUser>>();
        var roleManager = sp.GetRequiredService<RoleManager<IdentityRole>>();

        await db.Database.MigrateAsync();

        foreach (var role in Roles.All)
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));

        await SeedUser(userManager, "admin@cuet.ac.bd", "Gym Admin", Roles.Admin, "admin123", "ADM-01", "Operations");
        await SeedUser(userManager, "tanvir.ahmed@cuet.ac.bd", "Tanvir Ahmed", Roles.Trainer, "demo123", "TR-1002", "Trainer");
        await SeedUser(userManager, "arif.siam@cuet.ac.bd", "Arif Siam", Roles.Student, "demo123", "2204077", "CSE 22", verified: true);
        await SeedUser(userManager, "nabila.haque@cuet.ac.bd", "Nabila Haque", Roles.Student, "demo123", "2201044", "Arch 22", verified: false);

        if (!await db.Exercises.AnyAsync())
        {
            db.Exercises.AddRange(
                new Exercise { Name = "Barbell Bench Press", Muscle = "Chest", Equipment = "Bench press", Difficulty = "Intermediate" },
                new Exercise { Name = "Back Squat", Muscle = "Legs", Equipment = "Power rack", Difficulty = "Intermediate" },
                new Exercise { Name = "Deadlift", Muscle = "Back", Equipment = "Barbell", Difficulty = "Advanced" },
                new Exercise { Name = "Overhead Press", Muscle = "Shoulders", Equipment = "Barbell", Difficulty = "Intermediate" },
                new Exercise { Name = "Pull-ups", Muscle = "Back", Equipment = "Pull-up bar", Difficulty = "Intermediate" },
                new Exercise { Name = "Lat Pulldown", Muscle = "Back", Equipment = "Cable machine", Difficulty = "Beginner" },
                new Exercise { Name = "Dumbbell Curl", Muscle = "Arms", Equipment = "Dumbbells", Difficulty = "Beginner" },
                new Exercise { Name = "Tricep Pushdown", Muscle = "Arms", Equipment = "Cable machine", Difficulty = "Beginner" },
                new Exercise { Name = "Leg Press", Muscle = "Legs", Equipment = "Leg press", Difficulty = "Beginner" },
                new Exercise { Name = "Plank", Muscle = "Core", Equipment = "Bodyweight", Difficulty = "Beginner" },
                new Exercise { Name = "Treadmill Run", Muscle = "Cardio", Equipment = "Treadmill", Difficulty = "Beginner" });
        }

        if (!await db.Trainers.AnyAsync())
        {
            db.Trainers.AddRange(
                new TrainerProfile { Name = "Tanvir Ahmed", Specialty = "Strength & Conditioning", Rating = 4.9, Sessions = 320, Availability = "Mon–Thu, 5–8 PM", Bio = "Powerlifting coach focused on progressive overload and safe barbell technique.", Color = "#4f6ae0" },
                new TrainerProfile { Name = "Nusrat Jahan", Specialty = "Yoga & Mobility", Rating = 4.8, Sessions = 275, Availability = "Sun–Wed mornings", Bio = "Certified yoga instructor helping students improve flexibility and recover from strain.", Color = "#8a6bd4" },
                new TrainerProfile { Name = "Rakib Hasan", Specialty = "Functional Fitness", Rating = 4.7, Sessions = 190, Availability = "Fri–Sat afternoons", Bio = "Functional training and self-defense specialist for all-round athletic fitness.", Color = "#e0913f" },
                new TrainerProfile { Name = "Sadia Islam", Specialty = "Weight Loss & Cardio", Rating = 4.9, Sessions = 240, Availability = "Tue–Fri evenings", Bio = "Designs sustainable cardio and nutrition plans tailored to student schedules.", Color = "#35a279" });
        }

        if (!await db.GymClasses.AnyAsync())
        {
            db.GymClasses.AddRange(
                new GymClass { Slug = "yoga-mw", Title = "Morning Yoga Flow", Type = "Yoga", Coach = "Nusrat Jahan", Day = "Mon / Wed", Time = "7:00 AM", Spots = 18, BaselineFilled = 11, Color = "violet" },
                new GymClass { Slug = "cardio-hiit", Title = "HIIT Cardio Blast", Type = "Cardio", Coach = "Tanvir Ahmed", Day = "Tue / Thu", Time = "6:30 PM", Spots = 20, BaselineFilled = 17, Color = "orange" },
                new GymClass { Slug = "selfdef", Title = "Self-Defense Basics", Type = "Self-defense", Coach = "Rakib Hasan", Day = "Saturday", Time = "5:00 PM", Spots = 16, BaselineFilled = 6, Color = "blue" },
                new GymClass { Slug = "strength", Title = "Strength Foundations", Type = "Strength", Coach = "Tanvir Ahmed", Day = "Fri / Sun", Time = "5:30 PM", Spots = 14, BaselineFilled = 14, Color = "blue" },
                new GymClass { Slug = "mobility", Title = "Mobility & Recovery", Type = "Yoga", Coach = "Nusrat Jahan", Day = "Sunday", Time = "8:00 AM", Spots = 18, BaselineFilled = 9, Color = "violet" },
                new GymClass { Slug = "spin", Title = "Spin & Endurance", Type = "Cardio", Coach = "Tanvir Ahmed", Day = "Wednesday", Time = "6:00 PM", Spots = 20, BaselineFilled = 13, Color = "orange" });
        }

        if (!await db.Announcements.AnyAsync())
        {
            db.Announcements.AddRange(
                new Announcement { Type = "Maintenance", Title = "Cable machine #2 under repair", Body = "The second cable machine will be out of service until Thursday. Sorry for the inconvenience." },
                new Announcement { Type = "Event", Title = "Inter-department lifting meet", Body = "Sign up for the CUET strength challenge on August 30. Represent your department!" },
                new Announcement { Type = "Notice", Title = "Extended evening hours", Body = "The gym now stays open until 10:30 PM during exam week." });
        }

        if (!await db.Tickets.AnyAsync())
        {
            db.Tickets.AddRange(
                new Ticket { Item = "Bench press", Issue = "Left safety catch is loose and wobbles under load.", ReportedBy = "Arif Siam", Status = "Open" },
                new Ticket { Item = "Treadmill #3", Issue = "Belt slips when running above 10 km/h.", ReportedBy = "Rifat Karim", Status = "In progress" });
        }

        await db.SaveChangesAsync();
    }

    private static async Task SeedUser(UserManager<ApplicationUser> users, string email, string name, string role, string password, string? studentId, string? dept, bool verified = true)
    {
        if (await users.FindByEmailAsync(email) is not null) return;
        var user = new ApplicationUser
        {
            UserName = email,
            Email = email,
            EmailConfirmed = true,
            FullName = name,
            Role = role,
            StudentId = studentId,
            Department = dept,
            IsVerified = verified,
        };
        var result = await users.CreateAsync(user, password);
        if (result.Succeeded) await users.AddToRoleAsync(user, role);
    }
}
