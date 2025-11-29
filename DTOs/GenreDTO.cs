namespace TapeDex.Models.DTOs;

public class GenreDTO
{
  public int Id {get; set;}

  public string Name  {get; set;}

  public List<TapeGenreDTO> TapeGenres {get; set;}
}
