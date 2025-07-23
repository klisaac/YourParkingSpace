#nullable enable
namespace Pokemon.Core.Entities.PokemonDb
{
    public class SpriteDbEntity : BaseEntity
    {
        public string? BackDefault { get; set; }
        public string? BackFemale { get; set; }
        public string? BackShiny { get; set; }
        public string? BackShinyFemale { get; set; }
        public string? FrontDefault { get; set; }
        public string? FrontFemale { get; set; }
        public string? FrontShiny { get; set; }
        public string? FrontShinyFemale { get; set; }

    }
}
