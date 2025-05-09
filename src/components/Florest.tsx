import { useState, useEffect } from "react";

//styles
import styles from "../styles/Florest.module.css";

//components
import Header from "./Header";
import Pokemon from "./Pokemon";
import Pokeball from "./Pokeball";

export default function Florest() {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [session, setSession] = useState<boolean>(false);

  //define o background
  const [background, setBackground] = useState<string>();

  //verifica o session storage quando inicia a página
  useEffect(() => {
    const userSession = sessionStorage.getItem("usuário");

    if (userSession) {
      setSession(true);
      setUsername(userSession);
    } else {
      setSession(false);
    }
  }, []);

  const getUsername = () => {
    let input = document.querySelector(
      "input[type='text']"
    ) as HTMLInputElement | null;

    if (input) {
      //verifica se o nome de usuário é válido e insere no session storage
      if (input.value.length > 0 && input.value.length <= 10) {
        const newUsername = input.value;
        setUsername(newUsername);

        //session
        sessionStorage.setItem("usuário", newUsername);
        setSession(true);
      } else if (input.value.length > 10) {
        alert("Nome de usuário muito extenso!");
      } else {
        alert("Nome de usuário inválido!");
      }
    }
  };

  return (
    <>
      <div style={session ? { display: "none" } : { display: "flex" }}>
        <div className={styles.early_game_modal}>
          <label htmlFor="name">Nome de Usuário:</label>
          <input type="text" name="name" id="name" />
          <button onClick={getUsername}>Iniciar</button>
        </div>
      </div>

      <div
        className={styles.container}
        style={
          background
            ? { background: `url(assets/${background}) center/cover no-repeat` }
            : undefined
        }
      >
        {session ? (
          <>
            <Header user={username} />

            <Pokemon setBackground={setBackground} />
            <Pokeball />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
