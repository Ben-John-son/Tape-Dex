using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TapeDex.Data;
using Microsoft.EntityFrameworkCore;
using TapeDex.Models;
using TapeDex.Models.DTOs;


namespace TapeDex.Controllers;

[ApiController]
[Route("api/[controller]")]

public class StudioController : ControllerBase
{
  
private TapeDexDbContext _dbContext;

public StudioController(TapeDexDbContext context)
  {
    _dbContext = context;
  }

[HttpGet]
// [Authorize]

public IActionResult Get()
  {
    return Ok(_dbContext.studios.Include(tg => tg.Tapes).Select(studio => new StudioDTO
    {
      Id = studio.Id,
      Name = studio.Name,
      Country = studio.Country,
      UserId = studio.UserId,
      Tapes = studio.Tapes.Select((st) => new TapeDTO
      {
        Id = st.Id,
        Title = st.Title,
        Year = st.Year,
        StudioId = studio.Id,
        TapeGenres = st.TapeGenres.Select(tg =>
        new TapeGenreDTO
        {
          Id = tg.Id,
          TapeId = tg.TapeId,
          GenreId = tg.GenreId,
          Genre = new GenreDTO
          {
            Id = tg.Genre.Id,
            Name = tg.Genre.Name
          }
        }
        ).ToList()
      }).Where(st => st.StudioId == studio.Id).ToList()
    }).ToList());
  }




[HttpPost]
// [Authorize]
public IActionResult CreateStudio(Studio studio)
  {
    
    _dbContext.studios.Add(studio);
    _dbContext.SaveChanges();
    return Created($"/api/Studio/{studio.Id}", studio);

  }


  [HttpPatch("{id}")]
  // [Authorize]
  public IActionResult UpdateStudio(StudioDTO studio, int id)
  {

      Studio updatedStudio = _dbContext.studios.Include(s => s.Tapes).SingleOrDefault(st => st.Id == id);

      
    if (updatedStudio == null)
    {
      return NotFound();
    }
     else if (id != studio.Id)
    {
      return BadRequest();
    }

    updatedStudio.Name = studio.Name;
    updatedStudio.Country = studio.Country;
    _dbContext.SaveChanges();
    return NoContent();


  }



[HttpDelete("{id}")]
// [Authorize]
public IActionResult DeleteStudio(int id)
  {
    var removedStudio = _dbContext.studios.SingleOrDefault(s => s.Id == id);
    if (removedStudio == null)
    {
      return BadRequest();
    }
    _dbContext.studios.Remove(removedStudio);
    _dbContext.SaveChanges();
    return NoContent();

  }


[HttpGet("studioBy/{id}")]
[Authorize]
public IActionResult GetUserStudios(int id)
{
    var studios = _dbContext.studios
        .Where(s => s.UserId == id)
        .Select(studio => new StudioDTO
        {
            Id = studio.Id,
            Name = studio.Name,
            Country = studio.Country,
            UserId = studio.UserId
        })
        .ToList();

    return Ok(studios);
}



[HttpGet("{id}")]
// [Authorize]
public IActionResult StudioById(int id)
{
    var studio = _dbContext.studios
        .Where(s => s.Id == id)
        .Select(studio => new StudioDTO
        {
            Id = studio.Id,
            Name = studio.Name,
            Country = studio.Country,
            UserId = studio.UserId
        })
        .FirstOrDefault();

    if (studio == null) return NotFound();

    return Ok(studio);
}


}
