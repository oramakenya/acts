import { useMemo, useState } from "react";
import {
  feelingCategories,
  toneColor,
  type FeelingCategory,
  type Passage,
} from "../data/feelings";
import {
  ChevronLeft,
  ChevronRight,
  SearchIcon,
  HandsIcon,
  CheckIcon,
  QuoteIcon,
  HeartIcon,
} from "../components/icons";
import {
  ArabesqueDivider,
  Lozenge,
  StarOctagram,
  OrnateHeading,
  AdinkraDotsBg,
  MashrabiyaBg,
  KenteStrip,
} from "../components/Ornament";
import { useToast } from "../components/Toast";
import { useCompanion } from "../components/CompanionContext";
import { CompanionBubble } from "../components/CompanionBubble";

export function Feelings() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "soft" | "hard">("All");

  const list = useMemo(() => {
    return feelingCategories.filter((c) => {
      const matchKind = filter === "All" || c.kind === filter;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.short.toLowerCase().includes(q) ||
        c.passages.some(
          (p) =>
            p.reference.toLowerCase().includes(q) ||
            p.text.toLowerCase().includes(q)
        );
      return matchKind && matchQ;
    });
  }, [filter, query]);

  const open = openId
    ? feelingCategories.find((c) => c.id === openId) ?? null
    : null;

  if (open) {
    return <FeelingDetail cat={open} onBack={() => setOpenId(null)} />;
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto pt-10 pat-mudcloth">
      <div className="px-6 pt-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-3)]">
          A place for the heart
        </p>
        <h1 className="mt-1 font-display text-[24px] tracking-wide text-gold-grad">
          What are you carrying?
        </h1>
        <div className="mt-1 text-[var(--color-gold-3)]">
          <ArabesqueDivider width={200} />
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-cream)]/80">
          Tap a feeling. Receive scripture that meets you there — not to fix you,
          but to keep you company.
        </p>

        {/* Search */}
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-[var(--color-charcoal)] px-3 py-2.5 ring-1 ring-[var(--color-line)]">
          <SearchIcon width={16} height={16} className="text-[var(--color-gold-2)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. 'I can't sleep' or 'lost someone'"
            className="w-full bg-transparent text-[13px] text-[var(--color-cream)] outline-none placeholder:text-[var(--color-muted)]"
          />
        </div>

        {/* Filter pills */}
        <div className="mt-3 flex gap-2">
          {[
            { id: "All" as const, label: "All" },
            { id: "soft" as const, label: "Uplift" },
            { id: "hard" as const, label: "Meet me here" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                filter === f.id
                  ? "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
                  : "bg-[var(--color-charcoal)] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured "How are you, really?" hero */}
      <div className="relative mx-6 mt-4 overflow-hidden rounded-3xl bg-[var(--color-feature)] p-4 ring-1 ring-[var(--color-gold-3)]">
        <MashrabiyaBg />
        <StarOctagram
          width={14}
          height={14}
          className="absolute right-3 top-3 text-[var(--color-gold-2)]"
        />
        <p className="relative text-[10px] font-semibold uppercase tracking-wider text-[var(--feature-deep-gold)]">
          A word over you
        </p>
        <p className="relative mt-2 font-serif text-[14px] italic leading-relaxed text-[var(--feature-fg)]">
          "He heals the brokenhearted and binds up their wounds."
        </p>
        <p className="relative mt-1 font-display text-[11px] tracking-wider text-[var(--feature-accent)]">
          — Psalm 147:3
        </p>
      </div>

      {/* Category grid */}
      <div className="mt-4 px-6 pb-4">
        {list.length === 0 ? (
          <p className="rounded-2xl bg-[var(--color-charcoal)] p-6 text-center text-[12px] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]">
            No matches — try another word, or browse all feelings.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {list.map((cat) => (
              <FeelingCard
                key={cat.id}
                cat={cat}
                onClick={() => setOpenId(cat.id)}
              />
            ))}
          </div>
        )}

        <div className="mt-6 text-[var(--color-gold-3)]">
          <KenteStrip className="rounded-md ring-1 ring-[var(--color-line)]" />
        </div>

        <p className="mt-4 text-center text-[11px] italic text-[var(--color-bronze)] font-serif">
          "Cast all your anxiety on him because he cares for you." — 1 Peter 5:7
        </p>
      </div>
    </div>
  );
}

function FeelingCard({
  cat,
  onClick,
}: {
  cat: FeelingCategory;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-start overflow-hidden rounded-3xl bg-gradient-to-br ${toneColor[cat.id]} p-3.5 text-left shadow-sm ring-1 ring-[var(--color-gold-4)] transition active:scale-[0.97]`}
    >
      <AdinkraDotsBg />
      <Lozenge
        width={10}
        height={10}
        className="absolute right-2 top-2 text-[var(--feature-accent)]/70"
      />
      <span className="relative text-3xl">{cat.emoji}</span>
      <p className="relative mt-2 font-display text-[14px] tracking-wide text-[var(--feature-accent)]">
        {cat.name}
      </p>
      <p className="relative mt-1 text-[11px] leading-snug text-[var(--feature-fg)]/85">
        {cat.short}
      </p>
      <span className="relative mt-2 flex items-center gap-1 text-[10px] font-medium text-[var(--feature-accent)]">
        {cat.passages.length} passages <ChevronRight width={10} height={10} />
      </span>
    </button>
  );
}

function FeelingDetail({
  cat,
  onBack,
}: {
  cat: FeelingCategory;
  onBack: () => void;
}) {
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [reflectingOn, setReflectingOn] = useState<number | null>(null);
  const toast = useToast();
  const { companion } = useCompanion();

  function toggleSave(i: number) {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
        toast("Removed from saved");
      } else {
        next.add(i);
        toast("Saved to your heart");
      }
      return next;
    });
  }

  function handleShare() {
    toast("Share sheet opening...");
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto pt-10 pat-mudcloth">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-2">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]"
        >
          <ChevronLeft width={18} height={18} />
        </button>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-3)]">
            For when you feel
          </p>
          <h2 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
            {cat.name}
          </h2>
        </div>
      </div>

      {/* Hero banner */}
      <div
        className={`relative mx-5 mt-4 overflow-hidden rounded-3xl bg-gradient-to-br ${toneColor[cat.id]} p-5 ring-1 ring-[var(--color-gold-3)]`}
      >
        <AdinkraDotsBg />
        <div className="relative flex items-center gap-3">
          <span className="text-4xl">{cat.emoji}</span>
          <div>
            <p className="font-display text-[18px] tracking-wide text-[var(--feature-accent)]">
              {cat.name}
            </p>
            <p className="text-[11px] text-[var(--feature-fg)]/80">{cat.short}</p>
          </div>
        </div>
        <div className="relative mt-3 rounded-2xl bg-black/30 p-3 ring-1 ring-[var(--feature-line)]">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--feature-deep-gold)]">
            An invitation
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-[var(--feature-fg)]/90 font-serif italic">
            {cat.invitation}
          </p>
        </div>
      </div>

      {/* Companion voice */}
      <div className="mx-5 mt-3">
        <CompanionBubble tone="reflection" compact />
      </div>

      {/* Quick actions */}
      <div className="mx-5 mt-3 flex gap-2">
        <button
          onClick={() => toast(`${companion.name} is praying with you`)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-[var(--color-charcoal)] py-2 text-[11px] font-semibold text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)] active:scale-[0.98]"
        >
          <HandsIcon width={12} height={12} /> Pray with me
        </button>
        <button
          onClick={handleShare}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-[var(--color-charcoal)] py-2 text-[11px] font-semibold text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)] active:scale-[0.98]"
        >
          <HeartIcon width={12} height={12} /> Send to a friend
        </button>
      </div>

      {/* Passages */}
      <div className="space-y-3 px-5 py-4">
        <OrnateHeading eyebrow="Scripture" title="To meet you here" />
        {cat.passages.map((p, i) => (
          <PassageCard
            key={i}
            passage={p}
            saved={savedIds.has(i)}
            onToggleSave={() => toggleSave(i)}
            isReflecting={reflectingOn === i}
            onToggleReflect={() =>
              setReflectingOn((cur) => (cur === i ? null : i))
            }
          />
        ))}
      </div>

      {/* Closing */}
      <div className="mx-5 mb-5 rounded-3xl bg-[var(--color-charcoal)] p-4 ring-1 ring-[var(--color-line)]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Pair this with
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-cream)]/85 font-serif">
          The Lord is your shepherd. Don't carry this alone — share a request on
          the Prayer Wall or with your home church.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <QuickLink emoji="🤲" label="Prayer Wall" />
          <QuickLink emoji="⛪" label="My church" />
        </div>
      </div>
    </div>
  );
}

function PassageCard({
  passage,
  saved,
  onToggleSave,
  isReflecting,
  onToggleReflect,
}: {
  passage: Passage;
  saved: boolean;
  onToggleSave: () => void;
  isReflecting: boolean;
  onToggleReflect: () => void;
}) {
  const [reflection, setReflection] = useState("");
  const toast = useToast();

  return (
    <article className="relative overflow-hidden rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line-strong)]">
      <QuoteIcon
        width={36}
        height={36}
        className="absolute right-3 top-3 text-[var(--color-gold-3)] opacity-25"
      />
      <p className="font-serif text-[15px] leading-snug text-[var(--color-cream)]">
        "{passage.text}"
      </p>
      <p className="mt-2 font-display text-[12px] tracking-wider text-[var(--color-gold-2)]">
        — {passage.reference}
      </p>

      <div className="mt-3 flex items-start gap-2 rounded-2xl bg-[var(--color-gold-2)]/10 p-3 ring-1 ring-[var(--color-gold-3)]">
        <Lozenge width={10} height={10} className="mt-1 shrink-0 text-[var(--color-gold-2)]" />
        <p className="text-[11px] leading-relaxed text-[var(--color-cream)]/85">
          {passage.whyItMeets}
        </p>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={onToggleSave}
          className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold transition active:scale-95 ${
            saved
              ? "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
              : "bg-[var(--tint)] text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]"
          }`}
        >
          {saved ? <CheckIcon width={12} height={12} /> : <HeartIcon width={12} height={12} />}
          {saved ? "Saved" : "Save"}
        </button>
        <button
          onClick={onToggleReflect}
          className="flex items-center gap-1 rounded-full bg-[var(--tint)] px-3 py-1.5 text-[11px] font-semibold text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]"
        >
          ✍️ Reflect
        </button>
      </div>

      {isReflecting && (
        <div className="mt-3 rounded-2xl bg-[var(--tint)] p-3 ring-1 ring-[var(--color-line)]">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
            What does this stir in you?
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            rows={3}
            placeholder="Honest is better than poetic."
            className="mt-2 w-full resize-none rounded-xl bg-[var(--color-charcoal)] p-2.5 text-[12px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] text-[var(--color-muted)]">
              Saved privately to your journal
            </span>
            <button
              onClick={() => {
                if (reflection.trim()) {
                  toast("Reflection saved");
                  setReflection("");
                  onToggleReflect();
                }
              }}
              disabled={!reflection.trim()}
              className="rounded-full bg-[var(--color-gold-2)] px-3 py-1.5 text-[11px] font-semibold text-[var(--on-accent)] disabled:opacity-40"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

function QuickLink({ emoji, label }: { emoji: string; label: string }) {
  const toast = useToast();
  return (
    <button
      onClick={() => toast(`Opening ${label}...`)}
      className="flex items-center gap-2 rounded-2xl bg-[var(--tint)] px-3 py-2 ring-1 ring-[var(--color-line)] active:scale-[0.98]"
    >
      <span className="text-base">{emoji}</span>
      <span className="text-[12px] font-medium text-[var(--color-cream)]">
        {label}
      </span>
    </button>
  );
}
