using Microsoft.AspNetCore.Identity;

namespace CuetFitHub.Api.Models;

// Extends the built-in Identity user with CUET-specific profile fields.
public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; } = string.Empty;
    public string? StudentId { get; set; }
    public string? Department { get; set; }
    public string? Goal { get; set; }

    // Mirrors the assigned Identity role for convenient serialization.
    public string Role { get; set; } = Roles.Student;

    // Admins verify that an account belongs to a genuine CUET student.
    public bool IsVerified { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public static class Roles
{
    public const string Student = "Student";
    public const string Trainer = "Trainer";
    public const string Admin = "Admin";
    public static readonly string[] All = { Student, Trainer, Admin };
}
