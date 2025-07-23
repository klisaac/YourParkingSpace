using System.Linq;
using System.Threading.Tasks;
using Pokemon.Core.Entities.PokemonDb;
using Pokemon.Core.Specifications;
using LoadOptions = Pokemon.Core.Pagination.LoadOptions;

namespace Pokemon.Core.Repositories.PokemonDb
{
    public interface IPokemonRepository : IBaseRepository
    {
        Task<(int, IOrderedQueryable<PokemonDbEntity>)> GetAllPokemonAsync(PokemonSpecification specification, LoadOptions loadOptions);
    }
}
