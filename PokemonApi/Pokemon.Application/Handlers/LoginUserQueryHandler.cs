using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using Pokemon.Application.Queries;
using Pokemon.Application.Responses;
using Pokemon.Core.Configuration;
using Pokemon.Core.Helpers;
using Pokemon.Core.Logging;
using Pokemon.Core.Repositories.PokemonDb;
using Pokemon.Core.Specifications;

namespace Pokemon.Application.Handlers
{
    public class LoginUserQueryHandler(IBaseRepository baseRepository, IPokemonLogger<LoginUserQueryHandler> logger)
        : IRequestHandler<LoginUserQuery, AuthenticationResponse?>
    {
        private readonly IBaseRepository _baseRepository = baseRepository ?? throw new ArgumentNullException(nameof(baseRepository));
        private readonly IPokemonLogger<LoginUserQueryHandler> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

        public async Task<AuthenticationResponse?> Handle(LoginUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _baseRepository.GetSingleAsync(new UserSpecification(request.UserName));

            // check if username exists and the password is correct
            if ((user == null) || (!PasswordHelper.VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt)))
            {
                _logger.Error($"Incorrect Username or password");
                return null;
            }
            else
            {
                return new AuthenticationResponse() { BearerToken = GenerateJwtTokenAsync(request.UserName) };
            }
        }

        private string GenerateJwtTokenAsync(string userName)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("YPS-PokemonDefault1234567890@PokemonDefault1234567890");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity([
                    new Claim(JwtRegisteredClaimNames.Sub, userName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.UniqueName, userName),
                    new Claim("display_name", userName),
                    new Claim("user_name", userName),
                    new Claim(ClaimTypes.Name, userName),
                    new Claim(ClaimTypes.Role, Role.Admin)
                ]),
                IssuedAt = DateTime.Now,
                NotBefore = DateTime.Now,
                Expires = DateTime.Now.AddDays(1),
                Issuer = "www.yps-pokemon.com",
                Audience = "everyone",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            logger.Information($"User {userName} authenticated.");
            return tokenHandler.WriteToken(token);
        }
    }
}
