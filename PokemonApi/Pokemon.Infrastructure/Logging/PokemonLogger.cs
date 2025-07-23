using Microsoft.Extensions.Logging;
using Pokemon.Core.Logging;

namespace Pokemon.Infrastructure.Logging
{
    public class PokemonLogger<T> : IPokemonLogger<T>
    {
        private readonly ILogger<T> _logger;

        public PokemonLogger(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<T>();
        }

        public void Warning(string message, params object[] args)
        {
            _logger.LogWarning(message, args);
        }

        public void Information(string message, params object[] args)
        {
            _logger.LogInformation(message, args);
        }

        public void Error(string message, params object[] args)
        {
            _logger.LogError(message, args);
        }
    }
    //public class PokemonLogger<T>(ILoggerFactory loggerFactory) : IPokemonLogger<T>
    //{
    //    private readonly ILogger<T> _logger = loggerFactory.CreateLogger<T>();

    //    public void Warning(string message, params object[] args)
    //    {
    //        _logger.LogWarning(message, args);
    //    }

    //    public void Information(string message, params object[] args)
    //    {
    //        _logger.LogInformation(message, args);
    //    }

    //    public void Error(string message, params object[] args)
    //    {
    //        _logger.LogError(message, args);
    //    }
    //}
}
