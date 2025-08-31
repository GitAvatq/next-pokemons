import React, { useState } from 'react';
import styles from "./PokemonModel.module.css"
import openImg from "@/public/open_pokeball-btn.png"
import Image from 'next/image';
import Link from 'next/link';
import { usePokemonCollection } from '@/src/store/PokemonStoreCollection';
import releaseAfterModal from "@/public/released-img.png";
import CatchModal from './CatchModal';

const PokemonModel = ({ pokemon }: any) => {
    const [isReleaseModal, setIsReleaseModal] = useState(false)
    const { releasePokemon } = usePokemonCollection()

    const removePokemonFromCollection = () => {
        releasePokemon(pokemon?.name)
        document.body.style.overflow = "hidden";
    }
    return (
        <>
            {isReleaseModal &&
                <CatchModal
                    title={"RELEASED!"}
                    alt={"release pokemon img"}
                    src={releaseAfterModal}
                    closeModal={removePokemonFromCollection}
                />
            }
            <div className={styles.pokemonModel}>
                <Link href={`/pokemonDetails/${pokemon?.name}`}>
                    <div className={styles.pokemonLink}>
                        <Image className={styles.pokemonImage}
                            src={pokemon?.sprites?.front_default}
                            width={200} height={100}
                            alt='catch pokemon img' />
                        <h3>{pokemon.name}</h3>
                    </div>
                </Link>
                <div className={styles.pokemonTitle}>
                    <button onClick={() => setIsReleaseModal(true)}>
                        <Image src={openImg} alt='release pokemon img' />
                        <span>RELEASE</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default PokemonModel;