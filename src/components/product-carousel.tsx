"use client";

import { useId, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { ArrowIcon } from "./arrow-icon";
import styles from "./product-carousel.module.css";

type Slide = { name: string; image: ReactNode; details: ReactNode };

export function ProductCarousel({ slides }: { slides: Slide[] }) {
  const id = useId();
  const [active, setActive] = useState(0);
  const gesture = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const count = slides.length;

  function move(direction: -1 | 1) {
    setActive((current) => (current + direction + count) % count);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) return;
    switch (event.key) {
      case "ArrowLeft": event.preventDefault(); move(-1); break;
      case "ArrowRight": event.preventDefault(); move(1); break;
      case "Home": event.preventDefault(); setActive(0); break;
      case "End": event.preventDefault(); setActive(count - 1); break;
    }
  }

  function startGesture(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0 || event.target instanceof Element && event.target.closest("button")) return;
    gesture.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function endGesture(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    gesture.current = null;
    if (!start || start.pointerId !== event.pointerId) return;
    const distance = event.clientX - start.x;
    if (Math.abs(distance) > 40 && Math.abs(distance) > Math.abs(event.clientY - start.y)) {
      move(distance < 0 ? 1 : -1);
    }
  }

  return (
    <div className={styles.carousel} role="group" aria-roledescription="carousel" aria-label="Research peptides">
      <div
        id={id}
        className={styles.stage}
        tabIndex={0}
        aria-label="Peptide images"
        aria-describedby={`${id}-hint`}
        onKeyDown={handleKeyDown}
        onPointerDown={startGesture}
        onPointerUp={endGesture}
        onPointerCancel={() => { gesture.current = null; }}
      >
        {slides.map((slide, index) => {
          let offset = (index - active + count) % count;
          if (offset > count / 2) offset -= count;
          return (
            <div
              key={slide.name}
              className={styles.slide}
              data-position={Math.abs(offset) <= 2 ? offset : "hidden"}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slide.name}, ${index + 1} of ${count}`}
              aria-hidden={index !== active}
              inert={index !== active}
            >
              {slide.image}
            </div>
          );
        })}
        <button className={`${styles.arrow} ${styles.previous}`} type="button" aria-label="Previous peptide" aria-controls={id} onClick={() => move(-1)}>
          <ArrowIcon direction="right" className={styles.previousIcon} />
        </button>
        <button className={`${styles.arrow} ${styles.next}`} type="button" aria-label="Next peptide" aria-controls={id} onClick={() => move(1)}>
          <ArrowIcon direction="right" />
        </button>
      </div>
      <div className={styles.pagination} role="group" aria-label="Choose a peptide">
        {slides.map((slide, index) => (
          <button key={slide.name} type="button" aria-label={`Show ${slide.name}`} aria-controls={id} aria-pressed={index === active} onClick={() => setActive(index)}>
            <span />
          </button>
        ))}
      </div>
      <div className={styles.details}>{slides[active].details}</div>
      <p className={styles.caption}>
        <span aria-hidden="true">{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
        <span id={`${id}-hint`}>Swipe, drag or use the arrows to explore</span>
      </p>
      <p className={styles.status} role="status">{slides[active].name}, peptide {active + 1} of {count}</p>
    </div>
  );
}
