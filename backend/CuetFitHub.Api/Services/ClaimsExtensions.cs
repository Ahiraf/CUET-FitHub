using System.Security.Claims;

namespace CuetFitHub.Api.Services;

public static class ClaimsExtensions
{
    public static string UserId(this ClaimsPrincipal user)
        => user.FindFirstValue("uid") ?? user.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;

    public static string DisplayName(this ClaimsPrincipal user)
        => user.FindFirstValue("name") ?? "A student";
}
