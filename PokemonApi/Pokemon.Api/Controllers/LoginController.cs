using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pokemon.Application.Queries;
using Pokemon.Application.Responses;

namespace Pokemon.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController(IMediator mediator) : ControllerBase
    {
        [HttpPost("authenticate")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AuthenticationResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<AuthenticationResponse>> Authenticate([FromBody] LoginUserQuery command)
        {
            var response = (await mediator.Send(command));

            if (response == null)
                return Unauthorized();

            return Ok(response);
        }
    }
}
