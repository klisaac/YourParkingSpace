namespace Pokemon.Core.Entities.PokemonDb
{
    public class UserDbEntity : BaseEntity
    {
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
