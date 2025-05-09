//types
import { Pokemon } from "@/types/types";

//styles
import styles from "../styles/Card.module.css";

//states / react and next
import Image from "next/image";

type CardProps = {
  pokemon: Pokemon;
  onClose: () => void;
};

export default function Card({ pokemon, onClose }: CardProps) {
  return (
    <div className={styles.card}>
      <button onClick={() => onClose()}>
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

      <h1>
        <span>id: {pokemon.id}</span> <span>{pokemon?.name}</span>
      </h1>

      <div className={styles.pokemon}>
        <div>
          <h2>Normal</h2>
          <Image
            src={pokemon?.sprites.default.front}
            width={130}
            height={130}
            alt={pokemon.name + " image"}
          />
          <Image
            src={pokemon?.sprites.default.back}
            width={150}
            height={130}
            alt={pokemon.name + " image"}
          />
        </div>
        <div>
          <h2>Shiny</h2>
          <Image
            src={pokemon?.sprites.shiny.front}
            width={130}
            height={130}
            alt={pokemon.name + " image"}
          />

          <Image
            src={pokemon?.sprites.shiny.back}
            width={130}
            height={130}
            alt={pokemon?.name + " image"}
          />
        </div>
      </div>
    </div>
  );
}
