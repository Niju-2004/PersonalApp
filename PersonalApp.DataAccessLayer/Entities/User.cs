using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace PersonalApp.DataAccessLayer.Entities;

[Index("Email", Name = "UQ__Users__A9D1053454D82A77", IsUnique = true)]
public partial class User
{
    [Key]
    public int UserId { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    [StringLength(150)]
    public string Email { get; set; } = null!;

    [StringLength(255)]
    public string Password { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    [InverseProperty("User")]
    [JsonIgnore]
    public virtual ICollection<ExpenseCategory> ExpenseCategories { get; set; } = new List<ExpenseCategory>();

    [InverseProperty("User")]
    [JsonIgnore]
    public virtual ICollection<Expense> Expenses { get; set; } = new List<Expense>();

    [InverseProperty("User")]
    [JsonIgnore]
    public virtual ICollection<Goal> Goals { get; set; } = new List<Goal>();

    [InverseProperty("User")]
    [JsonIgnore]
    public virtual ICollection<JobApplication> JobApplications { get; set; } = new List<JobApplication>();

    [InverseProperty("User")]
    [JsonIgnore]
    public virtual ICollection<LearningItem> LearningItems { get; set; } = new List<LearningItem>();

    [InverseProperty("User")]
    [JsonIgnore]
    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
