import { useMemo, useState } from "react";
import { studyTopics, learningPaths, type StudyTopic } from "../data/content";
import { SearchIcon, ChevronLeft, BookIcon, CheckIcon } from "../components/icons";
import {
  ArabesqueDivider,
  IslamicTile,
  Lozenge,
  OrnateHeading,
} from "../components/Ornament";
import { CommunityQA } from "../components/CommunityQA";

type StudyTab = "library" | "ask";

const disciplines = [
  "Apologetics",
  "Hermeneutics",
  "Exegesis",
  "Isagogics",
] as const;

type Discipline = (typeof disciplines)[number];

const disciplineGlyphs: Record<Discipline, string> = {
  Apologetics: "⚔",
  Hermeneutics: "🔑",
  Exegesis: "📜",
  Isagogics: "🏺",
};

const disciplineBlurbs: Record<Discipline, string> = {
  Apologetics: "Reasoned defense of the faith",
  Hermeneutics: "How to interpret the Bible",
  Exegesis: "Drawing meaning from the text",
  Isagogics: "Background of biblical books",
};

export function StudyHub({ onStudied }: { onStudied: () => void }) {
  const [tab, setTab] = useState<StudyTab>("library");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<StudyTopic | null>(null);
  const [activeDisc, setActiveDisc] = useState<Discipline | "All">("All");

  const filtered = useMemo(() => {
    return studyTopics.filter((t) => {
      const matchD = activeDisc === "All" || t.discipline === activeDisc;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        t.question.toLowerCase().includes(q) ||
        t.shortAnswer.toLowerCase().includes(q);
      return matchD && matchQ;
    });
  }, [query, activeDisc]);

  if (open) {
    return <TopicDetail t={open} onBack={() => setOpen(null)} onRead={onStudied} />;
  }

  return (
    <div className="flex h-full flex-col overflow-hidden pt-10">
      <div className="px-6 pt-2 pat-mudcloth">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-3)]">
          Pillar 3
        </p>
        <h1 className="mt-1 font-display text-[24px] tracking-wide text-gold-grad">
          Study Hub
        </h1>
        <div className="mt-1 text-[var(--color-gold-3)]">
          <ArabesqueDivider width={200} />
        </div>
      </div>

      {/* Tab switcher */}
      <div className="mt-3 flex border-b border-[var(--color-line)] bg-[var(--color-onyx)]">
        <SHTabButton active={tab === "library"} onClick={() => setTab("library")}>
          📚 Library
        </SHTabButton>
        <SHTabButton active={tab === "ask"} onClick={() => setTab("ask")}>
          🌍 Ask the body
        </SHTabButton>
      </div>

      <div className="flex-1 overflow-y-auto pat-mudcloth">
        {tab === "ask" ? (
          <div className="px-6 py-4">
            <CommunityQA />
          </div>
        ) : (
          <LibraryContent
            query={query}
            setQuery={setQuery}
            activeDisc={activeDisc}
            setActiveDisc={setActiveDisc}
            filtered={filtered}
            onOpen={setOpen}
          />
        )}
      </div>
    </div>
  );
}

function SHTabButton({
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

function LibraryContent({
  query,
  setQuery,
  activeDisc,
  setActiveDisc,
  filtered,
  onOpen,
}: {
  query: string;
  setQuery: (q: string) => void;
  activeDisc: Discipline | "All";
  setActiveDisc: (d: Discipline | "All") => void;
  filtered: StudyTopic[];
  onOpen: (t: StudyTopic) => void;
}) {
  return (
    <>
      <div className="px-6 pt-4">
        <p className="text-[12px] leading-relaxed text-[var(--color-cream)]/80">
          Big questions. Honest answers. Grounded in scholarship — written for you.
        </p>

        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-[var(--color-charcoal)] px-3 py-2.5 ring-1 ring-[var(--color-line)]">
          <SearchIcon width={16} height={16} className="text-[var(--color-gold-2)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question, e.g. 'Did Jesus rise?'"
            className="w-full bg-transparent text-[13px] text-[var(--color-cream)] outline-none placeholder:text-[var(--color-muted)]"
          />
        </div>
      </div>

      <div className="mt-4 px-6">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          The Four Disciplines
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {disciplines.map((d) => {
            const isActive = activeDisc === d;
            return (
              <button
                key={d}
                onClick={() => setActiveDisc(isActive ? "All" : d)}
                className={`relative overflow-hidden rounded-2xl p-3 text-left ring-1 transition ${
                  isActive
                    ? "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-[var(--color-gold-1)]"
                    : "bg-[var(--color-charcoal)] text-[var(--color-cream)] ring-[var(--color-line-strong)]"
                }`}
              >
                <span className="absolute right-1 top-1 opacity-30">
                  <IslamicTile size={40} />
                </span>
                <span className="text-lg">{disciplineGlyphs[d]}</span>
                <p className={`mt-1 font-display text-[13px] tracking-wide ${isActive ? "text-[var(--on-accent)]" : "text-[var(--color-gold-1)]"}`}>
                  {d}
                </p>
                <p className={`mt-0.5 text-[10px] ${isActive ? "text-[var(--on-accent)]/70" : "text-[var(--color-bronze)]"}`}>
                  {disciplineBlurbs[d]}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 px-6">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
            Learning Paths
          </p>
          <span className="text-[10px] text-[var(--color-muted)]">Structured journeys</span>
        </div>
        <div className="mt-2 -mx-6 flex gap-3 overflow-x-auto px-6 pb-2">
          {learningPaths.map((lp) => {
            const pct = Math.round((lp.progress / lp.steps.length) * 100);
            return (
              <div
                key={lp.id}
                className="w-60 shrink-0 rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line-strong)]"
              >
                <span className="rounded-full bg-[var(--tint)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]">
                  {lp.discipline}
                </span>
                <p className="mt-2 font-display text-[14px] tracking-wide text-[var(--color-gold-1)]">
                  {lp.title}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-[var(--color-bronze)]">
                  {lp.description}
                </p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--tint)]">
                  <div
                    className="h-full rounded-full bg-[var(--color-gold-2)]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-1 text-[10px] text-[var(--color-muted)]">
                  {lp.progress}/{lp.steps.length} steps · {pct}%
                </p>
                <button className="mt-3 w-full rounded-xl bg-[var(--color-gold-2)] py-2 text-[11px] font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]">
                  {lp.progress === 0 ? "Start path" : "Continue"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 px-6 pb-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          {query ? "Search results" : "Browse questions"}
        </p>
        <div className="mt-2 space-y-2">
          {filtered.map((t) => (
            <button
              key={t.id}
              onClick={() => onOpen(t)}
              className="flex w-full items-start gap-3 rounded-2xl bg-[var(--color-charcoal)] p-3 text-left shadow-sm ring-1 ring-[var(--color-line)] active:scale-[0.99]"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--tint)] text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]">
                <BookIcon width={16} height={16} />
              </span>
              <div className="min-w-0 flex-1">
                <span className="rounded-full bg-[var(--tint)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]">
                  {t.discipline}
                </span>
                <p className="mt-1 font-display text-[13px] tracking-wide leading-snug text-[var(--color-gold-1)]">
                  {t.question}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-[var(--color-bronze)]">
                  {t.shortAnswer}
                </p>
                <p className="mt-1 text-[10px] text-[var(--color-muted)]">{t.readMinutes} min read</p>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="rounded-2xl bg-[var(--color-charcoal)] p-4 text-center text-[12px] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]">
              No matching questions yet — try a different phrase or discipline.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

function TopicDetail({
  t,
  onBack,
  onRead,
}: {
  t: StudyTopic;
  onBack: () => void;
  onRead: () => void;
}) {
  const [marked, setMarked] = useState(false);

  return (
    <div className="flex h-full flex-col overflow-y-auto pt-10 pat-mudcloth">
      <div className="flex items-center gap-3 px-5 pt-2">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]"
        >
          <ChevronLeft width={18} height={18} />
        </button>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-3)]">
          {t.discipline}
        </p>
      </div>

      <div className="px-6 pt-3">
        <h2 className="font-display text-[20px] tracking-wide leading-tight text-[var(--color-gold-1)]">
          {t.question}
        </h2>
        <p className="mt-1 text-[10px] text-[var(--color-muted)]">{t.readMinutes} min read</p>
      </div>

      <div className="mx-6 mt-4 rounded-3xl bg-[var(--color-gold-2)]/10 p-4 ring-1 ring-[var(--color-gold-3)]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-1)]">
          Short answer
        </p>
        <p className="mt-1 font-serif text-[14px] leading-relaxed text-[var(--color-cream)]">
          {t.shortAnswer}
        </p>
      </div>

      <div className="mx-6 mt-3 rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line)]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Going deeper
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-cream)]/90">{t.deeper}</p>
      </div>

      <div className="relative mx-6 mt-3 overflow-hidden rounded-3xl bg-[var(--color-feature)] p-4 text-[var(--feature-fg)] ring-1 ring-[var(--color-gold-4)]">
        <OrnateHeading eyebrow="Related" title="Scriptures" />
        <ul className="relative mt-3 space-y-1.5">
          {t.scriptures.map((s) => (
            <li
              key={s}
              className="flex items-center gap-2 rounded-xl bg-[var(--feature-pill)] px-3 py-2 text-[12px] font-medium text-[var(--feature-accent)] ring-1 ring-[var(--feature-line)]"
            >
              <Lozenge width={10} height={10} className="text-[var(--color-gold-2)]" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6 py-4">
        <button
          onClick={() => {
            if (!marked) {
              setMarked(true);
              onRead();
            }
          }}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold transition ${
            marked
              ? "bg-[var(--color-gold-4)]/30 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
              : "bg-[var(--color-gold-2)] text-black ring-1 ring-[var(--color-gold-1)]"
          }`}
        >
          {marked ? (
            <>
              <CheckIcon width={16} height={16} /> Logged to your study journal
            </>
          ) : (
            "Mark as studied"
          )}
        </button>
      </div>
    </div>
  );
}
