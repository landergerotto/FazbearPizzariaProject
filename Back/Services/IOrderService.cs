using System.Threading.Tasks;

namespace Back.Services;

using System.Collections.Generic;
using DTO;
using Model;

public interface IOrderService
{
    Task CreateOrder(OrderData[] data);
    Task CancelOrder(int order_id);
    Task AddItem (int order_id, OrderData data);
    Task PreparedOrder (int order_id);
    Task FinishOrder (int order_id);

}