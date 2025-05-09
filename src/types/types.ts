export type Pokemon = {
  id: number;
  name: string;
  sprites: {
    default: {
      front: string;
      back: string;
    };

    shiny: {
      front: string;
      back: string;
    };
  };

  types: {
    type_1: string;
    type_2: string | null;
  };

  background?: string;

  isShiny?: boolean;
};

export type PokemonType =
  | "fire"
  | "grass"
  | "water"
  | "electric"
  | "bug"
  | "normal"
  | "poison"
  | "ghost"
  | "fairy"
  | "psychic"
  | "fighting"
  | "rock"
  | "ice"
  | "dragon"
  | "dark"
  | "steel"
  | "flying"
  | "ground";
