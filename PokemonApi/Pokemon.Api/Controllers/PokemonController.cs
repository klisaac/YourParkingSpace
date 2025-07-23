using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pokemon.Application.Commands;
using Pokemon.Application.Dto;
using Pokemon.Application.Queries;
using Pokemon.Core.Pagination;

namespace Pokemon.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Authorize]
    public class PokemonController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));

        [HttpGet("getAll")]
        [ProducesResponseType(typeof(PagedResponse<PokemonDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<PagedResponse<PokemonDto>>> GetAllAsync([FromQuery] string? query, [FromQuery] LoadOptions? loadOptions = null)
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
