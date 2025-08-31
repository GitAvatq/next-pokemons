"use client"

import React, { useEffect } from 'react';
import styles from "./collection.module.css"
import { usePokemonCollection } from '@/src/store/PokemonStoreCollection';
import catchImg from "@/public/pokeball-catch-btn.png";
import PokemonModel from '@/src/shared/ui/PokemonModel';
import Image from 'next/image';

const page = () => {
    const { collection } = usePokemonCollection()
    return (
        <>
            <div className={styles.collectionWrapper}>
                {collection.length ? (
                    <div className={"collections"}>
                        <div className="container">
                            <div className={styles.collection}>
                                {collection.map((pokemon) => (
                                    <PokemonModel key={pokemon.name} pokemon={pokemon} />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <center className={styles.center} style={{ paddingTop: 100 }}>
                        <Image src={catchImg} alt='catch pokemon img' />
                        <h1>You have no Pokemons yet!</h1>
                    </center>
                )}
            </div>
        </>

    );
};

export default page;