
namespace Pokemon.Core.Logging
{
    public interface IPokemonLogger<T>
    {
        void Information(string message, params object[] args);
        void Warning(string message, params object[] args);
        void Error(string message, params object[] args);
    }
}
