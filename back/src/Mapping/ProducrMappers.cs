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
        Policies = productModel.Policies,
        Price = productModel.Price,
        Characteristic = productModel.Characteristic,
        Images = productModel.Images
      };
    }

    public static Product ToModelFromCreate(this CreateProductDto productDto)
    {
      return new Product
      {
        Title = productDto.Title,
        Description = productDto.Description,
        Policies = productDto.Policies,
        Price = productDto.Price,
        Characteristic = productDto.Characteristic,
        Images = productDto.Images
      };
    }

    public static Product ToModelFromUpdate(this UpdateProductDto productDto)
    {
      return new Product
      {
        Title = productDto.Title,
        Description = productDto.Description,
        Policies = productDto.Policies,
        Price = productDto.Price,
        Characteristic = productDto.Characteristic,
        Images = productDto.Images
      };
    }
  }
}