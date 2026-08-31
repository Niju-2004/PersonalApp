using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PersonalApp.DataAccessLayer.Entities
{
    public partial class LearningLog
    {
        [Key]
        public int LogId { get; set; }

        public int LearningItemId { get; set; }

        public int UserId { get; set; }

        public DateTime LearnedDate { get; set; }

        [StringLength(255)]
        public string TopicCovered { get; set; } = null!;

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; }

        [ForeignKey("LearningItemId")]
        [InverseProperty("LearningLogs")]
        [JsonIgnore]
        public virtual LearningItem? LearningItem { get; set; }

        [ForeignKey("UserId")]
        [InverseProperty("LearningLogs")]
        [JsonIgnore]
        public virtual User? User { get; set; }
    }
}

