using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dead_bug.Models;

public class BugSubmission
{
    [Key]
    public Guid Id { get; set; }
    [ForeignKey("Project")]
    public Guid ProjectId { get; set; }
    public string Description { get; set; } = string.Empty;
    
    public virtual Project Project { get; set; }
}
