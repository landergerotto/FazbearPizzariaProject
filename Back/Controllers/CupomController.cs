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
[Route("cupom")]
public class CupomController : ControllerBase
{

    [HttpGet]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> GetCumpons(
        [FromServices]IProductService prodService)
    {
        var errors = new List<string>();

        if (errors.Count > 0)
            return BadRequest(errors);

        var list = await prodService.GetProdutos();

        return Ok( list );
    }

    [HttpPost("register")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Create(
        [FromBody]CupomData cup,
        [FromServices]ICupomService cupService)
    {
        var errors = new List<string>();
        if (cup is null || cup.Codigo is null || cup.Desconto == 0)
            errors.Add("É necessário informar um codigo.");

        if (errors.Count > 0)
            return BadRequest(errors);

        await cupService.Create(cup);
        return Ok();
    }

}