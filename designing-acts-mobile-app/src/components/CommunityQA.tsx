import { useMemo, useState } from "react";
import {
  communityQuestions,
  type CommunityQuestion,
  type ScholarlyAnswer,
  type Testimony,
} from "../data/content";
import {
  ChevronLeft,
  ChevronRight,
  PlusIcon,
  CloseIcon,
  CheckIcon,
  HandsIcon,
  SearchIcon,
  QuoteIcon,
} from "./icons";
import {
  ArabesqueDivider,
  Lozenge,
  StarOctagram,
  AdinkraDotsBg,
  MashrabiyaBg,
  OrnateHeading,
} from "./Ornament";
import { WorldMap, type MapPin } from "./WorldMap";
import { useToast } from "./Toast";
import { useCompanion } from "./CompanionContext";

const categories = [
  "Apologetics",
  "Hermeneutics",
  "Exegesis",
  "Isagogics",
  "Practical",
  "Doctrine",
] as const;

export function CommunityQA() {
  const [questions, setQuestions] = useState<CommunityQuestion[]>(communityQuestions);
  const [openId, setOpenId] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);
  const [query, setQuery] = useState("");
  const toast = useToast();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return questions;
    return questions.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        (item.context || "").toLowerCase().includes(q) ||
        item.scholarlyAnswers.some((a) => a.answer.toLowerCase().includes(q)) ||
        item.testimonies.some((t) => t.story.toLowerCase().includes(q))
    );
  }, [questions, query]);

  function toggleFollow(id: string) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              hasFollowed: !q.hasFollowed,
              followCount: q.followCount + (q.hasFollowed ? -1 : 1),
            }
          : q
      )
    );
  }

  function rejoiceWith(qId: string, tId: string) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId
          ? {
              ...q,
              testimonies: q.testimonies.map((t) =>
                t.id === tId && !t.hasRejoiced
                  ? { ...t, hasRejoiced: true, rejoiceCount: t.rejoiceCount + 1 }
                  : t
              ),
            }
          : q
      )
    );
    toast("🙌 Rejoicing with them");
  }

  function postQuestion(category: CommunityQuestion["category"], question: string, context: string) {
    const newQ: CommunityQuestion = {
      id: `q-${Date.now()}`,
      question,
      context,
      askedBy: "You (anonymous)",
      askedAgo: "just now",
      city: "Austin, USA",
      category,
      followCount: 0,
      scholarlyAnswers: [],
      testimonies: [],
    };
    setQuestions((prev) => [newQ, ...prev]);
    setComposing(false);
    toast("Question posted — the body is listening");
  }

  function shareTestimony(qId: string, story: string) {
    const newT: Testimony = {
      id: `t-${Date.now()}`,
      anonymousName: "You (anonymous)",
      city: "Austin",
      country: "USA",
      lat: 30.27,
      lon: -97.74,
      story,
      postedAgo: "just now",
      rejoiceCount: 0,
    };
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, testimonies: [newT, ...q.testimonies] } : q))
    );
    toast("Testimony shared");
  }

  const open = openId ? questions.find((q) => q.id === openId) : null;

  if (open) {
    return (
      <QuestionDetail
        q={open}
        onBack={() => setOpenId(null)}
        onFollow={() => toggleFollow(open.id)}
        onRejoice={(tId) => rejoiceWith(open.id, tId)}
        onShareTestimony={(story) => shareTestimony(open.id, story)}
      />
    );
  }

  return (
    <div className="relative">
      {/* Search */}
      <div className="flex items-center gap-2 rounded-2xl bg-[var(--color-charcoal)] px-3 py-2.5 ring-1 ring-[var(--color-line)]">
        <SearchIcon width={16} height={16} className="text-[var(--color-gold-2)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions, answers, testimonies..."
          className="w-full bg-transparent text-[13px] text-[var(--color-cream)] outline-none placeholder:text-[var(--color-muted)]"
        />
      </div>

      {/* Ask CTA */}
      <button
        onClick={() => setComposing(true)}
        className="relative mt-3 flex w-full items-center gap-3 overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a1a06] via-[#3d2509] to-[#2a1a06] p-4 text-left ring-1 ring-[var(--color-gold-3)] active:scale-[0.99]"
      >
        <AdinkraDotsBg />
        <StarOctagram
          width={14}
          height={14}
          className="absolute right-3 top-3 text-[var(--color-gold-2)] shimmer"
        />
        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]">
          <PlusIcon width={20} height={20} />
        </div>
        <div className="relative min-w-0 flex-1">
          <p className="font-display text-[14px] tracking-wide text-[var(--feature-accent)]">
            Ask the body
          </p>
          <p className="mt-0.5 text-[10px] text-[var(--feature-fg)]/70">
            Get answers from trusted teachers + testimonies from believers worldwide
          </p>
        </div>
        <ChevronRight width={16} height={16} className="relative text-[var(--feature-accent)]" />
      </button>

      {/* Question list */}
      <div className="mt-4 space-y-3">
        {visible.length === 0 ? (
          <div className="rounded-3xl bg-[var(--color-charcoal)] p-6 text-center ring-1 ring-[var(--color-line)]">
            <p className="text-3xl">🔍</p>
            <p className="mt-2 font-display text-[14px] tracking-wide text-[var(--color-gold-1)]">
              No questions matched
            </p>
            <p className="mt-1 text-[11px] text-[var(--color-bronze)]">
              Try a different phrase or ask your own.
            </p>
          </div>
        ) : (
          visible.map((q) => (
            <QuestionCard key={q.id} q={q} onOpen={() => setOpenId(q.id)} />
          ))
        )}
      </div>

      {composing && (
        <AskQuestionModal
          onClose={() => setComposing(false)}
          onPost={postQuestion}
        />
      )}
    </div>
  );
}

function QuestionCard({
  q,
  onOpen,
}: {
  q: CommunityQuestion;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className="block w-full rounded-3xl bg-[var(--color-charcoal)] p-4 text-left shadow-sm ring-1 ring-[var(--color-line-strong)] active:scale-[0.99]"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[var(--tint)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]">
          {q.category}
        </span>
        <span className="text-[10px] text-[var(--color-muted)]">{q.askedAgo}</span>
      </div>
      <h3 className="mt-2 font-display text-[15px] leading-tight tracking-wide text-[var(--color-gold-1)]">
        {q.question}
      </h3>
      {q.context && (
        <p className="mt-1 line-clamp-2 text-[11px] italic text-[var(--color-bronze)] font-serif">
          "{q.context}"
        </p>
      )}
      <p className="mt-2 text-[10px] text-[var(--color-muted)]">
        — {q.askedBy}
        {q.city && ` · 📍 ${q.city}`}
      </p>

      <div className="mt-3 flex items-center gap-3 border-t border-[var(--color-line)] pt-2 text-[11px]">
        <span className="flex items-center gap-1 text-[var(--color-bronze)]">
          📜 <strong className="text-[var(--color-gold-1)]">{q.scholarlyAnswers.length}</strong>
          <span>{q.scholarlyAnswers.length === 1 ? "answer" : "answers"}</span>
        </span>
        <span className="flex items-center gap-1 text-[var(--color-bronze)]">
          🌍 <strong className="text-[var(--color-gold-1)]">{q.testimonies.length}</strong>
          <span>{q.testimonies.length === 1 ? "testimony" : "testimonies"}</span>
        </span>
        <span className="ml-auto flex items-center gap-1 text-[var(--color-bronze)]">
          👥 <strong className="text-[var(--color-gold-1)]">{q.followCount}</strong>
          <span>following</span>
        </span>
      </div>
    </button>
  );
}

function QuestionDetail({
  q,
  onBack,
  onFollow,
  onRejoice,
  onShareTestimony,
}: {
  q: CommunityQuestion;
  onBack: () => void;
  onFollow: () => void;
  onRejoice: (tId: string) => void;
  onShareTestimony: (story: string) => void;
}) {
  const [tab, setTab] = useState<"answers" | "testimonies">("answers");
  const [sharing, setSharing] = useState(false);

  // Globe pins from testimonies
  const pins: MapPin[] = q.testimonies.map((t) => ({
    id: t.id,
    lat: t.lat,
    lon: t.lon,
    tone: "gold",
    pulse: !t.hasRejoiced,
    size: 2,
  }));

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
            {q.category}
          </p>
          <p className="truncate text-[11px] text-[var(--color-bronze)]">
            Community Q&A
          </p>
        </div>
        <button
          onClick={onFollow}
          className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
            q.hasFollowed
              ? "bg-[var(--color-charcoal)] text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
              : "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
          }`}
        >
          {q.hasFollowed ? "✓ Following" : "Follow"}
        </button>
      </div>

      {/* Question hero */}
      <div className="relative mx-5 mt-4 overflow-hidden rounded-3xl bg-[var(--color-feature)] p-5 ring-1 ring-[var(--color-gold-3)]">
        <MashrabiyaBg />
        <QuoteIcon
          width={36}
          height={36}
          className="absolute right-3 top-3 text-[var(--color-gold-3)] opacity-30"
        />
        <h2 className="relative font-display text-[18px] leading-tight tracking-wide text-gold-grad">
          {q.question}
        </h2>
        {q.context && (
          <div className="relative mt-3 rounded-2xl bg-[var(--feature-tint)] p-3 ring-1 ring-[var(--feature-line)]">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--feature-deep-gold)]">
              Context
            </p>
            <p className="mt-1 font-serif text-[12px] italic leading-relaxed text-[var(--feature-fg)]/90">
              "{q.context}"
            </p>
          </div>
        )}
        <p className="relative mt-3 text-[10px] text-[var(--feature-fg-muted)]">
          — {q.askedBy}
          {q.city && ` · 📍 ${q.city}`} · {q.askedAgo}
        </p>
      </div>

      {/* Testimony globe (if any) */}
      {q.testimonies.length > 0 && (
        <div className="mx-5 mt-3">
          <WorldMap pins={pins} height={130} showGrid>
            <div className="absolute left-3 top-3 rounded-full bg-[var(--feature-tint)] px-2 py-1 text-[10px] font-medium text-[var(--feature-accent)] backdrop-blur ring-1 ring-[var(--color-gold-4)]">
              {q.testimonies.length} testimonies · {new Set(q.testimonies.map(t => t.country)).size} countries
            </div>
          </WorldMap>
        </div>
      )}

      {/* Tabs */}
      <div className="mt-3 flex border-b border-[var(--color-line)] bg-[var(--color-onyx)]">
        <TabBtn active={tab === "answers"} onClick={() => setTab("answers")}>
          📜 Scholarly ({q.scholarlyAnswers.length})
        </TabBtn>
        <TabBtn active={tab === "testimonies"} onClick={() => setTab("testimonies")}>
          🌍 Testimonies ({q.testimonies.length})
        </TabBtn>
      </div>

      {/* Content */}
      <div className="space-y-3 px-5 py-4">
        {tab === "answers" ? (
          <>
            <OrnateHeading eyebrow="From trusted teachers" title="Across traditions" />
            {q.scholarlyAnswers.length === 0 ? (
              <p className="rounded-2xl bg-[var(--color-charcoal)] p-4 text-center text-[12px] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]">
                Scholars are being matched to this question. Check back soon.
              </p>
            ) : (
              q.scholarlyAnswers.map((a) => <AnswerCard key={a.id} a={a} />)
            )}
          </>
        ) : (
          <>
            <OrnateHeading eyebrow="From the body" title="Walking the same road" />
            <button
              onClick={() => setSharing(true)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-gold-2)] py-2.5 text-[12px] font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] active:scale-[0.98]"
            >
              <PlusIcon width={14} height={14} /> Share your testimony
            </button>
            {q.testimonies.length === 0 ? (
              <p className="rounded-2xl bg-[var(--color-charcoal)] p-4 text-center text-[12px] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]">
                No testimonies yet — be the first to share how He met you here.
              </p>
            ) : (
              q.testimonies.map((t) => (
                <TestimonyCard
                  key={t.id}
                  t={t}
                  onRejoice={() => onRejoice(t.id)}
                />
              ))
            )}
          </>
        )}
      </div>

      {sharing && (
        <ShareTestimonyModal
          question={q.question}
          onClose={() => setSharing(false)}
          onShare={(story) => {
            onShareTestimony(story);
            setSharing(false);
          }}
        />
      )}
    </div>
  );
}

function TabBtn({
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
      className={`flex-1 py-3 text-[11px] font-semibold transition ${
        active
          ? "border-b-2 border-[var(--color-gold-2)] text-[var(--color-gold-1)]"
          : "text-[var(--color-muted)]"
      }`}
    >
      {children}
    </button>
  );
}

function AnswerCard({ a }: { a: ScholarlyAnswer }) {
  return (
    <article className="rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line-strong)]">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold-2)] text-[18px] ring-1 ring-[var(--color-gold-1)]">
          {a.avatar}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[14px] tracking-wide text-[var(--color-gold-1)]">
            {a.source}
          </p>
          <p className="text-[10px] text-[var(--color-bronze)]">
            {a.credential}
          </p>
          <span className="mt-1 inline-block rounded-full bg-[var(--color-gold-2)]/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]">
            {a.tradition}
          </span>
        </div>
      </div>

      <p className="mt-3 font-serif text-[13px] leading-relaxed text-[var(--color-cream)]">
        {a.answer}
      </p>
      {a.scripture && (
        <p className="mt-2 inline-flex items-center gap-1 rounded-xl bg-[var(--color-gold-2)]/15 px-3 py-1.5 text-[11px] font-semibold text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]">
          <Lozenge width={10} height={10} /> {a.scripture}
        </p>
      )}
    </article>
  );
}

function TestimonyCard({
  t,
  onRejoice,
}: {
  t: Testimony;
  onRejoice: () => void;
}) {
  return (
    <article className="rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line-strong)]">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-[var(--color-bronze)]">
          📍 {t.city}, {t.country}
        </span>
        <span className="text-[10px] text-[var(--color-muted)]">{t.postedAgo}</span>
      </div>
      <p className="mt-2 font-serif text-[13px] leading-relaxed text-[var(--color-cream)]">
        "{t.story}"
      </p>
      <p className="mt-2 text-[10px] italic text-[var(--color-muted)]">
        — {t.anonymousName}
      </p>

      <button
        onClick={onRejoice}
        disabled={t.hasRejoiced}
        className={`mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-2 text-[12px] font-semibold transition ${
          t.hasRejoiced
            ? "bg-[var(--color-gold-4)]/30 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
            : "bg-[var(--color-gold-2)]/15 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)] active:scale-[0.99]"
        }`}
      >
        <span>🙌</span>
        {t.hasRejoiced ? "You rejoiced with them" : "Rejoice with them"}
        <span className="ml-1 rounded-full bg-[var(--color-gold-2)]/30 px-2 py-0.5 text-[10px]">
          {t.rejoiceCount}
        </span>
      </button>
    </article>
  );
}

function AskQuestionModal({
  onClose,
  onPost,
}: {
  onClose: () => void;
  onPost: (cat: CommunityQuestion["category"], q: string, ctx: string) => void;
}) {
  const [category, setCategory] = useState<CommunityQuestion["category"]>("Practical");
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const { companion } = useCompanion();

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-[var(--scrim)]">
      <div className="max-h-[94%] w-full overflow-y-auto rounded-t-3xl bg-[var(--color-onyx)] p-5 pb-7 ring-1 ring-[var(--color-gold-3)]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
            Ask the body
          </h3>
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

        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-[var(--color-gold-2)]/10 px-3 py-2 ring-1 ring-[var(--color-gold-3)]">
          <span className="text-base">{companion.emoji}</span>
          <p className="text-[11px] italic text-[var(--color-cream)]/85 font-serif">
            {companion.name}: "Honest is better than impressive. Ask what you actually want to know."
          </p>
        </div>

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Category
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-2.5 py-1 text-[11px] ${
                category === c
                  ? "bg-[var(--color-gold-2)] text-[var(--on-accent)]"
                  : "bg-[var(--color-charcoal)] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Your question
        </p>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What do you want to ask?"
          autoFocus
          className="mt-1 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[14px] font-semibold text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />

        <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Add context (optional)
        </p>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          rows={4}
          maxLength={400}
          placeholder="Why are you asking? What's behind the question?"
          className="mt-1 w-full resize-none rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />

        <div className="mt-3 rounded-2xl bg-[var(--tint-soft)] p-3 ring-1 ring-[var(--color-line)]">
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
            <Lozenge width={10} height={10} /> What happens next
          </p>
          <ul className="mt-1 space-y-0.5 text-[11px] text-[var(--color-bronze)]">
            <li>· Scholars across traditions answer within 24 hours</li>
            <li>· Believers worldwide share testimonies of how He met them</li>
            <li>· You'll be notified when responses arrive</li>
            <li>· Posted anonymously — your name is never shown</li>
          </ul>
        </div>

        <button
          onClick={() => question.trim() && onPost(category, question.trim(), context.trim())}
          disabled={!question.trim()}
          className="mt-3 w-full rounded-2xl bg-[var(--color-gold-2)] py-3 text-sm font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] disabled:opacity-40"
        >
          <span className="inline-flex items-center gap-2">
            <Lozenge width={10} height={10} /> Post anonymously <Lozenge width={10} height={10} />
          </span>
        </button>
      </div>
    </div>
  );
}

function ShareTestimonyModal({
  question,
  onClose,
  onShare,
}: {
  question: string;
  onClose: () => void;
  onShare: (story: string) => void;
}) {
  const [story, setStory] = useState("");
  const { companion } = useCompanion();

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-[var(--scrim)]">
      <div className="max-h-[92%] w-full overflow-y-auto rounded-t-3xl bg-[var(--color-onyx)] p-5 pb-7 ring-1 ring-[var(--color-gold-3)]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
            Share your testimony
          </h3>
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

        <div className="mt-3 rounded-2xl bg-[var(--tint-soft)] p-3 ring-1 ring-[var(--color-line)]">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
            In response to
          </p>
          <p className="mt-1 font-serif text-[12px] italic text-[var(--color-cream)]">
            "{question}"
          </p>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-[var(--color-gold-2)]/10 px-3 py-2 ring-1 ring-[var(--color-gold-3)]">
          <span className="text-base">{companion.emoji}</span>
          <p className="text-[11px] italic text-[var(--color-cream)]/85 font-serif">
            {companion.name}: "Your story is medicine for someone reading this. Don't keep it."
          </p>
        </div>

        <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          How did He meet you here?
        </p>
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows={6}
          maxLength={600}
          placeholder="Be specific. What was the situation? What did He do? What did you learn?"
          autoFocus
          className="mt-1 w-full resize-none rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        <p className="text-right text-[10px] text-[var(--color-muted)]">
          {story.length}/600
        </p>

        <button
          onClick={() => story.trim() && onShare(story.trim())}
          disabled={!story.trim()}
          className="mt-3 w-full rounded-2xl bg-[var(--color-gold-2)] py-3 text-sm font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] disabled:opacity-40"
        >
          <span className="inline-flex items-center gap-2">
            <HandsIcon width={14} height={14} /> Share anonymously
          </span>
        </button>
      </div>
    </div>
  );
}

// Suppress unused
void CheckIcon;
