namespace TapeDex.Models;

public class Genre
{
  public int Id {get; set;}

  public string Name  {get; set;}

  public List<TapeGenre> TapeGenres {get; set;}
}
