using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TapeDex.Data;
using Microsoft.EntityFrameworkCore;
using TapeDex.Models;
using TapeDex.Models.DTOs;


namespace TapeDex.Controllers;

[ApiController]
[Route("api/[controller]")]

public class TapeController : ControllerBase
{
  
private TapeDexDbContext _dbContext;

public TapeController(TapeDexDbContext context)
  {
    _dbContext = context;
  }

[HttpGet]
// [Authorize]

public IActionResult Get()
  {
    return Ok(_dbContext.tapes.Include(t => t.Studio).Include(tu => tu.User).Include(tg => tg.TapeGenres).Select(tape => new TapeDTO
    {
      Id = tape.Id,
      Title = tape.Title,
      Description = tape.Description,
      Year = tape.Year,
      UserId = tape.UserId,
      User = new UserProfileDTO
      {
        Id = tape.User.Id,
        FirstName = tape.User.FirstName,
        LastName = tape.User.LastName
      },
      StudioId = tape.StudioId,
      Studio = new StudioDTO
      {
        Id = tape.Studio.Id,
        Name = tape.Studio.Name,
        Country = tape.Studio.Country
      },
      Photo = tape.Photo,
      Rating = tape.Rating,
     TapeGenres = tape.TapeGenres
    .Select(tg => new TapeGenreDTO
    {
        Id = tg.Id,
        GenreId = tg.GenreId,
        TapeId = tg.TapeId,
        Genre = new GenreDTO
        {
          Id = tg.Genre.Id,
          Name = tg.Genre.Name
        }
    }).Where(ft => ft.TapeId == tape.Id)
    .ToList(),




    }).ToList());
  }




}
