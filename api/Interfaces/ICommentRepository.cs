using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface ICommentRepository
    {
        Task<Comment?> GetByIdAsync(int id);
        Task<Comment> CreateAsync(Comment commentModel);
        Task<Comment?> DeleteAsync(int id);
        Task<Comment?> UpdateAsync(int id, Comment commentModel);
        Task<List<Comment>> GetAllAsync(CommentQueryObject queryObject);


    }
}