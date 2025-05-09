import { useEffect } from "react";

//styles
import styles from "../styles/Modal.module.css";

//context
import { usePokemonContext } from "@/context/PokemonContext";

//types
type ModalProps = {
  visible: boolean;
  onClose?: () => void;
  pokeball?: string;
};

export default function Modal({ visible, onClose, pokeball }: ModalProps) {
  const { pokemon, team, setTeam } = usePokemonContext();

  if (!visible) return null;

  //carrega o time salvo no sessionStorage ao montar o componente
  useEffect(() => {
    const storedTeam = sessionStorage.getItem("team");

    if (storedTeam) {
      try {
        setTeam(JSON.parse(storedTeam));
      } catch (e) {
        console.error("Erro ao carregar o time do sessionStorage:", e);
      }
    }
  }, [setTeam]);

  //função de captura
  const handleCapture = () => {
    if (!pokemon) return;

    const chance = Math.floor(Math.random() * 100);

    const captureRate: Record<string, number> = {
      pokeball: 20,
      greatball: 35,
      ultraball: 50,
      masterball: 100,
    };

    const pokeCapitalize = pokemon.name.replace(/^./, pokemon.name[0].toUpperCase());

    if (pokeball && captureRate[pokeball] >= chance) {
      if (team && team.length < 6) {
        const updatedTeam = [...team, pokemon];

        setTeam(updatedTeam);
        sessionStorage.setItem("team", JSON.stringify(updatedTeam));

        alert(pokeCapitalize + " capturado!");
        window.location.reload();
      } else {
        alert("Seu time já tem 6 pokémon! Você optou por libertar " + pokeCapitalize + ".");
        alert("Caso queira jogar novamente, feche e abra o navegador ;)")
      }
    } else {
      alert(pokeCapitalize + " fugiu da pokebola!");
    }
  };

  return (
    <div
      className={styles.modal}
      id="modal"
      style={{ display: visible ? "flex" : "none" }}
    >
      <p>Deseja lançar a Pokebola ?</p>

      <div className={styles.buttons}>
        <button onClick={handleCapture}>Sim</button>
        <button onClick={onClose}>Não</button>
      </div>
    </div>
  );
}
