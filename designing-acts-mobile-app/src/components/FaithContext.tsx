import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import type {
  FaithLevel,
  BibleLevel,
  CommunityStatus,
  LanguageLevel,
} from "../data/faith";

import {
  isFaithLevel,
  isBibleLevel,
  isCommunityStatus,
  isLanguageLevel,
  readStored,
  writeStored,
} from "../data/faith";

/**
 * Context shape — setters accept BOTH values AND updater functions
 * (matches React.Dispatch<React.SetStateAction<T>>)
 */
type Setter<T> = (value: T | null | ((prev: T | null) => T | null)) => void;

type FaithCtx = {
  faithLevel: FaithLevel | null;
  setFaithLevel: Setter<FaithLevel>;
  bibleLevel: BibleLevel | null;
  setBibleLevel: Setter<BibleLevel>;
  communityStatus: CommunityStatus | null;
  setCommunityStatus: Setter<CommunityStatus>;
  languageLevel: LanguageLevel | null;
  setLanguageLevel: Setter<LanguageLevel>;
};

/**
 * Default context — throws in dev if used outside provider,
 * no-ops in prod (fail-closed for type safety).
 */
function createDefaultContext(): FaithCtx {
  const noop = () => {
    if (import.meta.env.DEV) {
      throw new Error("useFaith must be used within a FaithProvider");
    }
  };
  return {
    faithLevel: null,
    setFaithLevel: noop,
    bibleLevel: null,
    setBibleLevel: noop,
    communityStatus: null,
    setCommunityStatus: noop,
    languageLevel: null,
    setLanguageLevel: noop,
  };
}

const FaithCtx = createContext<FaithCtx>(createDefaultContext());

/**
 * LocalStorage keys — consistent `{domain}.{field}` pattern.
 * Easy to migrate/debug; all four onboarding fields now persisted.
 */
const LS_KEYS = {
  faithLevel: "acts.faithLevel",
  bibleLevel: "acts.bibleLevel",
  communityStatus: "acts.communityStatus",
  languageLevel: "acts.languageLevel",
} as const;

export function FaithProvider({ children }: { children: ReactNode }) {
  // ── Lazy initializers (run once, SSR-safe) ──────────────────────
  const [faithLevel, setFaithLevel] = useState<FaithLevel | null>(() =>
    readStored(LS_KEYS.faithLevel, isFaithLevel)
  );
  const [bibleLevel, setBibleLevel] = useState<BibleLevel | null>(() =>
    readStored(LS_KEYS.bibleLevel, isBibleLevel)
  );
  const [communityStatus, setCommunityStatus] = useState<CommunityStatus | null>(
    () => readStored(LS_KEYS.communityStatus, isCommunityStatus)
  );
  const [languageLevel, setLanguageLevel] = useState<LanguageLevel | null>(() =>
    readStored(LS_KEYS.languageLevel, isLanguageLevel)
  );

  // ── Sync to localStorage (handles null = clear) ─────────────────
  useEffect(() => writeStored(LS_KEYS.faithLevel, faithLevel), [faithLevel]);
  useEffect(() => writeStored(LS_KEYS.bibleLevel, bibleLevel), [bibleLevel]);
  useEffect(() =>
    writeStored(LS_KEYS.communityStatus, communityStatus),
    [communityStatus]
  );
  useEffect(() =>
    writeStored(LS_KEYS.languageLevel, languageLevel),
    [languageLevel]
  );

  // ── Expose context value ────────────────────────────────────────
  const value: FaithCtx = {
    faithLevel,
    setFaithLevel,
    bibleLevel,
    setBibleLevel,
    communityStatus,
    setCommunityStatus,
    languageLevel,
    setLanguageLevel,
  };

  return (
    <FaithCtx.Provider value={value}>{children}</FaithCtx.Provider>
  );
}

/**
 * Hook — throws helpful error in dev if provider missing.
 */
export function useFaith(): FaithCtx {
  const ctx = useContext(FaithCtx);
  if (import.meta.env.DEV && !ctx) {
    throw new Error("useFaith must be used within a FaithProvider");
  }
  return ctx;
}