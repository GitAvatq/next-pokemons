import { create } from "zustand";
import { IPokemon } from "../shared/types/pokemon.interface";

interface PokemonState {
  pokemons: IPokemon[];
  setPokemons: (data: IPokemon[]) => void;
}

export const usePokemon = create<PokemonState>((set) => ({
  pokemons: [],
  setPokemons: (data) => set({ pokemons: data }),
}));
