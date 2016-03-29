using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using HelloWord.Api.Models;

namespace HelloWord.Api.Controllers
{
    public class EnrollmentsController : ApiController
    {
        private readonly DbContext dbContext = new DbContext();

        public async Task<IHttpActionResult> Post(Enrollment data)
        {
            try
            {
                dbContext.Enrollments.Add(data);
                await dbContext.SaveChangesAsync();
                return CreatedAtRoute("DefaultApi", new { controller = "Enrollments", id = data.Id }, data);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        public IHttpActionResult Get(int id)
        {
            var enrollment = dbContext.Enrollments.Find(id);
            if (enrollment == null)
            {
                return NotFound();
            }
            return Ok(enrollment);
        }

        public IHttpActionResult Get()
        {
            var enrollments = dbContext.Enrollments.ToList();
            return Ok(enrollments);
        }
    }
}
