import Image from 'next/image';
import React from 'react';
import gotchaAfterModal from "@/public/gotcha-pokemon.png";
import styles from "./CatchModal.module.css";
import nextIcon from "@/public/nextIcon.png"

interface IProps {
    src: string,
    alt: string,
    title: string,
    message?: string
    closeModal: () => void
}

const CatchModal = ({ src, alt, title, closeModal, message }: IProps) => {
    return (
        <div className={styles.gotchaModal}>
            <Image
                src={src}
                alt={alt}
                width={200}
                height={200}
            />
            <h3>{title}</h3>
            {message &&
                <p className={styles.p}>{message}</p>
            }

            <button onClick={closeModal} className={styles.nextButton}>
                <Image src={nextIcon} alt='next step icon ' />
            </button>
        </div>
    );
};

export default CatchModal;