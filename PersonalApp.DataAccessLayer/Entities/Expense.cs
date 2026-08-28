using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PersonalApp.DataAccessLayer.Entities;

public partial class Expense
{
    [Key]
    public int ExpenseId { get; set; }

    public int UserId { get; set; }

    public int CategoryId { get; set; }

    [Column(TypeName = "decimal(12, 2)")]
    public decimal Amount { get; set; }

    [StringLength(300)]
    public string? Description { get; set; }

    public DateOnly ExpenseDate { get; set; }

    public DateTime CreatedAt { get; set; }

    [ForeignKey("CategoryId")]
    [InverseProperty("Expenses")]
    public virtual ExpenseCategory Category { get; set; } = null!;

    [ForeignKey("UserId")]
    [InverseProperty("Expenses")]
    public virtual User? User { get; set; } = null!;
}
