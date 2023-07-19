namespace dead_bug.Models.DTOs;

public class ProjectPostDTO
{
    public string Description { get; set; } = String.Empty;
    public string Title { get; set; } = String.Empty;
    
    public Guid ProjectId { get; set; }
}
