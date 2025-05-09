//styles
import styles from "../styles/Header.module.css";

//states
import { useState } from "react";

//components
import Pokedex from "./Pokedex";
import Image from "next/image";
import Team from "./Team";

type HeaderProps = {
  user?: string;
};

export default function Header({ user }: HeaderProps) {
  const [showPokedex, setShowPokedex] = useState<boolean>(false);
  const [showTeam, setShowTeam] = useState<boolean>(false);

  return (
    <>
      <header className={styles.header}>
        <div>
          <span>{!user ? "Usuário" : user}</span>

          <button onClick={() => showTeam ? setShowTeam(false) : setShowTeam(true)}>meu time</button>
        </div>

        <button>
          <Image
            src={"/assets/images/pokedex.png"}
            alt="Pokedex Image"
            width={70}
            height={40}
            onClick={() => setShowPokedex(true)}
          />
          pokédex
        </button>
      </header>

      {showTeam ? <Team/> : null}
      {showPokedex ? <Pokedex setShowPokedex={setShowPokedex}/> : null}
    </>
  );
}
