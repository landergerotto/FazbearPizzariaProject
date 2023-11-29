using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Back.Services;

using Back.Model;
using Back.Services;
using DTO;

public class ProductService : IProductService
{
    FreddyFazbearDbContext ctx;

    public ProductService(FreddyFazbearDbContext ctx)
        => this.ctx = ctx;

    public async Task Create(ProductData data)
    {
        Produto produto = new Produto();

        produto.Nome = data.Name;
        produto.Tipo = data.Type;
        // produto.Preco = data.Price;
        produto.Descricao = data.Description;

        this.ctx.Add(produto);
        await this.ctx.SaveChangesAsync();
    }

    public async Task<Produto> GetByName(string name)
    {
        var query =
            from p in this.ctx.Produtos
            where p.Nome == name
            select p;
        
        return await query.FirstOrDefaultAsync();
    }
}
