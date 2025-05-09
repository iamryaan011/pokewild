import { useEffect, useState } from "react";
import Image from "next/image";

//styles
import styles from "../styles/Pokeball.module.css";

//components
import Modal from "./Modal";

export default function Pokeball() {
  const pokeballArray: string[] = [
    "pokeball",
    "greatball",
    "ultraball",
    "masterball",
  ];

  const [key, setKey] = useState<number>(0);
  const [pokeball, setPokeball] = useState<string>(pokeballArray[0]);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  useEffect(() => {
    setPokeball(pokeballArray[key]);
  }, [key]);

  return (
    <>
      <div className={styles.pokeball}>
        <Image
          src={"/assets/images/arrow-left.png"}
          width={40}
          height={40}
          alt="Arrow left to trade pokeball"
          onClick={() =>
            setKey(
              (prevKey) =>
                (prevKey - 1 + pokeballArray.length) % pokeballArray.length
            )
          }
        />
        
        <Image
          src={`/assets/images/${pokeball}.png`}
          width={150}
          height={100}
          alt={pokeball + " image"}
          onClick={() => {
            setModalVisibility(true);
          }}
          priority
        />

        <Image
          src={"/assets/images/arrow-right.png"}
          width={40}
          height={40}
          alt="Arrow right to trade pokeball"
          onClick={() =>
            setKey((prevKey) => (prevKey + 1) % pokeballArray.length)
          }
        />
      </div>

      {modalVisibility ? (
        <Modal
          visible={modalVisibility}
          onClose={() => setModalVisibility(false)}
          pokeball={pokeball}
        />
      ) : (
        ""
      )}
    </>
  );
}
