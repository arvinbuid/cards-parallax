'use client'

import styles from "./page.module.css";
import Card from "@/components/Card";

import { projects } from "./data";
import { useRef } from "react";
import { useScroll } from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'] // -> top of ref intersects -> top of window (0) -> end of ref intersects -> end of window (1)
  })

  return (
    <main ref={containerRef} className={styles.main}>
      {projects.map((project, i) => {
        const targetScale = 1 - ((projects.length - i) * 0.05); // first cards have higher scale than the last one
        return <Card key={`p-${i}}`} {...project} i={i} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale} />
      }
      )}
    </main>
  );
}
