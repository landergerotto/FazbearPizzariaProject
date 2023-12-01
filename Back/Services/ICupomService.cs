using System.Threading.Tasks;

namespace Back.Services;

using System.Collections.Generic;
using DTO;
using Model;

public interface ICupomService
{
    Task Create(CupomData data);
    Task<Cupom> GetCupom(CupomData cupom);

}