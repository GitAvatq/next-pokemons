import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const usePokemonDetails = (name?: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      return res;
    },
    select: (data) => data.data,
  });
  return {
    pokemonDetails: data,
    detailsLoading: isLoading,
    detailsError: isError,
  };
};
