using MediatR;
using Pokemon.Application.Dto;

namespace Pokemon.Application.Queries
{
    public class LoginUserQuery : IRequest<AuthenticationDto?>
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
