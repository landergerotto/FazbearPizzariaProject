using System.Threading.Tasks;

namespace Back.Services;

using System.Collections.Generic;
using DTO;
using Model;

public interface IPromotionService
{
    Task Create(PromotionData data);
    Task<List<PromoProdData>> GetPromotions();

}