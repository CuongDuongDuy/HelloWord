using System.ComponentModel.DataAnnotations.Schema;

namespace HelloWord.Api.Models
{
    public class Enrollment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int ChannelId { get; set; }
        public bool MonthlyNews { get; set; }

        public virtual Channel Channel { get; set; }
    }
}
