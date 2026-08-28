using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace PersonalApp.DataAccessLayer.Entities;

public partial class Task
{
    [Key]
    public int TaskId { get; set; }

    public int UserId { get; set; }

    [StringLength(200)]
    public string Title { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string Priority { get; set; } = null!;

    [StringLength(20)]
    [Unicode(false)]
    public string Status { get; set; } = null!;

    public DateOnly? DueDate { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? CompletedAt { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("Tasks")]
    [JsonIgnore]
    public virtual User? User { get; set; } = null!;
}
