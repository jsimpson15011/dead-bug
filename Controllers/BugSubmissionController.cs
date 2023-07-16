using dead_bug.Contexts;
using dead_bug.Models;
using dead_bug.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dead_bug.Controllers;

[ApiController]
[Route("[controller]")]
public class BugSubmissionController : ControllerBase
{
    private readonly ILogger<BugSubmissionController> _logger;

    private readonly ApplicationDbContext _applicationDbContext;

    public BugSubmissionController(ILogger<BugSubmissionController> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _applicationDbContext = context;
    }

    [HttpGet]
    public IResult GetAll()
    {
        return Results.Ok(_applicationDbContext.BugSubmissions.ToArray());
    }

    [HttpGet("{id}")]
    public IResult GetById(Guid id)
    {
        var submission = _applicationDbContext.BugSubmissions.Find(id);

        return submission == null ? Results.NotFound() : Results.Ok(submission);
    }

    [HttpGet("project/{projectId}")]
    public IResult GetByProject(Guid projectId)
    {
        var submissions = _applicationDbContext.Projects
            .Include(p => p.BugSubmissions)
            .FirstOrDefault(x => x.Id == projectId);

        return submissions == null ? Results.NotFound() : Results.Ok(submissions.BugSubmissions);
    }

    [HttpPost]
    public async Task<IActionResult> CreateBugSubmission(BugSubmissionPostDTO submission)
    {
        BugSubmission newBugSubmission = new BugSubmission
        {
            Id = Guid.NewGuid(),
            Description = submission.Description,
            ProjectId = submission.ProjectId,
            Project = _applicationDbContext.Projects.Find(submission.ProjectId) ?? new Project()
        };

        _applicationDbContext.BugSubmissions.Add(newBugSubmission);
        await _applicationDbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = newBugSubmission.Id }, submission);
    }
}
