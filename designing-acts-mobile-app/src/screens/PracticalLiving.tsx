import { useState } from "react";
import { practicalCategories, type PracticalCategory } from "../data/content";
import { ChevronLeft, ChevronRight, CheckIcon } from "../components/icons";
import {
  ArabesqueDivider,
  AdinkraDotsBg,
  KenteStrip,
  Lozenge,
  OrnateHeading,
  StarOctagram,
} from "../components/Ornament";
import { Pilgrimage } from "./Pilgrimage";

type Tab = "imperatives" | "pilgrimage";

export function PracticalLiving() {
  const [tab, setTab] = useState<Tab>("imperatives");
  const [active, setActive] = useState<PracticalCategory | null>(null);
  const [filter, setFilter] = useState<"All" | "Interpersonal" | "Intrapersonal">("All");
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  if (active) {
    return (
      <CategoryDetail
        cat={active}
        onBack={() => setActive(null)}
        completed={completed}
        toggle={(key) => setCompleted((c) => ({ ...c, [key]: !c[key] }))}
      />
    );
  }

  const list = practicalCategories.filter(
    (c) => filter === "All" || c.dimension === filter
  );

  return (
    <div className="flex h-full flex-col overflow-hidden pt-10">
      {/* Header */}
      <div className="px-6 pt-2 pat-mudcloth">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-3)]">
          Pillar 1
        </p>
        <h1 className="mt-1 font-display text-[24px] tracking-wide text-gold-grad">
          Practical Living
        </h1>
        <div className="mt-1 text-[var(--color-gold-3)]">
          <ArabesqueDivider width={200} />
        </div>
      </div>

      {/* Tab switcher */}
      <div className="mt-3 flex border-b border-[var(--color-line)] bg-[var(--color-onyx)]">
        <TabButton active={tab === "imperatives"} onClick={() => setTab("imperatives")}>
          📖 Imperatives
        </TabButton>
        <TabButton active={tab === "pilgrimage"} onClick={() => setTab("pilgrimage")}>
          🚶 My Pilgrimage
        </TabButton>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === "imperatives" ? (
          <ImperativesTab
            list={list}
            filter={filter}
            setFilter={setFilter}
            onOpen={setActive}
          />
        ) : (
          <Pilgrimage />
        )}
      </div>
    </div>
  );
}

function TabButton({
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
      className={`flex-1 py-3 text-[12px] font-semibold transition ${
        active
          ? "border-b-2 border-[var(--color-gold-2)] text-[var(--color-gold-1)]"
          : "text-[var(--color-muted)]"
      }`}
    >
      {children}
    </button>
  );
}

function ImperativesTab({
  list,
  filter,
  setFilter,
  onOpen,
}: {
  list: PracticalCategory[];
  filter: "All" | "Interpersonal" | "Intrapersonal";
  setFilter: (f: "All" | "Interpersonal" | "Intrapersonal") => void;
  onOpen: (c: PracticalCategory) => void;
}) {
  return (
    <div className="pat-mudcloth">
      <div className="px-6 pt-4">
        <p className="text-[12px] leading-relaxed text-[var(--color-cream)]/80">
          The New Testament's commands, sorted by life dimension. Read what the Bible says. Then act on it today.
        </p>

        <div className="mt-3 flex gap-2">
          {(["All", "Interpersonal", "Intrapersonal"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                filter === f
                  ? "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
                  : "bg-[var(--color-charcoal)] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 px-6 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {list.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onOpen(cat)}
              className="relative flex flex-col items-start overflow-hidden rounded-3xl bg-[var(--color-charcoal)] p-3.5 text-left shadow-sm ring-1 ring-[var(--color-line-strong)] active:scale-[0.98]"
            >
              <AdinkraDotsBg />
              <span className="relative text-2xl">{cat.icon}</span>
              <p className="relative mt-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
                {cat.dimension}
              </p>
              <p className="relative mt-0.5 font-display text-[13px] tracking-wide leading-tight text-[var(--color-gold-1)]">
                {cat.title}
              </p>
              <p className="relative mt-1 text-[11px] leading-snug text-[var(--color-bronze)]">
                {cat.blurb}
              </p>
              <span className="relative mt-2 flex items-center gap-1 text-[10px] font-medium text-[var(--color-gold-2)]">
                {cat.imperatives.length} imperatives <ChevronRight width={10} height={10} />
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 text-[var(--color-gold-3)]">
          <KenteStrip className="rounded-md ring-1 ring-[var(--color-line)]" />
        </div>
      </div>
    </div>
  );
}

function CategoryDetail({
  cat,
  onBack,
  completed,
  toggle,
}: {
  cat: PracticalCategory;
  onBack: () => void;
  completed: Record<string, boolean>;
  toggle: (k: string) => void;
}) {
  return (
    <div className="flex h-full flex-col overflow-y-auto pt-10 pat-mudcloth">
      <div className="flex items-center gap-3 px-5 pt-2">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]"
        >
          <ChevronLeft width={18} height={18} />
        </button>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-gold-3)]">
            {cat.dimension}
          </p>
          <h2 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
            {cat.title}
          </h2>
        </div>
      </div>

      <div className="relative mx-5 mt-5 flex items-center gap-3 overflow-hidden rounded-3xl bg-[var(--color-feature)] p-4 text-[var(--feature-fg)] ring-1 ring-[var(--color-gold-4)]">
        <AdinkraDotsBg />
        <span className="relative text-3xl">{cat.icon}</span>
        <p className="relative text-[12px] leading-relaxed text-[var(--feature-fg)]/90 font-serif italic">
          {cat.blurb}
        </p>
        <StarOctagram
          width={14}
          height={14}
          className="absolute right-3 top-3 text-[var(--color-gold-2)]"
        />
      </div>

      <div className="space-y-3 px-5 py-5">
        {cat.imperatives.map((imp, i) => {
          const key = `${cat.id}-${i}`;
          const done = completed[key];
          return (
            <article
              key={key}
              className="relative overflow-hidden rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line-strong)]"
            >
              <div className="flex items-start gap-2">
                <Lozenge
                  width={12}
                  height={12}
                  className="mt-1 shrink-0 text-[var(--color-gold-2)]"
                />
                <p className="font-serif text-[15px] leading-snug text-[var(--color-cream)]">
                  "{imp.command}"
                </p>
              </div>
              <p className="mt-1 pl-5 text-[11px] font-display tracking-wide text-[var(--color-gold-2)]">
                — {imp.reference}
              </p>

              <div className="mt-3 rounded-2xl bg-[var(--color-gold-2)]/10 p-3 ring-1 ring-[var(--color-gold-3)]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-1)]">
                  How to act on it today
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-[var(--color-cream)]/90">
                  {imp.today}
                </p>
              </div>

              <button
                onClick={() => toggle(key)}
                className={`mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-2 text-[12px] font-semibold transition ${
                  done
                    ? "bg-[var(--color-gold-4)]/30 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
                    : "bg-[var(--tint)] text-[var(--color-cream)] ring-1 ring-[var(--color-line)]"
                }`}
              >
                {done ? (
                  <>
                    <CheckIcon width={14} height={14} /> Walked in this today
                  </>
                ) : (
                  <>
                    I'll act on this <ChevronRight width={14} height={14} />
                  </>
                )}
              </button>
            </article>
          );
        })}
        <div className="pt-2 text-[var(--color-gold-3)]">
          <OrnateHeading title="Walk well, family" align="center" />
        </div>
      </div>
    </div>
  );
}
