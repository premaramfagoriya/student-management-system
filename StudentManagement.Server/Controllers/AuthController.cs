using Microsoft.AspNetCore.Mvc;
using StudentManagement.Server.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StudentManagement.Server.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User login)
        {
            try
            {
                // 🔒 Basic validation
                if (login == null || string.IsNullOrEmpty(login.Username) || string.IsNullOrEmpty(login.Password))
                {
                    return BadRequest("Username and Password required");
                }

                // 🔥 Hardcoded user (for testing)
                if (login.Username != "admin" || login.Password != "admin123")
                {
                    return Unauthorized("Invalid credentials");
                }

                var token = GenerateToken(login.Username);

                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server Error: {ex.Message}");
            }
        }

        private string GenerateToken(string username)
        {
            // 🔥 Get key safely
            var jwtKey = _config["Jwt:Key"];

            if (string.IsNullOrEmpty(jwtKey))
            {
                throw new Exception("JWT Key is missing in appsettings.json");
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey)
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}