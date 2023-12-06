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

}