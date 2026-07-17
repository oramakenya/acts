import { useFaith } from "./FaithContext"; // Adjust path if needed
import type { LanguageLevel } from "../data/faith"; // Adjust path to where this type lives

export function ReadingLevelToggle() {
  const { languageLevel, setLanguageLevel } = useFaith();

  const options: { id: LanguageLevel; label: string; icon: string }[] = [
    { id: "simple", label: "Simple", icon: "🌱" },
    { id: "standard", label: "Standard", icon: "📖" },
    { id: "theological", label: "Deep", icon: "🏛️" },
  ];

  return (
    <div className="flex w-full rounded-xl bg-[var(--feature-tint)] p-1 ring-1 ring-[var(--feature-line)]">
      {options.map((option) => {
        const isSelected = languageLevel === option.id;
        return (
          <button
            key={option.id}
            onClick={() => setLanguageLevel(option.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-[11px] font-medium transition-all ${
              isSelected
                ? "bg-[var(--color-gold-2)] text-[var(--on-accent)] shadow-md"
                : "text-[var(--feature-fg-muted)] hover:text-[var(--feature-accent)]"
            }`}
          >
            <span>{option.icon}</span>
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}