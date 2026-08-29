using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PersonalApp.DataAccessLayer.Entities
{
    public partial class Saving
    {
        [Key]
        public int SavingsId { get; set; }

        public int UserId { get; set; }

        [StringLength(100)]
        public string BankName { get; set; } = null!;

        [StringLength(200)]
        public string Reason { get; set; } = null!;

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }

        public DateTime SavingsDate { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? TargetAmount { get; set; }

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; }

        [ForeignKey("UserId")]
        [InverseProperty("Savings")]
        [JsonIgnore]
        public virtual User? User { get; set; }
    }
}

