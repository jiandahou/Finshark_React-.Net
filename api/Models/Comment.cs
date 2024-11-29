using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Comments")]
    public class Comment
    {
        public int? StockId {get;set;}
        public Stock Stock { get; set; }
        public int Id { get; set; }
        public String Title { get; set; }=String.Empty;
        public string  Content { get; set; }=String.Empty;
        public DateTime CreatedOn { get; set; }= DateTime.Now;
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}