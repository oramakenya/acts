import { useMemo, useState } from "react";
import { seedPrayers, type PrayerRequest, type GeoPin } from "../data/content";
import {
  HandsIcon,
  PlusIcon,
  LockIcon,
  CloseIcon,
  ChevronLeft,
} from "../components/icons";
import { WorldMap, type MapPin } from "../components/WorldMap";
import {
  ArabesqueDivider,
  Lozenge,
  StarOctagram,
  OrnateHeading,
} from "../components/Ornament";
import { useToast } from "../components/Toast";
import { useCompanion } from "../components/CompanionContext";

const categories: PrayerRequest["category"][] = [
  "Healing",
  "Family",
  "Work",
  "Faith",
  "Grief",
  "Guidance",
  "Thanksgiving",
  "Testimony",
];

const categoryTone: Record<
  PrayerRequest["category"],
  "gold" | "rust" | "cream" | "blood"
> = {
  Healing: "rust",
  Family: "gold",
  Work: "cream",
  Faith: "gold",
  Grief: "blood",
  Guidance: "cream",
  Thanksgiving: "gold",
  Testimony: "gold",
};

const anonNames = [
  "A brother in the body",
  "A sister in Christ",
  "Anonymous",
  "A fellow saint",
  "A grateful soul",
  "A weary pilgrim",
  "A child of God",
];

export function PrayerWall({
  onPrayed,
  userLocation,
  shareLocation,
}: {
  onPrayed: () => void;
  userLocation: GeoPin | null;
  shareLocation: boolean;
}) {
  const [prayers, setPrayers] = useState<PrayerRequest[]>(seedPrayers);
  const [composing, setComposing] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"All" | PrayerRequest["category"]>("All");
  const [view, setView] = useState<"list" | "globe">("list");
  const toast = useToast();
  const { companion } = useCompanion();

  const list = prayers.filter((p) => filter === "All" || p.category === filter);
  const open = openId ? prayers.find((p) => p.id === openId) ?? null : null;

  function handlePray(id: string) {
    const p = prayers.find((x) => x.id === id);
    if (p && p.hasPrayed) return;
    setPrayers((prev) =>
      prev.map((p) =>
        p.id === id && !p.hasPrayed
          ? { ...p, hasPrayed: true, prayedCount: p.prayedCount + 1 }
          : p
      )
    );
    onPrayed();
    toast(`${companion.name}: prayer heard`);
  }
  function handleRejoice(id: string) {
    const p = prayers.find((x) => x.id === id);
    if (p && p.hasRejoiced) return;
    setPrayers((prev) =>
      prev.map((p) =>
        p.id === id && !p.hasRejoiced
          ? { ...p, hasRejoiced: true, rejoiceCount: (p.rejoiceCount ?? 0) + 1 }
          : p
      )
    );
    toast(`🙌 Rejoicing with them`);
  }
  function handleEncourage(id: string, text: string) {
    setPrayers((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              encouragements: [
                { id: `e-${Date.now()}`, text, ago: "just now" },
                ...p.encouragements,
              ],
            }
          : p
      )
    );
    toast("Encouragement sent");
  }
  function handlePost(
    category: PrayerRequest["category"],
    body: string,
    attachLocation: boolean
  ) {
    const isTestimony = category === "Testimony" || category === "Thanksgiving";
    const newP: PrayerRequest = {
      id: `p-${Date.now()}`,
      anonymousName: anonNames[Math.floor(Math.random() * anonNames.length)],
      postedAgo: "just now",
      category,
      isTestimony,
      body,
      prayedCount: 0,
      rejoiceCount: isTestimony ? 0 : undefined,
      encouragements: [],
      location: attachLocation && userLocation ? userLocation : undefined,
    };
    setPrayers((prev) => [newP, ...prev]);
    setComposing(false);
    toast(isTestimony ? "🙌 Testimony shared — He gets the glory" : "Request shared with the body");
  }

  if (open) {
    return (
      <PrayerDetail
        p={open}
        onBack={() => setOpenId(null)}
        onPray={() => handlePray(open.id)}
        onRejoice={() => handleRejoice(open.id)}
        onEncourage={(text) => handleEncourage(open.id, text)}
      />
    );
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden pt-10 pat-mudcloth">
      <div className="px-6 pt-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-3)]">
          Pillar 2
        </p>
        <h1 className="mt-1 font-display text-[24px] tracking-wide text-gold-grad">
          Prayer Wall
        </h1>
        <div className="mt-1 text-[var(--color-gold-3)]">
          <ArabesqueDivider width={200} />
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-cream)]/80">
          Anonymous, sacred, shared. Names are never visible — anonymity makes room for truth.
        </p>

        <div className="mt-3 inline-flex rounded-full bg-[var(--color-charcoal)] p-1 ring-1 ring-[var(--color-line)]">
          <button
            onClick={() => setView("list")}
            className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
              view === "list"
                ? "bg-[var(--color-gold-2)] text-[var(--on-accent)]"
                : "text-[var(--color-bronze)]"
            }`}
          >
            📃 Wall
          </button>
          <button
            onClick={() => setView("globe")}
            className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
              view === "globe"
                ? "bg-[var(--color-gold-2)] text-[var(--on-accent)]"
                : "text-[var(--color-bronze)]"
            }`}
          >
            🌍 Globe
          </button>
        </div>
      </div>

      {view === "globe" ? (
        <GlobeView
          prayers={prayers}
          userLocation={shareLocation ? userLocation : null}
          onOpen={(id) => setOpenId(id)}
        />
      ) : (
        <ListView list={list} filter={filter} setFilter={setFilter} onOpen={setOpenId} />
      )}

      <button
        onClick={() => setComposing(true)}
        className="absolute bottom-5 right-5 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-gold-2)] text-[var(--on-accent)] shadow-xl ring-4 ring-[var(--color-gold-4)]/60 active:scale-95"
      >
        <PlusIcon width={22} height={22} />
      </button>

      {composing && (
        <Composer
          onClose={() => setComposing(false)}
          onPost={handlePost}
          userLocation={userLocation}
          defaultShareLocation={shareLocation}
        />
      )}
    </div>
  );
}

function ListView({
  list,
  filter,
  setFilter,
  onOpen,
}: {
  list: PrayerRequest[];
  filter: "All" | PrayerRequest["category"];
  setFilter: (f: "All" | PrayerRequest["category"]) => void;
  onOpen: (id: string) => void;
}) {
  return (
    <>
      <div className="px-6 pt-2">
        <div className="flex items-center gap-2 rounded-2xl bg-[var(--tint)] px-3 py-2 ring-1 ring-[var(--color-gold-4)]">
          <LockIcon width={14} height={14} className="text-[var(--color-gold-1)]" />
          <p className="text-[11px] text-[var(--color-cream)]/85">
            Your name is never shown. Ever.
          </p>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto px-6 pb-1">
        <div className="flex gap-2">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium ${
                filter === c
                  ? "bg-[var(--color-gold-2)] text-[var(--on-accent)]"
                  : "bg-[var(--color-charcoal)] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-3">
        <div className="space-y-3">
          {list.map((p) => {
            const isTestimony = p.isTestimony || p.category === "Testimony";
            return (
              <button
                key={p.id}
                onClick={() => onOpen(p.id)}
                className={`block w-full rounded-3xl p-4 text-left shadow-sm ring-1 active:scale-[0.99] ${
                  isTestimony
                    ? "bg-gradient-to-br from-[#2a1a06] via-[#3d2509] to-[#2a1a06] ring-[var(--color-gold-4)]"
                    : "bg-[var(--color-charcoal)] ring-[var(--color-line)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${
                      isTestimony
                        ? "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-[var(--color-gold-1)]"
                        : "bg-[var(--tint)] text-[var(--color-gold-1)] ring-[var(--color-line)]"
                    }`}
                  >
                    {isTestimony && "🙌 "}{p.category}
                  </span>
                  <span className="text-[10px] text-[var(--color-muted)]">{p.postedAgo}</span>
                </div>
                <p className="mt-2 line-clamp-3 text-[13px] leading-snug text-[var(--color-cream)]/90 font-serif">
                  {p.body}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-[10px] italic text-[var(--color-muted)]">
                    — {p.anonymousName}
                  </p>
                  {p.location && (
                    <p className="text-[10px] text-[var(--color-gold-3)]">
                      📍 {p.location.city}, {p.location.country}
                    </p>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-[var(--color-line)] pt-2 text-[11px]">
                  {isTestimony ? (
                    <div className="flex items-center gap-1.5 text-[var(--color-gold-1)]">
                      <span>🙌</span>
                      <span className="font-semibold">{p.rejoiceCount ?? 0}</span>
                      <span className="text-[var(--color-muted)]">rejoicing</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[var(--color-gold-1)]">
                      <HandsIcon width={14} height={14} />
                      <span className="font-semibold">{p.prayedCount}</span>
                      <span className="text-[var(--color-muted)]">praying</span>
                    </div>
                  )}
                  <span className="text-[var(--color-muted)]">
                    💬 {p.encouragements.length}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

function GlobeView({
  prayers,
  userLocation,
  onOpen,
}: {
  prayers: PrayerRequest[];
  userLocation: GeoPin | null;
  onOpen: (id: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const located = useMemo(() => prayers.filter((p) => p.location), [prayers]);

  const pins: MapPin[] = useMemo(() => {
    const base: MapPin[] = located.map((p) => ({
      id: p.id,
      lat: p.location!.lat,
      lon: p.location!.lon,
      tone: categoryTone[p.category],
      pulse: p.isTestimony || p.category === "Testimony" ? !p.hasRejoiced : !p.hasPrayed,
      size: p.isTestimony || p.category === "Testimony" ? 2.4 : 2,
    }));
    if (userLocation) {
      base.push({
        id: "__me__",
        lat: userLocation.lat,
        lon: userLocation.lon,
        tone: "cream",
        size: 2.6,
        pulse: true,
      });
    }
    return base;
  }, [located, userLocation]);

  const byCountry = useMemo(() => {
    const m = new Map<string, number>();
    located.forEach((p) => {
      const k = p.location!.country;
      m.set(k, (m.get(k) ?? 0) + 1);
    });
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [located]);

  const selectedPrayer = selected ? prayers.find((p) => p.id === selected) : null;

  return (
    <div className="flex-1 overflow-y-auto px-5 pb-3 pt-3">
      <WorldMap
        pins={pins}
        selectedId={selected}
        onPinClick={(id) => {
          if (id === "__me__") return;
          setSelected(id);
        }}
        height={210}
        showGrid
      >
        <div className="absolute left-3 top-3 rounded-full bg-[var(--feature-tint)] px-2 py-1 text-[10px] font-medium text-[var(--feature-accent)] backdrop-blur ring-1 ring-[var(--color-gold-4)]">
          {located.length} prayers · {byCountry.length} countries
        </div>
        {userLocation && (
          <div className="absolute right-3 top-3 rounded-full bg-[var(--color-gold-2)] px-2 py-1 text-[10px] font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]">
            📍 You · {userLocation.city}
          </div>
        )}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[9px] text-[var(--color-gold-1)]/80">
          <span>Tap a glowing pin to read & pray</span>
          <div className="flex items-center gap-2">
            <Legend tone="rust" label="Healing/Grief" />
            <Legend tone="gold" label="Faith/Family" />
            <Legend tone="cream" label="You" />
          </div>
        </div>
      </WorldMap>

      {selectedPrayer ? (
        <div className="mt-3 rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-gold-4)]">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-[var(--tint)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]">
              {selectedPrayer.category}
            </span>
            <span className="text-[10px] text-[var(--color-gold-3)]">
              📍 {selectedPrayer.location!.city}, {selectedPrayer.location!.country}
            </span>
          </div>
          <p className="mt-2 line-clamp-3 font-serif text-[13px] leading-snug text-[var(--color-cream)]/90">
            {selectedPrayer.body}
          </p>
          <p className="mt-1 text-[10px] italic text-[var(--color-muted)]">
            — {selectedPrayer.anonymousName} · {selectedPrayer.postedAgo}
          </p>
          <button
            onClick={() => onOpen(selectedPrayer.id)}
            className="mt-3 w-full rounded-xl bg-[var(--color-gold-2)] py-2 text-[12px] font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
          >
            Open & pray
          </button>
        </div>
      ) : (
        <div className="mt-3 rounded-3xl bg-[var(--tint-soft)] p-3 text-center text-[11px] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]">
          Tap any glowing pin on the globe to read that prayer.
        </div>
      )}

      <div className="mt-3 rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line)]">
        <OrnateHeading eyebrow="Across the body" title="Where prayers rise" />
        <div className="mt-3 space-y-1.5">
          {byCountry.map(([country, n]) => (
            <div
              key={country}
              className="flex items-center justify-between rounded-xl bg-[var(--tint-soft)] px-3 py-2 ring-1 ring-[var(--color-line)]"
            >
              <span className="text-[12px] font-medium text-[var(--color-cream)]">
                {country}
              </span>
              <span className="text-[11px] text-[var(--color-gold-1)]">
                {n} {n === 1 ? "prayer" : "prayers"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Legend({
  tone,
  label,
}: {
  tone: "gold" | "rust" | "cream" | "blood";
  label: string;
}) {
  const map = {
    gold: "bg-[#f5d97a]",
    rust: "bg-[#b85c2c]",
    cream: "bg-[#f5e6c4]",
    blood: "bg-[#8b1e1e]",
  };
  return (
    <span className="flex items-center gap-1">
      <span className={`h-1.5 w-1.5 rounded-full ${map[tone]}`} /> {label}
    </span>
  );
}

function PrayerDetail({
  p,
  onBack,
  onPray,
  onRejoice,
  onEncourage,
}: {
  p: PrayerRequest;
  onBack: () => void;
  onPray: () => void;
  onRejoice: () => void;
  onEncourage: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const isTestimony = p.isTestimony || p.category === "Testimony";

  return (
    <div className="flex h-full flex-col overflow-y-auto pt-10 pat-mudcloth">
      <div className="flex items-center gap-3 px-5 pt-2">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]"
        >
          <ChevronLeft width={18} height={18} />
        </button>
        <h2 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
          {isTestimony ? "Testimony 🙌" : "Prayer Request"}
        </h2>
      </div>

      <div
        className={`relative mx-5 mt-4 overflow-hidden rounded-3xl p-5 shadow-sm ring-1 ${
          isTestimony
            ? "bg-gradient-to-br from-[#2a1a06] via-[#3d2509] to-[#2a1a06] ring-[var(--color-gold-3)]"
            : "bg-[var(--color-charcoal)] ring-[var(--color-gold-4)]"
        }`}
      >
        <StarOctagram
          width={14}
          height={14}
          className="absolute right-3 top-3 text-[var(--color-gold-2)]"
        />
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${
              isTestimony
                ? "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-[var(--color-gold-1)]"
                : "bg-[var(--tint)] text-[var(--color-gold-1)] ring-[var(--color-line)]"
            }`}
          >
            {isTestimony ? "🙌 " : ""}{p.category}
          </span>
          <span className="text-[10px] text-[var(--color-muted)]">{p.postedAgo}</span>
        </div>
        <p className="mt-3 font-serif text-[15px] leading-relaxed text-[var(--color-cream)]">
          {p.body}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-[11px] italic text-[var(--color-muted)]">— {p.anonymousName}</p>
          {p.location && (
            <p className="text-[11px] text-[var(--color-gold-3)]">
              📍 {p.location.city}, {p.location.country}
            </p>
          )}
        </div>

        {isTestimony ? (
          <button
            onClick={onRejoice}
            disabled={p.hasRejoiced}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold transition ${
              p.hasRejoiced
                ? "bg-[var(--color-gold-4)]/30 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
                : "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] active:scale-[0.99]"
            }`}
          >
            <span className="text-base">🙌</span>
            {p.hasRejoiced ? "You rejoiced with them" : "Rejoice with them"}
            <span className="ml-1 rounded-full bg-[var(--tint-xs)] px-2 py-0.5 text-[10px]">
              {p.rejoiceCount ?? 0}
            </span>
          </button>
        ) : (
          <button
            onClick={onPray}
            disabled={p.hasPrayed}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold transition ${
              p.hasPrayed
                ? "bg-[var(--color-gold-4)]/30 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
                : "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] active:scale-[0.99]"
            }`}
          >
            <HandsIcon width={16} height={16} />
            {p.hasPrayed ? "You prayed for this" : "I prayed for this"}
            <span className="ml-1 rounded-full bg-[var(--tint-xs)] px-2 py-0.5 text-[10px]">
              {p.prayedCount}
            </span>
          </button>
        )}

        {/* Show both counts when testimony has prayer history (older posts) */}
        {isTestimony && p.prayedCount > 0 && (
          <p className="mt-2 text-center text-[10px] text-[var(--color-bronze)] italic font-serif">
            🤲 {p.prayedCount} prayed for this before the breakthrough
          </p>
        )}
      </div>

      <div className="px-5 pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Encouragements ({p.encouragements.length})
        </p>
        <div className="mt-2 space-y-2">
          {p.encouragements.map((e) => (
            <div
              key={e.id}
              className="rounded-2xl bg-[var(--color-charcoal)] p-3 text-[12px] leading-snug text-[var(--color-cream)]/90 ring-1 ring-[var(--color-line)]"
            >
              <p>{e.text}</p>
              <p className="mt-1 text-[10px] text-[var(--color-muted)]">{e.ago} · anonymous</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-5 my-4 mt-3 rounded-2xl bg-[var(--color-gold-2)]/10 p-3 ring-1 ring-[var(--color-gold-3)]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-1)]">
          Send a brief encouragement
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          maxLength={200}
          placeholder="Speak life. Quote scripture. Keep it gentle."
          className="mt-2 w-full resize-none rounded-xl bg-[var(--tint)] p-2.5 text-[12px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] text-[var(--color-muted)]">
            {text.length}/200 · anonymous
          </span>
          <button
            onClick={() => {
              if (text.trim()) {
                onEncourage(text.trim());
                setText("");
              }
            }}
            disabled={!text.trim()}
            className="rounded-full bg-[var(--color-gold-2)] px-3 py-1.5 text-[11px] font-semibold text-[var(--on-accent)] disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function Composer({
  onClose,
  onPost,
  userLocation,
  defaultShareLocation,
}: {
  onClose: () => void;
  onPost: (cat: PrayerRequest["category"], body: string, attachLocation: boolean) => void;
  userLocation: GeoPin | null;
  defaultShareLocation: boolean;
}) {
  const [cat, setCat] = useState<PrayerRequest["category"]>("Faith");
  const [body, setBody] = useState("");
  const [attach, setAttach] = useState(defaultShareLocation && !!userLocation);

  return (
    <div className="absolute inset-0 z-30 flex items-end bg-black/70">
      <div className="max-h-[90%] w-full overflow-y-auto rounded-t-3xl bg-[var(--color-onyx)] p-5 pb-7 ring-1 ring-[var(--color-gold-4)]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
            Share a request
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

        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-black/40 px-3 py-2 ring-1 ring-[var(--color-gold-4)]">
          <LockIcon width={14} height={14} className="text-[var(--color-gold-1)]" />
          <p className="text-[11px] text-[var(--color-cream)]/85">
            Posted anonymously. Even we don't link your name.
          </p>
        </div>

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Category
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-2.5 py-1 text-[11px] ${
                cat === c
                  ? "bg-[var(--color-gold-2)] text-[var(--on-accent)]"
                  : "bg-[var(--color-charcoal)] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]"
              }`}
            >
              {c === "Testimony" ? "🙌 Testimony" : c === "Thanksgiving" ? "🙏 Thanks" : c}
            </button>
          ))}
        </div>

        {(cat === "Testimony" || cat === "Thanksgiving") && (
          <div className="mt-2 rounded-2xl bg-[var(--color-gold-2)]/10 p-3 ring-1 ring-[var(--color-gold-3)]">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-1)]">
              🙌 A note
            </p>
            <p className="mt-1 text-[11px] text-[var(--color-cream)]/85 font-serif italic">
              Praise breeds praise. Others will see this and rejoice with you. He gets the glory.
            </p>
          </div>
        )}

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          maxLength={500}
          placeholder="Share what's on your heart. The body is praying."
          className="mt-3 w-full resize-none rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        <div className="mt-1 flex items-center justify-between text-[10px] text-[var(--color-muted)]">
          <span>{body.length}/500</span>
        </div>

        <div className="mt-3 flex items-start gap-3 rounded-2xl bg-[var(--color-charcoal)] p-3 ring-1 ring-[var(--color-line)]">
          <span className="mt-0.5 text-base">📍</span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-[var(--color-gold-1)]">
              Show on the prayer globe
            </p>
            {userLocation ? (
              <p className="mt-0.5 text-[10px] text-[var(--color-bronze)]">
                Only the city is shared — never an exact address.
                <br />
                <span className="font-medium text-[var(--color-cream)]">
                  {userLocation.city}, {userLocation.country}
                </span>
              </p>
            ) : (
              <p className="mt-0.5 text-[10px] text-[var(--color-bronze)]">
                Pin a location in your profile to enable this.
              </p>
            )}
          </div>
          <button
            onClick={() => userLocation && setAttach((a) => !a)}
            disabled={!userLocation}
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
              attach ? "bg-[var(--color-gold-2)]" : "bg-[var(--color-line-strong)]"
            } disabled:opacity-40`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-[var(--color-cream)] shadow transition-all ${
                attach ? "left-[22px]" : "left-0.5"
              }`}
            />
          </button>
        </div>

        <button
          onClick={() => body.trim() && onPost(cat, body.trim(), attach)}
          disabled={!body.trim()}
          className="mt-3 w-full rounded-2xl bg-[var(--color-gold-2)] py-3 text-sm font-semibold text-black ring-1 ring-[var(--color-gold-1)] disabled:opacity-40"
        >
          <span className="inline-flex items-center gap-2">
            <Lozenge width={10} height={10} />
            Post anonymously
            <Lozenge width={10} height={10} />
          </span>
        </button>
      </div>
    </div>
  );
}
