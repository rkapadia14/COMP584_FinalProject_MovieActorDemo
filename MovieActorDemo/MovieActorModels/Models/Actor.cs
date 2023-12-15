using System;
using System.Collections.Generic;

namespace MovieActorModels.Models;

public partial class Actor
{
    public int ActorId { get; set; }

    public string? Name { get; set; }

    public DateTime? BirthDate { get; set; }

    public virtual ICollection<Movie> Movies { get; } = new List<Movie>();
}
