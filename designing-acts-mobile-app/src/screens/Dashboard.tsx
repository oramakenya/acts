import { useState } from "react";
import {
  verseOfTheDay,
  dailyChallenge,
  weeklyTheme,
  churchPulse,
} from "../data/content";
import { FlameIcon, ArrowRight, CheckIcon, QuoteIcon, BellIcon, CloseIcon } from "../components/icons";
import {
  ArabesqueDivider,
  IslamicTile,
  KenteStrip,
  Lozenge,
  MashrabiyaBg,
  AdinkraDotsBg,
  StarOctagram,
} from "../components/Ornament";
import { useToast } from "../components/Toast";
import { useCompanion } from "../components/CompanionContext";
import { CompanionBubble } from "../components/CompanionBubble";
import type { Screen } from "../App";

type Props = {
  navigate: (s: Screen) => void;
  challengeDone: boolean;
  onCompleteChallenge: () => void;
  reflected: boolean;
  onReflect: () => void;
  streak: number;
  prayersOffered: number;
};

export function Dashboard({
  navigate,
  challengeDone,
  onCompleteChallenge,
  reflected,
  onReflect,
  streak,
  prayersOffered,
}: Props) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const todayShort = new Date().toLocaleDateString("en-US", { weekday: "short" });
  const toast = useToast();
  const [showNotifs, setShowNotifs] = useState(false);
  const { userName, companion } = useCompanion();

  const notifications = [
    { id: "n1", icon: companion.emoji, title: `${companion.name}: "A word for you this morning — open today's verse."`, ago: "10 min", isCompanion: true },
    { id: "n2", icon: "🤲", title: "5 new prayer requests near you", ago: "30 min", isCompanion: false },
    { id: "n3", icon: "⛪", title: "Pastor Daniel posted a sermon note", ago: "2 hr", isCompanion: false },
    { id: "n4", icon: "🔥", title: `${streak}-day streak — He sees your faithfulness.`, ago: "today", isCompanion: false },
    { id: "n5", icon: "📖", title: "Continue: Hermeneutics, step 3", ago: "yesterday", isCompanion: false },
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto pb-4 pt-10 pat-mudcloth">
      {/* Wordmark */}
      <div className="flex items-center justify-between px-6 pt-1">
        <div className="flex items-baseline gap-2">
          <span className="acts-shimmer font-display text-[18px] tracking-[0.18em] text-gold-grad">
            ACTS
          </span>
          <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-3)]">
            by <span className="text-[var(--color-gold-1)]">ALIVE</span>
          </span>
        </div>
        <button
          onClick={() => setShowNotifs(true)}
          className="relative rounded-full bg-[var(--color-charcoal)] p-2 text-[var(--color-gold-1)] shadow-sm ring-1 ring-[var(--color-line)] active:scale-95"
        >
          <BellIcon width={16} height={16} />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[var(--color-gold-2)] shimmer" />
        </button>
      </div>

      {/* Header */}
      <div className="px-6 pt-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-3)]">
          {today}
        </p>
        <h1 className="acts-shimmer mt-1 font-display text-[24px] tracking-wide text-gold-grad">
          Peace to you, {userName}
        </h1>
        <div className="mt-1 text-[var(--color-gold-3)]">
          <ArabesqueDivider width={160} />
        </div>

        {/* Companion greeting */}
        <div className="mt-3">
          <CompanionBubble tone="morning" />
        </div>

        {/* Streak strip */}
        <div className="relative mt-4 flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a1209] via-[#231806] to-[#1a1209] p-3 ring-1 ring-[var(--color-line-strong)]">
          <AdinkraDotsBg />
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]">
            <FlameIcon width={20} height={20} />
          </div>
          <div className="relative flex-1">
            <p className="text-sm font-semibold text-[var(--color-gold-1)]">{streak}-day walk</p>
            <p className="text-[11px] text-[var(--color-bronze)]">
              Keep showing up — He meets us in the daily.
            </p>
          </div>
          <button
            onClick={() => navigate("profile")}
            className="relative rounded-full bg-[var(--tint)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-4)]"
          >
            View
          </button>
        </div>
      </div>

      {/* Verse of the Day */}
      <section className="relative mx-6 mt-5 overflow-hidden rounded-3xl bg-[var(--color-charcoal)] text-[var(--color-cream)] shadow-lg ring-1 ring-[var(--color-gold-4)]">
        <MashrabiyaBg />
        {/* gold corners */}
        <span className="pointer-events-none absolute left-3 top-3 text-[var(--color-gold-2)]">
          <StarOctagram width={14} height={14} />
        </span>
        <span className="pointer-events-none absolute right-3 top-3 text-[var(--color-gold-2)]">
          <StarOctagram width={14} height={14} />
        </span>
        <div className="relative p-5">
          <div className="absolute right-4 top-12 text-[var(--color-gold-3)] opacity-25">
            <QuoteIcon width={48} height={48} />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-3)] text-center">
            Verse of the Day
          </p>
          <div className="my-2 text-[var(--color-gold-2)]">
            <ArabesqueDivider />
          </div>
          <p className="mt-1 font-serif text-[18px] leading-snug text-[var(--color-cream)]">
            "{verseOfTheDay.text}"
          </p>
          <p className="mt-2 text-xs font-medium text-[var(--color-gold-1)] font-display tracking-wider">
            — {verseOfTheDay.reference}
          </p>

          <div className="mt-4 rounded-2xl bg-[var(--tint-soft)] p-3 ring-1 ring-[var(--color-line)]">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
              Context
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--color-bronze)]">
              {verseOfTheDay.context}
            </p>
          </div>

          <div className="mt-3 rounded-2xl bg-[var(--color-gold-2)]/10 p-3 ring-1 ring-[var(--color-gold-3)]">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-1)]">
              Reflect
            </p>
            <p className="mt-1 text-[12px] italic leading-relaxed text-[var(--color-cream)] font-serif">
              {verseOfTheDay.reflection}
            </p>
            <button
              onClick={() => {
                if (!reflected) {
                  onReflect();
                  toast(`${companion.name}: reflection received`);
                }
              }}
              disabled={reflected}
              className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2 text-[12px] font-semibold transition ${
                reflected
                  ? "bg-[var(--color-gold-4)]/40 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
                  : "bg-[var(--color-gold-2)] text-[var(--on-accent)] active:scale-[0.98] ring-1 ring-[var(--color-gold-1)]"
              }`}
            >
              {reflected ? (
                <>
                  <CheckIcon width={14} height={14} /> Reflected today
                </>
              ) : (
                <>I sat with this</>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Daily Challenge */}
      <section className="relative mx-6 mt-4 overflow-hidden rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line)]">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-gold-3)]">
            Daily Challenge
          </p>
          <span className="rounded-full bg-[var(--tint)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]">
            {dailyChallenge.category} · {dailyChallenge.estimatedMinutes} min
          </span>
        </div>
        <h3 className="mt-2 font-display text-[17px] tracking-wide text-[var(--color-gold-1)]">
          {dailyChallenge.title}
        </h3>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-cream)]/85">
          {dailyChallenge.description}
        </p>
        <p className="mt-2 text-[11px] italic text-[var(--color-bronze)]">
          Tied to today's verse · {dailyChallenge.tiedTo}
        </p>
        <button
          onClick={() => {
            if (!challengeDone) {
              onCompleteChallenge();
              toast(`${companion.name}: well walked, ${userName}`);
            }
          }}
          disabled={challengeDone}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-semibold transition ${
            challengeDone
              ? "bg-[var(--color-gold-4)]/30 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
              : "bg-[var(--color-gold-2)] text-[var(--on-accent)] active:scale-[0.99] ring-1 ring-[var(--color-gold-1)]"
          }`}
        >
          {challengeDone ? (
            <>
              <CheckIcon width={16} height={16} /> Done — well walked
            </>
          ) : (
            <>Mark as done</>
          )}
        </button>
      </section>

      {/* Weekly theme */}
      <section className="relative mx-6 mt-4 rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-gold-3)]">
              This Week
            </p>
            <h3 className="mt-1 font-display text-[15px] tracking-wide text-[var(--color-gold-1)]">
              {weeklyTheme.title}
            </h3>
            <p className="text-[11px] text-[var(--color-bronze)]">{weeklyTheme.scripture}</p>
          </div>
          <button
            onClick={() => navigate("practical")}
            className="rounded-full bg-[var(--tint)] p-2 text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]"
          >
            <ArrowRight width={14} height={14} />
          </button>
        </div>
        <div className="day-stagger mt-3 flex justify-between gap-1">
          {weeklyTheme.days.map((d, i) => {
            const isToday = d.day === todayShort;
            const isPast = i < 4;
            return (
              <div
                key={d.day}
                className={`flex flex-1 flex-col items-center rounded-xl py-2 text-[10px] ring-1 ${
                  isToday
                    ? "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-[var(--color-gold-1)]"
                    : isPast
                    ? "bg-[var(--color-gold-2)]/15 text-[var(--color-gold-1)] ring-[var(--color-gold-4)]"
                    : "bg-[var(--tint-soft)] text-[var(--color-muted)] ring-[var(--color-line)]"
                }`}
              >
                <span className="font-bold">{d.day}</span>
                <span className="mt-1 text-[14px]">
                  {isPast ? "✓" : isToday ? "✦" : "·"}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feelings — heart-led entry */}
      <button
        onClick={() => navigate("feelings")}
        className="relative mx-6 mt-4 flex w-auto items-center gap-3 overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a1206] via-[#3a1a0a] to-[#2a1206] p-4 text-left ring-1 ring-[var(--color-gold-3)] active:scale-[0.99]"
      >
        <AdinkraDotsBg />
        <StarOctagram
          width={14}
          height={14}
          className="absolute right-3 top-3 text-[var(--color-gold-2)] shimmer"
        />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]">
          <span className="text-xl">💛</span>
        </div>
        <div className="relative min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--feature-deep-gold)]">
            How is your heart?
          </p>
          <p className="mt-0.5 font-display text-[14px] tracking-wide text-[var(--feature-accent)]">
            Find scripture for what you feel
          </p>
          <p className="mt-0.5 text-[10px] text-[var(--feature-fg)]/70">
            Hope · Peace · Fear · Grief · Doubt · Joy · 10 more
          </p>
        </div>
        <ArrowRight width={16} height={16} className="relative text-[var(--feature-accent)]" />
      </button>

      {/* Quick links */}
      <section className="mx-6 mt-4 grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate("prayer")}
          className="relative overflow-hidden rounded-3xl bg-[var(--color-charcoal)] p-4 text-left ring-1 ring-[var(--color-line-strong)]"
        >
          <div className="absolute right-2 top-2 text-[var(--color-gold-3)] opacity-50">
            <IslamicTile size={48} />
          </div>
          <p className="text-2xl">🤲</p>
          <p className="mt-2 text-sm font-semibold font-display text-[var(--color-gold-1)] tracking-wide">
            Prayer Wall
          </p>
          <p className="mt-0.5 text-[11px] text-[var(--color-bronze)]">
            12 new requests need a prayer
          </p>
        </button>
        <button
          onClick={() => navigate("study")}
          className="relative overflow-hidden rounded-3xl bg-[var(--color-charcoal)] p-4 text-left ring-1 ring-[var(--color-line-strong)]"
        >
          <div className="absolute right-2 top-2 text-[var(--color-gold-3)] opacity-50">
            <IslamicTile size={48} />
          </div>
          <p className="text-2xl">📖</p>
          <p className="mt-2 text-sm font-semibold font-display text-[var(--color-gold-1)] tracking-wide">
            Study Hub
          </p>
          <p className="mt-0.5 text-[11px] text-[var(--color-bronze)]">
            Continue: Hermeneutics, step 3
          </p>
        </button>
      </section>

      {/* Church pulse */}
      <section className="relative mx-6 mt-4 overflow-hidden rounded-3xl bg-[var(--color-feature)] p-4 text-[var(--feature-fg)] shadow-lg ring-1 ring-[var(--color-gold-4)]">
        <MashrabiyaBg />
        <div className="relative">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-gold-3)]">
              Church Pulse — Today
            </p>
            <Lozenge width={12} height={12} className="text-[var(--color-gold-2)]" />
          </div>
          <p className="mt-1 text-[11px] text-[var(--feature-fg-muted)]">
            Across {churchPulse.congregations} congregations
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Stat n={churchPulse.prayersOfferedToday.toLocaleString()} label="🤲 prayers" />
            <Stat n={churchPulse.praisesOfferedToday.toString()} label="🙌 praises" />
            <Stat n={churchPulse.activeMembers.toString()} label="walking" />
          </div>
          <p className="mt-3 text-[11px] italic text-[var(--color-gold-1)]/80">
            You are part of {prayersOffered} of those prayers this month.
          </p>
        </div>
      </section>

      {/* Bottom Kente strip flourish */}
      <div className="mx-6 mt-5">
        <KenteStrip className="rounded-md ring-1 ring-[var(--color-line)]" />
      </div>

      {showNotifs && (
        <div className="absolute inset-0 z-30 flex items-start bg-[var(--scrim)]" onClick={() => setShowNotifs(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-10 w-full rounded-b-3xl bg-[var(--color-onyx)] p-5 ring-1 ring-[var(--color-gold-3)]"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-[16px] tracking-wide text-[var(--color-gold-1)]">
                Notifications
              </h3>
              <button
                onClick={() => setShowNotifs(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]"
              >
                <CloseIcon width={14} height={14} />
              </button>
            </div>
            <div className="mt-2 text-[var(--color-gold-3)]">
              <ArabesqueDivider />
            </div>
            <ul className="mt-2 space-y-1.5">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 ring-1 ${
                    n.isCompanion
                      ? "bg-[var(--color-gold-2)]/10 ring-[var(--color-gold-3)]"
                      : "bg-[var(--color-charcoal)] ring-[var(--color-line)]"
                  }`}
                >
                  <span className="text-lg">{n.icon}</span>
                  <p className={`flex-1 text-[12px] ${n.isCompanion ? "font-serif italic text-[var(--color-gold-1)]" : "text-[var(--color-cream)]"}`}>
                    {n.title}
                  </p>
                  <span className="text-[10px] text-[var(--color-muted)]">{n.ago}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                toast("All marked read");
                setShowNotifs(false);
              }}
              className="mt-3 w-full rounded-xl bg-[var(--color-gold-2)] py-2 text-[12px] font-semibold text-[var(--on-accent)]"
            >
              Mark all read
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-2xl bg-[var(--feature-tint)] p-2.5 ring-1 ring-[var(--feature-line)]">
      <p className="font-display text-lg text-[var(--feature-accent)] tracking-wide">{n}</p>
      <p className="text-[10px] text-[var(--feature-fg-muted)]">{label}</p>
    </div>
  );
}
