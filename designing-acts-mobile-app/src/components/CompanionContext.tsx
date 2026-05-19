import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  companions,
  getCompanion,
  type Companion,
  type CompanionId,
} from "../data/companions";

type Ctx = {
  companion: Companion;
  setCompanionId: (id: CompanionId) => void;
  userName: string;
  setUserName: (n: string) => void;
  all: Companion[];
};

const CompanionCtx = createContext<Ctx>({
  companion: companions[0],
  setCompanionId: () => {},
  userName: "Sarah",
  setUserName: () => {},
  all: companions,
});

export function CompanionProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<CompanionId>(() => {
    if (typeof window === "undefined") return "grace";
    const stored = window.localStorage?.getItem("acts.companion");
    if (stored === "julius" || stored === "grace") return stored;
    return "grace";
  });
  const [userName, setUserName] = useState<string>(() => {
    if (typeof window === "undefined") return "Sarah";
    return window.localStorage?.getItem("acts.userName") || "Sarah";
  });

  useEffect(() => {
    try {
      window.localStorage?.setItem("acts.companion", id);
    } catch {}
  }, [id]);
  useEffect(() => {
    try {
      window.localStorage?.setItem("acts.userName", userName);
    } catch {}
  }, [userName]);

  return (
    <CompanionCtx.Provider
      value={{
        companion: getCompanion(id),
        setCompanionId: setId,
        userName,
        setUserName,
        all: companions,
      }}
    >
      {children}
    </CompanionCtx.Provider>
  );
}

export function useCompanion() {
  return useContext(CompanionCtx);
}
