using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PersonalApp.DataAccessLayer.Entities;

public partial class LearningItem
{
    [Key]
    public int LearningItemId { get; set; }

    public int UserId { get; set; }

    [StringLength(150)]
    public string Name { get; set; } = null!;

    [StringLength(50)]
    public string? Category { get; set; }

    public int Progress { get; set; }

    public DateOnly? StartDate { get; set; }

    public DateOnly? TargetDate { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string Status { get; set; } = null!;

    [ForeignKey("UserId")]
    [InverseProperty("LearningItems")]
    public virtual User? User { get; set; } = null!;
}
