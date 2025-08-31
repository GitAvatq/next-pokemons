import React from 'react';
import styles from "./PokemonCard.module.css"
import Link from 'next/link';
import { IPokemon } from '../types/pokemon.interface';
import Image from 'next/image';

interface PokemonCardProps {
    pokemon: IPokemon
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
    return (
        <Link className={styles.link} href={`/pokemonDetails/${pokemon.name}`}>
            <div className={styles.card}>
                <h3>{pokemon.name}</h3>
                <span>Move to Pokemon</span>
            </div>
        </Link>
    );
};

export default PokemonCard;