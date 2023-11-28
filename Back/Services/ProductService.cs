using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Back.Services;

using Back.Model;
using Back.Services;
using DTO;
using Model;

public class ProductService : IProductService
{
    FreddyFazbearDbContext ctx;

    public ProductService(FreddyFazbearDbContext ctx)
    {
        this.ctx = ctx;

    }

    public Task Create(ProductData data)
    {
        throw new System.NotImplementedException();
    }

    public Task<Produto> GetByName(string name)
    {
        throw new System.NotImplementedException();
    }
}
