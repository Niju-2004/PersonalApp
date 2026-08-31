using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
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

    public DateTime? StartDate { get; set; }

    public DateTime? TargetDate { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string Status { get; set; } = "In Progress";

    [ForeignKey("UserId")]
    [InverseProperty("LearningItems")]
    [JsonIgnore]
    public virtual User? User { get; set; }

    [InverseProperty("LearningItem")]
    [JsonIgnore]
    public virtual ICollection<LearningLog> LearningLogs { get; set; } = new List<LearningLog>();
}

