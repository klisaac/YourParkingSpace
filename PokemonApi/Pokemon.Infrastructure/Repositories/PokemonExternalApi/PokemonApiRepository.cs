using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Pokemon.Core.Configuration;
using Pokemon.Core.Entities.PokemonExternalApi;
using Pokemon.Core.Logging;
using Pokemon.Core.Repositories.PokemonExternalApi;

namespace Pokemon.Infrastructure.Repositories.PokemonExternalApi
{
    public class PokemonApiRepository(
        IHttpClientFactory httpClientFactory,
        IPokemonLogger<PokemonApiRepository> logger,
        IOptions<PokemonApiSettings> apiSettings)
        : IPokemonApiRepository
    {
        private readonly IHttpClientFactory _httpClientFactory = httpClientFactory ?? throw new ArgumentNullException(nameof(httpClientFactory));
        private readonly IPokemonLogger<PokemonApiRepository> _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        private readonly PokemonApiSettings _apiSettings = apiSettings.Value ?? throw new ArgumentNullException(nameof(apiSettings));

        public async Task<PokemonApiEntity?> GetPokemonDataAsync()
        {
            try
            {
                using var httpClient = _httpClientFactory.CreateClient();
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
                var response = await httpClient.GetAsync($"{_apiSettings.ApiBaseUrl}{_apiSettings.ApiEndpoint}");

                if (response.IsSuccessStatusCode)
                {
                    _logger.Information(
                        $"{nameof(PokemonApiRepository)}.{nameof(GetPokemonDataAsync)} Pokemon data from Api. | Response: {response.Content.ReadAsStringAsync()}");
                    return JsonConvert.DeserializeObject<PokemonApiEntity>(response.Content.ReadAsStringAsync().Result);
                }
                else
                {
                    _logger.Error(
                        $"{nameof(PokemonApiRepository)}.{nameof(GetPokemonDataAsync)} Failed to get Pokemon data from Api. | Response: {response.Content.ReadAsStringAsync()}");
                }
            }
            catch (Exception e)
            {
                _logger.Error($"{nameof(PokemonApiRepository)}.{nameof(GetPokemonDataAsync)} {e.Message} | {e.StackTrace}");
            }

            return null;
        }
    }
}
