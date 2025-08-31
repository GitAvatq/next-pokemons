"use client"
import React, { useEffect, useState } from 'react';
import styles from "./arena.module.css"
import { usePokemonCollection } from '@/src/store/PokemonStoreCollection';
import Image from 'next/image';
import vs from "@/public/vs-battle.webp";
import bgPhone from "@/public/battle-bg-phone.jpg"
import CatchModal from '@/src/shared/ui/CatchModal';
import { Pokemon } from '@/src/shared/types/pokemon.interface';

const page = () => {
    const [selectIndex, setSelectIndex] = useState<number>(0);
    const [selectedIndexSec, setSelectIndexSec] = useState<number>(1)
    const [changePositions, setChangePositions] = useState(false)
    const [isShowStartVs, setIsShowStartVs] = useState(false)
    const [resultBattlePokemon, setResultBattlePokemon] = useState<Pokemon>({})
    const [isBattleStart, setIsBattleStart] = useState(false)
    const [pokemonFights, setPokemonFights] = useState(false)
    const [isWinnerModal, setWinnerModal] = useState(false)
    const [winnerMessage, setWinnerMessage] = useState("")
    const { collection } = usePokemonCollection()

    const playSoundStartBattle = () => {
        const audio = new Audio("/sounds/battle-start-mortal-kombat.mp3")
        audio.play()
    }
    const playBattleProccessSound = () => {
        const audio = new Audio("/sounds/battle-poccess-sound-mk.mp3");
        audio.play()
    }
    const hanldeSelectPokemonTeam = (e: any) => {
        const selected = e.target
        setSelectIndex(selected.selectedIndex)
    }
    const hanldeSelectPokemonOpponent = (e: any) => {
        const selected = e.target
        setSelectIndexSec(selected.selectedIndex)
    }
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    const battleStart = async () => {
        setChangePositions(true)
        setIsBattleStart(true)
        setIsShowStartVs(true)

        await delay(500)
        playSoundStartBattle()

        await delay(3000)
        playBattleProccessSound()
        setIsShowStartVs(false)
        setPokemonFights(true)


        await delay(16_000);
        setChangePositions(false)
        setIsBattleStart(false)
        setIsShowStartVs(false)
        setPokemonFights(false)
        findOutWinner()
    }
    console.log(winnerMessage);

    let ourPokemon = collection[selectIndex]
    let opponentPokemon = collection[selectedIndexSec]

    function findOutWinner() {
        let res = ourPokemon.stats?.reduce((acc: any, el: any, idx: any) => {
            if (ourPokemon.stats[idx].base_stat > opponentPokemon.stats[idx].base_stat) {
                acc.team++;
            } else {
                acc.opponent++;
            }
            if (ourPokemon.types.length > opponentPokemon.types.length) {
                acc.team++;
            } else {
                acc.opponent++;
            }
            return acc
        }, { team: 0, opponent: 0 })
        if (res.team > res.opponent) {
            setResultBattlePokemon(ourPokemon)
            setWinnerModal(true)
            setWinnerMessage(`${ourPokemon.name} is Won!`)
        } else if (res.team === res.opponent) {
            setWinnerMessage(`Draw!`)
        } else {
            setWinnerModal(true)
            setResultBattlePokemon(opponentPokemon)
            setWinnerMessage(`${opponentPokemon.name} is Won!`)
        }
    }


    return (
        <>
            {isWinnerModal ?
                <CatchModal
                    src={`${resultBattlePokemon?.sprites?.front_default}`}
                    title={resultBattlePokemon?.name ?? ""} alt={resultBattlePokemon?.name ?? ""}
                    message={winnerMessage} closeModal={() => setWinnerModal(false)} />
                : <div
                    style={{
                        backgroundImage: isBattleStart ? `url(${bgPhone.src})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        minHeight: '100vh'
                    }} className={styles.arena}>
                    <div className="container">
                        <div className={styles.arenaContainer}>
                            <div className={styles.team}>
                                <select style={{ display: `${isBattleStart ? "none" : "block"}` }} onChange={hanldeSelectPokemonTeam}>
                                    {collection.length ? (
                                        collection.map((p) => (
                                            <option key={p.name}
                                                value={p.name}>
                                                {p.name}
                                            </option>
                                        ))
                                    ) : <option value={"Topup your collection"}>{"Topup your collection"}</option>}
                                </select>
                                <div className={styles.teamPockemon}>

                                    {ourPokemon?.sprites?.back_default &&
                                        <Image className={pokemonFights ? styles.pokemonFightsTeam : ""} src={changePositions ? ourPokemon.sprites.front_default : ourPokemon.sprites.back_default}
                                            alt='team pokemon img' width={200} height={200} />}
                                    {isBattleStart ? null : <h2>{ourPokemon?.name}</h2>}

                                    {!isBattleStart &&
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
                                            {ourPokemon && ourPokemon.types?.map((t: any, idx: number) => (
                                                <span
                                                    className={styles.types} key={idx}
                                                    style={{
                                                        background: `${t.type.name === "poison" ?
                                                            "#b97fc9" : t.type.name === "grass"
                                                                ? "#9ccd51" : t.type.name === "fire" ?
                                                                    "#fd7d24" : "#bdb9b8"}`
                                                    }}
                                                >
                                                    {t.type.name}
                                                </span>
                                            ))}
                                        </div>}
                                </div>
                            </div>
                            <div>
                                {isShowStartVs && <Image src={vs}
                                    alt='vs battle start img' width={300} height={300} />
                                }
                                {
                                    !isBattleStart && <button onClick={battleStart} className={styles.battleBtn}>Battle</button>
                                }

                            </div>
                            <div className={styles.opponent}>
                                <select style={{ display: `${isBattleStart ? "none" : "block"}` }} onChange={hanldeSelectPokemonOpponent}>
                                    {collection.length ? (
                                        collection.map((p) => (
                                            <option key={p.name}
                                                value={p.name}>
                                                {p.name}
                                            </option>
                                        ))
                                    ) : <option value={"Popup your collection"}>{"Popup your collection"}</option>}
                                </select>
                                <div className={styles.opponentPockemon}>
                                    {opponentPokemon?.sprites?.back_default &&
                                        <Image className={pokemonFights ? styles.pokemonFightsOpponent : ""} src={changePositions ? opponentPokemon.sprites.front_default : opponentPokemon.sprites.back_default}
                                            alt='team pokemon img' width={200} height={200} />}
                                    {isBattleStart ? null : <h2>{opponentPokemon?.name}</h2>}

                                    {!isBattleStart &&
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
                                            {opponentPokemon && opponentPokemon?.types?.map((t: any, idx: number) => (
                                                <span
                                                    className={styles.types} key={idx + 1}
                                                    style={{
                                                        background: `${t?.type.name === "poison" ?
                                                            "#b97fc9" : t?.type.name === "grass" ?
                                                                "#9ccd51" : t?.type.name === "fire" ?
                                                                    "#fd7d24" : "#bdb9b8"}`
                                                    }}
                                                >
                                                    {t?.type.name}
                                                </span>
                                            ))}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default page;