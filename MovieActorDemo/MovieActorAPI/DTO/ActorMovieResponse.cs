using System;
namespace MovieActorAPI.DTO
{
	public class ActorMovieResponse
	{
        public int ActorId { get; set; }
        public string ActorName { get; set; }
        public DateTime? BirthDate { get; set; }
        public List<string> MovieTitles { get; set; }
    }
}

