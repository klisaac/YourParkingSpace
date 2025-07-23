using MediatR;
using Pokemon.Application.Dto;
using Pokemon.Core.Pagination;

namespace Pokemon.Application.Queries
{
    public class GetAllPokemonsQuery(string? query, LoadOptions? loadOptions) : IRequest<PagedResponse<PokemonDto>>
    {
        public string? Query { get; set; } = query;
        public LoadOptions? LoadOptions { get; set; } = loadOptions;
    }
}
