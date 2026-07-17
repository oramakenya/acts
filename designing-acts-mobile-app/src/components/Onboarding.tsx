import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  HandsIcon,
  HeartIcon,
  BookIcon,
  FlameIcon,
  LockIcon,
  HeartSparkIcon,
  CheckIcon,
} from "./icons";
import {
  ArabesqueDivider,
  MashrabiyaBg,
  KenteStrip,
  StarOctagram,
  Adinkrahene,
  Lozenge,
  AdinkraDotsBg,
} from "./Ornament";
import { useCompanion } from "./CompanionContext";
import { useFaith } from "./FaithContext";
import { companions, type CompanionId } from "../data/companions";
import {
  faithLevels,
  bibleLevels,
  communityStatuses,
  type FaithLevel,
  type BibleLevel,
  type CommunityStatus,
} from "../data/faith";

type Step = {
  badge: string;
  title: string;
  subtitle: string;
  body: string;
  accent: React.ReactNode;
  custom?: "welcome" | "companion" | "faithJourney";
};

const steps: Step[] = [
  {
    badge: "Welcome to",
    title: "ACTS",
    subtitle: "Live the Word. Together.",
    body:
      "A unified home for daily scripture, communal prayer, practical living, and serious study — built for a church that wants to walk the same way.",
    accent: <StarOctagram width={36} height={36} />,
    custom: "welcome",
  },
  {
    badge: "Choose a companion",
    title: "Walk with someone",
    subtitle: "Their voice will accompany you here.",
    body:
      "Pick a companion who will greet you in the mornings, send words of encouragement, and walk through challenges with you. You can change this anytime.",
    accent: <HeartIcon width={36} height={36} />,
    custom: "companion",
  },
  {
    badge: "Tell us about your walk",
    title: "Where are you?",
    subtitle: "Honest is better than impressive.",
    body:
      "There's no wrong answer. Your starting point shapes how ACTS meets you.",
    accent: <HeartSparkIcon width={36} height={36} />,
    custom: "faithJourney",
  },
  {
    badge: "Pillar 1",
    title: "Practical Living",
    subtitle: "What Scripture commands. How to walk it today.",
    body:
      "Daily challenges tied to the New Testament's imperatives — plus My Pilgrimage, where you customize what to put off and put on.",
    accent: <HandsIcon width={36} height={36} />,
  },
  {
    badge: "Pillar 2",
    title: "Prayer Wall",
    subtitle: "Anonymous. Sacred. Shared.",
    body:
      "Post requests without your name. Pray for others. See the body interceding across continents on the prayer globe.",
    accent: <HeartIcon width={36} height={36} />,
  },
  {
    badge: "For your heart",
    title: "Feelings",
    subtitle: "Scripture for what you're carrying.",
    body:
      "Hope, peace, fear, grief, doubt, shame, joy — pick what you feel, and receive the verses that meet you there.",
    accent: <HeartSparkIcon width={36} height={36} />,
  },
  {
    badge: "Pillar 3",
    title: "Study Hub",
    subtitle: "Apologetics. Hermeneutics. Exegesis. Isagogics.",
    body:
      "Big questions answered in plain language. Search any question or follow a structured learning path.",
    accent: <BookIcon width={36} height={36} />,
  },
  {
    badge: "Pillar 4",
    title: "Communities",
    subtitle: "Your church has a home in the app.",
    body:
      "Each church gets its own page — feed, sermon notes, group challenges, and a members-only prayer wall. Pin your city to find churches and join the globe.",
    accent: <FlameIcon width={36} height={36} />,
  },
  {
    badge: "One promise",
    title: "Your name is yours.",
    subtitle: "Anonymity is engineered, not optional.",
    body:
      "Prayer requests and encouragements are never linked to your identity — not even on our servers. Vulnerability deserves protection.",
    accent: <LockIcon width={36} height={36} />,
  },
];

export function Onboarding({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const { companion, setCompanionId, userName, setUserName } = useCompanion();
  const {
    faithLevel,
    setFaithLevel,
    bibleLevel,
    setBibleLevel,
    communityStatus,
    setCommunityStatus,
  } = useFaith();
  const step = steps[i];
  const isLast = i === steps.length - 1;

  function advance() {
    if (isLast) onDone();
    else setI(i + 1);
  }

  return (
    <div className="flex h-full flex-col pt-10 pat-mudcloth">
      {/* Top bar with company mark + skip */}
      <div className="flex items-center justify-between px-6 pt-2">
        <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[var(--color-gold-3)]">
          by <span className="text-[var(--color-gold-1)]">ALIVE</span>
        </p>
        <button
          onClick={onDone}
          className="text-[12px] font-medium text-[var(--color-bronze)]"
        >
          Skip
        </button>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-4 pt-4">
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-3xl bg-[var(--color-feature)] p-6 text-[var(--feature-fg)] shadow-xl ring-1 ring-[var(--color-gold-3)]">
          <MashrabiyaBg />

          <Adinkrahene width={24} height={24} className="absolute left-3 top-3 text-[var(--color-gold-3)]" />
          <Adinkrahene width={24} height={24} className="absolute right-3 top-3 text-[var(--color-gold-3)]" />
          <Adinkrahene width={24} height={24} className="absolute bottom-3 left-3 text-[var(--color-gold-3)]" />
          <Adinkrahene width={24} height={24} className="absolute bottom-3 right-3 text-[var(--color-gold-3)]" />

          <div className="relative pl-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--feature-deep-gold)]">
              {step.badge}
            </p>
          </div>

          {/* Scrollable content area — keeps the next-arrow always visible */}
          <div className="relative -mx-1 flex-1 overflow-y-auto px-1 pr-2">
            {step.custom === "welcome" ? (
              <WelcomeContent />
            ) : step.custom === "companion" ? (
              <CompanionPicker
                userName={userName}
                setUserName={setUserName}
                selectedId={companion.id}
                onPick={setCompanionId}
              />
            ) : step.custom === "faithJourney" ? (
              <FaithJourneyStep
                userName={userName}
                companionName={companion.name}
                companionEmoji={companion.emoji}
                faithLevel={faithLevel}
                setFaithLevel={setFaithLevel}
                bibleLevel={bibleLevel}
                setBibleLevel={setBibleLevel}
                communityStatus={communityStatus}
                setCommunityStatus={setCommunityStatus}
                onComplete={advance}
              />
            ) : (
              <DefaultContent step={step} />
            )}
          </div>

          <div className="relative pt-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {steps.map((_, j) => (
                  <span
                    key={j}
                    className={`h-1.5 rounded-full transition-all ${
                      j === i
                        ? "w-6 bg-[var(--color-gold-2)]"
                        : "w-1.5 bg-[var(--color-gold-4)]/50"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={advance}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] active:scale-95"
              >
                <ArrowRight width={18} height={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-2 text-center">
        <p className="text-[11px] text-[var(--color-bronze)] font-serif italic">
          {isLast ? "Tap the arrow to begin." : "Swipe through to meet your home."}
        </p>
      </div>

      <div className="relative px-6 pb-4 pt-2">
        <KenteStrip className="rounded-md ring-1 ring-[var(--color-line)]" />
      </div>

      <AdinkraDotsBg />
      <div className="pointer-events-none absolute right-6 top-2 text-[var(--color-gold-3)]">
        <Lozenge width={10} height={10} />
      </div>
    </div>
  );
}

function WelcomeContent() {
  return (
    <div className="relative mt-5 flex flex-1 flex-col">
      <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[var(--feature-deep-gold)]">
        an app by ALIVE
      </p>
      <h2 className="acts-shimmer mt-1 font-display text-[64px] leading-none tracking-[0.05em] text-gold-grad">
        ACTS
      </h2>
      <div className="mt-3 text-[var(--feature-deep-gold)]">
        <ArabesqueDivider width={180} />
      </div>
      <p className="mt-3 text-[14px] font-medium text-[var(--feature-accent)]">
        Live the Word. Together.
      </p>
      <p className="mt-3 text-[13px] leading-relaxed text-[var(--feature-fg)]/85 font-serif">
        A unified home for daily scripture, communal prayer, practical living, and serious study — built for a church that wants to walk the same way.
      </p>

      <div className="mt-4 rounded-2xl bg-[var(--feature-tint)] p-3 ring-1 ring-[var(--feature-line)]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--feature-deep-gold)]">
          About ALIVE
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-[var(--feature-fg)]/85 font-serif">
          ALIVE is the company that builds ACTS. Our work is one thing — tools that help the church practice, not just believe.
        </p>
      </div>
    </div>
  );
}

function DefaultContent({ step }: { step: Step }) {
  return (
    <>
      <div className="relative mt-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[var(--color-gold-2)]/15 text-[var(--feature-accent)] ring-1 ring-[var(--color-gold-3)]">
        {step.accent}
      </div>
      <div className="relative mt-5">
        <h2 className="font-display text-[28px] tracking-wide leading-tight text-gold-grad">
          {step.title}
        </h2>
        <div className="mt-2 text-[var(--feature-deep-gold)]">
          <ArabesqueDivider width={180} />
        </div>
        <p className="mt-3 text-[13px] font-medium text-[var(--feature-accent)]">
          {step.subtitle}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-[var(--feature-fg)]/85 font-serif">
          {step.body}
        </p>
      </div>
    </>
  );
}

function CompanionPicker({
  userName,
  setUserName,
  selectedId,
  onPick,
}: {
  userName: string;
  setUserName: (n: string) => void;
  selectedId: CompanionId;
  onPick: (id: CompanionId) => void;
}) {
  return (
    <div className="relative mt-5 flex flex-1 flex-col">
      <h2 className="font-display text-[24px] tracking-wide leading-tight text-gold-grad">
        Walk with someone
      </h2>
      <div className="mt-2 text-[var(--feature-deep-gold)]">
        <ArabesqueDivider width={180} />
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-[var(--feature-fg)]/85 font-serif">
        Their voice will greet you in the morning, walk through challenges with you, and send words of encouragement.
      </p>

      <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--feature-deep-gold)]">
        Your first name
      </p>
      <input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="What should they call you?"
        className="mt-1 w-full rounded-2xl bg-[var(--feature-tint)] p-2.5 text-[13px] font-medium text-[var(--feature-fg)] outline-none ring-1 ring-[var(--feature-line)] focus:ring-[var(--color-gold-2)]"
      />

      <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--feature-deep-gold)]">
        Choose a companion
      </p>
      <div className="mt-2 space-y-2">
        {companions.map((c) => {
          const sel = selectedId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onPick(c.id)}
              className={`relative flex w-full items-start gap-3 overflow-hidden rounded-2xl bg-gradient-to-br ${c.accentClasses} p-3 text-left ring-1 transition active:scale-[0.98] ${
                sel
                  ? "ring-[var(--color-gold-1)] ring-2"
                  : "ring-[var(--feature-line)]"
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold-2)] text-[16px] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]">
                {c.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-display text-[15px] tracking-wide text-[var(--feature-accent)]">
                    {c.name}
                    <span className="ml-1 text-[10px] font-normal text-[var(--feature-fg-muted)]">
                      ({c.pronouns})
                    </span>
                  </p>
                  {sel && (
                    <span className="rounded-full bg-[var(--color-gold-2)] p-0.5 text-[var(--on-accent)]">
                      <CheckIcon width={10} height={10} />
                    </span>
                  )}
                </div>
                <p className="text-[11px] italic text-[var(--feature-fg)]/85 font-serif">
                  "{c.tagline}"
                </p>
                <p className="mt-1 text-[10px] text-[var(--feature-fg-muted)]">
                  {c.voice}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Faith Journey Step
// ─────────────────────────────────────────────────────────

function FaithJourneyStep({
  userName,
  companionName,
  companionEmoji,
  faithLevel,
  setFaithLevel,
  bibleLevel,
  setBibleLevel,
  communityStatus,
  setCommunityStatus,
  onComplete,
}: {
  userName: string;
  companionName: string;
  companionEmoji: string;
  faithLevel: FaithLevel | null;
  // These match the Setter<T> type from FaithContext: (value | (prev) => value) => void
  setFaithLevel: (v: FaithLevel | null | ((prev: FaithLevel | null) => FaithLevel | null)) => void;
  bibleLevel: BibleLevel | null;
  setBibleLevel: (v: BibleLevel | null | ((prev: BibleLevel | null) => BibleLevel | null)) => void;
  communityStatus: CommunityStatus | null;
  setCommunityStatus: (v: CommunityStatus | null | ((prev: CommunityStatus | null) => CommunityStatus | null)) => void;
  onComplete: () => void;
}) {
  // 3-question mini-wizard — auto-advance on each pick.
  const [q, setQ] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);

  // Scroll the question into view when q changes
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [q]);

  function handleSelect<T>(
    setter: (v: T | null | ((prev: T | null) => T | null)) => void,
    value: T,
    isLast: boolean
  ) {
    setter(value);
    // After a short pause so the user sees the selection register,
    // either move to the next question or complete the step.
    window.setTimeout(() => {
      if (isLast) {
        onComplete();
      } else {
        setQ((cur) => cur + 1);
      }
    }, 500);
  }

  return (
    <div ref={topRef} className="relative mt-5 flex flex-1 flex-col">
      <h2 className="font-display text-[22px] tracking-wide leading-tight text-gold-grad">
        Where are you, {userName}?
      </h2>
      <div className="mt-2 text-[var(--feature-deep-gold)]">
        <ArabesqueDivider width={180} />
      </div>

      {/* Companion warmth */}
      <div className="mt-3 flex items-start gap-2 rounded-2xl bg-[var(--color-gold-2)]/10 px-3 py-2 ring-1 ring-[var(--color-gold-3)]">
        <span className="text-base">{companionEmoji}</span>
        <p className="text-[11px] italic leading-snug text-[var(--feature-fg)]/85 font-serif">
          {companionName}: "There's no wrong answer. ACTS will meet you wherever you are."
        </p>
      </div>

      {/* Mini progress dots for the 3 questions */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {[0, 1, 2].map((j) => (
          <span
            key={j}
            className={`h-1 rounded-full transition-all ${
              j === q
                ? "w-5 bg-[var(--color-gold-2)]"
                : j < q
                ? "w-1.5 bg-[var(--color-gold-1)]"
                : "w-1.5 bg-[var(--color-gold-4)]/40"
            }`}
          />
        ))}
      </div>

      {/* Show one question at a time — auto-advances on selection */}
      {q === 0 && (
        <FaithSelector
          eyebrow="1 of 3 · Your relationship with God"
          question="Which describes where you are?"
          options={faithLevels}
          selected={faithLevel}
          onSelect={(v) => handleSelect(setFaithLevel, v, false)}
        />
      )}
      {q === 1 && (
        <FaithSelector
          eyebrow="2 of 3 · Your familiarity with the Bible"
          question="How well do you know Scripture?"
          options={bibleLevels}
          selected={bibleLevel}
          onSelect={(v) => handleSelect(setBibleLevel, v, false)}
        />
      )}
      {q === 2 && (
        <FaithSelector
          eyebrow="3 of 3 · Your community"
          question="Are you walking with other believers?"
          options={communityStatuses}
          selected={communityStatus}
          onSelect={(v) => handleSelect(setCommunityStatus, v, true)}
        />
      )}

      <p className="mt-4 text-[10px] italic text-[var(--feature-fg-muted)] font-serif">
        You can change any of these later. Honesty over performance.
      </p>
    </div>
  );
}

// Shared selector component — used by Onboarding AND Profile (via import)
type Option<T extends string> = {
  id: T;
  emoji: string;
  label: string;
  short: string;
  description: string;
};

interface FaithSelectorProps<T extends string> {
  eyebrow: string;
  question: string;
  options: Option<T>[];
  selected: T | null;
  onSelect: (id: T) => void;
}

function FaithSelector<T extends string>({
  eyebrow,
  question,
  options,
  selected,
  onSelect,
}: FaithSelectorProps<T>) {
  const selectedOption = options.find((o) => o.id === selected);
  return (
    <section className="mt-5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--feature-deep-gold)]">
        {eyebrow}
      </p>
      <h3 className="mt-1 font-display text-[14px] tracking-wide text-[var(--feature-accent)]">
        {question}
      </h3>

      <div className="mt-2 space-y-1.5">
        {options.map((opt) => {
          const sel = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`flex w-full items-start gap-2.5 rounded-2xl px-3 py-2 text-left transition active:scale-[0.98] ${
                sel
                  ? "bg-[var(--color-gold-2)]/15 ring-2 ring-[var(--color-gold-1)]"
                  : "bg-[var(--feature-tint)] ring-1 ring-[var(--feature-line)]"
              }`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold-2)] text-[13px] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]">
                {opt.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[12px] font-semibold text-[var(--feature-accent)]">
                    {opt.label}
                  </p>
                  {sel && (
                    <CheckIcon width={11} height={11} className="shrink-0 text-[var(--color-gold-1)]" />
                  )}
                </div>
                <p className="text-[10.5px] leading-snug text-[var(--feature-fg-muted)]">
                  {opt.short}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Description of the selected option */}
      {selectedOption && (
        <div className="mt-2 rounded-2xl bg-[var(--feature-tint)] p-3 ring-1 ring-[var(--color-gold-3)]">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--feature-deep-gold)]">
            <Lozenge width={9} height={9} /> {selectedOption.label}
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-[var(--feature-fg)]/85 font-serif">
            {selectedOption.description}
          </p>
        </div>
      )}
    </section>
  );
}