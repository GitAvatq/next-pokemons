"use client";
import { useRouter } from 'next/navigation';
import styles from "./Header.module.css"
import React from 'react';
import Image from 'next/image';
import logo from "../../../../public/pokemonLogo.svg";
import backpack from "../../../../public/pokemonList.png"
import { SiEbox } from "react-icons/si";

const Header = () => {
    const route = useRouter()
    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                <div onClick={() => route.push("/")}>
                    <Image
                        style={{ cursor: 'pointer' }}
                        src={logo}
                        alt="Pokemon logo"
                        width={150}
                        height={50}
                        priority
                    />
                </div>
                <div style={{display:'flex', gap:50}}>
                    <div className={styles.backpack} onClick={() => route.push("/arena")}>
                        <SiEbox size={50} />
                        <h3>Arena</h3>
                    </div>
                    <div className={styles.backpack} onClick={() => route.push("/collection")}>
                        <Image src={backpack} width={50} alt='List img' />
                        <h3>Collection</h3>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;