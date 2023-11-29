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
[Route("product")]
public class ProductController : ControllerBase
{

    [HttpGet]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> GetProducts(
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
        [FromBody]ProductData prod,
        [FromServices]IProductService prodService)
    {
        var errors = new List<string>();
        if (prod is null || prod.Name is null)
            errors.Add("É necessário informar um login.");

        if (errors.Count > 0)
            return BadRequest(errors);

        await prodService.Create(prod);
        return Ok();
    }

    [HttpDelete]
    [EnableCors("DefaultPolicy")]
    public IActionResult DeleteUser()
    {
        throw new NotImplementedException();
    }

    [HttpGet("image")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> GetImage(
        int photoId,
        [FromServices]ISecurityService security,
        [FromServices]FreddyFazbearDbContext ctx)
    {
        var query =
            from image in ctx.Imagems
            where image.Id == photoId
            select image;
        
        var photo = await query.FirstOrDefaultAsync();
        if (photo is null)
            return NotFound();

        return File(photo.Foto, "image/jpeg");
    }

    [DisableRequestSizeLimit]
    [HttpPut("image")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> AddImage(
        [FromServices]ISecurityService security
    )
    {
        var jwtData = Request.Form["jwt"];
        var jwtObj = JsonSerializer
            .Deserialize<JwtToken>(jwtData);
        var jwt = jwtObj.jwt;

        var userOjb = await security
            .ValidateJwt<JwtPayload>(jwt);
        if (userOjb is null)
            return Unauthorized();
        var userId = userOjb.id;

        var files = Request.Form.Files;
        if (files is null || files.Count == 0)
            return BadRequest();
        
        var file = Request.Form.Files[0];
        if (file.Length < 1)
            return BadRequest();
 
        using MemoryStream ms = new MemoryStream();
        await file.CopyToAsync(ms);
        var data = ms.GetBuffer();

        Imagem img = new Imagem();
        img.Foto = data;

        FreddyFazbearDbContext ctx = new FreddyFazbearDbContext();
        ctx.Add(img);
        await ctx.SaveChangesAsync();
        
        var query =
            from user in ctx.Usuarios
            where user.Id == userId
            select user;
        var loggedUser = query.FirstOrDefault();
        loggedUser.ImagemId = img.Id;

        await ctx.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("image")]
    [EnableCors("DefaultPolicy")]
    public IActionResult RemoveImage()
    {
        throw new NotImplementedException();
    }
}