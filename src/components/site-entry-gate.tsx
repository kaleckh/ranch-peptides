"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import styles from "./site-entry-gate.module.css";

const confirmationKey = "snp-entry-confirmation-v1";
const confirmationEvent = "snp-entry-confirmed";
let confirmedInMemory = false;

function subscribe(onChange: () => void) {
  window.addEventListener(confirmationEvent, onChange);
  return () => window.removeEventListener(confirmationEvent, onChange);
}

function readConfirmation() {
  try {
    return confirmedInMemory || sessionStorage.getItem(confirmationKey) === "confirmed";
  } catch {
    return confirmedInMemory;
  }
}

function unconfirmedOnServer() {
  return false;
}

export function SiteEntryGate({ children }: { children: ReactNode }) {
  const confirmed = useSyncExternalStore(subscribe, readConfirmation, unconfirmedOnServer);
  const [over21, setOver21] = useState(false);
  const [understandsResearch, setUnderstandsResearch] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (confirmed) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // The static export opens the form immediately; promote it to a native modal after hydration.
    dialog.close();
    dialog.showModal();
    ageRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [confirmed]);

  function enterSite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!over21 || !understandsResearch) return;
    confirmedInMemory = true;
    try {
      sessionStorage.setItem(confirmationKey, "confirmed");
    } catch { /* Keep this visit usable when browser storage is unavailable. */ }
    window.dispatchEvent(new Event(confirmationEvent));
    requestAnimationFrame(() => document.getElementById("main-content")?.focus());
  }

  return (
    <>
      <div className={styles.site} inert={!confirmed}>{children}</div>
      {!confirmed && (
        <dialog
          ref={dialogRef}
          open
          className={styles.dialog}
          aria-labelledby="entry-title"
          aria-describedby="entry-description"
          aria-modal="true"
          onCancel={(event) => event.preventDefault()}
        >
          <form onSubmit={enterSite}>
            <p className={styles.brand}>SALT N’ PEP</p>
            <h2 id="entry-title" className={styles.title}>Before you enter</h2>
            <p id="entry-description" className={styles.description}>Please confirm both statements to continue.</p>
            <div className={styles.confirmations}>
              <label className={styles.statement}>
                <input ref={ageRef} type="checkbox" required checked={over21} onChange={(event) => setOver21(event.target.checked)} />
                <span>I am over the age of 21</span>
              </label>
              <label className={styles.statement}>
                <input type="checkbox" required checked={understandsResearch} onChange={(event) => setUnderstandsResearch(event.target.checked)} />
                <span>I understand that these are research compounds</span>
              </label>
            </div>
            <button type="submit" className={styles.enter} disabled={!over21 || !understandsResearch}>Enter site</button>
          </form>
        </dialog>
      )}
    </>
  );
}
