using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
  public class ProductRepository(AppDbContext context) : IProductRepository
  {
    private readonly AppDbContext _context = context;

    public async Task<Product> CreateAsync(Product productModel)
    {
      await _context.Products.AddAsync(productModel);
      await _context.SaveChangesAsync();
      return productModel;
    }

    public async Task<Product?> DeleteAsync(int id)
    {
      var productModel = await _context.Products.FirstOrDefaultAsync(x => id == x.Id);

      if (null == productModel)
        return null;

      _context.Products.Remove(productModel);
      await _context.SaveChangesAsync();
      return productModel;
    }

    public async Task<List<Product>> GetAllAsync()
    {
      return await _context.Products.ToListAsync();
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
      return await _context.Products.FindAsync(id);
    }

    public async Task<Product?> UpdateAsync(int id, Product productModel)
    {
      var existingProduct = await _context.Products.FindAsync(id);

      if (null == existingProduct)
        return null;

      existingProduct.Title = productModel.Title;
      existingProduct.Description = productModel.Description;
      existingProduct.Price = productModel.Price;
      existingProduct.Characteristic = productModel.Characteristic;

      await _context.SaveChangesAsync();
      return existingProduct;
    }
  }
}