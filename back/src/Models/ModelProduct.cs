namespace api.Models
{
  public class Product
  {
    public int Id { get; set; }
    public int Price { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Policies { get; set; } = string.Empty;
    public Dictionary<string, string>? Characteristic { get; set; }
    public List<string>? Images { get; set; } = [];
  }
}