using dead_bug.Models;
using Microsoft.EntityFrameworkCore;

namespace dead_bug.Contexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<BugSubmission> BugSubmissions { get; set; }
        public DbSet<Project> Projects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<BugSubmission>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.ProjectId).IsRequired();
                entity.HasOne(d => d.Project)
                    .WithMany(p => p.BugSubmissions);
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired();
            });
        }
    }
}
