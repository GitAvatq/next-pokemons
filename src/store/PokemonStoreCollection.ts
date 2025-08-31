import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IPokemonCollection } from "../shared/types/pokemon.interface";

export const usePokemonCollection = create<IPokemonCollection>()(
  persist(
    (set, get) => ({
      collection: [],
      addPokemon: (pokemon) =>
        set((state) => {
          const alreadyExists = state.collection.some(
            (p) => p.name === pokemon.name
          );
          if (alreadyExists) {
            return state;
          }

          return {
            collection: [...state.collection, pokemon],
          };
        }),
      releasePokemon: (name) =>
        set((state) => ({
          collection: state.collection.filter((n) => n.name !== name),
        })),
    }),
    {
      name: "pokemon-collection",
    }
  )
);
