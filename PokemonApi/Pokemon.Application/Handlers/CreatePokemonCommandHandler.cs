using MediatR;
using Pokemon.Application.Commands;
using Pokemon.Core.Entities.PokemonDb;
using Pokemon.Core.Entities.PokemonExternalApi;
using Pokemon.Core.Repositories.PokemonDb;
using Pokemon.Core.Repositories.PokemonExternalApi;

namespace Pokemon.Application.Handlers
{
    public class CreatePokemonCommandHandler(IBaseRepository baseRepository, IPokemonApiRepository apiRepository)
        : IRequestHandler<CreatePokemonCommand, bool>
    {
        private readonly IBaseRepository _baseRepository = baseRepository ?? throw new ArgumentNullException(nameof(baseRepository));
        private readonly IPokemonApiRepository _apiRepository = apiRepository ?? throw new ArgumentNullException(nameof(apiRepository));

        public async Task<bool> Handle(CreatePokemonCommand request, CancellationToken cancellationToken)
        {
            if (!_baseRepository.GetAll<PokemonDbEntity>().Any())
            {
                var pokemonApiData = await _apiRepository.GetPokemonDataAsync();

                if (pokemonApiData != null)
                {
                    await InsertNamedApiResourcesAsync(pokemonApiData);
                    await InsertSpriteAsync(pokemonApiData);
                    await InsertPokemonDbEntityAsync(pokemonApiData);
                    await InsertAbilityInfoDAsync(pokemonApiData);
                    await InsertTypeInfoAsync(pokemonApiData);
                    return true;
                }
            }

            return false;
        }

        private async Task InsertNamedApiResourcesAsync(PokemonApiEntity entity)
        {
            var namedApiResources = new List<NamedApiResourceDbEntity>();
            entity.Abilities.ForEach(x =>
            {
                namedApiResources.Add(new NamedApiResourceDbEntity()
                {
                    Name = x.Ability.Name,
                    Url = x.Ability.Url,
                });
            });

            await _baseRepository.AddRangeAsync(namedApiResources.DistinctBy(x => x.Name).ToList());
        }

        private async Task InsertSpriteAsync(PokemonApiEntity entity)
        {

            var spriteDbEntity = new SpriteDbEntity()
            {
                BackDefault = entity.Sprites.BackDefault,
                BackFemale = entity.Sprites.BackFemale,
                BackShiny = entity.Sprites.BackShiny,
                BackShinyFemale = entity.Sprites.BackShinyFemale,
                FrontDefault = entity.Sprites.FrontDefault,
                FrontFemale = entity.Sprites.FrontFemale,
                FrontShiny = entity.Sprites.FrontShiny,
                FrontShinyFemale = entity.Sprites.FrontShinyFemale
            };

            await _baseRepository.AddAsync(spriteDbEntity);
        }

        private async Task InsertAbilityInfoDAsync(PokemonApiEntity entity)
        {
            var abilityInfoDbEntities = new List<AbilityInfoDbEntity>();
            entity.Abilities.ForEach(x =>
            {
                abilityInfoDbEntities.Add(new AbilityInfoDbEntity()
                {
                    NamedApiResourceId = _baseRepository.GetAll<NamedApiResourceDbEntity>().FirstOrDefault(y => y.Name.ToLower() == x.Ability.Name.ToLower())?.Id,
                    PokemonId = _baseRepository.GetAll<PokemonDbEntity>().FirstOrDefault(y => y.PokemonNumber == entity.Id)?.Id,
                    IsHidden = x.IsHidden,
                    Slot = x.Slot
                });
            });

            await _baseRepository.AddRangeAsync(abilityInfoDbEntities);
        }

        private async Task InsertTypeInfoAsync(PokemonApiEntity entity)
        {
            var typeInfoDbEntities = new List<TypeInfoDbEntity>();
            entity.Types.ForEach(x =>
            {
                typeInfoDbEntities.Add(new TypeInfoDbEntity()
                {
                    NamedApiResourceId = _baseRepository.GetAll<NamedApiResourceDbEntity>().FirstOrDefault(y => y.Name.ToLower() == x.Type.Name.ToLower())?.Id,
                    PokemonId = _baseRepository.GetAll<PokemonDbEntity>().FirstOrDefault(y => y.PokemonNumber == entity.Id)?.Id,
                    Slot = x.Slot
                });
            });

            await _baseRepository.AddRangeAsync(typeInfoDbEntities);
        }

        private async Task InsertPokemonDbEntityAsync(PokemonApiEntity entity)
        {
            var pokemonDbEntity = new PokemonDbEntity()
            {
                PokemonNumber = entity.Id,
                Name = entity.Name,
                Height = entity.Height,
                Weight = entity.Weight,
                SpriteId = _baseRepository.GetAll<SpriteDbEntity>().FirstOrDefault()?.Id,
            };
            await _baseRepository.AddAsync(pokemonDbEntity);
        }
    }
}