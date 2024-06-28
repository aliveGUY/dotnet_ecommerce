using api.Models;

namespace api.Interfaces
{
  public interface IProductRepository
  {
    Task<List<Product>> GetAllAsync();
  }
}