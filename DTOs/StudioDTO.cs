namespace TapeDex.Models.DTOs;

public class StudioDTO
{
  public int Id {get; set;}

  public string Name {get; set;}

  public string Country {get; set;}

  public List<TapeDTO> Tapes {get; set;}
}
