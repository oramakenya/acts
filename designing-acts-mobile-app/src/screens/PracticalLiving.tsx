import { useState, useEffect, useMemo } from "react";
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

// --- TYPES FOR EXEGETICAL DATA ---
export type StudyBibleSource = 
  | "Zondervan Exegetical Commentary" 
  | "Pillar NT Commentary" 
  | "Baker Exegetical Commentary" 
  | "Word Biblical Commentary";

export interface ImperativeData {
  id: string;
  reference: string;
  greekHebrewRoot: string;
  exegeticalInsight: string;
  commandText: string;
  today: string;
}

export interface PracticalCategory {
  id: string;
  icon: string;
  dimension: "Interpersonal" | "Intrapersonal";
  title: string;
  blurb: string;
  imperatives: ImperativeData[];
}

type Tab = "imperatives" | "pilgrimage";

// --- EXEGETICAL DATA MOCK SERVICE ---
async function fetchFromExegeticalAPI(
  source: StudyBibleSource,
  seed: number
): Promise<PracticalCategory[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockDb: PracticalCategory[] = [
        // --- INTRAPERSONAL ---
        {
          id: "exe-1", icon: "⚖️", dimension: "Intrapersonal", title: "Ritual Consecration",
          blurb: "Decisive presentation of the body as an ongoing sacrificial asset.",
          imperatives: [{ id: "imp-1", reference: "Romans 12:1", greekHebrewRoot: "παραστῆσαι (parastēsai)", exegeticalInsight: `[${source} Analysis]: The aorist infinitive denotes a definitive, structural break—rendering your whole physical agency as a permanent temple asset rather than an occasional offering.`, commandText: "Present your bodies as a living sacrifice, holy and acceptable to God.", today: "Dedicate the first 15 minutes of your working day to quiet alignment before looking at any digital notifications." }]
        },
        {
          id: "exe-5", icon: "🪞", dimension: "Intrapersonal", title: "Cognitive Auditing",
          blurb: "Deliberate mathematical calculation of truth metrics in the mind.",
          imperatives: [{ id: "imp-5", reference: "Philippians 4:8", greekHebrewRoot: "λογίζεσθε (logizesthe)", exegeticalInsight: `[${source} Analysis]: An accounting term in the imperative plural. It demands that you systematically log, calculate, and weigh these excellent realities as the primary ledger of your consciousness.`, commandText: "If there is any excellence, if there is anything worthy of praise, think about these things.", today: "When checking project metrics or personal concerns, consciously write down 3 verified, factual successes alongside the risks to balance the ledger." }]
        },
        {
          id: "exe-6", icon: "🫗", dimension: "Intrapersonal", title: "Emptied Ambition",
          blurb: "Eradicating factional maneuvering and groundless vanity.",
          imperatives: [{ id: "imp-6", reference: "Philippians 2:3", greekHebrewRoot: "ἐριθείαν (eritheian) / κενοδοξίαν (kenodoxian)", exegeticalInsight: `[${source} Analysis]: 'Eritheia' describes the narrow-minded careerism of political operatives seeking office. Paul targets the systematic elimination of strategic maneuvering for self-elevation.`, commandText: "Do nothing from selfish ambition or conceit, but in humility count others more significant than yourselves.", today: "In your next strategy sync, explicitly highlight and praise a brilliant structural move made by someone else, stepping out of the spotlight entirely." }]
        },
        {
          id: "exe-9", icon: "🌱", dimension: "Intrapersonal", title: "Rich Word Indwelling",
          blurb: "Allowing deep textual data to organize internal housing parameters.",
          imperatives: [{ id: "imp-9", reference: "Colossians 3:16", greekHebrewRoot: "ἐνοικείτω (enoikeitō)", exegeticalInsight: `[${source} Analysis]: Present active imperative meaning 'to make oneself completely at home.' The textual metrics of truth are to dwell natively and luxuriously within your inner operational architecture.`, commandText: "Let the word of Christ dwell in you richly, teaching and admonishing one another in all wisdom.", today: "Take one phrase or verse from your study matrix today, write it out on a card, and intentionally review its syntax 3 separate times across the afternoon." }]
        },
        {
          id: "exe-10", icon: "⚔️", dimension: "Intrapersonal", title: "Somatic Mortification",
          blurb: "Aggressive, intentional starving of corrupted bodily impulses.",
          imperatives: [{ id: "imp-10", reference: "Romans 8:13", greekHebrewRoot: "θανατοῦτε (thanatoute)", exegeticalInsight: `[${source} Analysis]: Present active indicative/imperative hybrid. A continuous, violent command to 'put to death' the machinations of the flesh by the Spirit's power. It is active execution, not passive avoidance.`, commandText: "By the Spirit put to death the deeds of the body.", today: "Identify one specific physical indulgence (scrolling, snacking, snoozing) and actively deny it today, redirecting that exact energy into a brief prayer." }]
        },
        {
          id: "exe-11", icon: "🧠", dimension: "Intrapersonal", title: "Architectural Renewal",
          blurb: "Complete overhaul of the mind's default operating system.",
          imperatives: [{ id: "imp-11", reference: "Romans 12:2", greekHebrewRoot: "ἀνακαινώσει (anakainōsei)", exegeticalInsight: `[${source} Analysis]: Denotes a qualitative shift in how the mind processes reality. You are commanded to stop being pressed into the world's mold and instead undergo structural metamorphosis via renewed thinking.`, commandText: "Be transformed by the renewal of your mind.", today: "Catch a default cynical or fearful thought today, stop, and verbally state out loud the opposing biblical truth to literally rewire your cognitive response." }]
        },
        {
          id: "exe-12", icon: "🔥", dimension: "Intrapersonal", title: "Anxious Transmutation",
          blurb: "Converting nervous energy directly into high-fidelity petitions.",
          imperatives: [{ id: "imp-12", reference: "Philippians 4:6", greekHebrewRoot: "μεριμνᾶτε (merimnate)", exegeticalInsight: `[${source} Analysis]: Present imperative with a negative, meaning 'stop being perpetually divided or distracted in mind.' The alternative provided is immediate, targeted dispatch of requests to God.`, commandText: "Do not be anxious about anything, but in everything by prayer and supplication let your requests be made known.", today: "The moment you feel your heart rate spike over a future unknown today, instantly write it down as a one-sentence request to God, then physically walk away from the paper." }]
        },

        // --- INTERPERSONAL ---
        {
          id: "exe-2", icon: "👂", dimension: "Interpersonal", title: "Calculated Auditory Intent",
          blurb: "Deploying rapid processing before verbal execution.",
          imperatives: [{ id: "imp-2", reference: "James 1:19", greekHebrewRoot: "ταχύς εἰς τὸ ἀκοῦσαι (tachys eis to akousai)", exegeticalInsight: `[${source} Analysis]: 'Tachys' indicates urgent, eager disposition. The construction means tracking structural nuance in what others say rather than just waiting for your turn to speak.`, commandText: "Let every person be quick to hear, slow to speak, slow to anger.", today: "In your next high-stakes consultation or conversation, let the other party fully finish their complete thought; pause 3 seconds before responding." }]
        },
        {
          id: "exe-3", icon: "🤝", dimension: "Interpersonal", title: "Mutual Enslavement",
          blurb: "Using structural freedom to lower relative status for community preservation.",
          imperatives: [{ id: "imp-3", reference: "Galatians 5:13", greekHebrewRoot: "δουλεύετε (douleuete)", exegeticalInsight: `[${source} Analysis]: Present active imperative. Paul uses a paradox: you are radically free, yet commanded to engage in continuous, voluntary slavery to one another through agape love.`, commandText: "Through love become slaves to one another.", today: "Identify a friction point or operational chore a colleague or partner hates doing; quietly execute it for them today without announcing it." }]
        },
        {
          id: "exe-4", icon: "🛠️", dimension: "Interpersonal", title: "Constructive Speech Engineering",
          blurb: "Filtering language strictly by functional utility and situational need.",
          imperatives: [{ id: "imp-4", reference: "Ephesians 4:29", greekHebrewRoot: "χρεία (chreia) / οἰκοδομήν (oikodomēn)", exegeticalInsight: `[${source} Analysis]: Structural syntax commands that words must be built specifically to fit the literal 'space of the need,' architecting strength into the listener rather than venting raw emotion.`, commandText: "Let no corrupting talk come out of your mouths, but only such as is good for building up, as fits the occasion.", today: "Before offering feedback today, verify if it provides immediate building blocks for growth, or if it simply acts as an expression of your own critique." }]
        },
        {
          id: "exe-7", icon: "⚡", dimension: "Interpersonal", title: "Agape Incitement",
          blurb: "Provoking high-velocity operational excellence and communal warmth.",
          imperatives: [{ id: "imp-7", reference: "Hebrews 10:24", greekHebrewRoot: "παροξυσμόν (paroxysmon)", exegeticalInsight: `[${source} Analysis]: Typically a medical term for a sharp seizure or violent spasm. The author intentionally hijacks this word to demand a sharp, shocking disruption of communal apathy.`, commandText: "And let us consider how to stir up one another to love and good works.", today: "Send a hyper-specific, out-of-the-blue message of operational affirmation to a team member detailing exactly why their gift infrastructure is vital." }]
        },
        {
          id: "exe-8", icon: "🚪", dimension: "Interpersonal", title: "Unmurmuring Ingress",
          blurb: "Executing hospitality without internal undercurrent grumbling.",
          imperatives: [{ id: "imp-8", reference: "1 Peter 4:9", greekHebrewRoot: "γογγυσμοῦ (gongysmou)", exegeticalInsight: `[${source} Analysis]: Onomatopoeic for under-the-breath grumbling or low-level background muttering. It demands total internal congruence when opening space to guests or sharing resources.`, commandText: "Show hospitality to one another without grumbling.", today: "When a team member or guest makes an unpredictable demand on your schedule today, grant the request with complete, unhurried presence." }]
        },
        {
          id: "exe-13", icon: "🧱", dimension: "Interpersonal", title: "Burden Bearing",
          blurb: "Taking on the structural weight of a brother's collapsing load.",
          imperatives: [{ id: "imp-13", reference: "Galatians 6:2", greekHebrewRoot: "βαστάζετε (bastazete)", exegeticalInsight: `[${source} Analysis]: Used for carrying heavy cargo or enduring extreme hardship. Paul commands believers to literally get under the crushing moral or physical weight of another, fulfilling the law of Christ.`, commandText: "Bear one another's burdens, and so fulfill the law of Christ.", today: "Ask someone who seems overwhelmed today: 'What is the heaviest thing on your plate right now, and can I take a piece of it?'" }]
        },
        {
          id: "exe-14", icon: "🛡️", dimension: "Interpersonal", title: "Radical Forgiveness",
          blurb: "Freely extending grace proportional to Christ's extension to you.",
          imperatives: [{ id: "imp-14", reference: "Colossians 3:13", greekHebrewRoot: "χαριζόμενοι (charizomenoi)", exegeticalInsight: `[${source} Analysis]: From 'charis' (grace). It means to bestow favor unconditionally, particularly remitting a debt. The standard of this transaction is precisely calibrated to the Lord's forgiveness of the believer.`, commandText: "Forgiving each other; as the Lord has forgiven you, so you also must forgive.", today: "Identify a minor offense or slight from this week and mentally (and prayerfully) mark the debt as completely 'paid in full' without them asking." }]
        }
      ];

      // Shuffle based on the seed
      let shuffled = [...mockDb];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.abs(Math.sin(seed + i) * 10000) % (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      resolve(shuffled);
    }, 400);
  });
}

// --- CUSTOM HOOK ---
function useExegeticalSource(source: StudyBibleSource, refreshSeed: number) {
  const [data, setData] = useState<PracticalCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    fetchFromExegeticalAPI(source, refreshSeed).then((fetchedData) => {
      if (isMounted) {
        setData(fetchedData);
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [source, refreshSeed]);

  return { data, loading };
}

// --- MAIN COMPONENT ---
export function PracticalLiving() {
  const [tab, setTab] = useState<Tab>("imperatives");
  const [active, setActive] = useState<PracticalCategory | null>(null);
  const [filter, setFilter] = useState<"All" | "Interpersonal" | "Intrapersonal">("All");
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  
  const [searchQuery, setSearchQuery] = useState("");
  const [source, setSource] = useState<StudyBibleSource>("Zondervan Exegetical Commentary");
  const [refreshSeed, setRefreshSeed] = useState(1); 

  const { data: apiCategories, loading } = useExegeticalSource(source, refreshSeed);

  // STRICT RULE ENFORCEMENT: 3 Interpersonal + 3 Intrapersonal
  const displayedCategories = useMemo(() => {
    if (!apiCategories.length) return [];

    let exactSix: PracticalCategory[] = [];

    if (searchQuery) {
      // If searching, just show up to 6 matching results regardless of dimension ratio
      const query = searchQuery.toLowerCase();
      exactSix = apiCategories.filter(cat => 
        cat.title.toLowerCase().includes(query) || 
        cat.blurb.toLowerCase().includes(query) ||
        cat.imperatives.some(imp => 
          imp.commandText.toLowerCase().includes(query) || 
          imp.reference.toLowerCase().includes(query) ||
          imp.greekHebrewRoot.toLowerCase().includes(query) ||
          imp.exegeticalInsight.toLowerCase().includes(query) ||
          imp.today.toLowerCase().includes(query)
        )
      ).slice(0, 6);
    } else if (filter === "All") {
      // Exact 3/3 split
      const inters = apiCategories.filter(c => c.dimension === "Interpersonal").slice(0, 3);
      const intras = apiCategories.filter(c => c.dimension === "Intrapersonal").slice(0, 3);
      
      // Combine and lightly shuffle the 6 so they aren't totally grouped
      exactSix = [...inters, ...intras].sort(() => Math.random() - 0.5);
    } else {
      // Filtered to just one dimension
      exactSix = apiCategories.filter(c => c.dimension === filter).slice(0, 6);
    }

    return exactSix;
  }, [apiCategories, filter, searchQuery]);

  if (active) {
    return (
      <CategoryDetail
        cat={active}
        source={source}
        onBack={() => setActive(null)}
        completed={completed}
        toggle={(key) => setCompleted((c) => ({ ...c, [key]: !c[key] }))}
      />
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden pt-10">
      <div className="px-6 pt-2 pat-mudcloth">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-3)]">
          Pillar 1
        </p>
        <div className="flex flex-col gap-2 mt-1">
          <h1 className="font-display text-[24px] tracking-wide text-gold-grad">
            Practical Living
          </h1>
          
          <select 
            value={source} 
            onChange={(e) => setSource(e.target.value as StudyBibleSource)}
            className="w-full max-w-[260px] rounded-lg border border-[var(--color-line)] bg-[var(--color-charcoal)] px-3 py-2 font-display text-[12px] text-[var(--color-gold-1)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold-2)]"
          >
            <option value="Zondervan Exegetical Commentary">Zondervan Exegetical (ZECNT)</option>
            <option value="Pillar NT Commentary">Pillar NT Commentary (PNTC)</option>
            <option value="Baker Exegetical Commentary">Baker Exegetical (BECNT)</option>
            <option value="Word Biblical Commentary">Word Biblical Commentary (WBC)</option>
          </select>
        </div>
        <div className="mt-3 text-[var(--color-gold-3)]">
          <ArabesqueDivider width={200} />
        </div>
      </div>

      <div className="mt-3 flex border-b border-[var(--color-line)] bg-[var(--color-onyx)]">
        <TabButton active={tab === "imperatives"} onClick={() => setTab("imperatives")}>
          🏛️ Exegetical Imperatives
        </TabButton>
        <TabButton active={tab === "pilgrimage"} onClick={() => setTab("pilgrimage")}>
          🚶 My Pilgrimage
        </TabButton>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === "imperatives" ? (
          <ImperativesTab
            list={displayedCategories}
            filter={filter}
            setFilter={setFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isLoading={loading}
            onRefresh={() => setRefreshSeed(s => s + 1)}
            onOpen={setActive}
          />
        ) : (
          <Pilgrimage />
        )}
      </div>
    </div>
  );
}

function TabButton({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
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

interface ImperativesTabProps {
  list: PracticalCategory[];
  filter: "All" | "Interpersonal" | "Intrapersonal";
  setFilter: (f: "All" | "Interpersonal" | "Intrapersonal") => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isLoading: boolean;
  onRefresh: () => void;
  onOpen: (c: PracticalCategory) => void;
}

function ImperativesTab({
  list, filter, setFilter, searchQuery, setSearchQuery, isLoading, onRefresh, onOpen,
}: ImperativesTabProps) {
  return (
    <div className="pat-mudcloth">
      <div className="px-6 pt-4">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roots, exegesis, verses, or actions..."
            className="w-full rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-charcoal)] px-4 py-2.5 text-[12px] text-[var(--color-cream)] placeholder-[var(--color-muted)] focus:border-[var(--color-gold-2)] focus:outline-none"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 text-[11px] text-[var(--color-muted)] hover:text-[var(--color-gold-1)]"
            >
              Clear
            </button>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex gap-2">
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

          <button
            onClick={onRefresh}
            className="flex items-center gap-1.5 rounded-full bg-[var(--color-onyx)] border border-[var(--color-line)] px-3 py-1.5 text-[11px] font-semibold text-[var(--color-gold-2)] active:scale-95 transition hover:bg-[var(--color-charcoal)]"
          >
            🔄 Shuffling Sources
          </button>
        </div>
      </div>

      <div className="mt-4 px-6 pb-4">
        {isLoading ? (
          <div className="py-12 text-center text-[12px] text-[var(--color-gold-3)] animate-pulse">
            Parsing lexical datasets...
          </div>
        ) : (
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
                <p className="relative mt-1 text-[11px] leading-snug line-clamp-2 text-[var(--color-bronze)]">
                  {cat.blurb}
                </p>
                <span className="relative mt-2 flex items-center gap-1 text-[10px] font-medium text-[var(--color-gold-2)]">
                  {cat.imperatives[0]?.greekHebrewRoot} <ChevronRight width={10} height={10} />
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 text-[var(--color-gold-3)]">
          <KenteStrip className="rounded-md ring-1 ring-[var(--color-line)]" />
        </div>
      </div>
    </div>
  );
}

function CategoryDetail({
  cat, source, onBack, completed, toggle,
}: {
  cat: PracticalCategory; source: string; onBack: () => void; completed: Record<string, boolean>; toggle: (k: string) => void;
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
        {cat.imperatives.map((imp) => {
          const key = `${cat.id}-${imp.id}`;
          const done = completed[key];
          
          return (
            <article
              key={key}
              className="relative overflow-hidden rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line-strong)]"
            >
              <div className="flex items-start gap-2">
                <Lozenge width={12} height={12} className="mt-1 shrink-0 text-[var(--color-gold-2)]" />
                <p className="font-serif text-[15px] leading-snug text-[var(--color-cream)]">
                  "{imp.commandText}"
                </p>
              </div>
              
              <div className="mt-2 pl-5 flex flex-wrap items-center gap-2">
                <span className="font-display text-[11px] tracking-wide text-[var(--color-gold-2)]">
                  — {imp.reference}
                </span>
                <span className="rounded bg-[var(--color-onyx)] px-2 py-0.5 text-[10px] font-mono tracking-wider text-[var(--color-gold-3)] ring-1 ring-[var(--color-line)]">
                  {imp.greekHebrewRoot}
                </span>
              </div>

              <div className="mt-4 pl-5 border-l-2 border-[var(--color-gold-3)]/30">
                <p className="text-[12px] text-[var(--color-muted)] leading-relaxed">
                  {imp.exegeticalInsight}
                </p>
              </div>

              <div className="mt-4 rounded-2xl bg-[var(--color-gold-2)]/10 p-3 ring-1 ring-[var(--color-gold-3)]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-1)]">
                  Exegetical Action Metric
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-[var(--color-cream)]/90">
                  {imp.today}
                </p>
              </div>

              <button
                onClick={() => toggle(key)}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-2.5 text-[12px] font-semibold transition ${
                  done
                    ? "bg-[var(--color-gold-4)]/30 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
                    : "bg-[var(--tint)] text-[var(--color-cream)] ring-1 ring-[var(--color-line)]"
                }`}
              >
                {done ? (
                  <>
                    <CheckIcon width={14} height={14} /> Imperative Executed Today
                  </>
                ) : (
                  <>
                    Commit to Action <ChevronRight width={14} height={14} />
                  </>
                )}
              </button>
            </article>
          );
        })}
        <div className="pt-4 text-[var(--color-gold-3)]">
          <OrnateHeading title="Build with precision" align="center" />
        </div>
      </div>
    </div>
  );
}