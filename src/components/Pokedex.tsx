//react e next
import { useEffect, useState } from "react";
import Image from "next/image";

//biblioteca
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

//styles
import styles from "../styles/Pokedex.module.css";

//types
import { Pokemon, PokemonType } from "@/types/types";

//type colors
import { pokemonTypeColors } from "./Pokemon";
import Card from "./Card";

export default function Pokedex({
  setShowPokedex,
}: {
  setShowPokedex: (value: boolean) => void;
}) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    getAllPokemon();
  }, []);

  const getAllPokemon = () => {
    for (let index = 1; index < 152; index++) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao acessar a API!");
          return res.json();
        })
        .then((value) => {
          const newPokemon: Pokemon = {
            id: value.id,
            name: value.name,
            sprites: {
              default: {
                front: value.sprites.front_default,
                back: value.sprites.back_default,
              },
              shiny: {
                front: value.sprites.front_shiny,
                back: value.sprites.back_shiny,
              },
            },
            types: {
              type_1: value.types[0].type.name,
              type_2: value.types[1] ? value.types[1].type.name : null,
            },
          };

          setPokemon((prev) => [...prev, newPokemon]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <div className={styles.pokedex}>
        <button onClick={() => setShowPokedex(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>

        {pokemon.length > 0 ? (
          pokemon.map((poke) => {
            const typeColors = [
              pokemonTypeColors[poke.types.type_1 as PokemonType],
              poke.types.type_2
                ? pokemonTypeColors[poke.types.type_2 as PokemonType]
                : undefined,
            ];

            return (
              <div key={poke.id} className={styles.pokemon}>
                <Image
                  src={poke.sprites.default.front}
                  width={80}
                  height={80}
                  alt={poke.name + " image"}
                  onClick={() => setSelectedPokemon(poke)}
                />

                <div className={styles.types}>
                  {poke.types.type_2 ? (
                    <>
                      <span style={{ backgroundColor: typeColors[0] }}>
                        {poke.types.type_1}
                      </span>
                      <span style={{ backgroundColor: typeColors[1] }}>
                        {poke.types.type_2}
                      </span>
                    </>
                  ) : (
                    <span style={{ backgroundColor: typeColors[0] }}>
                      {poke.types.type_1}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <DotLottieReact
            src="https://lottie.host/b033cedc-8b4c-4b6f-b0e4-5d9dc5ea266a/IMYLftn0eF.lottie"
            width={50}
            height={50}
            loop
            autoplay
          />
        )}
      </div>

      {selectedPokemon && (
        <Card
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </>
  );
}
