import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { FaithLevel, BibleLevel, CommunityStatus } from "../data/faith";

type Ctx = {
  faithLevel: FaithLevel | null;
  setFaithLevel: (l: FaithLevel) => void;
  bibleLevel: BibleLevel | null;
  setBibleLevel: (l: BibleLevel) => void;
  communityStatus: CommunityStatus | null;
  setCommunityStatus: (s: CommunityStatus) => void;
};

const FaithCtx = createContext<Ctx>({
  faithLevel: null,
  setFaithLevel: () => {},
  bibleLevel: null,
  setBibleLevel: () => {},
  communityStatus: null,
  setCommunityStatus: () => {},
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

  return (
    <FaithCtx.Provider
      value={{
        faithLevel,
        setFaithLevel,
        bibleLevel,
        setBibleLevel,
        communityStatus,
        setCommunityStatus,
      }}
    >
      {children}
    </FaithCtx.Provider>
  );
}

export function useFaith() {
  return useContext(FaithCtx);
}
