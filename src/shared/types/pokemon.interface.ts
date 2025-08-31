export interface IPokemon {
  sprites?: any;
  id?: any;
  name: string;
  url: string;
  stats?: any;
  types?: any;
}

export interface IPokemonCollection {
  collection: IPokemon[];
  addPokemon: (pokemon: IPokemon) => void;
  releasePokemon: (id: string) => void;
}
