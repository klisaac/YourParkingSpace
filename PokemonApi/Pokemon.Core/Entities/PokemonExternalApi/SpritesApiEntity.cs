using Newtonsoft.Json;


namespace Pokemon.Core.Entities.PokemonExternalApi
{
    [JsonObject(MemberSerialization.OptIn)]
    public class SpritesApiEntity
    {
        [JsonProperty(PropertyName = "back_default")]
        public string BackDefault { get; set; }
        [JsonProperty(PropertyName = "back_female")]
        public string BackFemale { get; set; }
        [JsonProperty(PropertyName = "back_shiny")]
        public string BackShiny { get; set; }
        [JsonProperty(PropertyName = "back_shiny_female")]
        public string BackShinyFemale { get; set; }
        [JsonProperty(PropertyName = "front_default")]
        public string FrontDefault { get; set; }
        [JsonProperty(PropertyName = "front_female")]
        public string FrontFemale { get; set; }
        [JsonProperty(PropertyName = "front_shiny")]
        public string FrontShiny { get; set; }
        [JsonProperty(PropertyName = "front_shiny_female")]
        public string FrontShinyFemale { get; set; }
    }
}
