using System.Threading.Tasks;
using Pokemon.Core.Entities.PokemonExternalApi;

namespace Pokemon.Core.Repositories.PokemonExternalApi
{
    public interface IPokemonApiRepository
    {
        Task<PokemonApiEntity> GetPokemonDataAsync();
    }
}
