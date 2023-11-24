using Microsoft.AspNetCore.Mvc;

using DTO;

namespace Back.Controllers;
[ApiController]
[Route("user")]
public class UserController : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody]UserData user)
    {
        return Ok();
    }
}