namespace CuetFitHub.Api.Dtos;

// ---- Auth ----
public record RegisterDto(string FullName, string? StudentId, string Email, string Password, string? Role);
public record LoginDto(string Email, string Password);
public record UpdateProfileDto(string? FullName, string? StudentId, string? Department, string? Goal);
public record UserDto(string Id, string Name, string Email, string Role, string? StudentId, string? Department, string? Goal, bool Verified);
public record AuthResponseDto(string Token, UserDto User);

// ---- Occupancy ----
public record OccupancyDto(int Count, int Capacity, bool Full, bool CheckedIn, int Percent);

// ---- Classes ----
public record GymClassDto(int Id, string Slug, string Title, string Type, string Coach, string Day, string Time, int Spots, int Filled, string Color, bool Enrolled);

// ---- Bookings ----
public record CreateBookingDto(string TrainerName, string Goal, string? Slot);
public record BookingDto(int Id, string MemberName, string Department, string TrainerName, string Goal, string Slot, string Status);
public record UpdateStatusDto(string Status);

// ---- Routines ----
public record RoutineItemInput(string Name, string Target);
public record AssignRoutineDto(string MemberEmail, string? Coach, List<RoutineItemInput> Items);
public record RoutineItemDto(int Id, string Name, string Target, bool Done);
public record RoutineDto(int Id, string Coach, List<RoutineItemDto> Items);

// ---- Plan ----
public record PlanDto(List<string> Exercises);

// ---- Tickets ----
public record CreateTicketDto(string Item, string Issue);
public record TicketDto(int Id, string Item, string Issue, string ReportedBy, string Status, string Date);

// ---- Announcements ----
public record CreateAnnouncementDto(string Title, string Body, string Type);
public record AnnouncementDto(int Id, string Title, string Body, string Type, string Date);

// ---- Members (admin) ----
public record MemberDto(string Id, string Name, string Email, string Role, string? StudentId, string? Department, bool Verified);
public record VerifyDto(bool Verified);
