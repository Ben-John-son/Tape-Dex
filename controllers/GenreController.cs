using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TapeDex.Data;
using Microsoft.EntityFrameworkCore;
using TapeDex.Models;
using TapeDex.Models.DTOs;


namespace TapeDex.Controllers;

[ApiController]
[Route("api/[controller]")]

public class GenreController : ControllerBase
{
  
private TapeDexDbContext _dbContext;

public GenreController(TapeDexDbContext context)
  {
    _dbContext = context;
  }

[HttpGet]
[Authorize]

public IActionResult Get()
  {
    return Ok(_dbContext.genres.Include(tg => tg.TapeGenres).Select(genre => new GenreDTO
    {
      Id = genre.Id,
      Name = genre.Name,
     TapeGenres = genre.TapeGenres
    .Select(tg => new TapeGenreDTO
    {
        Id = tg.Id,
        GenreId = tg.GenreId,
        TapeId = tg.TapeId,
        Genre = new GenreDTO
        {
          Id = tg.Genre.Id,
          Name = tg.Genre.Name
        },
        Tape = new TapeDTO
        {
          Id = tg.Tape.Id,
          Title = tg.Tape.Title
        }
    }).Where(ft => ft.GenreId == genre.Id)
    .ToList(),




    }).ToList());
  }

  [HttpPatch("{id}")]
  [Authorize]
  public IActionResult UpdateGenre(GenreDTO genre, int id)
  {
    
    Genre genreToUpdate = _dbContext.genres.Include(g => g.TapeGenres).SingleOrDefault(t => t.Id == id);

    if (genreToUpdate == null)
    {
      return NotFound();
    }
     else if (id != genre.Id)
    {
      return BadRequest();
    }

    genreToUpdate.Name = genre.Name;

    _dbContext.SaveChanges();
    return NoContent();
  }


[HttpPost]
[Authorize]
public IActionResult CreateGenre(Genre genre)
  {
    
    _dbContext.genres.Add(genre);
    _dbContext.SaveChanges();
    return Created($"/api/Genre/{genre.Id}", genre);

  }




}
