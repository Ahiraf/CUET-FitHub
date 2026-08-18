using CuetFitHub.Api.Dtos;
using CuetFitHub.Api.Models;
using CuetFitHub.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CuetFitHub.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _users;
    private readonly TokenService _tokens;

    public AuthController(UserManager<ApplicationUser> users, TokenService tokens)
    {
        _users = users;
        _tokens = tokens;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto dto)
    {
        if (await _users.FindByEmailAsync(dto.Email) is not null)
            return Conflict(new { message = "An account with this email already exists." });

        // Students self-register; trainers are allowed for demo. Admins are seeded only.
        var role = dto.Role == Roles.Trainer ? Roles.Trainer : Roles.Student;

        var user = new ApplicationUser
        {
            UserName = dto.Email,
            Email = dto.Email,
            FullName = dto.FullName,
            StudentId = dto.StudentId,
            Role = role,
            IsVerified = false,
        };

        var result = await _users.CreateAsync(user, dto.Password);
        if (!result.Succeeded)
            return BadRequest(new { message = string.Join(" ", result.Errors.Select(e => e.Description)) });

        await _users.AddToRoleAsync(user, role);
        return Ok(new AuthResponseDto(_tokens.CreateToken(user, role), ToDto(user)));
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto dto)
    {
        var user = await _users.FindByEmailAsync(dto.Email);
        if (user is null || !await _users.CheckPasswordAsync(user, dto.Password))
            return Unauthorized(new { message = "Invalid email or password." });

        return Ok(new AuthResponseDto(_tokens.CreateToken(user, user.Role), ToDto(user)));
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> Me()
    {
        var user = await _users.FindByIdAsync(User.UserId());
        return user is null ? Unauthorized() : ToDto(user);
    }

    [Authorize]
    [HttpPut("me")]
    public async Task<ActionResult<UserDto>> UpdateMe(UpdateProfileDto dto)
    {
        var user = await _users.FindByIdAsync(User.UserId());
        if (user is null) return Unauthorized();

        if (dto.FullName is not null) user.FullName = dto.FullName;
        if (dto.StudentId is not null) user.StudentId = dto.StudentId;
        if (dto.Department is not null) user.Department = dto.Department;
        if (dto.Goal is not null) user.Goal = dto.Goal;

        await _users.UpdateAsync(user);
        return ToDto(user);
    }

    private static UserDto ToDto(ApplicationUser u) =>
        new(u.Id, u.FullName, u.Email ?? "", u.Role, u.StudentId, u.Department, u.Goal, u.IsVerified);
}
