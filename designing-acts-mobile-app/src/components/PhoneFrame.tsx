import type { ReactNode } from "react";
import { ToastProvider } from "./Toast";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 390 }}>
      {/* Outer device shell */}
      <div
        className="relative rounded-[3rem] p-3 shadow-[0_30px_90px_-20px_rgba(212,160,23,0.35)] ring-1 transition-colors duration-500"
        style={{
          background: "var(--shell-outer)",
          // @ts-ignore — custom property for ring
          "--tw-ring-color": "var(--shell-ring)",
        }}
      >
        {/* Inner gold hairline */}
        <div
          className="absolute inset-2.5 rounded-[2.7rem] ring-1 pointer-events-none"
          style={{ ["--tw-ring-color" as any]: "rgba(122,90,20,0.5)" }}
        />

        <div
          className="relative overflow-hidden rounded-[2.4rem] bg-[var(--color-onyx)] text-[var(--color-cream)] transition-colors duration-500"
          style={{ height: 800 }}
        >
          {/* Status bar */}
          <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-7 pt-3 text-[12px] font-medium text-[var(--color-cream)]">
            <span>9:41</span>
            <div className="absolute left-1/2 top-2 h-6 w-28 -translate-x-1/2 rounded-full bg-black" />
            <div className="flex items-center gap-1.5 text-[var(--color-gold-1)]">
              <span>•••</span>
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>

          {/* Screen content */}
          <ToastProvider>
            <div className="relative z-10 flex h-full flex-col">{children}</div>
          </ToastProvider>
        </div>
      </div>

      {/* Side buttons */}
      <div
        className="absolute left-[-3px] top-32 h-10 w-1 rounded-l-md"
        style={{ background: "var(--shell-side)" }}
      />
      <div
        className="absolute left-[-3px] top-48 h-16 w-1 rounded-l-md"
        style={{ background: "var(--shell-side)" }}
      />
      <div
        className="absolute left-[-3px] top-72 h-16 w-1 rounded-l-md"
        style={{ background: "var(--shell-side)" }}
      />
      <div
        className="absolute right-[-3px] top-44 h-24 w-1 rounded-r-md"
        style={{ background: "var(--shell-side)" }}
      />
    </div>
  );
}
