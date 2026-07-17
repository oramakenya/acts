import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
// Ensure LanguageLevel is defined in your faith.ts data file!
import type { FaithLevel, BibleLevel, CommunityStatus, LanguageLevel } from "../data/faith"; 

type Ctx = {
  faithLevel: FaithLevel | null;
  setFaithLevel: (l: FaithLevel) => void;
  bibleLevel: BibleLevel | null;
  setBibleLevel: (l: BibleLevel) => void;
  communityStatus: CommunityStatus | null;
  setCommunityStatus: (s: CommunityStatus) => void;
  
  // Language Level types
  languageLevel: LanguageLevel | null;
  setLanguageLevel: (l: LanguageLevel) => void;
};

const FaithCtx = createContext<Ctx>({
  faithLevel: null,
  setFaithLevel: () => {},
  bibleLevel: null,
  setBibleLevel: () => {},
  communityStatus: null,
  setCommunityStatus: () => {},
  
  // Default context values
  languageLevel: null,
  setLanguageLevel: () => {},
});

export function FaithProvider({ children }: { children: ReactNode }) {
  const [faithLevel, setFaithLevel] = useState<FaithLevel | null>(() => {
    if (typeof window === "undefined") return null;
    return (window.localStorage?.getItem("acts.faithLevel") as FaithLevel) || null;
  });
  const [bibleLevel, setBibleLevel] = useState<BibleLevel | null>(() => {
    if (typeof window === "undefined") return null;
    return (window.localStorage?.getItem("acts.bibleLevel") as BibleLevel) || null;
  });
  const [communityStatus, setCommunityStatus] = useState<CommunityStatus | null>(() => {
    if (typeof window === "undefined") return null;
    return (window.localStorage?.getItem("acts.communityStatus") as CommunityStatus) || null;
  });
  
  // Language level state initializer (Defaults to null until they choose, or you can default to "standard")
  const [languageLevel, setLanguageLevel] = useState<LanguageLevel | null>(() => {
    if (typeof window === "undefined") return null;
    return (window.localStorage?.getItem("acts.languageLevel") as LanguageLevel) || null;
  });

  useEffect(() => {
    if (faithLevel) {
      try { window.localStorage?.setItem("acts.faithLevel", faithLevel); } catch {}
    }
  }, [faithLevel]);
  
  useEffect(() => {
    if (bibleLevel) {
      try { window.localStorage?.setItem("acts.bibleLevel", bibleLevel); } catch {}
    }
  }, [bibleLevel]);
  
  useEffect(() => {
    if (communityStatus) {
      try { window.localStorage?.setItem("acts.communityStatus", communityStatus); } catch {}
    }
  }, [communityStatus]);

  // Language level localStorage sync
  useEffect(() => {
    if (languageLevel) {
      try { window.localStorage?.setItem("acts.languageLevel", languageLevel); } catch {}
    }
  }, [languageLevel]);

  return (
    <FaithCtx.Provider
      value={{
        faithLevel,
        setFaithLevel,
        bibleLevel,
        setBibleLevel,
        communityStatus,
        setCommunityStatus,
        // Expose to the app
        languageLevel,
        setLanguageLevel,
      }}
    >
      {children}
    </FaithCtx.Provider>
  );
}

export function useFaith() {
  return useContext(FaithCtx);
}