using System;
namespace MovieActorAPI.DTO
{
	public class MovieDetailsResponse
	{
        public int MovieId { get; set; }
        public string? Title { get; set; }
        public int? ReleaseYear { get; set; }
        public List<string> Actors { get; set; }
    }
}

