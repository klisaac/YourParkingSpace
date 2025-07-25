namespace Pokemon.Application.Responses
{
    public class AuthenticationResponse
    {
        public string BearerToken { get; set; }
        public string RefreshToken { get; set; }
    }
}