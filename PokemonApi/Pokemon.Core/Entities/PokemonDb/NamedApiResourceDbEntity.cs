namespace Pokemon.Core.Entities.PokemonDb
{
    public class NamedApiResourceDbEntity : BaseEntity
    {
        public string Name { get; set; }
        public string Url { get; set; }
    }
}
