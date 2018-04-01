using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tam_risk_project.Models;

namespace tam_risk_project.Controllers
{
    [Produces("application/json")]
    [Route("api/TbRRiskAssessments")]
    public class TbRRiskAssessmentsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbRRiskAssessmentsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbRRiskAssessments
        [HttpGet]
        public IEnumerable<TbRRiskAssessment> GetTbRRiskAssessment()
        {
            return _context.TbRRiskAssessment;
        }

        // GET: api/TbRRiskAssessments/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbRRiskAssessment([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbRRiskAssessment = await _context.TbRRiskAssessment.SingleOrDefaultAsync(m => m.YearActive == id);

            if (tbRRiskAssessment == null)
            {
                return NotFound();
            }

            return Ok(tbRRiskAssessment);
        }

        // PUT: api/TbRRiskAssessments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbRRiskAssessment([FromRoute] short id, [FromBody] TbRRiskAssessment tbRRiskAssessment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tbRRiskAssessment.YearActive)
            {
                return BadRequest();
            }

            _context.Entry(tbRRiskAssessment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbRRiskAssessmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TbRRiskAssessments
        [HttpPost]
        public async Task<IActionResult> PostTbRRiskAssessment([FromBody] TbRRiskAssessment tbRRiskAssessment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbRRiskAssessment.Add(tbRRiskAssessment);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbRRiskAssessmentExists(tbRRiskAssessment.YearActive))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbRRiskAssessment", new { id = tbRRiskAssessment.YearActive }, tbRRiskAssessment);
        }

        // DELETE: api/TbRRiskAssessments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbRRiskAssessment([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbRRiskAssessment = await _context.TbRRiskAssessment.SingleOrDefaultAsync(m => m.YearActive == id);
            if (tbRRiskAssessment == null)
            {
                return NotFound();
            }

            _context.TbRRiskAssessment.Remove(tbRRiskAssessment);
            await _context.SaveChangesAsync();

            return Ok(tbRRiskAssessment);
        }

        private bool TbRRiskAssessmentExists(short id)
        {
            return _context.TbRRiskAssessment.Any(e => e.YearActive == id);
        }
    }
}