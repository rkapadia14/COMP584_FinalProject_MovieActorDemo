using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MovieActorModels.Models;

namespace MovieActorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
	{
		private readonly MovieActorDbContext _db;
        private readonly UserManager<MovieActorAPIUser> _userManager;

        public UserController(MovieActorDbContext db, IWebHostEnvironment environment,
            UserManager<MovieActorAPIUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        // This API creates a user. The username and password is passed from the codebase
        [HttpPost("Users")]
        public async Task<IActionResult> ImportUsersAsync()
        {
            (string name, string email) = ("comp584", "comp584@gmail.com");
            MovieActorAPIUser user = new()
            {
                UserName = name,
                Email = email,
                SecurityStamp = Guid.NewGuid().ToString(),
            };
            if (await _userManager.FindByNameAsync(name) is not null)
            {
                Console.WriteLine("I came here when user already exists");
                user.UserName = "comp584_1";
            }
            _ = await _userManager.CreateAsync(user, "comp584")
                                ?? throw new InvalidOperationException();

            user.EmailConfirmed = true;
            user.LockoutEnabled = false;

            await _db.SaveChangesAsync();
            return Ok();
        }


    }
}

