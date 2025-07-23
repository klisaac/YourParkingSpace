using System.Linq.Expressions;
using Pokemon.Core.Entities.PokemonDb;

namespace Pokemon.Application.Dto
{
    public class PokemonDto
    {
        public int Id { get; set; }
        public int? Height { get; set; }
        public string? Name { get; set; }
        public string? BackDefault { get; set; }
        public string? BackFemale { get; set; }
        public string? BackShiny { get; set; }
        public string? BackShinyFemale { get; set; }
        public string? FrontDefault { get; set; }
        public string? FrontFemale { get; set; }
        public string? FrontShiny { get; set; }
        public string? FrontShinyFemale { get; set; }

        public static Expression<Func<PokemonDbEntity, PokemonDto>> Projection
        {
            get
            {
                return x => new PokemonDto()
                {
                    Id = x.PokemonNumber,
                    Name = x.Name,
                    Height = x.Height,
                    BackDefault = x.Sprites.BackDefault,
                    BackFemale = x.Sprites.BackFemale,
                    BackShiny = x.Sprites.BackShiny,
                    BackShinyFemale = x.Sprites.BackShinyFemale,
                    FrontDefault = x.Sprites.FrontDefault,
                    FrontFemale = x.Sprites.FrontFemale,
                    FrontShiny = x.Sprites.FrontShiny,
                    FrontShinyFemale = x.Sprites.FrontShinyFemale,
                };
            }
        }

    }
}
