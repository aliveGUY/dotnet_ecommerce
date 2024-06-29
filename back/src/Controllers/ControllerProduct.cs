using api.Dtos.Product;
using api.Interfaces;
using api.Mappers;
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
      var productDto = product.Select(s => s.ToDto());
      return Ok(productDto);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      var product = await _productRepo.GetByIdAsync(id);

      if (null == product)
        return NotFound();

      return Ok(product.ToDto());
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProductDto productDto)
    {
      var productModel = productDto.ToModelFromCreate();
      await _productRepo.CreateAsync(productModel);
      return CreatedAtAction(nameof(GetById), new { id = productModel.Id }, productModel.ToDto());
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateProductDto productDto)
    {
      var productModel = productDto.ToModelFromUpdate();
      var product = await _productRepo.UpdateAsync(id, productModel);

      if (null == product)
        return NotFound();

      return Ok(product.ToDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
      var productModel = await _productRepo.DeleteAsync(id);

      if (null == productModel)
        return NotFound();

      return Ok(productModel);
    }
  }
}