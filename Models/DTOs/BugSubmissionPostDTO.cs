namespace dead_bug.Models.DTOs;

public class BugSubmissionPostDTO
{
    public string Description { get; set; }
    public Guid ProjectId { get; set; }
}
