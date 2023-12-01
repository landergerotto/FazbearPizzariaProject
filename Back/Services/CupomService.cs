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
    public async Task<Cupom> GetCupom(CupomData cupom) 
    {
        var query =
            from c in this.ctx.Cupoms
            where c.Codigo == cupom.Codigo
            select c;
        
        return await query.FirstOrDefaultAsync();
    }
}
