import { useState } from "react";
import { knownCities, type GeoPin } from "../data/content";
import { CloseIcon, SearchIcon, LockIcon } from "./icons";
import { WorldMap, type MapPin } from "./WorldMap";
import { ArabesqueDivider } from "./Ornament";

export function LocationPicker({
  current,
  onClose,
  onSave,
}: {
  current: GeoPin | null;
  onClose: () => void;
  onSave: (loc: GeoPin) => void;
}) {
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<GeoPin | null>(current);

  const list = knownCities.filter((c) =>
    `${c.city} ${c.country}`.toLowerCase().includes(query.toLowerCase())
  );

  const pins: MapPin[] = knownCities.map((c) => ({
    id: `${c.city}`,
    lat: c.lat,
    lon: c.lon,
    tone: picked && picked.city === c.city ? "gold" : "cream",
    pulse: picked?.city === c.city,
    size: picked?.city === c.city ? 2.6 : 1.5,
  }));

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-[var(--scrim)]">
      <div className="max-h-[92%] w-full overflow-y-auto rounded-t-3xl bg-[var(--color-onyx)] p-5 pb-7 ring-1 ring-[var(--color-gold-4)]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
            Pin your location
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

        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-[var(--tint)] px-3 py-2 ring-1 ring-[var(--color-gold-4)]">
          <LockIcon width={14} height={14} className="text-[var(--color-gold-1)]" />
          <p className="text-[11px] text-[var(--color-cream)]/85">
            Only the city is shared — never an exact address. You control whether
            it's attached to prayers.
          </p>
        </div>

        <div className="mt-3">
          <WorldMap
            pins={pins}
            height={150}
            onPinClick={(id) => {
              const c = knownCities.find((x) => x.city === id);
              if (c) setPicked(c);
            }}
            showGrid
          >
            {picked && (
              <div className="absolute bottom-2 left-3 rounded-full bg-[var(--color-gold-2)] px-2 py-1 text-[10px] font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]">
                📍 {picked.city}, {picked.country}
              </div>
            )}
          </WorldMap>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-[var(--color-charcoal)] px-3 py-2.5 ring-1 ring-[var(--color-line)]">
          <SearchIcon width={16} height={16} className="text-[var(--color-gold-2)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for your city"
            className="w-full bg-transparent text-[13px] text-[var(--color-cream)] outline-none placeholder:text-[var(--color-muted)]"
          />
        </div>

        <div className="mt-2 max-h-56 space-y-1 overflow-y-auto pr-1">
          {list.map((c) => {
            const sel = picked?.city === c.city;
            return (
              <button
                key={`${c.city}-${c.country}`}
                onClick={() => setPicked(c)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition ${
                  sel
                    ? "bg-[var(--color-gold-2)] text-[var(--on-accent)]"
                    : "bg-[var(--color-charcoal)] text-[var(--color-cream)] ring-1 ring-[var(--color-line)]"
                }`}
              >
                <span className="text-[12px] font-medium">{c.city}</span>
                <span className="text-[10px] opacity-80">{c.country}</span>
              </button>
            );
          })}
          {list.length === 0 && (
            <p className="rounded-xl bg-[var(--color-charcoal)] p-3 text-center text-[11px] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]">
              No matches. Try another spelling.
            </p>
          )}
        </div>

        <button
          onClick={() => picked && onSave(picked)}
          disabled={!picked}
          className="mt-3 w-full rounded-2xl bg-[var(--color-gold-2)] py-3 text-sm font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] disabled:opacity-40"
        >
          Save location
        </button>
      </div>
    </div>
  );
}
