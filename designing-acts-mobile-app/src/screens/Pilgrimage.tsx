import { useMemo, useState } from "react";
import {
  seedPilgrimage,
  pilgrimageTemplates,
  currentStreak,
  progressPct,
  victoryDays,
  today,
  type PilgrimageGoal,
  type PilgrimageTemplate,
  type GoalKind,
} from "../data/pilgrimage";
import {
  ChevronLeft,
  ChevronRight,
  PlusIcon,
  CheckIcon,
  CloseIcon,
  FlameIcon,
} from "../components/icons";
import {
  ArabesqueDivider,
  Lozenge,
  StarOctagram,
  AdinkraDotsBg,
  MashrabiyaBg,
  OrnateHeading,
} from "../components/Ornament";
import { CompanionBubble } from "../components/CompanionBubble";
import { useToast } from "../components/Toast";

export function Pilgrimage() {
  const [goals, setGoals] = useState<PilgrimageGoal[]>(seedPilgrimage);
  const [openId, setOpenId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [filter, setFilter] = useState<"all" | GoalKind>("all");
  const toast = useToast();

  const visible = useMemo(
    () => goals.filter((g) => filter === "all" || g.kind === filter),
    [goals, filter]
  );

  const totalDays = useMemo(
    () => goals.reduce((sum, g) => sum + victoryDays(g), 0),
    [goals]
  );
  const activeCount = goals.filter((g) => g.active).length;
  const bestStreak = useMemo(
    () => goals.reduce((max, g) => Math.max(max, currentStreak(g)), 0),
    [goals]
  );

  function checkInToday(goalId: string, victory: boolean) {
    const t = today();
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        const existing = g.checkIns.find((c) => c.date === t);
        if (existing) {
          return {
            ...g,
            checkIns: g.checkIns.map((c) =>
              c.date === t ? { ...c, victory } : c
            ),
          };
        }
        return {
          ...g,
          checkIns: [{ date: t, victory }, ...g.checkIns],
        };
      })
    );
    toast(victory ? "Day claimed" : "Honest — He meets you here");
  }

  function createGoal(g: PilgrimageGoal) {
    setGoals((prev) => [g, ...prev]);
    setCreating(false);
    toast("Journey started");
  }

  function archiveGoal(goalId: string) {
    setGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, active: false } : g))
    );
    toast("Journey archived — well walked");
  }

  const open = openId ? goals.find((g) => g.id === openId) : null;

  if (open) {
    return (
      <GoalDetail
        goal={open}
        onBack={() => setOpenId(null)}
        onCheckIn={(v) => checkInToday(open.id, v)}
        onArchive={() => {
          archiveGoal(open.id);
          setOpenId(null);
        }}
      />
    );
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto pat-mudcloth">
      {/* Header */}
      <div className="px-6 pt-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-3)]">
          Ephesians 4:22–24
        </p>
        <h2 className="mt-1 font-display text-[22px] tracking-wide text-gold-grad">
          My Pilgrimage
        </h2>
        <div className="mt-1 text-[var(--color-gold-3)]">
          <ArabesqueDivider width={180} />
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-cream)]/80">
          Put off the old self. Put on the new. Customize what you're laying down and what you're taking up — and walk it day by day.
        </p>
      </div>

      {/* Companion encouragement */}
      <div className="mx-6 mt-3">
        <CompanionBubble tone="pilgrimage" compact />
      </div>

      {/* Stats */}
      <div className="mx-6 mt-4 grid grid-cols-3 gap-2">
        <Stat icon={<FlameIcon width={14} height={14} />} n={bestStreak} label="best streak" />
        <Stat icon={<CheckIcon width={14} height={14} />} n={totalDays} label="victory days" />
        <Stat icon={<Lozenge width={12} height={12} />} n={activeCount} label="active" />
      </div>

      {/* Filter pills */}
      <div className="mx-6 mt-4 flex gap-2">
        <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
          All journeys
        </FilterPill>
        <FilterPill active={filter === "putoff"} onClick={() => setFilter("putoff")}>
          Putting off
        </FilterPill>
        <FilterPill active={filter === "puton"} onClick={() => setFilter("puton")}>
          Putting on
        </FilterPill>
      </div>

      {/* New journey CTA */}
      <button
        onClick={() => setCreating(true)}
        className="relative mx-6 mt-3 flex items-center gap-3 overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a1a06] via-[#3d2509] to-[#2a1a06] p-4 text-left ring-1 ring-[var(--color-gold-3)] active:scale-[0.99]"
      >
        <AdinkraDotsBg />
        <StarOctagram width={14} height={14} className="absolute right-3 top-3 text-[var(--color-gold-2)] shimmer" />
        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]">
          <PlusIcon width={20} height={20} />
        </div>
        <div className="relative min-w-0 flex-1">
          <p className="font-display text-[14px] tracking-wide text-[var(--feature-accent)]">
            Start a new journey
          </p>
          <p className="mt-0.5 text-[10px] text-[var(--feature-fg)]/70">
            Pick from suggestions or build your own
          </p>
        </div>
      </button>

      {/* Goals list */}
      <div className="space-y-3 px-6 py-4">
        {visible.length === 0 ? (
          <div className="rounded-3xl bg-[var(--color-charcoal)] p-6 text-center ring-1 ring-[var(--color-line)]">
            <p className="text-3xl">🌱</p>
            <p className="mt-2 font-display text-[14px] tracking-wide text-[var(--color-gold-1)]">
              No journeys yet
            </p>
            <p className="mt-1 text-[11px] text-[var(--color-bronze)]">
              Tap "Start a new journey" to begin your first.
            </p>
          </div>
        ) : (
          visible.map((g) => (
            <GoalCard
              key={g.id}
              goal={g}
              onOpen={() => setOpenId(g.id)}
              onQuickCheck={() => checkInToday(g.id, true)}
            />
          ))
        )}
      </div>

      {creating && (
        <NewGoalModal
          onClose={() => setCreating(false)}
          onCreate={createGoal}
        />
      )}
    </div>
  );
}

function FilterPill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
        active
          ? "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
          : "bg-[var(--color-charcoal)] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]"
      }`}
    >
      {children}
    </button>
  );
}

function Stat({
  icon,
  n,
  label,
}: {
  icon: React.ReactNode;
  n: number;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-[var(--color-charcoal)] p-3 ring-1 ring-[var(--color-line)]">
      <div className="flex items-center justify-between">
        <span className="text-[var(--color-gold-2)]">{icon}</span>
        <span className="font-display text-[20px] tracking-wide text-[var(--color-gold-1)]">
          {n}
        </span>
      </div>
      <p className="mt-1 text-[10px] font-medium text-[var(--color-bronze)]">
        {label}
      </p>
    </div>
  );
}

function GoalCard({
  goal,
  onOpen,
  onQuickCheck,
}: {
  goal: PilgrimageGoal;
  onOpen: () => void;
  onQuickCheck: () => void;
}) {
  const pct = progressPct(goal);
  const streak = currentStreak(goal);
  const t = today();
  const todayCheck = goal.checkIns.find((c) => c.date === t);
  const isPutOff = goal.kind === "putoff";
  const kindLabel = isPutOff ? "Putting off" : "Putting on";
  const kindGradient = isPutOff
    ? "from-[#2a0a0a]/40 to-[#5a1a1a]/40"
    : "from-[#1a2a14]/40 to-[#3a5a1c]/40";
  const kindColor = isPutOff ? "text-[#f5b07a]" : "text-[#b0d68a]";

  return (
    <article
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${kindGradient} p-4 shadow-sm ring-1 ring-[var(--color-line-strong)]`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${kindColor}`}>
          {kindLabel}
        </span>
        <span className="rounded-full bg-[var(--tint)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]">
          {goal.category}
        </span>
      </div>

      <button
        onClick={onOpen}
        className="mt-2 block w-full text-left"
      >
        <h3 className="font-display text-[15px] leading-tight tracking-wide text-[var(--color-cream)]">
          {goal.title}
        </h3>
        <p className="mt-1 text-[11px] italic text-[var(--color-bronze)] font-serif">
          "{goal.why}"
        </p>
        {goal.scripture && (
          <p className="mt-1 text-[10px] font-display tracking-wider text-[var(--color-gold-2)]">
            — {goal.scripture}
          </p>
        )}
      </button>

      {/* Progress */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-[10px] text-[var(--color-bronze)]">
          <span>{victoryDays(goal)} / {goal.targetDays} days</span>
          <span className="font-semibold text-[var(--color-gold-1)]">{pct}%</span>
        </div>
        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[var(--tint)]">
          <div
            className="h-full rounded-full bg-[var(--color-gold-2)] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-1 flex items-center gap-1 text-[10px] text-[var(--color-bronze)]">
          <FlameIcon width={10} height={10} className="text-[var(--color-gold-2)]" />
          <span>{streak}-day streak</span>
        </div>
      </div>

      {/* Quick check-in */}
      <div className="mt-3 flex items-center gap-2 border-t border-[var(--color-line)] pt-3">
        {todayCheck ? (
          <div className="flex flex-1 items-center justify-between rounded-xl bg-[var(--tint)] px-3 py-2 text-[11px] ring-1 ring-[var(--color-line)]">
            <span className="text-[var(--color-cream)]">
              {todayCheck.victory ? "✓ Walked in it today" : "Stumbled — and that's okay"}
            </span>
            <button
              onClick={onOpen}
              className="text-[10px] font-semibold text-[var(--color-gold-1)]"
            >
              Edit
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={onQuickCheck}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[var(--color-gold-2)] py-2 text-[11px] font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] active:scale-[0.98]"
            >
              <CheckIcon width={12} height={12} /> Walked today
            </button>
            <button
              onClick={onOpen}
              className="rounded-xl bg-[var(--color-charcoal)] px-3 py-2 text-[11px] font-semibold text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]"
            >
              Detail
            </button>
          </>
        )}
      </div>
    </article>
  );
}

function GoalDetail({
  goal,
  onBack,
  onCheckIn,
  onArchive,
}: {
  goal: PilgrimageGoal;
  onBack: () => void;
  onCheckIn: (victory: boolean) => void;
  onArchive: () => void;
}) {
  const pct = progressPct(goal);
  const streak = currentStreak(goal);
  const isPutOff = goal.kind === "putoff";

  return (
    <div className="flex h-full flex-col overflow-y-auto pat-mudcloth">
      <div className="flex items-center gap-3 px-5 pt-2">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]"
        >
          <ChevronLeft width={18} height={18} />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
            {isPutOff ? "Putting off" : "Putting on"} · {goal.category}
          </p>
          <h2 className="truncate font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
            {goal.title}
          </h2>
        </div>
      </div>

      {/* Hero */}
      <div className="relative mx-5 mt-4 overflow-hidden rounded-3xl bg-[var(--color-feature)] p-5 ring-1 ring-[var(--color-gold-3)]">
        <MashrabiyaBg />
        <StarOctagram width={14} height={14} className="absolute right-3 top-3 text-[var(--color-gold-2)]" />
        <p className="relative text-[10px] font-semibold uppercase tracking-wider text-[var(--feature-deep-gold)]">
          Your why
        </p>
        <p className="relative mt-1 font-serif text-[14px] italic leading-relaxed text-[var(--feature-fg)]">
          "{goal.why}"
        </p>
        {goal.scripture && (
          <p className="relative mt-2 font-display text-[11px] tracking-wider text-[var(--feature-accent)]">
            — {goal.scripture}
          </p>
        )}

        <div className="relative mt-4 grid grid-cols-3 gap-2">
          <FStat n={`${streak}`} label="streak" />
          <FStat n={`${victoryDays(goal)}/${goal.targetDays}`} label="days" />
          <FStat n={`${pct}%`} label="progress" />
        </div>

        <div className="relative mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--feature-tint)]">
          <div
            className="h-full rounded-full bg-[var(--color-gold-2)] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Companion */}
      <div className="mx-5 mt-3">
        <CompanionBubble tone="pilgrimage" compact />
      </div>

      {/* Today's check-in */}
      <div className="mx-5 mt-3 rounded-3xl bg-[var(--color-charcoal)] p-4 ring-1 ring-[var(--color-line)]">
        <OrnateHeading eyebrow="Today" title="How did you walk?" />
        <p className="mt-2 text-[11px] text-[var(--color-bronze)]">
          Honest is better than impressive. Stumbles are part of the pilgrimage.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={() => onCheckIn(true)}
            className="flex items-center justify-center gap-1.5 rounded-2xl bg-[var(--color-gold-2)] py-3 text-[12px] font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
          >
            <CheckIcon width={14} height={14} /> Walked in it
          </button>
          <button
            onClick={() => onCheckIn(false)}
            className="flex items-center justify-center gap-1.5 rounded-2xl bg-[var(--color-charcoal)] py-3 text-[12px] font-semibold text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]"
          >
            Stumbled
          </button>
        </div>
      </div>

      {/* 30-day grid */}
      <div className="mx-5 mt-3 rounded-3xl bg-[var(--color-charcoal)] p-4 ring-1 ring-[var(--color-line)]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Last 30 days
        </p>
        <div className="mt-3 grid grid-cols-10 gap-1">
          {Array.from({ length: 30 }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (29 - i));
            const iso = d.toISOString().slice(0, 10);
            const c = goal.checkIns.find((x) => x.date === iso);
            const cls = !c
              ? "bg-[var(--tint-soft)]"
              : c.victory
              ? "bg-[var(--color-gold-2)]"
              : "bg-[#5a1a1a]/60";
            return (
              <div
                key={i}
                className={`aspect-square rounded-md ${cls}`}
                title={iso}
              />
            );
          })}
        </div>
        <div className="mt-2 flex items-center justify-between text-[9px] text-[var(--color-bronze)]">
          <span>30 days ago</span>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-[var(--color-gold-2)]" /> walk
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-[#5a1a1a]/60" /> stumble
            </span>
          </div>
          <span>today</span>
        </div>
      </div>

      {/* History */}
      {goal.checkIns.length > 0 && (
        <div className="mx-5 mt-3 rounded-3xl bg-[var(--color-charcoal)] p-4 ring-1 ring-[var(--color-line)]">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
            Recent check-ins
          </p>
          <ul className="mt-2 space-y-1.5">
            {goal.checkIns.slice(0, 5).map((c) => (
              <li
                key={c.date}
                className="flex items-center justify-between rounded-xl bg-[var(--tint-soft)] px-3 py-2 text-[11px] ring-1 ring-[var(--color-line)]"
              >
                <span className="text-[var(--color-cream)]">{c.date}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    c.victory
                      ? "bg-[var(--color-gold-2)]/20 text-[var(--color-gold-1)]"
                      : "bg-[#5a1a1a]/30 text-[#f5b07a]"
                  }`}
                >
                  {c.victory ? "✓ walked" : "stumbled"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mx-5 my-4">
        <button
          onClick={onArchive}
          className="w-full rounded-2xl bg-[var(--color-charcoal)] py-2.5 text-[11px] font-semibold text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]"
        >
          Archive this journey
        </button>
      </div>
    </div>
  );
}

function FStat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-xl bg-[var(--feature-tint)] p-2 ring-1 ring-[var(--feature-line)]">
      <p className="font-display text-[14px] tracking-wide text-[var(--feature-accent)]">
        {n}
      </p>
      <p className="text-[9px] text-[var(--feature-fg-muted)]">{label}</p>
    </div>
  );
}

function NewGoalModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (g: PilgrimageGoal) => void;
}) {
  const [step, setStep] = useState<"choose" | "template" | "custom">("choose");
  const [kind, setKind] = useState<GoalKind>("putoff");
  const [tplFilter, setTplFilter] = useState<GoalKind>("putoff");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [why, setWhy] = useState("");
  const [scripture, setScripture] = useState("");
  const [targetDays, setTargetDays] = useState(30);

  function pickTemplate(t: PilgrimageTemplate) {
    onCreate({
      id: `g-${Date.now()}`,
      kind: t.kind,
      title: t.title,
      category: t.category,
      why: t.why,
      scripture: t.scripture,
      startedOn: today(),
      targetDays: t.targetDays,
      checkIns: [],
      active: true,
    });
  }

  function createCustom() {
    if (!title.trim()) return;
    onCreate({
      id: `g-${Date.now()}`,
      kind,
      title: title.trim(),
      category: category.trim() || "Custom",
      why: why.trim() || "I want to walk in the new self.",
      scripture: scripture.trim() || undefined,
      startedOn: today(),
      targetDays,
      checkIns: [],
      active: true,
    });
  }

  const templates = pilgrimageTemplates.filter((t) => t.kind === tplFilter);

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-[var(--scrim)]">
      <div className="max-h-[94%] w-full overflow-y-auto rounded-t-3xl bg-[var(--color-onyx)] p-5 pb-7 ring-1 ring-[var(--color-gold-3)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step !== "choose" && (
              <button
                onClick={() => setStep("choose")}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]"
              >
                <ChevronLeft width={16} height={16} />
              </button>
            )}
            <h3 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
              Start a journey
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]"
          >
            <CloseIcon width={16} height={16} />
          </button>
        </div>
        <div className="mt-2 text-[var(--color-gold-3)]">
          <ArabesqueDivider />
        </div>

        {step === "choose" && (
          <div className="mt-3 space-y-3">
            <p className="text-[12px] leading-relaxed text-[var(--color-bronze)] font-serif italic">
              "You were taught to put off your old self... and to put on the new self." — Eph 4:22–24
            </p>
            <button
              onClick={() => {
                setKind("putoff");
                setTplFilter("putoff");
                setStep("template");
              }}
              className="block w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a0a0a]/60 to-[#5a1a1a]/60 p-4 text-left ring-1 ring-[var(--color-gold-4)] active:scale-[0.99]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#f5b07a]">
                Putting off
              </p>
              <p className="mt-1 font-display text-[16px] tracking-wide text-[var(--color-gold-1)]">
                Lay something down
              </p>
              <p className="mt-1 text-[11px] text-[var(--color-bronze)]">
                Quit a habit, break an addiction, end a pattern.
              </p>
              <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--color-gold-1)]">
                Choose <ChevronRight width={10} height={10} />
              </p>
            </button>
            <button
              onClick={() => {
                setKind("puton");
                setTplFilter("puton");
                setStep("template");
              }}
              className="block w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a2a14]/60 to-[#3a5a1c]/60 p-4 text-left ring-1 ring-[var(--color-gold-4)] active:scale-[0.99]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#b0d68a]">
                Putting on
              </p>
              <p className="mt-1 font-display text-[16px] tracking-wide text-[var(--color-gold-1)]">
                Take something up
              </p>
              <p className="mt-1 text-[11px] text-[var(--color-bronze)]">
                Build a practice, start a discipline, form a habit.
              </p>
              <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--color-gold-1)]">
                Choose <ChevronRight width={10} height={10} />
              </p>
            </button>
          </div>
        )}

        {step === "template" && (
          <div className="mt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
              Suggested journeys
            </p>
            <div className="mt-2 space-y-1.5">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => pickTemplate(t)}
                  className="block w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-left ring-1 ring-[var(--color-line)] active:scale-[0.99]"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-display text-[14px] tracking-wide text-[var(--color-gold-1)]">
                      {t.title}
                    </p>
                    <span className="text-[10px] text-[var(--color-bronze)]">
                      {t.targetDays} days
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-[var(--color-bronze)]">
                    {t.category} · {t.scripture}
                  </p>
                  <p className="mt-1 text-[11px] italic text-[var(--color-cream)]/85 font-serif">
                    "{t.why}"
                  </p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep("custom")}
              className="mt-3 w-full rounded-2xl bg-[var(--color-charcoal)] py-2.5 text-[12px] font-semibold text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
            >
              Or build your own →
            </button>
          </div>
        )}

        {step === "custom" && (
          <div className="mt-3 space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
              What are you {kind === "putoff" ? "laying down" : "taking up"}?
            </p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={kind === "putoff" ? "e.g. Sharp words with my spouse" : "e.g. Memorize one verse a week"}
              autoFocus
              className="w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] font-semibold text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
            />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category (e.g. Speech, Devotion, Mind)"
              className="w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
            />
            <textarea
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              rows={3}
              placeholder="Why does this matter to you? (your 'why' anchors the walk)"
              className="w-full resize-none rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
            />
            <input
              value={scripture}
              onChange={(e) => setScripture(e.target.value)}
              placeholder="Anchor scripture (optional, e.g. James 1:19)"
              className="w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[12px] text-[var(--color-cream)]/90 outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
            />

            <p className="pt-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
              Commit to
            </p>
            <div className="flex gap-1.5">
              {[14, 30, 60, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => setTargetDays(d)}
                  className={`flex-1 rounded-xl py-2 text-[11px] font-semibold ${
                    targetDays === d
                      ? "bg-[var(--color-gold-2)] text-[var(--on-accent)]"
                      : "bg-[var(--color-charcoal)] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]"
                  }`}
                >
                  {d} days
                </button>
              ))}
            </div>

            <button
              onClick={createCustom}
              disabled={!title.trim()}
              className="mt-2 w-full rounded-2xl bg-[var(--color-gold-2)] py-3 text-sm font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] disabled:opacity-40"
            >
              <span className="inline-flex items-center gap-2">
                <Lozenge width={10} height={10} /> Begin the journey{" "}
                <Lozenge width={10} height={10} />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
