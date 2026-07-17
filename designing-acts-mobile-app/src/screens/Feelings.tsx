import { useMemo, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckIcon,
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

// --- LOCAL SVG ICON UTILITIES ---
function LocalRefreshIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

// --- CORE TYPE DEFINITIONS ---
type Passage = { reference: string; text: string; whyItMeets: string };
type FeelingCategory = {
  id: string;
  name: string;
  short: string;
  emoji: string;
  kind: "soft" | "hard";
  invitation: string;
  passages: Passage[];
};

type PrayerDestination = "public" | "community" | "unassigned";

// --- FAITH LOGIC & SCRIPTURE MATRICES ---
const wordsOverYou = [
  { text: "He heals the brokenhearted and binds up their wounds.", ref: "Psalm 147:3" },
  { text: "The Lord is near to the brokenhearted and saves the crushed in spirit.", ref: "Psalm 34:18" },
  { text: "Come to me, all who labor and are heavy laden, and I will give you rest.", ref: "Matthew 11:28" },
];

const feelingCategories: FeelingCategory[] = [
  {
    id: "hope", name: "Hopeful", short: "Looking forward to what's next", emoji: "🌅", kind: "soft",
    invitation: "Anchor yourself in the promises that outlast the present moment.",
    passages: [{ reference: "Hebrews 6:19", text: "We have this as a sure and steadfast anchor of the soul...", whyItMeets: "Exegetical Note: The Greek 'ankura' implies absolute foundational safety locked directly within God's presence." }]
  },
  {
    id: "peace", name: "At Peace", short: "Quiet in the mind and soul", emoji: "🕊️", kind: "soft",
    invitation: "Rest in the quiet. Let the stillness minister to you.",
    passages: [{ reference: "Philippians 4:7", text: "And the peace of God, which surpasses all understanding, will guard your hearts...", whyItMeets: "Exegetical Note: 'Guard' is 'phrouresei', a military garrison term. God's peace acts as an active, armed sentry over your thoughts." }]
  },
  {
    id: "grief", name: "Grieving", short: "Carrying a heavy loss", emoji: "💧", kind: "hard",
    invitation: "Your tears are holy. You don't need to rush your healing.",
    passages: [{ reference: "John 11:35", text: "Jesus wept.", whyItMeets: "Exegetical Note: The Greek 'edakrusen' means a sudden, visceral bursting into tears. He actively shares the physical pain of human loss with you." }]
  },
  {
    id: "anxiety", name: "Anxious", short: "Racing thoughts, tight chest", emoji: "🌪️", kind: "hard",
    invitation: "Hand over the things you cannot control. He is holding them.",
    passages: [{ reference: "1 Peter 5:7", text: "Cast all your anxiety on him because he cares for you.", whyItMeets: "Exegetical Note: 'Cast' ('epiripsantes') denotes a decisive, structural action—flinging a crushing weight completely off your shoulders." }]
  }
];

const prayersDb: Record<string, { Julius: string; Grace: string }> = {
  unspoken: {
    Julius: "Lord God, though this precise search burden isn't cataloged in our visual grids, nothing is hidden from Your sight. We strip the adversary of any legal jurisdiction over this hidden layout. We command structural order, dynamic forward momentum, and perfect clarity over their spirit right now. Arise, break the background static, and establish their way. Amen.",
    Grace: "Dearest Father, You look right into the quietest corners of their heart and see the exact need behind this search. Wrap them in Your incredibly tender embrace right now. They don't need to find the perfect word here because You already understand. Let Your sweet presence cushion their soul and give them complete rest. Amen."
  },
  hope: {
    Julius: "Lord God, establish this vision. We declare that their expectation is anchored directly in the structural promises of the New Covenant. Let their momentum remain unshakeable. Amen.",
    Grace: "Sweet Father, thank you for lighting up their horizon today. Protect this gentle spark of hope. Keep them resting under your wings as they step into tomorrow. Amen."
  },
  peace: {
    Julius: "Father, we deploy your covenant peace over this household. We silence all structural interference. Let the garrison of heaven secure their mind against anxiety. Amen.",
    Grace: "Dearest Lord, breathe your quiet stillness over their mind right now. Let all the noise fade away. Quiet their heartbeat, and let them simply rest in your perfect love. Amen."
  },
  grief: {
    Julius: "Lord God, look upon this structural break. You understand human loss. We stand on the authority of your word that you heal the brokenhearted. Provide a systematic anchor for their soul. Amen.",
    Grace: "Oh Savior, come and hold this precious heart. Their pain is so real, and their tears are incredibly holy to you. Sit with them in the quiet gray space and comfort them. Amen."
  },
  anxiety: {
    Julius: "We execute a decisive, physical flinging of this crushing blanket off their shoulders. In the name of Jesus, we break the jurisdiction of racing thoughts and static loops. Amen.",
    Grace: "Breathe in, sweet child. Let it go. The Lord of the universe is holding the stars, and He is holding you. You do not have to figure out tomorrow today. Amen."
  }
};

// --- MAIN PORTAL COMPONENT ---
export function Feelings() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "soft" | "hard">("All");

  const [displayedList, setDisplayedList] = useState<FeelingCategory[]>([]);
  const [currentWord, setCurrentWord] = useState(wordsOverYou[0]);

  // View Routing Configuration state
  const [prayerView, setPrayerView] = useState<{
    catId: string;
    catName: string;
    catEmoji: string;
    minister: "Julius" | "Grace";
  } | null>(null);

  const handleShuffle = () => {
    const combined = [...feelingCategories].sort(() => 0.5 - Math.random());
    setDisplayedList(combined);
    setCurrentWord(wordsOverYou[Math.floor(Math.random() * wordsOverYou.length)]);
  };

  useEffect(() => {
    handleShuffle();
  }, []);

  const list = useMemo(() => {
    return displayedList.filter((c) => {
      const matchKind = filter === "All" || c.kind === filter;
      const q = query.trim().toLowerCase();
      return !q ? matchKind : matchKind && (c.name.toLowerCase().includes(q) || c.short.toLowerCase().includes(q));
    });
  }, [filter, query, displayedList]);

  const open = openId ? feelingCategories.find((c) => c.id === openId) ?? null : null;

  // ROUTING VIEW REDIRECT LAYOUTS
  if (prayerView) {
    return (
      <PrayerPage 
        catId={prayerView.catId}
        catName={prayerView.catName} 
        catEmoji={prayerView.catEmoji} 
        minister={prayerView.minister} 
        onBack={() => setPrayerView(null)} 
      />
    );
  }

  if (open) {
    return (
      <FeelingDetail 
        cat={open} 
        onBack={() => setOpenId(null)} 
        onSelectPrayer={(m) => setPrayerView({ catId: open.id, catName: open.name, catEmoji: open.emoji, minister: m })} 
      />
    );
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto pt-10 pat-mudcloth bg-[#0f1115]">
      <div className="px-6 pt-2">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-3)]">
              A place for the heart
            </p>
            <h1 className="mt-1 font-display text-[26px] tracking-wide text-gold-grad">
              What are you carrying?
            </h1>
          </div>
          <button 
            onClick={handleShuffle}
            className="flex items-center gap-1.5 rounded-full bg-[var(--color-charcoal)] border border-[var(--color-line)] px-3.5 py-1.5 text-[12px] font-semibold text-[var(--color-gold-2)] hover:bg-white/5 transition"
          >
            <LocalRefreshIcon /> Shuffle
          </button>
        </div>
        
        <div className="mt-2 text-[var(--color-gold-3)]"><ArabesqueDivider width={200} /></div>

        {/* Input Search Elements */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-charcoal)] px-4 py-3 shadow-inner">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search words, emotions, scriptures..."
            className="w-full bg-transparent text-[13.5px] text-[var(--color-cream)] outline-none placeholder-[var(--color-muted)]"
          />
        </div>

        {/* Categories Tab bar */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: "All" as const, label: "All Realities" },
            { id: "soft" as const, label: "Uplift & Anchor" },
            { id: "hard" as const, label: "Meet Me Here" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-4 py-2 text-[12px] font-semibold tracking-wide whitespace-nowrap transition ${
                filter === f.id
                  ? "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
                  : "bg-[var(--color-charcoal)] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)] hover:bg-white/5"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Dashboard Content Layer */}
      <div className="mt-5 px-6 pb-6 flex-1 flex flex-col justify-start">
        {list.length === 0 ? (
          
          /* INTERACTIVE ZERO MATCH STATE CARD (DIRECT ROUTE TO PRAYER PAGE) */
          <div className="rounded-3xl bg-[var(--color-charcoal)] border border-[var(--color-line-strong)] p-6 text-center shadow-2xl my-auto relative overflow-hidden animate-fadeIn">
            <MashrabiyaBg className="opacity-5" />
            <span className="text-4xl block mb-2 relative z-10">🔍</span>
            <h3 className="text-[14px] font-bold text-[var(--color-gold-1)] tracking-wide relative z-10">
              No matches found — try another word or review filters.
            </h3>
            <p className="mt-2 text-[12px] text-[var(--color-bronze)] leading-relaxed max-w-sm mx-auto relative z-10">
              Your lookups don't have to end in static text. You can choose to go immediately into prayer with someone below.
            </p>

            <div className="mt-5 border-t border-[var(--color-line-strong)] pt-5 relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-gold-2)] mb-3">
                Who would you like to pray with?
              </p>
              <div className="flex gap-3 max-w-sm mx-auto">
                <button
                  onClick={() => setPrayerView({ 
                    catId: "unspoken", 
                    catName: query.trim() ? `Search Burden ("${query}")` : "Unspoken Burden", 
                    catEmoji: "✨", 
                    minister: "Julius" 
                  })}
                  className="flex-1 py-3 rounded-2xl bg-[#0f1115] border border-[var(--color-line-strong)] text-[13px] font-semibold text-[var(--color-gold-1)] active:scale-95 transition hover:border-[var(--color-gold-3)]"
                >
                  🏛️ Julius
                </button>
                <button
                  onClick={() => setPrayerView({ 
                    catId: "unspoken", 
                    catName: query.trim() ? `Search Burden ("${query}")` : "Unspoken Burden", 
                    catEmoji: "✨", 
                    minister: "Grace" 
                  })}
                  className="flex-1 py-3 rounded-2xl bg-[#0f1115] border border-[var(--color-line-strong)] text-[13px] font-semibold text-[var(--color-gold-1)] active:scale-95 transition hover:border-[var(--color-gold-3)]"
                >
                  🕊️ Grace
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* STANDARD DISCOVERABLE GRID */
          <div className="grid grid-cols-2 gap-3">
            {list.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setOpenId(cat.id)}
                className="group relative flex flex-col items-start overflow-hidden rounded-3xl bg-[var(--color-charcoal)] p-4 text-left shadow-md border border-[var(--color-line-strong)] transition hover:border-[var(--color-gold-3)] active:scale-[0.97]"
              >
                <AdinkraDotsBg className="opacity-10" />
                <span className="text-3xl block drop-shadow-md">{cat.emoji}</span>
                <p className="mt-3 font-display text-[15px] tracking-wide text-[var(--color-gold-1)]">{cat.name}</p>
                <p className="mt-1 text-[11px] leading-snug text-[var(--color-bronze)] line-clamp-2">{cat.short}</p>
                <span className="mt-3 flex items-center gap-1 text-[11px] font-medium text-[var(--color-gold-2)] opacity-80">
                  Explore text <ChevronRight width={10} height={10} />
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto pt-6 text-[var(--color-gold-3)]/50">
          <KenteStrip className="rounded-md ring-1 ring-[var(--color-line)]" />
        </div>
      </div>
    </div>
  );
}

// --- SUBCOMPONENT: DETAILED EMOTION SCREEN ---
function FeelingDetail({
  cat,
  onBack,
  onSelectPrayer,
}: {
  cat: FeelingCategory;
  onBack: () => void;
  onSelectPrayer: (m: "Julius" | "Grace") => void;
}) {
  return (
    <div className="flex h-full flex-col overflow-y-auto pt-10 pat-mudcloth bg-[#0f1115]">
      <div className="flex items-center gap-3 px-5 pt-2">
        <button onClick={onBack} className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]">
          <ChevronLeft width={18} height={18} />
        </button>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-gold-3)]">For when you feel</p>
          <h2 className="font-display text-[19px] tracking-wide text-[var(--color-gold-1)]">{cat.name}</h2>
        </div>
      </div>

      {/* Hero Display */}
      <div className="relative mx-5 mt-5 overflow-hidden rounded-3xl bg-[var(--color-charcoal)] p-5 border border-[var(--color-line-strong)] shadow-lg">
        <AdinkraDotsBg className="opacity-10" />
        <div className="flex items-center gap-4">
          <span className="text-5xl">{cat.emoji}</span>
          <div>
            <p className="font-display text-[21px] tracking-wide text-[var(--color-gold-1)]">{cat.name}</p>
            <p className="text-[12px] text-[var(--color-bronze)]">{cat.short}</p>
          </div>
        </div>
        <p className="mt-4 text-[14px] leading-relaxed text-[var(--color-cream)]/90 font-serif italic bg-[#0f1115]/60 p-4 rounded-2xl border border-[var(--color-line-strong)]">
          "{cat.invitation}"
        </p>
      </div>

      {/* PRAYER TRIGGER SELECTION (DIRECT ROUTE) */}
      <div className="mx-5 mt-4 rounded-3xl bg-[var(--color-charcoal)] border border-[var(--color-line-strong)] p-4 shadow-md">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-gold-2)] mb-2.5 text-center">
          Pray With Me
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => onSelectPrayer("Julius")}
            className="flex-1 py-3 rounded-2xl bg-[#0f1115] border border-[var(--color-line-strong)] text-[13px] font-semibold text-[var(--color-gold-1)] transition hover:border-[var(--color-gold-3)]"
          >
            🏛️ Julius
          </button>
          <button
            onClick={() => onSelectPrayer("Grace")}
            className="flex-1 py-3 rounded-2xl bg-[#0f1115] border border-[var(--color-line-strong)] text-[13px] font-semibold text-[var(--color-gold-1)] transition hover:border-[var(--color-gold-3)]"
          >
            🕊️ Grace
          </button>
        </div>
      </div>

      {/* Scripture Feeds */}
      <div className="space-y-4 px-5 py-5">
        <OrnateHeading title="Scripture Comfort" align="left" />
        {cat.passages.map((p, i) => (
          <article key={i} className="rounded-3xl bg-[var(--color-charcoal)] p-5 border border-[var(--color-line-strong)] shadow-md">
            <div className="flex items-start gap-2">
              <Lozenge width={12} height={12} className="mt-1 shrink-0 text-[var(--color-gold-2)]" />
              <p className="font-serif text-[16px] leading-relaxed text-[var(--color-cream)]">"{p.text}"</p>
            </div>
            <p className="mt-2 pl-5 font-display text-[12px] tracking-wider text-[var(--color-gold-2)]">— {p.reference}</p>
            <p className="mt-3 pl-5 border-l-2 border-[var(--color-gold-3)]/30 text-[12px] text-[var(--color-bronze)]">{p.whyItMeets}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

// --- SUBCOMPONENT: INTERCESSORY FULL-SCREEN SANCTUARY PAGE ---
function PrayerPage({
  catId,
  catName,
  catEmoji,
  minister,
  onBack,
}: {
  catId: string;
  catName: string;
  catEmoji: string;
  minister: "Julius" | "Grace";
  onBack: () => void;
}) {
  const toast = useToast();
  const prayerText = prayersDb[catId]?.[minister] || prayersDb["unspoken"][minister];
  const [sharingStatus, setSharingStatus] = useState<PrayerDestination>("unassigned");

  const handleShare = (destination: "public" | "community") => {
    setSharingStatus(destination);
    if (destination === "public") {
      toast("This dynamic context and matching intercession are now set to Public.");
    } else {
      toast("Shared dynamically into your Community cluster feed.");
    }
  };

  return (
    <div className="flex h-full flex-col overflow-y-auto pt-10 pat-mudcloth bg-[#0f1115]">
      {/* Structural Header Navigation */}
      <div className="flex items-center gap-3 px-5 pt-2">
        <button onClick={onBack} className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)] hover:bg-white/5 transition">
          <ChevronLeft width={18} height={18} />
        </button>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-gold-3)]">Intercessory Sanctuary</p>
          <h2 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">Covenant Agreement</h2>
        </div>
      </div>

      {/* Main Prayer Parchment Card */}
      <div className="relative mx-5 mt-6 overflow-hidden rounded-3xl bg-[var(--color-charcoal)] p-6 border border-[var(--color-line-strong)] shadow-2xl flex-1 mb-4 flex flex-col justify-between">
        <MashrabiyaBg className="opacity-5" />
        
        <div className="relative flex flex-col items-center text-center pt-2 z-10">
          <span className="text-4xl mb-1">{minister === "Julius" ? "🏛️" : "🕊️"}</span>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold-2)]">An Intercession From</p>
          <h3 className="font-display text-[22px] text-white tracking-wide mt-0.5">{minister}</h3>
          
          <div className="mt-3 flex items-center gap-2 bg-[#0f1115] px-3 py-1.5 rounded-full border border-[var(--color-line)] shadow-inner">
            <span className="text-[12px] text-[var(--color-gold-1)] font-medium max-w-[220px] truncate">
              Focus: {catName} {catEmoji}
            </span>
          </div>

          <div className="mt-5 text-[var(--color-gold-3)]/60"><ArabesqueDivider width={160} /></div>

          {/* Prayer Core Text Typography */}
          <div className="mt-5 w-full max-w-sm">
            <p className="font-serif text-[15px] leading-relaxed text-[var(--color-cream)] italic text-left bg-[#0f1115]/70 p-5 rounded-2xl border border-[var(--color-line-strong)] shadow-inner">
              {prayerText}
            </p>
          </div>
        </div>

        {/* INTEGRATED POST-PRAYER ARCHITECTURE: DISPATCH SYSTEM */}
        <div className="relative z-10 mt-6 border-t border-[var(--color-line-strong)]/60 pt-4">
          {sharingStatus === "unassigned" ? (
            <div className="text-center animate-fadeIn">
              <p className="text-[11.5px] font-bold text-[var(--color-gold-2)] tracking-wide mb-3">
                Would you like to share this feeling and prayer?
              </p>
              <div className="flex gap-2 max-w-xs mx-auto">
                <button
                  onClick={() => handleShare("public")}
                  className="flex-1 py-2 rounded-xl bg-[var(--color-gold-2)]/10 border border-[var(--color-gold-2)] text-[11.5px] text-[var(--color-gold-1)] font-bold hover:bg-[var(--color-gold-2)]/20 transition active:scale-95"
                >
                  🌐 Make Public
                </button>
                <button
                  onClick={() => handleShare("community")}
                  className="flex-1 py-2 rounded-xl bg-[#0f1115] border border-[var(--color-line-strong)] text-[11.5px] text-white font-semibold hover:border-[var(--color-gold-3)] transition active:scale-95"
                >
                  👥 In a Community
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center animate-fadeIn py-1">
              <p className="text-[12px] font-medium text-[var(--color-gold-1)] flex items-center justify-center gap-1.5">
                <span className="text-[14px]">✨</span> Shared {sharingStatus === "public" ? "Publicly" : "in Community Layer"}
              </p>
              <p className="text-[10px] text-[var(--color-muted)] mt-0.5">
                Your intention has been logged securely to your selected circle.
              </p>
            </div>
          )}
          
          <div className="mt-4 text-center">
            <StarOctagram width={12} height={12} className="text-[var(--color-gold-3)] mx-auto opacity-50" />
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-bronze)] mt-1.5">
              Let this agreement settle in your heart.
            </p>
          </div>
        </div>
      </div>
      
      <div className="px-5 mb-6">
        <button
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-charcoal)] border border-[var(--color-line-strong)] py-3 text-[13px] font-semibold text-[var(--color-gold-1)] hover:bg-white/5 transition"
        >
          Return to Hub
        </button>
      </div>
    </div>
  );
}