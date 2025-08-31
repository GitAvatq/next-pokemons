"use client"

import { usePokemon } from '@/src/store/PokemonStore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import styles from "./main.module.css"
import PokemonCard from '@/src/shared/ui/PokemonCard';
import { usePokemonList } from '@/src/hooks/usePokemonList';
import catchImg from "@/public/pokeball-catch-btn.png";
import Image from 'next/image';

const page = () => {
    const { pokemons } = usePokemon()
    const { listError, listLoading } = usePokemonList()

    if (listLoading) {
        return (
            <center className={styles.center} style={{ paddingTop: 100 }}>
                <Image src={catchImg} alt='catch pokemon img' />
            </center>
        )
    }

    return (
        <div>
            <div className="container">
                <div className={styles.pokemons}>
                    {pokemons.map((pokemon, idx) => (
                        <PokemonCard key={idx} pokemon={pokemon} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default page;