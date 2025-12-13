namespace TapeDex.Models;

public class Studio
{
  public int Id {get; set;}

  public string Name {get; set;}

  public string Country {get; set;}

  public int? UserId {get;set;}

  public UserProfile? User {get;set;}

  public List<Tape>? Tapes {get; set;}
}
