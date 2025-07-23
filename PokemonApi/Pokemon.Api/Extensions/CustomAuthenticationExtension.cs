using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace Pokemon.Api.Extensions
{
    /// <summary>
    /// 
    /// </summary>
    public static class CustomAuthenticationExtension
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public static IServiceCollection AddCustomAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
           .AddJwtBearer(x =>
           {
               x.Events = new JwtBearerEvents
               {
                   OnTokenValidated = context =>
                   {
                       //var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
                       //if (!userService.IsValidUser(context.Principal.Identity.Name))
                       if (string.IsNullOrEmpty(context.Principal?.Identity?.Name))
                       {
                           // return unauthorized if user no longer exists
                           context.Fail("Unauthorized");
                       }
                       return Task.CompletedTask;
                   }
               };
               x.RequireHttpsMetadata = false;
               x.SaveToken = true;
               x.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuerSigningKey = true,
                   ValidateIssuer = true,
                   ValidateAudience = true,
                   ValidateActor = false,
                   ValidateLifetime = true,
                   ValidIssuer = "www.yps-pokemon.com",
                   ValidAudience = "everyone",
                   IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("YPS-PokemonDefault1234567890@PokemonDefault1234567890"))
               };
           });
            return services;
        }
    }
}