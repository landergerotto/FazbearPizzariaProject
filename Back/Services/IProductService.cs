using System.Threading.Tasks;

namespace Back.Services;

using System.Collections.Generic;
using DTO;
using Model;

public interface IProductService
{
    Task Create(ProductData data);
    Task<List<Produto>> GetProdutos();
    Task<Produto> GetByName(string name);
}