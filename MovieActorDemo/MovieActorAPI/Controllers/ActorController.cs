using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieActorAPI.DTO;
using MovieActorModels.Models;

namespace MovieActorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ActorController : ControllerBase
    {
        private readonly MovieActorDbContext _context;

        public ActorController(MovieActorDbContext context)
        {
            _context = context;
        }


        // This API is responsible for fetching the list of all the actors available in the database
        // GET: api/Actor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActorListResponse>>> GetActors()
        {
          if (_context.Actors == null)
          {
              return NotFound();
          }
             var actorsWithLimitedDetails = await _context.Actors
            .Select(actor => new ActorListResponse
            {
                ActorName = actor.Name,
                BirthDate = actor.BirthDate
            })
            .ToListAsync();

            return actorsWithLimitedDetails;
        }


        // This API is responsible for fetching all the information for an actor based on the actor name
        [HttpGet("actor-details/{actorName}")]
        public async Task<ActionResult<ActorDetailsResponse>> GetActorDetails(string actorName)
        {
            //LINQ statement
            var actorDetailsResponse = await _context.Actors
            .Where(a => a.Name == actorName)
            .Select(a => new ActorDetailsResponse
            {
                ActorId = a.ActorId,
                Name = a.Name,
                BirthDate = a.BirthDate,
                TotalMovies = a.Movies.Count,
                age = CalculateAge(a.BirthDate)
            })
            .FirstOrDefaultAsync();

            if (actorDetailsResponse == null)
            {
                return NotFound();
            }

            return actorDetailsResponse;
        }


        // This API is responsible for fetching all the information for an actor based on the search query for an actor
        [HttpGet("search-actor")]
        public async Task<ActionResult<IEnumerable<ActorDetailsResponse>>> GetSearchActorList([FromQuery] string actorName)
        {
            // LINQ statement
            var actorDetailsResponse = await _context.Actors
                .Where(a => a.Name.Contains(actorName))
                .Select(a => new ActorDetailsResponse
                {
                    ActorId = a.ActorId,
                    Name = a.Name,
                    BirthDate = a.BirthDate,
                    TotalMovies = a.Movies.Count,
                    age = CalculateAge(a.BirthDate)
                })
                .ToListAsync(); // Use ToListAsync to get a list instead of FirstOrDefaultAsync

            if (actorDetailsResponse == null || actorDetailsResponse.Count == 0)
            {
                return NotFound();
            }

            return actorDetailsResponse;
        }

        private static int CalculateAge(DateTime? birthDate)
        {
            if (birthDate == null)
            {
                return 0; // Return 0 or handle accordingly for null birth date
            }

            DateTime currentDate = DateTime.Now;
            int age = currentDate.Year - birthDate.Value.Year;

            // Adjust age if birthday hasn't occurred yet this year
            if (birthDate.Value.Date > currentDate.AddYears(-age))
            {
                age--;
            }

            return age;
        }
    }
}
