import { useState } from "react";
import {
  knownCities,
  churchEmojis,
  churchThemes,
  makeInviteCode,
  type Church,
  type GeoPin,
} from "../data/content";
import { CloseIcon, SearchIcon, ChevronLeft, ChevronRight, CheckIcon } from "./icons";
import { ArabesqueDivider, Lozenge, StarOctagram } from "./Ornament";

type Props = {
  onClose: () => void;
  onCreate: (church: Church) => void;
  defaultLocation: GeoPin | null;
};

export function CreateChurchModal({ onClose, onCreate, defaultLocation }: Props) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [emoji, setEmoji] = useState(churchEmojis[0]);
  const [themeId, setThemeId] = useState(churchThemes[0].id);
  const [location, setLocation] = useState<GeoPin | null>(defaultLocation);
  const [pastor, setPastor] = useState("");
  const [verse, setVerse] = useState("");
  const [challenge, setChallenge] = useState("");
  const [query, setQuery] = useState("");

  const canNext = (() => {
    if (step === 0) return name.trim().length >= 3;
    if (step === 1) return !!emoji && !!themeId;
    if (step === 2) return !!location;
    if (step === 3) return true; // verse + pastor optional
    return true;
  })();

  function handleCreate() {
    if (!location) return;
    const theme = churchThemes.find((t) => t.id === themeId)!;
    const church: Church = {
      id: `c-${Date.now()}`,
      name: name.trim(),
      city: location.city,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      members: 1,
      pastor: pastor.trim() || "You (founder)",
      tagline: tagline.trim() || "A new community walking together.",
      weeklyVerse: verse.trim() || "Acts 2:42–47",
      themeColor: theme.classes,
      emoji,
      joined: true,
      isFounder: true,
      inviteCode: makeInviteCode(name),
      invites: [],
      privatePrayers: [],
      events: [],
      missions: [],
      supportNeeds: [],
      groupChallenge: {
        title: challenge.trim() || "Our first week — pray for one another by name",
        participating: 1,
        total: 1,
      },
      posts: [],
    };
    onCreate(church);
  }

  const cityList = knownCities.filter((c) =>
    `${c.city} ${c.country}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-[var(--scrim)]">
      <div className="max-h-[94%] w-full overflow-y-auto rounded-t-3xl bg-[var(--color-onyx)] p-5 pb-7 ring-1 ring-[var(--color-gold-3)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]"
              >
                <ChevronLeft width={16} height={16} />
              </button>
            )}
            <h3 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
              Start a community
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]"
          >
            <CloseIcon width={16} height={16} />
          </button>
        </div>

        {/* Step indicator */}
        <div className="mt-3 flex items-center gap-1.5">
          {[0, 1, 2, 3, 4].map((s) => (
            <span
              key={s}
              className={`h-1 flex-1 rounded-full transition-all ${
                s <= step ? "bg-[var(--color-gold-2)]" : "bg-[var(--color-line)]"
              }`}
            />
          ))}
        </div>

        <div className="mt-2 text-[var(--color-gold-3)]">
          <ArabesqueDivider />
        </div>

        {/* Step content */}
        {step === 0 && (
          <div className="mt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
              Step 1 of 5
            </p>
            <h4 className="mt-1 font-display text-[16px] tracking-wide text-[var(--color-gold-1)]">
              What's your church called?
            </h4>
            <p className="mt-1 text-[12px] text-[var(--color-bronze)]">
              You can change this later. Use a name your people will recognize.
            </p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Cornerstone Fellowship"
              autoFocus
              className="mt-3 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[14px] font-semibold text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
            />
            <input
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="A tagline or short prayer (optional)"
              className="mt-2 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)]/90 outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
            />
          </div>
        )}

        {step === 1 && (
          <div className="mt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
              Step 2 of 5
            </p>
            <h4 className="mt-1 font-display text-[16px] tracking-wide text-[var(--color-gold-1)]">
              Pick an emblem & color
            </h4>
            <p className="mt-1 text-[12px] text-[var(--color-bronze)]">
              How your community will appear on the globe and in lists.
            </p>

            <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
              Emblem
            </p>
            <div className="mt-2 grid grid-cols-6 gap-2">
              {churchEmojis.map((e) => (
                <button
                  key={e}
                  onClick={() => setEmoji(e)}
                  className={`flex aspect-square items-center justify-center rounded-2xl text-2xl ring-1 transition ${
                    emoji === e
                      ? "bg-[var(--color-gold-2)] ring-[var(--color-gold-1)]"
                      : "bg-[var(--color-charcoal)] ring-[var(--color-line)]"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>

            <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
              Banner palette
            </p>
            <div className="mt-2 space-y-1.5">
              {churchThemes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setThemeId(t.id)}
                  className={`flex w-full items-center justify-between rounded-2xl bg-gradient-to-br ${t.classes} px-3 py-3 ring-1 transition ${
                    themeId === t.id
                      ? "ring-[var(--color-gold-1)]"
                      : "ring-[var(--color-line)]"
                  }`}
                >
                  <span className="text-[13px] font-semibold text-[var(--color-cream)]">
                    {t.label}
                  </span>
                  {themeId === t.id && (
                    <span className="rounded-full bg-[var(--color-gold-2)] p-1 text-[var(--on-accent)]">
                      <CheckIcon width={12} height={12} />
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Preview */}
            <div
              className={`mt-3 rounded-2xl bg-gradient-to-br ${
                churchThemes.find((t) => t.id === themeId)?.classes
              } px-4 py-3 ring-1 ring-[var(--color-gold-3)]`}
            >
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-gold-3)]">
                Preview
              </p>
              <div className="mt-1 flex items-center gap-3">
                <span className="text-3xl">{emoji}</span>
                <p className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
                  {name.trim() || "Your community"}
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
              Step 3 of 5
            </p>
            <h4 className="mt-1 font-display text-[16px] tracking-wide text-[var(--color-gold-1)]">
              Where are you gathered?
            </h4>
            <p className="mt-1 text-[12px] text-[var(--color-bronze)]">
              Only city is shown — never an exact address.
            </p>
            <div className="mt-3 flex items-center gap-2 rounded-2xl bg-[var(--color-charcoal)] px-3 py-2.5 ring-1 ring-[var(--color-line)]">
              <SearchIcon width={16} height={16} className="text-[var(--color-gold-2)]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for your city"
                className="w-full bg-transparent text-[13px] text-[var(--color-cream)] outline-none placeholder:text-[var(--color-muted)]"
              />
            </div>

            <div className="mt-2 max-h-64 space-y-1 overflow-y-auto pr-1">
              {cityList.map((c) => {
                const sel = location?.city === c.city;
                return (
                  <button
                    key={`${c.city}-${c.country}`}
                    onClick={() => setLocation(c)}
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
              {cityList.length === 0 && (
                <p className="rounded-xl bg-[var(--color-charcoal)] p-3 text-center text-[11px] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]">
                  No matches. Try another spelling.
                </p>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
              Step 4 of 5
            </p>
            <h4 className="mt-1 font-display text-[16px] tracking-wide text-[var(--color-gold-1)]">
              The first week
            </h4>
            <p className="mt-1 text-[12px] text-[var(--color-bronze)]">
              Set a leader, a scripture to sit in, and a first group challenge. All optional.
            </p>

            <input
              value={pastor}
              onChange={(e) => setPastor(e.target.value)}
              placeholder="Pastor / leader name"
              className="mt-3 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
            />
            <input
              value={verse}
              onChange={(e) => setVerse(e.target.value)}
              placeholder="Weekly verse (e.g. Acts 2:42–47)"
              className="mt-2 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
            />
            <textarea
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              rows={3}
              placeholder="First group challenge (e.g. 'Pray for one another by name')"
              className="mt-2 w-full resize-none rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
            />
          </div>
        )}

        {step === 4 && (
          <div className="mt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
              Step 5 of 5
            </p>
            <h4 className="mt-1 font-display text-[16px] tracking-wide text-[var(--color-gold-1)]">
              Confirm & found
            </h4>

            <div className={`mt-3 overflow-hidden rounded-3xl bg-gradient-to-br ${churchThemes.find(t=>t.id===themeId)?.classes} p-4 ring-1 ring-[var(--color-gold-3)]`}>
              <div className="flex items-center justify-between">
                <span className="text-3xl">{emoji}</span>
                <StarOctagram width={14} height={14} className="text-[var(--color-gold-2)]" />
              </div>
              <p className="mt-1 font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
                {name.trim() || "Your community"}
              </p>
              {location && (
                <p className="text-[11px] text-[var(--color-bronze)]">
                  📍 {location.city}, {location.country}
                </p>
              )}
              <p className="mt-2 text-[12px] italic text-[var(--color-cream)]/85 font-serif">
                "{tagline.trim() || "A new community walking together."}"
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                <Detail label="Leader" value={pastor.trim() || "You (founder)"} />
                <Detail label="Week verse" value={verse.trim() || "Acts 2:42–47"} />
              </div>
            </div>

            <div className="mt-3 rounded-2xl bg-[var(--color-gold-2)]/10 p-3 ring-1 ring-[var(--color-gold-3)]">
              <p className="flex items-center gap-2 text-[11px] font-semibold text-[var(--color-gold-1)]">
                <Lozenge width={10} height={10} /> You'll be the founder
              </p>
              <p className="mt-1 text-[11px] text-[var(--color-cream)]/80">
                Your community starts with you as the only member. A private prayer wall and feed are created instantly. You'll get an invite code to share with friends and family.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 flex gap-2">
          {step < 4 ? (
            <button
              onClick={() => canNext && setStep(step + 1)}
              disabled={!canNext}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-gold-2)] py-3 text-sm font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] disabled:opacity-40"
            >
              Continue <ChevronRight width={16} height={16} />
            </button>
          ) : (
            <button
              onClick={handleCreate}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-gold-2)] py-3 text-sm font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
            >
              <Lozenge width={12} height={12} /> Found the community <Lozenge width={12} height={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[var(--tint-soft)] p-2 ring-1 ring-[var(--color-line)]">
      <p className="text-[9px] uppercase tracking-wider text-[var(--color-gold-3)]">
        {label}
      </p>
      <p className="text-[12px] font-medium text-[var(--color-cream)]">{value}</p>
    </div>
  );
}
