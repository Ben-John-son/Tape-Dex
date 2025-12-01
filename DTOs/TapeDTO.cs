namespace TapeDex.Models.DTOs;
using System.ComponentModel.DataAnnotations;

public class TapeDTO
{

public int Id { get; set;}
public string? Title { get; set;}
public string? Description {get; set;}

public int? Year { get; set;}

public int? UserId { get; set;}

public UserProfileDTO? User {get; set;}

public int? StudioId {get; set;}

public StudioDTO? Studio {get; set;}

public string? Photo {get; set;}
public int? Rating {get;set;}
public List<TapeGenreDTO>? TapeGenres  {get; set;}

}
