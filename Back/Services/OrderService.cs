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
        var last_order = order_list[^1];
        
        foreach (var item in data)
            await AddItem(last_order.Id, item);
        

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

    public async Task<List<KitchenData>> GetOrders()
    {

        var query777777 =
            from ped in this.ctx.Pedidos
            join prodPed in this.ctx.ProdutosPedidos
                on ped.Id equals prodPed.PedidoId
            join prod in this.ctx.Produtos
                on prodPed.ProdutoId equals prod.Id
            select new
            {
                OrderId = ped.Id,
                ProdName = prod.Nome,
                Quantidade = prodPed.Quantidade,
                Pronto = ped.Preparado,
                ped.Entregue
            };

        var a = await query777777.ToListAsync();

        var orders = 
            from peds in a
            group peds by peds.OrderId into grouped
            select new {
                OrderId = grouped.Key,
            };

        var c = orders.ToList();

        List<KitchenData> list = new();

        foreach (var item in c)
        {
            var query = 
                from member in a
                where member.OrderId == item.OrderId
                select new {
                    Nome = member.ProdName,
                    Quantidade = member.Quantidade,
                    Pronto = member.Pronto,
                    Entregue = member.Entregue
                };

            var b = query.ToList();
            string[] Nomes = b.Select(x=>x.Nome).ToArray();
            int[] qtds = b.Select(x=>x.Quantidade).ToArray();

            KitchenData kd = new()
            {
                OrderID = item.OrderId,
                ProductName = Nomes,
                Quantity = qtds,
                Pronto = b[0].Pronto,
                Entregue = b[0].Entregue

            };
            list.Add(kd);
        }


        return list;
    }

    public async Task<ChartData1> GetChart1()
    {
        var query = from pedido in this.ctx.Pedidos
            join produtosPedidos in this.ctx.ProdutosPedidos on pedido.Id equals produtosPedidos.PedidoId
            join produto in this.ctx.Produtos on produtosPedidos.ProdutoId equals produto.Id into produtosGroup
            from produto in produtosGroup.DefaultIfEmpty()
            group produtosPedidos by new { produto.Nome } into produtoGroup
            select new 
            {
                Data1 = produtoGroup.Key.Nome,
                Data2 = produtoGroup.Sum(x => x.Quantidade)
            };

        var list = await query.ToListAsync();

        string[] products = list.Select(x => x.Data1).ToArray();
        int[] quantity = list.Select(x => x.Data2).ToArray();

        if (products is null || quantity is null)
            return null;

        ChartData1 cd1 = new() 
        {
            X_label = products,
            Y_label = quantity
        };

        return cd1;
    }

    public async Task<ChartData2> GetChart2()
    {
        var query = 
            from pedido in this.ctx.Pedidos
            select new {
                pedido.Id,
                pedido.PrecoTotal
            }; 

        var list = await query.ToListAsync();

        int[] orders = list.Select(x => x.Id).ToArray();
        double?[] value = list.Select(x => x.PrecoTotal).ToArray();

        if (orders is null || value is null)
            return null;

        ChartData2 cd2 = new() 
        {
            X_label = orders,
            Y_label = value
        };

        return cd2;
    }
}