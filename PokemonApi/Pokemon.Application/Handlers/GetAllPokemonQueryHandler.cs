using MediatR;
using Pokemon.Application.Queries;
using Pokemon.Application.Responses;
using Pokemon.Core.Pagination;
using Pokemon.Core.Repositories.PokemonDb;
using Pokemon.Core.Repositories.PokemonExternalApi;
using Pokemon.Core.Specifications;

namespace Pokemon.Application.Handlers
{
    public class GetAllPokemonQueryHandler(IPokemonRepository pokemonRepository, IPokemonApiRepository apiRepository)
        : IRequestHandler<GetAllPokemonsQuery, PagedResponse<PokemonResponse>>
    {
        private readonly IPokemonRepository _pokemonRepository = pokemonRepository ?? throw new ArgumentNullException(nameof(pokemonRepository));

        public async Task<PagedResponse<PokemonResponse>> Handle(GetAllPokemonsQuery request, CancellationToken cancellationToken)
        {
            var (count, queryItems) = await _pokemonRepository.GetAllPokemonAsync(new PokemonSpecification(request.Query), request.LoadOptions);

            var items = queryItems.Select(PokemonResponse.Projection).ToList();
            return new PagedResponse<PokemonResponse> { TotalResults = count, Results = items };
        }

    }
}
