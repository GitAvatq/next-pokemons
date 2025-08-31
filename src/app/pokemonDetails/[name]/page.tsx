"use client"
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import catchImg from "@/public/pokeball-catch-btn.png";
import gotchaAfterModal from "@/public/gotcha-pokemon.png";
import openImg from "@/public/open_pokeball-btn.png"
import releaseAfterModal from "@/public/released-img.png";
import styles from "./pokemonDetails.module.css"
import { usePokemonDetails } from '@/src/hooks/usePokemonDetails';
import CatchModal from '@/src/shared/ui/CatchModal';
import { MdEdit } from "react-icons/md";
import ErrorMessage from '@/src/components/layout/header/ErrorMessage';
import { usePokemonCollection } from '@/src/store/PokemonStoreCollection';


const page = () => {
    const { name } = useParams()
    const router = useRouter()
    const [moveItemsLength, setMoveItemsLength] = useState(3);
    const [isCatchModal, setIsCatchModal] = useState(false);
    const [isReleaseModal, setIsReleaseModal] = useState(false)
    const [isCatchedPokemon, setIsCatchedPokemon] = useState(false)
    const [isShowEditInpt, setIsShowEditInpt] = useState(false)

    const { collection, addPokemon, releasePokemon } = usePokemonCollection()
    const { pokemonDetails, detailsLoading, detailsError } = usePokemonDetails(name)
    console.log(pokemonDetails);

    const removePokemonFromCollection = () => {
        setIsReleaseModal(true)
        releasePokemon(pokemonDetails?.name)
    }

    const addPokemonToCollection = () => {
        setIsCatchModal(true)
        if (!pokemonDetails) return
        const exist = collection.some((p) => p.name === pokemonDetails?.name)
        if (!exist) {
            addPokemon(pokemonDetails)
        } else {
            setIsCatchedPokemon(true)
        }
    }

    const catchModalClose = () => {
        setIsCatchModal(false)
        setIsCatchedPokemon(true)
    }
    const releaseModalClose = () => {
        router.push('/')
        setIsReleaseModal(false)
        setIsCatchedPokemon(false)
    }

    useEffect(() => {
        if (detailsError) {
            <ErrorMessage error={detailsError} />
        }
    }, [])

    let catchWord = "CATCH"
    let relaseWord = "RELEASE"
    return (
        <>
            {detailsLoading ? <center className={styles.center} style={{ paddingTop: 100 }}>
                <Image src={catchImg} alt='catch pokemon img' />
            </center> : <div className={styles.details}>
                <div className="container">
                    <>
                        {isCatchModal &&
                            <CatchModal
                                title={"SUCCESSFUL!"}
                                alt={"gotcha pokemon img"}
                                src={gotchaAfterModal}
                                closeModal={catchModalClose}
                            />
                        }
                        {isReleaseModal &&
                            <CatchModal
                                title={"RELEASED!"}
                                alt={"release pokemon img"}
                                src={releaseAfterModal}
                                closeModal={releaseModalClose}
                            />
                        }
                        {
                            <div className={styles.column}>
                                {
                                    isCatchedPokemon ?
                                        <div className={styles.catchBall}
                                            onClick={removePokemonFromCollection}>
                                            <Image src={openImg} alt='release pokemon img' />
                                            <h3>{relaseWord}</h3>
                                        </div>
                                        :
                                        <div className={styles.catchBall}
                                            onClick={addPokemonToCollection}>
                                            <Image src={catchImg} alt='catch pokemon img' />
                                            <h3>{catchWord}</h3>
                                        </div>
                                }

                                <div className={styles.columPokemonMain}>
                                    <Image className={styles.pokemonImage}
                                        src={pokemonDetails?.sprites?.front_default}
                                        width={200} height={100}
                                        alt='catch pokemon img' />
                                    {
                                        isCatchedPokemon
                                            ? <div className={styles.catchedNameInputBlock}>
                                                {isShowEditInpt ? <input type="text" placeholder={pokemonDetails?.name} />
                                                    : <h1>{pokemonDetails?.name}</h1>
                                                }
                                                <button onClick={() => setIsShowEditInpt((prev) => !prev)} className={styles.editBtn}>
                                                    <MdEdit />
                                                </button>
                                            </div>
                                            : <h1>{pokemonDetails?.name}</h1>
                                    }
                                </div>
                                <div className={styles.columnSec}>
                                    <h2>Abilities: </h2>
                                    <div className={styles.abilities}>
                                        {pokemonDetails?.abilities?.map((a: any, idx: number) => {
                                            return (
                                                <p key={idx} style={{ marginBottom: 30 }}>{a.ability?.name}</p>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className={styles.columnThird}>
                                    <h2>Moves:</h2>
                                    <div className={styles.columnThirdItems}>
                                        {pokemonDetails?.moves?.slice(0, moveItemsLength).map((m: any) => (
                                            <p key={m.move?.name}>{m.move?.name}</p>
                                        ))}
                                        <button
                                            onClick={() => setMoveItemsLength((prev) => prev + 3)}>
                                            More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                </div>
            </div>}
        </>
    );
};

export default page;