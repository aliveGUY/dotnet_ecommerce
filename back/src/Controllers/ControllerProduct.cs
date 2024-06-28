using api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
  [Route("api/products")]
  [ApiController]
  public class ProductController(IProductRepository productRepo) : ControllerBase
  {
    private readonly IProductRepository _productRepo = productRepo;
    
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
      var product = await _productRepo.GetAllAsync();
      return Ok(product);
    }
  }
}