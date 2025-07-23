using Pokemon.Core.Entities.PokemonDb;

namespace Pokemon.Core.Specifications
{
    public class UserSpecification : BaseSpecification<UserDbEntity>
    {
        public UserSpecification() : base(null)
        {
        }
        public UserSpecification(string userName)
            : base(u => u.UserName == userName)
        {
        }

        public UserSpecification(int userId)
            : base(u => u.Id == userId)
        {
        }

    }
}
