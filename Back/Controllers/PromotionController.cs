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
[Route("promotion")]
public class PromotionController : ControllerBase
{

    [HttpGet]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> GetPromotions(
        [FromServices]IPromotionService promService)
    {
        var errors = new List<string>();

        if (errors.Count > 0)
            return BadRequest(errors);

        var list = await promService.GetPromotions();

        return Ok( list );
    }

    [HttpPost("register")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Create(
        [FromBody]PromotionData prom,
        [FromServices]IPromotionService promService)
    {
        var errors = new List<string>();
        if (prom is null || prom.ProdutoID == 0)
            errors.Add("É necessário informar um produto correto.");

        if (errors.Count > 0)
            return BadRequest(errors);

        await promService.Create(prom);
        return Ok();
    }

}