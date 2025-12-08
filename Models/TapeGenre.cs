namespace TapeDex.Models;

public class TapeGenre
{
  public int Id {get; set;}
 public int? TapeId {get; set;}

 public Tape? Tape {get; set;}

 public int? GenreId {get; set;}
 public Genre? Genre {get; set;}
}
