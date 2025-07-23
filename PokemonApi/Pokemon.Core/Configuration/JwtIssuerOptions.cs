
namespace Pokemon.Core.Configuration
{
    public class JwtIssuerOptions
    {
        public string Issuer { get; set; }
        public string SigningKey { get; set; }
        public string Audience { get; set; }
    }
}