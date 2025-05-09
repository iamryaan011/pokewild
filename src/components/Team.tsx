//context
import { usePokemonContext } from "@/context/PokemonContext";

//styles
import styles from "../styles/Team.module.css";

//react e next
import Image from "next/image";

export default function Team() {
  const { team } = usePokemonContext();

  return (
    <div className={styles.team}>
      {team?.map((pokemon, key) => (
        <div key={key}>
          {pokemon.isShiny && (
            <Image
              src={"/assets/images/shiny-star.png"}
              width={12}
              height={12}
              alt="Shiny symbol to shiny pokémon's"
              className={styles.shinysymbol}
              style={{marginTop: "-12px"}}
            />
          )}

          <Image
            src={
              !pokemon.isShiny
                ? pokemon.sprites.default.front
                : pokemon.sprites.shiny.front
            }
            width={32}
            height={32}
            alt="Pokémon Image"
          />
        </div>
      ))}
    </div>
  );
}
