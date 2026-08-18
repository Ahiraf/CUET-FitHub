namespace CuetFitHub.Api.Models;

public class Exercise
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Muscle { get; set; } = string.Empty;
    public string Equipment { get; set; } = string.Empty;
    public string Difficulty { get; set; } = string.Empty;
}

public class GymClass
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Coach { get; set; } = string.Empty;
    public string Day { get; set; } = string.Empty;
    public string Time { get; set; } = string.Empty;
    public int Spots { get; set; }
    public int BaselineFilled { get; set; } // pre-existing sign-ups (demo seed)
    public string Color { get; set; } = "blue";

    public ICollection<ClassEnrollment> Enrollments { get; set; } = new List<ClassEnrollment>();
}

public class ClassEnrollment
{
    public int Id { get; set; }
    public int GymClassId { get; set; }
    public GymClass? GymClass { get; set; }
    public string UserId { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class TrainerProfile
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Specialty { get; set; } = string.Empty;
    public double Rating { get; set; }
    public int Sessions { get; set; }
    public string Availability { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string Color { get; set; } = "#4f6ae0";
}

public class Booking
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string MemberName { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string TrainerName { get; set; } = string.Empty;
    public string Goal { get; set; } = string.Empty;
    public string Slot { get; set; } = "To be confirmed";
    public string Status { get; set; } = "Pending"; // Pending | Confirmed | Declined
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Routine
{
    public int Id { get; set; }
    public string OwnerUserId { get; set; } = string.Empty;
    public string Coach { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<RoutineItem> Items { get; set; } = new List<RoutineItem>();
}

public class RoutineItem
{
    public int Id { get; set; }
    public int RoutineId { get; set; }
    public Routine? Routine { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Target { get; set; } = string.Empty;
    public bool Done { get; set; }
}

public class PlanItem
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string ExerciseName { get; set; } = string.Empty;
}

public class CheckIn
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public DateTime CheckInTime { get; set; } = DateTime.UtcNow;
    public DateTime? CheckOutTime { get; set; }
}

public class Ticket
{
    public int Id { get; set; }
    public string Item { get; set; } = string.Empty;
    public string Issue { get; set; } = string.Empty;
    public string ReportedBy { get; set; } = string.Empty;
    public string? ReportedByUserId { get; set; }
    public string Status { get; set; } = "Open"; // Open | In progress | Resolved
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Announcement
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public string Type { get; set; } = "Notice"; // Notice | Event | Maintenance
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
