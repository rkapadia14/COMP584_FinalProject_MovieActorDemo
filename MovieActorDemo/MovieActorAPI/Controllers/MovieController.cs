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
    public class MovieController : ControllerBase
    {
        private readonly MovieActorDbContext _context;

        public MovieController(MovieActorDbContext context)
        {
            _context = context;
        }

        // This API is responsible for fetching the list of all the movies available in the database
        // GET: api/Movie
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movie>>> GetMovies()
        {
          if (_context.Movies == null)
          {
              return NotFound();
          }
            return await _context.Movies.ToListAsync();
        }


        // This API is responsible for fetching all the information for a movie based on the movie name
        [HttpGet("movie-actors/{movieName}")]
        public async Task<ActionResult<IEnumerable<MovieDetailsResponse>>> GetMoviesWithActors(String movieName)
        {
            var moviesWithActors = await _context.Movies
        .Include(m => m.Actors)
        .Where(m => string.IsNullOrEmpty(movieName) || m.Title.Contains(movieName)) // Filter based on movieName
        .Select(m => new MovieDetailsResponse
        {
            MovieId = m.MovieId,
            Title = m.Title,
            ReleaseYear = m.ReleaseYear,
            Actors = m.Actors.OrderBy(a => a.Name).Select(a => a.Name).ToList()
        })
        .ToListAsync();

            if (moviesWithActors == null || !moviesWithActors.Any())
            {
                return NotFound();
            }

            return moviesWithActors;
        }
    }
}
