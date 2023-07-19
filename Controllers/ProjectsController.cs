using dead_bug.Contexts;
using dead_bug.Models;
using dead_bug.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace dead_bug.Controllers;

[ApiController]
[Route("[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly ILogger<ProjectsController> _logger;

    private readonly ApplicationDbContext _applicationDbContext;

    public ProjectsController(ILogger<ProjectsController> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _applicationDbContext = context;
    }

    [HttpGet]
    public IResult GetAll()
    {
        return Results.Ok(_applicationDbContext.Projects.ToArray());
    }

    [HttpGet("{id}")]
    public IResult GetById(Guid id)
    {
        var submission = _applicationDbContext.Projects.Find(id);

        return submission == null ? Results.NotFound() : Results.Ok(submission);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProject(ProjectPostDTO project)
    {
        Project newProject = new Project
        {
            Id = Guid.NewGuid(),
            Title = project.Title,
            Description = project.Description
        };

        _applicationDbContext.Projects.Add(newProject);
        await _applicationDbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = newProject.Id }, project);
    }
}
