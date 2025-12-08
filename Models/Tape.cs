namespace TapeDex.Models;
using System.ComponentModel.DataAnnotations;

public class Tape
{

public int Id { get; set;}
public string? Title { get; set;}
public string? Description {get; set;}

public int? Year { get; set;}

public int? UserId { get; set;}

public UserProfile? User {get; set;}

public int? StudioId {get; set;}

public Studio? Studio {get; set;}

public string? Photo {get; set;}
public int? Rating {get;set;}
public List<TapeGenre>? TapeGenres  {get; set;}

}
