using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using HelloWord.Api.Models;

namespace HelloWord.Api.Controllers
{
    public class ChannelsController : ApiController
    {
        private readonly DbContext dbContext = new DbContext();

        public IHttpActionResult Get()
        {
            var enrollments = dbContext.Channels.ToList();
            return Ok(enrollments);
        }
    }
}
