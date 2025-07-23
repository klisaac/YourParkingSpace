using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pokemon.Core.Entities.PokemonDb
{
    public class PokemonDbEntity : BaseEntity
    {
        public int PokemonNumber { get; set; }
        public int? Height { get; set; }
        public string Name { get; set; }
        [ForeignKey(nameof(Sprites))]
        public int? SpriteId { get; set; }
        public virtual SpriteDbEntity Sprites { get; set; }
        public int? Weight { get; set; }
        public virtual ICollection<AbilityInfoDbEntity> Abilities { get; set; }
        public virtual ICollection<TypeInfoDbEntity> Types { get; set; }
    }
}
