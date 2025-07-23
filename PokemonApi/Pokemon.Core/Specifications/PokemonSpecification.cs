using System;
using System.Linq.Expressions;
using Pokemon.Core.Entities.PokemonDb;

namespace Pokemon.Core.Specifications
{
    public sealed class PokemonSpecification : BaseSpecification<PokemonDbEntity>
    {
        public PokemonSpecification() : base(null)
        {
        }

        public PokemonSpecification(int id) : base(p => p.PokemonNumber == id)
        {
        }

        public PokemonSpecification(string query) : base(null)
        {
            var isNumeric = int.TryParse(query, out var id);
            query = query?.Trim().ToLower();

            Expression<Func<PokemonDbEntity, bool>> expression = x =>
                (string.IsNullOrEmpty(query)) ||
                (isNumeric && x.PokemonNumber == id) ||
                (!string.IsNullOrEmpty(query) && x.Name.ToLower().Contains(query));

            Criteria = expression;
        }

    }
}
