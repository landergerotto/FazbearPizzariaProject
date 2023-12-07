using System;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Back.Controllers;

using DTO;
using Back.Model;
using Services;
using Microsoft.Extensions.Logging.Abstractions;
using Trevisharp.Security.Jwt;

[ApiController]
[Route("order")]
public class OrderController : ControllerBase
{
    [HttpGet]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> GetAllOrders(

        [FromServices]IOrderService orderService)
    {
        var orders = await orderService.GetOrders();
        return Ok( orders );
    }

    [HttpPost("register")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Create(
        [FromBody]OrderData[] data,
        [FromServices]IOrderService orderService)
    {
        var errors = new List<string>();
        if (data is null || !data.Any())
            errors.Add("É necessário informar um Pedido.");

        if (errors.Count > 0)
            return BadRequest(errors);

        await orderService.CreateOrder(data);
        return Ok();
    }

    [HttpPut("status/prepared")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> AlterOrderStatus_Prep(
        [FromBody]OrderStatusData data,
        [FromServices]IOrderService orderService)
    {
        await orderService.PreparedOrder(data.PedidoId);
        return Ok( );
    }
    [HttpPut("status/done")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> AlterOrderStatus_Done(
        [FromBody]OrderStatusData data,
        [FromServices]IOrderService orderService)
    {
        await orderService.FinishOrder(data.PedidoId);
        return Ok( );
    }
    [HttpGet("chart1")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Chart1(
        [FromServices]IOrderService orderService)
    {
        var chart = await orderService.GetChart1();
        return Ok( chart );
    }
    [HttpGet("chart2")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Chart2(
        [FromServices]IOrderService orderService)
    {
        var chart = await orderService.GetChart2();
        return Ok( chart );
    }
}