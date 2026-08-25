using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PersonalApp.DataAccessLayer.Entities;

public partial class JobApplication
{
    [Key]
    public int ApplicationId { get; set; }

    public int UserId { get; set; }

    [StringLength(150)]
    public string CompanyName { get; set; } = null!;

    [StringLength(150)]
    public string JobTitle { get; set; } = null!;

    [StringLength(500)]
    public string? JobUrl { get; set; }

    public DateOnly AppliedDate { get; set; }

    [StringLength(30)]
    [Unicode(false)]
    public string Status { get; set; } = null!;

    [Column(TypeName = "decimal(12, 2)")]
    public decimal? Salary { get; set; }

    public DateTime? InterviewDate { get; set; }

    [StringLength(1000)]
    public string? Notes { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("JobApplications")]
    public virtual User User { get; set; } = null!;
}
