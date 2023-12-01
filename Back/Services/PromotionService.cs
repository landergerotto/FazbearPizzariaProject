using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Back.Services;

using System.Collections.Generic;
using Back.Model;
using Back.Services;
using DTO;

public class PromotionService : IPromotionService
{
    FreddyFazbearDbContext ctx;

    public PromotionService(FreddyFazbearDbContext ctx)
        => this.ctx = ctx;

    public async Task Create(PromotionData data)
    {
        Promocao promocao = new Promocao();

        promocao.ProdutoId = data.ProdutoID;
        promocao.Preco = data.Preco;

        this.ctx.Add(promocao);
        await this.ctx.SaveChangesAsync();
    }
    public async Task<List<Produto>> GetProdutos()
        => await this.ctx.Produtos.ToListAsync();
        
    public async Task<List<Promocao>> GetPromotions()
        => await this.ctx.Promocaos.ToListAsync();

    
}
