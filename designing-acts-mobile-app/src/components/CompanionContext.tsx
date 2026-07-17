import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import {
  companions,
  getCompanion,
  type Companion,
  type CompanionId,
} from "../data/companions";

import { createValidator, readStored, writeStored } from "../data/faith";

/** Matches React.Dispatch<React.SetStateAction<T>> — accepts value OR updater fn */
type Setter<T> = (value: T | ((prev: T) => T)) => void;

type CompanionCtx = {
  companion: Companion;
  setCompanionId: Setter<CompanionId>;
  userName: string;
  setUserName: Setter<string>;
  all: Companion[];
};

function createDefaultContext(): CompanionCtx {
  const noop = () => {
    if (import.meta.env.DEV) {
      throw new Error("useCompanion must be used within a CompanionProvider");
    }
  };
  return {
    companion: companions[0],
    setCompanionId: noop,
    userName: "",
    setUserName: noop,
    all: companions,
  };
}

const CompanionCtx = createContext<CompanionCtx>(createDefaultContext());

const LS_KEYS = {
  companionId: "acts.companionId" as const,
  userName: "acts.userName" as const,
} as const;

/** Validator for companion IDs — derived from the companions array (single source of truth) */
const isCompanionId = createValidator(companions.map((c) => c.id));

function readCompanionId(): CompanionId {
  return readStored(LS_KEYS.companionId, isCompanionId) ?? "grace";
}

function readUserName(): string {
  return readStored(LS_KEYS.userName, (v): v is string => true) ?? "";
}

function writeCompanionId(id: CompanionId): void {
  writeStored(LS_KEYS.companionId, id);
}

function writeUserName(name: string): void {
  writeStored(LS_KEYS.userName, name.trim() || null);
}

export function CompanionProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<CompanionId>(readCompanionId);
  const [userName, setUserName] = useState<string>(readUserName);

  useEffect(() => writeCompanionId(id), [id]);
  useEffect(() => writeUserName(userName), [userName]);

  const value: CompanionCtx = {
    companion: getCompanion(id),
    setCompanionId: setId,
    userName,
    setUserName,
    all: companions,
  };

  return (
    <CompanionCtx.Provider value={value}>{children}</CompanionCtx.Provider>
  );
}

export function useCompanion(): CompanionCtx {
  const ctx = useContext(CompanionCtx);
  if (import.meta.env.DEV && !ctx) {
    throw new Error("useCompanion must be used within a CompanionProvider");
  }
  return ctx;
}