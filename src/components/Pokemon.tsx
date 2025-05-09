//react e next
import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";

//styles
import styles from "../styles/Pokemon.module.css";

//context
import { usePokemonContext } from "@/context/PokemonContext";

//types
import { PokemonType } from "@/types/types";

export const pokemonTypeColors: Record<PokemonType, string> = {
  fire: "#f08030", // Cor do tipo Fire (Laranja)
  grass: "#78c850", // Cor do tipo Grass (Verde)
  water: "#6890f0", // Cor do tipo Water (Azul)
  electric: "#f8d030", // Cor do tipo Electric (Amarelo)
  bug: "#a8b820", // Cor do tipo Bug (Verde-escuro)
  normal: "#a8a878", // Cor do tipo Normal (Bege)
  poison: "#a040a0", // Cor do tipo Poison (Roxo)
  ghost: "#705898", // Cor do tipo Ghost (Roxo escuro)
  fairy: "#ee99ac", // Cor do tipo Fairy (Rosa)
  psychic: "#f85888", // Cor do tipo Psychic (Rosa claro)
  fighting: "#c03028", // Cor do tipo Fighting (Vermelho)
  rock: "#b8a038", // Cor do tipo Rock (Amarelo-escuro)
  ice: "#98d8d8", // Cor do tipo Ice (Azul claro)
  dragon: "#7038f8", // Cor do tipo Dragon (Roxo-escuro)
  dark: "#705848", // Cor do tipo Dark (Marrom escuro)
  steel: "#b8b8d0", // Cor do tipo Steel (Cinza)
  flying: "#a890f0", // Cor do tipo Flying (Azul claro)
  ground: "#8a692b", // Cor do tipo Flying (Azul claro)
};

export default function Pokemon({
  setBackground,
}: {
  setBackground?: (value: string) => void;
}) {
  //states
  const { pokemon, setPokemon } = usePokemonContext();
  const [shinyNumber, setShinyNumber] = useState<number>();

  //gerencia o volume da música de fundo
  const audioRef = useRef<HTMLAudioElement>(null);

  const shinyChance = Math.floor(Math.random() * 6);

  useEffect(() => {
    setTimeout(() => {
      getPokemon();

      setShinyNumber(shinyChance);
    }, 500);

    //gerencia o volume da música de fundo
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  //cor dos tipos
  const typeColors = [
    pokemonTypeColors[pokemon?.types.type_1 as PokemonType],
    pokemonTypeColors[pokemon?.types.type_2 as PokemonType],
  ];

  //get dos pokemon
  const getPokemon = () => {
    let randint = Math.floor(Math.random() * 151);

    //raridade dos pokémon
    let num = randint === 0 ? 1 : randint;

    //get pokemon
    fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao acessar a API!");
        }

        return res.json();
      })
      .then((data) => {
        setPokemon({
          id: data.id,
          name: data.name,
          sprites: {
            default: {
              front: data.sprites.front_default,
              back: data.sprites.back_default,
            },

            shiny: {
              front: data.sprites.front_shiny,
              back: data.sprites.back_shiny,
            },
          },

          types: {
            type_1: data.types[0].type.name,
            type_2: data.types[1] ? data.types[1].type.name : null,
          },

          background:
            data.types[0].type.name === "water"
              ? "/background-beach.png"
              : "/background-florest.png",

          isShiny: shinyChance === 5 ? true : false,
        });

        setBackground?.(
          data.types[0].type.name === "water"
            ? "/background-beach.png"
            : "/background-florest.png"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.pokemon}>
      <span>
        {pokemon?.name}{" "}
        {shinyNumber === 5 ? (
          <Image
            src={"/assets/images/shiny-star.png"}
            width={16}
            height={16}
            alt="Shiny symbol to shiny pokémon's"
          />
        ) : (
          ""
        )}
      </span>

      <audio
        ref={audioRef}
        src={"/assets/musics/wildpokemon.mp3"}
        autoPlay
        loop
      />

      <Image
        src={
          shinyNumber === 5
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${pokemon?.id}.gif`
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon?.id}.gif`
        }
        alt={pokemon?.name + " image"}
        height={pokemon?.name ? 128 : 0}
        width={pokemon?.name ? 128 : 0}
        unoptimized
      />

      <div className={styles.types}>
        {pokemon?.types.type_2 ? (
          <>
            <div style={{ backgroundColor: typeColors[0] }}>
              {pokemon?.types.type_1}
            </div>
            <div style={{ backgroundColor: typeColors[1] }}>
              {pokemon?.types.type_2}
            </div>
          </>
        ) : (
          <div style={{ backgroundColor: typeColors[0] }}>
            {pokemon?.types.type_1}
          </div>
        )}
      </div>
    </div>
  );
}
