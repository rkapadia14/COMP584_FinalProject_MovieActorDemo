using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieActorAPI.DTO;
using MovieActorModels.Models;
using Microsoft.AspNetCore.Authorization;
namespace MovieActorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ActorMovieListController : ControllerBase
    {
        private readonly MovieActorDbContext _context;

        public ActorMovieListController(MovieActorDbContext context)
        {
            _context = context;
        }

        // This API is responsible for fetching the list of all the actors and their associated tables from the database
        // GET: api/ActorMovieList
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActorMovieResponse>>> GetActorsMovieList()
        {
            //LINQ statement
            var responses = await _context.Actors
            .Include(a => a.Movies)
            .OrderBy(actor => actor.Name) // Add this line to order by actor name
            .Select(actor => new ActorMovieResponse
            {
                ActorId = actor.ActorId,
                ActorName = actor.Name,
                BirthDate = actor.BirthDate,
                MovieTitles = actor.Movies
                .OrderBy(m => m.Title)
                .Select(m => m.Title)
                .ToList()
            })
            .ToListAsync();

            if (responses == null || responses.Count == 0)
            {
                return NotFound();
            }

            return Ok(responses);
        }
    }
}
