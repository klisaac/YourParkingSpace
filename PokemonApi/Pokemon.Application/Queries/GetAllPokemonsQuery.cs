using MediatR;
using Pokemon.Application.Responses;
using Pokemon.Core.Pagination;

namespace Pokemon.Application.Queries
{
    public class GetAllPokemonsQuery(string? query, LoadOptions? loadOptions) : IRequest<PagedResponse<PokemonResponse>>
    {
        public string? Query { get; set; } = query;
        public LoadOptions? LoadOptions { get; set; } = loadOptions;
    }
}
