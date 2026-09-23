import { useCallback, useEffect, useMemo, useState } from "react";
import { ANSWERS } from "./words";
import "./component-styles/WordleWidget.css";

const WORD_LENGTH = 5;
const MAX_GUESSES = 4;
const FLIP_STEP_MS = 220; // stagger between each letter's flip
const FLIP_DURATION_MS = 500;

type LetterStatus = "correct" | "present" | "absent";

interface SavedGame {
  dateKey: string;
  guesses: string[];
  status: "playing" | "won" | "lost";
}

/* ------------------------------------------------------------------ */
/* Picking today's word                                                */
/* ------------------------------------------------------------------ */

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// "2026-09-22" -> local calendar date, so the word changes at local midnight
function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function wordForDate(dateKey: string): string {
  const index = hashString(`wordle:${dateKey}`) % ANSWERS.length;
  return ANSWERS[index];
}

/* ------------------------------------------------------------------ */
/* Scoring a guess (handles repeated letters correctly)                 */
/* ------------------------------------------------------------------ */

function scoreGuess(guess: string, answer: string): LetterStatus[] {
  const result: LetterStatus[] = Array(WORD_LENGTH).fill("absent");
  const remaining: Record<string, number> = {};

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === answer[i]) {
      result[i] = "correct";
    } else {
      remaining[answer[i]] = (remaining[answer[i]] ?? 0) + 1;
    }
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === "correct") continue;
    const left = remaining[guess[i]] ?? 0;
    if (left > 0) {
      result[i] = "present";
      remaining[guess[i]] = left - 1;
    }
  }
  return result;
}

function loadSaved(dateKey: string): SavedGame | null {
  try {
    const raw = window.localStorage.getItem("wordle-widget");
    if (!raw) return null;
    const saved: SavedGame = JSON.parse(raw);
    return saved.dateKey === dateKey ? saved : null;
  } catch {
    return null; // private browsing, storage disabled, or corrupted data
  }
}

function persist(game: SavedGame) {
  try {
    window.localStorage.setItem("wordle-widget", JSON.stringify(game));
  } catch {
    // Storage isn't available; the game still works, it just won't survive a reload.
  }
}

/* ------------------------------------------------------------------ */
/* Widget                                                               */
/* ------------------------------------------------------------------ */

export default function WordleWidget() {
  const dateKey = useMemo(() => todayKey(), []);
  const answer = useMemo(() => wordForDate(dateKey), [dateKey]);

  const [guesses, setGuesses] = useState<string[]>(() => loadSaved(dateKey)?.guesses ?? []);
  const [status, setStatus] = useState<"playing" | "won" | "lost">(
    () => loadSaved(dateKey)?.status ?? "playing"
  );
  const [current, setCurrent] = useState("");
  const [shakeRow, setShakeRow] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    persist({ dateKey, guesses, status });
  }, [dateKey, guesses, status]);

  const submitGuess = useCallback(() => {
    if (status !== "playing") return;
    if (current.length < WORD_LENGTH) {
      setMessage("Not enough letters");
      setShakeRow(guesses.length);
      window.setTimeout(() => setShakeRow(null), 350);
      return;
    }
    setMessage("");
    const nextGuesses = [...guesses, current];
    setGuesses(nextGuesses);
    setCurrent("");

    if (current === answer) {
      setStatus("won");
    } else if (nextGuesses.length >= MAX_GUESSES) {
      setStatus("lost");
    }
  }, [current, guesses, status, answer]);

  const handleKey = useCallback(
    (key: string) => {
      if (status !== "playing") return;
      if (key === "ENTER") {
        submitGuess();
      } else if (key === "BACKSPACE") {
        setCurrent((c) => c.slice(0, -1));
      } else if (/^[A-Z]$/.test(key) && current.length < WORD_LENGTH) {
        setCurrent((c) => c + key);
      }
    },
    [current, status, submitGuess]
  );

  // Physical keyboard support. preventDefault matters here: with no <input> focused,
  // Firefox's default action for Backspace is "go back in browser history" (Chrome
  // dropped that behavior years ago, which is why this only shows up in Firefox).
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Enter") {
        e.preventDefault();
        handleKey("ENTER");
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handleKey("BACKSPACE");
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKey(e.key.toUpperCase());
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);

  const rowsLeft = MAX_GUESSES - guesses.length - (status === "playing" ? 1 : 0);

  return (
    <section className="wd" aria-label="Wordle">
      <h2 className="wd__label">Daily Wordle</h2>
      {/* <p className="wd__sub">Type on your keyboard · new word daily</p> */}

      <div className="wd__board">
        {Array.from({ length: MAX_GUESSES }, (_, rowIndex) => {
          const submitted = guesses[rowIndex];
          const isCurrentRow = rowIndex === guesses.length && status === "playing";
          const letters = submitted
            ? submitted.split("")
            : isCurrentRow
              ? current.padEnd(WORD_LENGTH, " ").split("")
              : Array(WORD_LENGTH).fill(" ");
          const scored = submitted ? scoreGuess(submitted, answer) : null;

          return (
            <div
              key={rowIndex}
              className={`wd__row${shakeRow === rowIndex ? " wd__row--shake" : ""}`}
            >
              {letters.map((letter, i) => {
                const letterStatus = scored?.[i];
                const classes = ["wd__cell"];
                if (letter !== " ") classes.push("wd__cell--filled");
                if (letterStatus) {
                  classes.push(`wd__cell--${letterStatus}`, "wd__cell--flip");
                }
                return (
                  <div
                    key={i}
                    className={classes.join(" ")}
                    style={letterStatus ? ({ "--wd-delay": `${i * FLIP_STEP_MS}ms` } as React.CSSProperties) : undefined}
                  >
                    {letter !== " " ? letter : ""}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <p
        className={
          "wd__status" +
          (status === "won" ? " wd__status--won" : status === "lost" ? " wd__status--lost" : message ? " wd__status--hint" : "" )
        }
        role="status"
      >
        {status === "won"
          ? "Solved! New word tommorow"
          : status === "lost"
            ? `The word was ${answer}. Try again tomorrow.`
            : message || "Type to play the game!"}
      </p>
    </section>
  );
}