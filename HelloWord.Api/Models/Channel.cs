using System.ComponentModel.DataAnnotations.Schema;

namespace HelloWord.Api.Models
{
    public class Channel
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
