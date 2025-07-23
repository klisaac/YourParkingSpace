
namespace Pokemon.Core.Entities.PokemonExternalApi
{
    public class AbilityInfoApiEntity
    {
        public NamedApiResourceApiEntity Ability { get; set; }
        public bool IsHidden { get; set; }
        public int Slot { get; set; }
    }
}
