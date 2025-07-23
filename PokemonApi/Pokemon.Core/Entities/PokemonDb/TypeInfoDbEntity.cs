
using System.ComponentModel.DataAnnotations.Schema;

namespace Pokemon.Core.Entities.PokemonDb
{
    public class TypeInfoDbEntity : BaseEntity
    {
        public int? Slot { get; set; }
        [ForeignKey(nameof(NamedApiResource))]
        public int? NamedApiResourceId { get; set; }
        public NamedApiResourceDbEntity NamedApiResource { get; set; }
        [ForeignKey(nameof(Pokemon))]
        public int? PokemonId { get; set; }
        public virtual PokemonDbEntity Pokemon { get; set; }

    }
}
