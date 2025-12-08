namespace TapeDex.Models.DTOs;

public class TapeGenreDTO
{
  public int Id {get; set;}
 public int? TapeId {get; set;}

 public TapeDTO? Tape {get; set;}

 public int? GenreId {get; set;}
 public GenreDTO? Genre {get; set;}
}
