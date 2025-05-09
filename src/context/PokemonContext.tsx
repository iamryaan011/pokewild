//context
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";

//types
import { Pokemon } from "@/types/types";

type PokemonContextType = {
  pokemon: Pokemon | undefined;
  setPokemon: (p: Pokemon) => void;

  team: Pokemon[] | null;
  setTeam: React.Dispatch<React.SetStateAction<Pokemon[]>>

  username: string | undefined;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>
};

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const usePokemonContext = () => {
    const context = useContext(PokemonContext);

    if(!context) {
        throw new Error("usePokemonContext deve ser usado dentro de um PokemonProvider");
    }
    
    return context;
}

export default function PokemonProvider({ children }: { children: ReactNode }) {
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
  const [team, setTeam] = useState<Pokemon[] | []>([])
  const [username, setUsername] = useState<string | undefined>()

  useEffect(() => {
    const storedTeam = sessionStorage.getItem("team");
    if (storedTeam) {
      try {
        setTeam(JSON.parse(storedTeam));
      } catch (error) {
        console.error("Erro ao carregar time do sessionStorage:", error);
      }
    }
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemon, setPokemon, team, setTeam, username, setUsername }}>
      {children}
    </PokemonContext.Provider>
  );
}
