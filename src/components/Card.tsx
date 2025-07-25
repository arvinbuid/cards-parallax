'use client'

import Image from 'next/image';
import styles from './card.module.css';
import { useRef } from 'react';
import { motion, type MotionValue, useScroll, useTransform } from 'framer-motion';

interface CardProps {
    title: string;
    description: string;
    src: string;
    link: string;
    color: string;
    i: number;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}

const Card = ({ title, description, src, link, color, i, progress, range, targetScale }: CardProps) => {
    const containerRef = useRef(null);
    // track scroll progress of the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'start start'] // top of viewport -> bottom of the container (0) -> start of viewport -> start of container (1)
    })
    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]); // scaling of each card is dictated by (scrollY) progress and targetScale inside of Page component

    return (
        <div ref={containerRef} className={styles.cardContainer}>
            <motion.div
                className={styles.card}
                style={{ backgroundColor: color, scale, top: `calc(-5vh + ${i * 25}px)` }} // dynamic top position which create stacking effect
            >
                <h2>{title}</h2>

                <div className={styles.body}>
                    {/* Left */}
                    <div className={styles.description}>
                        <p>{description}</p>
                        <span>
                            <a href={link} target='_blank'>See more</a>
                            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z" fill="black" />
                            </svg>
                        </span>
                    </div>
                    {/* Right */}
                    <div className={styles.imageContainer}>
                        <motion.div
                            className={styles.inner}
                            style={{ scale: imageScale }}
                        >
                            <Image
                                fill
                                src={`/images/${src}`}
                                alt={title}
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Card;