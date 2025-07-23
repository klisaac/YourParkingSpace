namespace Pokemon.Application.Dto
{
    public class AuthenticationDto
    {
        public string BearerToken { get; set; }
        public string RefreshToken { get; set; }
    }
}