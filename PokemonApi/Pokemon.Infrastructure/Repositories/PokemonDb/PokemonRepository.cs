using Microsoft.EntityFrameworkCore;
using Pokemon.Core.Entities.PokemonDb;
using Pokemon.Core.Helpers;
using Pokemon.Core.Repositories.PokemonDb;
using Pokemon.Core.Specifications;
using Pokemon.Infrastructure.Data;
using LoadOptions = Pokemon.Core.Pagination.LoadOptions;

namespace Pokemon.Infrastructure.Repositories.PokemonDb
{
    public class PokemonRepository(PokemonDbContext dbContext) : BaseRepository(dbContext), IPokemonRepository
    {
        private readonly LoadOptionsHelper<PokemonDbEntity> _loadOptionsHelper = new();

        public async Task<(int, IOrderedQueryable<PokemonDbEntity>)> GetAllPokemonAsync(PokemonSpecification specification, LoadOptions loadOptions)
        {
            var queryable = GetAll<PokemonDbEntity>(specification);

            var total = await queryable.CountAsync();

            queryable = _loadOptionsHelper.SortEntities(loadOptions, queryable);
            queryable = _loadOptionsHelper.PaginateEntities(loadOptions, queryable);

            return ((int, IOrderedQueryable<PokemonDbEntity>))(total, queryable);
        }
    }
}
