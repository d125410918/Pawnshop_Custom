
using Microsoft.AspNetCore.Mvc;
using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoanCasesController : ControllerBase
{
    private static readonly List<LoanCase> Cases = new();

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(Cases);
    }

    [HttpPost]
    public IActionResult Create(LoanCase model)
    {
        var age = DateTime.Today.Year - model.Birthday.Year;

        if (model.Birthday.Date > DateTime.Today.AddYears(-age))
        {
            age--;
        }

        if (age < 18)
        {
            return BadRequest("未滿18歲");
        }

        model.Id = Cases.Count + 1;

        Cases.Add(model);

        return Ok(new
        {
            success = true,
            caseId = model.Id
        });
    }
}
