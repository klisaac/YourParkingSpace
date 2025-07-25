using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pokemon.Application.Commands;
using Pokemon.Application.Queries;
using Pokemon.Application.Response;
using Pokemon.Core.Pagination;

namespace Pokemon.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PokemonController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));

        [HttpGet("getAll")]
        [ProducesResponseType(typeof(PagedResponse<PokemonResponse>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<PagedResponse<PokemonResponse>>> GetAllAsync([FromQuery] string? query, [FromQuery] LoadOptions? loadOptions = null)
        {
            return Ok(await _mediator.Send(new GetAllPokemonsQuery(query, loadOptions)));
        }

        [HttpPost("loadDbFromExternalApi")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<bool>> PopulateDatabaseFromExternalApiAsync()
        {
            return Ok(await _mediator.Send(new CreatePokemonCommand()));
        }

    }
}
