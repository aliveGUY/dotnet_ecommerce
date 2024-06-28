using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
  public class ProductRepository(AppDbContext context) : IProductRepository
  {
    private readonly AppDbContext _context = context;
    public async Task<List<Product>> GetAllAsync()
    {
      return await _context.Products.ToListAsync();
    }
  }
}