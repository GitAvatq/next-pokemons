import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { usePokemon } from "../store/PokemonStore";

export const usePokemonList = () => {
  const { pokemons, setPokemons } = usePokemon();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=1000"
      );
      return res.data;
    },
    select: (data) => data.results,
  });

  useEffect(() => {
    if (data) {
      setPokemons(data);
    }
  }, [data]);

  return { pokemonList: data, listLoading: isLoading, listError: isError };
};
