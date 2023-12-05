using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Back.Services;

using System;
using System.Collections.Generic;
using Back.Model;
using Back.Services;
using DTO;

public class OrderService : IOrderService
{
    FreddyFazbearDbContext ctx;
    private int last_order;
    public OrderService(FreddyFazbearDbContext ctx)
        => this.ctx = ctx;
    public async Task CreateOrder(OrderData[] data)
    {
        var order = new Pedido();

        order.Preparado = false;
        order.Entregue = false;
        order.PrecoTotal = data[0].PrecoTotal;

        this.ctx.Add(order);
        await this.ctx.SaveChangesAsync();

        var orders = 
            from orderL in this.ctx.Pedidos
            select order;

        var order_list = await orders.ToListAsync();
        this.last_order = order_list.Count();

        foreach (var item in data)
        {
            
        }

    }

    public async Task CancelOrder(int order_id)
    {
        var order = await getOrder(order_id);
        if (order is null)
            throw new Exception ("Order does not exist");

        this.ctx.Remove(order);
        await this.ctx.SaveChangesAsync();
    }

    public async Task AddItem(int order_id, OrderData data)
    {
        var order = await getOrder(order_id);
        if (order is null)
            throw new Exception("Order does not exist.");

        var order_item = new ProdutosPedido();

        var products =
            from product in this.ctx.Produtos
            where product.Id == data.ProdutoId
            select product;

        var selectedProduct = await products.FirstOrDefaultAsync();
        if (selectedProduct is null)
            throw new Exception("Product does not exist.");

        order_item.PedidoId = order_id;
        order_item.ProdutoId = data.ProdutoId;
        order_item.Quantidade = data.Quantidade;

        this.ctx.Add(order_item);
        await this.ctx.SaveChangesAsync();
    }

    public async Task PreparedOrder(int order_id)
    {
        var order = await getOrder(order_id);
        if (order is null)
            throw new Exception ("Order does not exist");
        
        order.Preparado = true;

        this.ctx.Update(order);
        await this.ctx.SaveChangesAsync();
    }

    public async Task FinishOrder(int order_id)
    {
        var order = await getOrder(order_id);
        if (order is null)
            throw new Exception ("Order does not exist");
        
        order.Entregue = true;

        this.ctx.Update(order);
        await this.ctx.SaveChangesAsync();
    }

    private async Task<Pedido> getOrder(int order_id)
    {
        var orders = 
            from order in this.ctx.Pedidos
            where order.Id == order_id
            select order;

        return await orders.FirstOrDefaultAsync();
    }
}