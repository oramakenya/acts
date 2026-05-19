import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { CheckIcon } from "./icons";

type ToastItem = { id: number; message: string };

const ToastCtx = createContext<(msg: string) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setItems((it) => [...it, { id, message }]);
    setTimeout(() => {
      setItems((it) => it.filter((x) => x.id !== id));
    }, 2400);
  }, []);

  return (
    <ToastCtx.Provider value={push}>
      {children}
      {/* Toast layer — fixed inside phone frame area */}
      <div className="pointer-events-none absolute inset-x-0 top-12 z-[60] flex flex-col items-center gap-2 px-6">
        {items.map((t) => (
          <ToastBubble key={t.id} message={t.message} />
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

function ToastBubble({ message }: { message: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => setVisible(false), 2100);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className={`pointer-events-auto flex items-center gap-2 rounded-full bg-[var(--color-feature)] px-4 py-2 text-[12px] font-semibold text-[var(--feature-accent)] shadow-lg ring-1 ring-[var(--color-gold-3)] transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
      }`}
    >
      <CheckIcon width={14} height={14} />
      <span>{message}</span>
    </div>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}
