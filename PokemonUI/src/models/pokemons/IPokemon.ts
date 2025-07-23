export interface IPokemons {
  totalResults: number;
  totalCustomResults: number;
  results: IPokemon[];
}

export interface IPokemon {
  id: number;
  name: string;
  height: number;
  backDefault: string;
  backShiny: string;
  frontDefault: string;
  frontShiny: string;
}