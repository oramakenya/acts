import { useCompanion } from "./CompanionContext";
import { speak } from "../data/companions";

type Props = {
  /** A template like "Peace to you, {name}." — falls back to companion's morning greeting. */
  template?: string;
  /** Pick a default tone if no template is supplied. */
  tone?:
    | "morning"
    | "midday"
    | "evening"
    | "challenge"
    | "prayer"
    | "streak"
    | "reflection"
    | "pilgrimage";
  compact?: boolean;
  showName?: boolean;
};

export function CompanionBubble({
  template,
  tone = "morning",
  compact = false,
  showName = true,
}: Props) {
  const { companion, userName } = useCompanion();
  const map: Record<NonNullable<Props["tone"]>, string> = {
    morning: companion.morningGreeting,
    midday: companion.middayCheckIn,
    evening: companion.eveningExamen,
    challenge: companion.challengeNudge,
    prayer: companion.prayerEncouragement,
    streak: companion.streakEncouragement,
    reflection: companion.reflectionPrompt,
    pilgrimage: companion.pilgrimageEncouragement,
  };
  const text = speak(template || map[tone], userName, companion);

  return (
    <div
      className={`relative flex items-start gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-br ${companion.accentClasses} ${
        compact ? "p-2.5" : "p-3"
      } ring-1 ring-[var(--color-gold-4)]`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-full bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] ${
          compact ? "h-7 w-7 text-[14px]" : "h-9 w-9 text-[16px]"
        }`}
        title={companion.name}
      >
        {companion.emoji}
      </span>
      <div className="min-w-0 flex-1">
        {showName && (
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--feature-deep-gold)]">
            {companion.name} · {companion.voice}
          </p>
        )}
        <p
          className={`mt-0.5 font-serif italic leading-snug text-[var(--feature-fg)] ${
            compact ? "text-[11px]" : "text-[12px]"
          }`}
        >
          "{text}"
        </p>
      </div>
    </div>
  );
}

/** Just the avatar — for tight spaces. */
export function CompanionAvatar({ size = 32 }: { size?: number }) {
  const { companion } = useCompanion();
  return (
    <span
      className="flex items-center justify-center rounded-full bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      title={companion.name}
    >
      {companion.emoji}
    </span>
  );
}
