import { HomeIcon, BookIcon, HandsIcon, HeartIcon, UserIcon, HeartSparkIcon } from "./icons";
import { MudClothBorder } from "./Ornament";
import type { Screen } from "../App";
import type { SVGProps } from "react";

const ChurchIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg
    width={p.width ?? 22}
    height={p.height ?? 22}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v4" />
    <path d="M10 5h4" />
    <path d="M12 7 4 12v9h16v-9z" />
    <path d="M10 21v-5h4v5" />
  </svg>
);

// Shortened labels — every label one word, equal visual weight.
const tabs: { id: Screen; label: string; Icon: typeof HomeIcon }[] = [
  { id: "dashboard", label: "Today", Icon: HomeIcon },
  { id: "practical", label: "Living", Icon: HandsIcon },
  { id: "feelings", label: "Heart", Icon: HeartSparkIcon },
  { id: "prayer", label: "Pray", Icon: HeartIcon },
  { id: "community", label: "Church", Icon: ChurchIcon },
  { id: "study", label: "Study", Icon: BookIcon },
  { id: "profile", label: "Me", Icon: UserIcon },
];

export function BottomNav({
  active,
  onChange,
}: {
  active: Screen;
  onChange: (s: Screen) => void;
}) {
  return (
    <nav className="relative z-20 bg-[var(--color-onyx)]">
      <div className="text-[var(--color-gold-3)]">
        <MudClothBorder height={8} />
      </div>
      <div className="grid grid-cols-7 items-stretch px-1 pb-5 pt-2">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className="group flex flex-col items-center justify-center gap-1 py-1"
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-2xl transition ${
                  isActive
                    ? "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
                    : "text-[var(--color-muted)] group-active:bg-[var(--color-charcoal)]"
                }`}
              >
                <Icon width={16} height={16} />
              </div>
              <span
                className={`w-full text-center text-[9.5px] font-semibold leading-none tracking-wide ${
                  isActive ? "text-[var(--color-gold-1)]" : "text-[var(--color-muted)]"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
