using System.Collections.Generic;

namespace Pokemon.Core.Entities.PokemonExternalApi
{
    public class PokemonApiEntity
    {
        public List<AbilityInfoApiEntity> Abilities { get; set; }
        public int Height { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public SpritesApiEntity Sprites { get; set; }
        public List<TypeInfoApiEntity> Types { get; set; }
        public int Weight { get; set; }
    }
}
