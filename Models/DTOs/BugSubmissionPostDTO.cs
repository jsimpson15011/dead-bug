﻿namespace dead_bug.Models.DTOs;

public class BugSubmissionPostDTO
{
    public string Description { get; set; } = String.Empty;
    public Guid ProjectId { get; set; }
}
