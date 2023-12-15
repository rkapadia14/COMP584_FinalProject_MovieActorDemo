using System;
namespace MovieActorAPI.DTO
{
	public class ActorDetailsResponse
	{
        public int ActorId { get; set; }
        public string? Name { get; set; }
        public DateTime? BirthDate { get; set; }
        public int TotalMovies { get; set; }
        public int age { get; set; }
    }
}

