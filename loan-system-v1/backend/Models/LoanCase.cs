
namespace Backend.Models;

public class LoanCase
{
    public int Id { get; set; }

    public string Name { get; set; } = "";

    public DateTime Birthday { get; set; }

    public string Phone { get; set; } = "";

    public string? LineId { get; set; }

    public string HousingType { get; set; } = "";

    public string JobType { get; set; } = "";

    public string JobYears { get; set; } = "";

    public decimal Salary { get; set; }

    public decimal LoanAmount { get; set; }

    public string LoanPurpose { get; set; } = "";

    public string Debts { get; set; } = "";

    public string Status { get; set; } = "待聯絡";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
