using System.Net;
using System.Net.Mime;
using Microsoft.Data.SqlClient;
using Pokemon.Core.Logging;

namespace Pokemon.Api.Middlewares
{
    public class CustomExceptionMiddleware(RequestDelegate next)
    {
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception exception)
            {
                await HandleExceptionAsync(context, exception);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var statusCode = HttpStatusCode.InternalServerError;
            var logger = context.RequestServices.GetRequiredService<IPokemonLogger<Program>>();

            switch (exception)
            {
                case ArgumentNullException argNullException:
                    logger.Error($"Argument null: {argNullException.Message}");
                    break;
                case SqlException sqlException:
                    logger.Error($"Database Exception: {sqlException.Message}");
                    break;
                default:
                    logger.Error($"{nameof(exception)}: {exception.Message} | {exception.StackTrace}");
                    break;
            }

            context.Response.ContentType = MediaTypeNames.Application.Json;
            context.Response.StatusCode = (int)statusCode;

            return context.Response.WriteAsync(statusCode.ToString());
        }
    }

    public static class CustomExceptionHandlerMiddlewareExtensions
    {
        public static IApplicationBuilder UseCustomExceptionMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CustomExceptionMiddleware>();
        }
    }
}
