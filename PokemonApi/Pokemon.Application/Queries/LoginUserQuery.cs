using MediatR;
using Pokemon.Application.Response;

namespace Pokemon.Application.Queries
{
    public class LoginUserQuery : IRequest<AuthenticationResponse?>
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
