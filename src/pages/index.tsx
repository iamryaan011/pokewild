// next/react components
import Head from "next/head";

// components
import Florest from "@/components/Florest";
import PokemonProvider from "@/context/PokemonContext";

export default function Home() {
  return (
    <>
      <Head>
        <title>PokeWild - Os Pokémon esperam por você!</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          href="/assets/favicon/favicon.ico"
          type="image/x-icon"
        />
      </Head>

      <PokemonProvider>
        <Florest />
      </PokemonProvider>
    </>
  );
}
