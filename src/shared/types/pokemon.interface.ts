export interface IPokemon {
  sprites?: any;
  id?: any;
  name: string;
  url: string;
  stats?: any;
  types?: any;
}

export interface Pokemon {
  sprites?: {
    front_default?: string;
  };
  name?: string;
}

export interface IPokemonCollection {
  collection: IPokemon[];
  addPokemon: (pokemon: IPokemon) => void;
  releasePokemon: (id: string) => void;
}
