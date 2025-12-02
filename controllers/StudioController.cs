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




}

