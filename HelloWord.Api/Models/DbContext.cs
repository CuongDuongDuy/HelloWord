using System.Data.Entity;
using System.Data.Entity.Core.EntityClient;

namespace HelloWord.Api.Models
{
    public class DbContext : System.Data.Entity.DbContext
    {
        public DbContext() : base("DbConnection")
        {
            Database.SetInitializer(new DbInitializer());
        }

        public virtual IDbSet<Enrollment> Enrollments { get; set; }
        public virtual IDbSet<Channel> Channels { get; set; } 
    }

    public class DbInitializer : DropCreateDatabaseIfModelChanges<DbContext>
    {
        protected override void Seed(DbContext context)
        {
            var channels = new Channel[]
            {
                new Channel
                {
                    Name = "Television"
                },
                new Channel
                {
                    Name = "Radio"
                },
                new Channel
                {
                    Name = "Social Media"
                },
                new Channel
                {
                    Name = "Other"
                }
            };
            foreach (var channel in channels)
            {
                context.Channels.Add(channel);
            }
            context.SaveChanges();
            base.Seed(context);
        }
    }
}
