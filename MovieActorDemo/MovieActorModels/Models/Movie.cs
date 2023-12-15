using System;
using System.Collections.Generic;

namespace MovieActorModels.Models;

public partial class Movie
{
    public int MovieId { get; set; }

    public string? Title { get; set; }

    public int? ReleaseYear { get; set; }

    public virtual ICollection<Actor> Actors { get; } = new List<Actor>();
}
