using MediatR;
using Pokemon.Application.Dto;
using Pokemon.Application.Queries;
using Pokemon.Core.Pagination;
using Pokemon.Core.Repositories.PokemonDb;
using Pokemon.Core.Repositories.PokemonExternalApi;
using Pokemon.Core.Specifications;

namespace Pokemon.Application.Handlers
{
    public class GetAllPokemonQueryHandler(IPokemonRepository pokemonRepository, IPokemonApiRepository apiRepository)
        : IRequestHandler<GetAllPokemonsQuery, PagedResponse<PokemonDto>>
    {
        private readonly IPokemonRepository _pokemonRepository = pokemonRepository ?? throw new ArgumentNullException(nameof(pokemonRepository));

        public async Task<PagedResponse<PokemonDto>> Handle(GetAllPokemonsQuery request, CancellationToken cancellationToken)
        {
            var (count, queryItems) = await _pokemonRepository.GetAllPokemonAsync(new PokemonSpecification(request.Query), request.LoadOptions);

            var items = queryItems.Select(PokemonDto.Projection).ToList();
            return new PagedResponse<PokemonDto> { TotalResults = count, Results = items };
        }

    }
}
