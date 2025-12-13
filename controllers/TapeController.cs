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


    [HttpGet("tapeBy/{id}")]
    // [Authorize]
    public IActionResult GetTapeById( int id)
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




    }).FirstOrDefault(t => t.Id == id));



  }



  [HttpPatch("{id}")]
  // [Authorize]
  public IActionResult UpdateTape(TapeDTO tape, int id)
  {
    
    Tape tapeToUpdate = _dbContext.tapes.Include(g => g.TapeGenres).SingleOrDefault(t => t.Id == id);

    if (tapeToUpdate == null)
    {
      return NotFound();
    }
     else if (id != tape.Id)
    {
      return BadRequest();
    }

    tapeToUpdate.Title = tape.Title;
    tapeToUpdate.Description = tape.Description;
    if (tape.Year.HasValue)
    tapeToUpdate.Year = tape.Year.Value;
    if (tape.StudioId.HasValue)
    tapeToUpdate.StudioId = tape.StudioId.Value;
    tapeToUpdate.Photo = tape.Photo;

if (tape.TapeGenres != null)
{
   
    var existing = _dbContext.tapeGenres.Where(tg => tg.TapeId == id);
    _dbContext.tapeGenres.RemoveRange(existing);

    foreach (var tg in tape.TapeGenres)
    {
        _dbContext.tapeGenres.Add(new TapeGenre
        {
            TapeId = id,
            GenreId = tg.GenreId
        });
    }
}

    _dbContext.SaveChanges();
    return NoContent();
  }


  [HttpPost]
  // [Authorize]
  public IActionResult NewTape(Tape tape)
  {
    if (tape.Rating.HasValue)
      tape.Rating = tape.Rating.Value;
    
    _dbContext.tapes.Add(tape);
    _dbContext.SaveChanges();

    return Created($"/api/Tape/{tape.Id}", tape);
  }

  [HttpGet("{id}")]
  [Authorize]
  public IActionResult GetUserTapes(int id)
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
    }).Where(dbTapes => dbTapes.UserId == id).ToList());

  }

[HttpDelete("{id}")]
// [Authorize]
public IActionResult DeleteTape(int id)
  {
   var tape = _dbContext.tapes
        .Include(t => t.TapeGenres)
        .SingleOrDefault(t => t.Id == id);

    if (tape == null) return NotFound();

    _dbContext.tapeGenres.RemoveRange(tape.TapeGenres);
    _dbContext.tapes.Remove(tape);
    _dbContext.SaveChanges();

    return NoContent();
  }

}
