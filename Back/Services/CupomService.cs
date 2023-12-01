using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Back.Services;

using System.Collections.Generic;
using Back.Model;
using Back.Services;
using DTO;

public class CupomService : ICupomService
{
    FreddyFazbearDbContext ctx;

    public CupomService(FreddyFazbearDbContext ctx)
        => this.ctx = ctx;

    public async Task Create(CupomData data)
    {
        Cupom cupom = new Cupom();

        cupom.Codigo = data.Codigo;
        cupom.Desconto = data.Desconto;

        this.ctx.Add(cupom);
        await this.ctx.SaveChangesAsync();
    }
    public async Task<List<Produto>> GetProdutos()
        => await this.ctx.Produtos.ToListAsync();

    public Task<List<Produto>> GetCupons()
    {
        throw new System.NotImplementedException();
    }
}
