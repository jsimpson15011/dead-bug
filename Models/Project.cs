using System.ComponentModel.DataAnnotations;

namespace dead_bug.Models;

public class Project
{
    [Key]
    public Guid Id { get; set; }
    public string Title { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;
    public virtual ICollection<BugSubmission> BugSubmissions { get; set; }
}
