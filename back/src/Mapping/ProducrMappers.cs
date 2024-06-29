using api.Dtos.Product;
using api.Models;

namespace api.Mappers
{
  public static class ProductMappers
  {
    public static ProductDto ToDto(this Product productModel)
    {
      return new ProductDto
      {
        Id = productModel.Id,
        Title = productModel.Title,
        Description = productModel.Description,
        Price = productModel.Price,
        Characteristic = productModel.Characteristic,
      };
    }

    public static Product ToModelFromCreate(this CreateProductDto productDto)
    {
      return new Product
      {
        Title = productDto.Title,
        Description = productDto.Description,
        Price = productDto.Price,
        Characteristic = productDto.Characteristic
      };
    }

    public static Product ToModelFromUpdate(this UpdateProductDto productDto)
    {
      return new Product
      {
        Title = productDto.Title,
        Description = productDto.Description,
        Price = productDto.Price,
        Characteristic = productDto.Characteristic
      };
    }
  }
}