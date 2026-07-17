import { useState } from "react";
import { badges, type GeoPin } from "../data/content";
import { FlameIcon, HandsIcon, BookIcon, CheckIcon, BellIcon, LockIcon, CloseIcon } from "../components/icons";
import { LocationPicker } from "../components/LocationPicker";
import { SupportApp } from "./SupportApp";
import { useToast } from "../components/Toast";
import { useCompanion } from "../components/CompanionContext";
import { useFaith } from "../components/FaithContext";
import { faithLevels, bibleLevels, communityStatuses } from "../data/faith";
import { companions } from "../data/companions";
import {
  ArabesqueDivider,
  AdinkraDotsBg,
  Lozenge,
  MashrabiyaBg,
  KenteStrip,
  OrnateHeading,
  StarOctagram,
} from "../components/Ornament";
import { FaithSelector } from "../components/Onboarding"; // Shared selector

type Props = {
  streak: number;
  prayersOffered: number;
  challengesCompleted: number;
  studySessions: number;
  versesReflected: number;
  location: GeoPin | null;
  shareLocation: boolean;
  showOnGlobe: boolean;
  onSetLocation: (loc: GeoPin) => void;
  onClearLocation: () => void;
  onToggleShareLocation: () => void;
  onToggleShowOnGlobe: () => void;
  onResetOnboarding: () => void;
};

export function Profile({
  streak,
  prayersOffered,
  challengesCompleted,
  studySessions,
  versesReflected,
  location,
  shareLocation,
  showOnGlobe,
  onSetLocation,
  onClearLocation,
  onToggleShareLocation,
  onToggleShowOnGlobe,
  onResetOnboarding,
}: Props) {
  const [picking, setPicking] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const toast = useToast();
  const { companion, setCompanionId, userName, setUserName } = useCompanion();
  const [editingName, setEditingName] = useState(false);
  const [draftName, setDraftName] = useState(userName);
  const {
    faithLevel,
    setFaithLevel,
    bibleLevel,
    setBibleLevel,
    communityStatus,
    setCommunityStatus,
  } = useFaith();
  const [editingField, setEditingField] = useState<"faith" | "bible" | "community" | null>(null);
  const faithOpt = faithLevels.find((o) => o.id === faithLevel);
  const bibleOpt = bibleLevels.find((o) => o.id === bibleLevel);
  const commOpt = communityStatuses.find((o) => o.id === communityStatus);

  if (showSupport) {
    return <SupportApp onBack={() => setShowSupport(false)} />;
  }

  return (
    <div className="relative flex h-full flex-col overflow-y-auto pt-10 pat-mudcloth">
      <div className="px-6 pt-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-3)]">
          Your Walk
        </p>
        <div className="mt-1 flex items-start justify-between gap-3">
          {editingName ? (
            <div className="flex flex-1 items-center gap-2">
              <input
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                autoFocus
                className="flex-1 rounded-xl bg-[var(--color-charcoal)] px-3 py-2 font-display text-[18px] tracking-wide text-[var(--color-gold-1)] outline-none ring-1 ring-[var(--color-gold-2)]"
              />
              <button
                onClick={() => {
                  setUserName(draftName.trim() || userName);
                  setEditingName(false);
                  toast("Name saved");
                }}
                className="rounded-full bg-[var(--color-gold-2)] px-3 py-1.5 text-[11px] font-semibold text-[var(--on-accent)]"
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <h1 className="font-display text-[24px] tracking-wide text-gold-grad">
                {userName}'s journey
              </h1>
              <button
                onClick={() => {
                  setDraftName(userName);
                  setEditingName(true);
                }}
                className="text-[10px] font-medium text-[var(--color-gold-3)] underline"
              >
                Rename
              </button>
            </>
          )}
        </div>
        <div className="mt-1 text-[var(--color-gold-3)]">
          <ArabesqueDivider width={200} />
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-cream)]/80">
          Growth, not performance. These numbers exist to encourage faithfulness — not to score you.
        </p>
      </div>

      {/* Companion */}
      <div className="relative mx-6 mt-4 overflow-hidden rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-gold-4)]">
        <AdinkraDotsBg />
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
              Your companion
            </p>
            <p className="mt-1 font-display text-[16px] tracking-wide text-[var(--color-gold-1)]">
              {companion.emoji} {companion.name}
              <span className="ml-1 text-[10px] font-normal text-[var(--color-bronze)]">
                ({companion.pronouns})
              </span>
            </p>
            <p className="mt-1 text-[11px] italic text-[var(--color-bronze)] font-serif">
              "{companion.tagline}"
            </p>
          </div>
        </div>
        <div className="relative mt-3 grid grid-cols-2 gap-2">
          {companions.map((c) => {
            const sel = companion.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  if (!sel) {
                    setCompanionId(c.id);
                    toast(`${c.name} will walk with you now`);
                  }
                }}
                className={`flex items-center gap-2 rounded-2xl bg-gradient-to-br ${c.accentClasses} px-3 py-2 ring-1 transition active:scale-[0.98] ${
                  sel ? "ring-[var(--color-gold-1)] ring-2" : "ring-[var(--color-line)]"
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-gold-2)] text-[14px] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]">
                  {c.emoji}
                </span>
                <div className="min-w-0 flex-1 text-left">
                  <p className="font-display text-[12px] tracking-wide text-[var(--feature-accent)]">
                    {c.name}
                  </p>
                  <p className="text-[9px] text-[var(--feature-fg-muted)]">
                    {c.pronouns}
                  </p>
                </div>
                {sel && (
                  <span className="rounded-full bg-[var(--color-gold-2)] p-0.5 text-[var(--on-accent)]">
                    <CheckIcon width={10} height={10} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pinned location */}
      <div className="relative mx-6 mt-4 overflow-hidden rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-gold-4)]">
        <AdinkraDotsBg />
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
              Pinned location
            </p>
            {location ? (
              <>
                <p className="mt-1 font-display text-[15px] tracking-wide text-[var(--color-gold-1)]">
                  📍 {location.city}, {location.country}
                </p>
                <p className="mt-0.5 text-[10px] text-[var(--color-bronze)]">
                  Only your city is ever shared — never an exact address.
                </p>
              </>
            ) : (
              <>
                <p className="mt-1 font-display text-[15px] tracking-wide text-[var(--color-muted)]">
                  No location pinned
                </p>
                <p className="mt-0.5 text-[10px] text-[var(--color-bronze)]">
                  Pin one to appear on the prayer globe and find local churches.
                </p>
              </>
            )}
          </div>
          <button
            onClick={() => setPicking(true)}
            className="relative rounded-full bg-[var(--color-gold-2)] px-3 py-1.5 text-[11px] font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
          >
            {location ? "Change" : "Pin location"}
          </button>
        </div>

        {location && (
          <div className="relative mt-3 space-y-2">
            <ToggleRow
              label="Attach city to my prayer requests"
              hint="Lets the body see where in the world to pray for you."
              value={shareLocation}
              onToggle={() => {
                onToggleShareLocation();
                toast(shareLocation ? "City removed from prayers" : "City attached to prayers");
              }}
            />
            <ToggleRow
              label="Show me on the prayer globe"
              hint="A glowing pin marks your city while you're active."
              value={showOnGlobe}
              onToggle={() => {
                onToggleShowOnGlobe();
                toast(showOnGlobe ? "Hidden from globe" : "Now visible on globe");
              }}
            />
            <button
              onClick={() => {
                onClearLocation();
                toast("Location removed");
              }}
              className="text-[11px] font-medium text-[var(--color-rust)]"
            >
              Remove pinned location
            </button>
          </div>
        )}
      </div>

      {/* Your walk — faith profile from onboarding (editable) */}
      <div className="relative mx-6 mt-4 overflow-hidden rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line)]">
        <AdinkraDotsBg />
        <div className="relative flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
            Your walk
          </p>
          <button
            onClick={() => {
              onResetOnboarding();
              toast("Retaking the welcome — your data stays");
            }}
            className="text-[10px] font-medium text-[var(--color-gold-3)] underline"
          >
            Retake welcome
          </button>
        </div>
        <div className="relative mt-2 space-y-1.5">
          <FaithRow
            emoji={faithOpt?.emoji ?? "🌱"}
            eyebrow="Where I am"
            label={faithOpt?.label ?? "Tap to set"}
            onClick={() => setEditingField("faith")}
          />
          <FaithRow
            emoji={bibleOpt?.emoji ?? "📖"}
            eyebrow="Bible"
            label={bibleOpt?.label ?? "Tap to set"}
            onClick={() => setEditingField("bible")}
          />
          <FaithRow
            emoji={commOpt?.emoji ?? "🤝"}
            eyebrow="Community"
            label={commOpt?.label ?? "Tap to set"}
            onClick={() => setEditingField("community")}
          />
        </div>
      </div>

      {/* Shared FaithSelector modals — replaces FaithEditorModal duplication */}
      {editingField === "faith" && (
        <FaithSelector
          eyebrow="Your relationship with God"
          question="Where are you?"
          options={faithLevels}
          selected={faithLevel}
          onSelect={(v) => {
            setFaithLevel(v);
            setEditingField(null);
            toast("Saved");
          }}
        />
      )}
      {editingField === "bible" && (
        <FaithSelector
          eyebrow="Your familiarity with the Bible"
          question="How well do you know Scripture?"
          options={bibleLevels}
          selected={bibleLevel}
          onSelect={(v) => {
            setBibleLevel(v);
            setEditingField(null);
            toast("Saved");
          }}
        />
      )}
      {editingField === "community" && (
        <FaithSelector
          eyebrow="Your community"
          question="Are you walking with other believers?"
          options={communityStatuses}
          selected={communityStatus}
          onSelect={(v) => {
            setCommunityStatus(v);
            setEditingField(null);
            toast("Saved");
          }}
        />
      )}

      {/* Hero stat */}
      <div className="relative mx-6 mt-4 flex items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1006] via-[#3a2308] to-[#1a1006] p-5 text-[var(--color-cream)] shadow-lg ring-1 ring-[var(--color-gold-3)]">
        <MashrabiyaBg />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]">
          <FlameIcon width={32} height={32} />
        </div>
        <div className="relative">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-3)]">
            Current streak
          </p>
          <p className="font-display text-[28px] tracking-wide text-gold-grad">{streak} days</p>
          <p className="text-[11px] text-[var(--color-bronze)]">Longest: 21 days</p>
        </div>
        <StarOctagram
          width={16}
          height={16}
          className="absolute right-3 top-3 text-[var(--color-gold-2)]"
        />
      </div>

      {/* Engagement stats */}
      <div className="mx-6 mt-4 grid grid-cols-2 gap-2.5">
        <Stat icon={<HandsIcon width={16} height={16} />} n={prayersOffered} label="Prayers offered" />
        <Stat icon={<CheckIcon width={16} height={16} />} n={challengesCompleted} label="Challenges done" />
        <Stat icon={<BookIcon width={16} height={16} />} n={studySessions} label="Study sessions" />
        <Stat icon={<FlameIcon width={16} height={16} />} n={versesReflected} label="Verses reflected" />
      </div>

      {/* Heatmap */}
      <div className="mx-6 mt-4 rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line)]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Last 4 weeks
        </p>
        <div className="heatmap-stagger mt-3 flex gap-1">
          {Array.from({ length: 28 }).map((_, i) => {
            const intensity = [0, 1, 2, 3, 2, 1, 3, 2, 3, 1, 0, 2, 3, 3, 2, 3, 2, 1, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3][i];
            const colors = ["bg-[#1a160f]", "bg-[#5a4a14]", "bg-[#b8861a]", "bg-[#f5d97a]"];
            return (
              <div
                key={i}
                className={`h-6 flex-1 rounded ${colors[intensity]}`}
                title={`Day ${i + 1}`}
              />
            );
          })}
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--color-muted)]">
          <span>4 weeks ago</span>
          <span>today</span>
        </div>
      </div>

      {/* Badges */}
      <div className="mx-6 mt-4 rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line)]">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
            Marks of the journey
          </p>
          <span className="text-[10px] text-[var(--color-gold-1)]">
            {badges.filter((b) => b.earned).length}/{badges.length}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`rounded-2xl p-2.5 text-center ring-1 ${
                b.earned
                  ? "bg-[var(--color-gold-2)]/10 ring-[var(--color-gold-3)]"
                  : "bg-[var(--tint-soft)] opacity-40 ring-[var(--color-line)]"
              }`}
            >
              <p className="text-2xl">{b.icon}</p>
              <p className="mt-1 text-[10px] font-semibold leading-tight text-[var(--color-gold-1)]">
                {b.name}
              </p>
              <p className="mt-0.5 text-[9px] leading-tight text-[var(--color-bronze)]">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Daily rhythm */}
      <div className="relative mx-6 mt-4 overflow-hidden rounded-3xl bg-black p-4 text-[var(--color-cream)] ring-1 ring-[var(--color-gold-4)]">
        <MashrabiyaBg />
        <div className="relative">
          <OrnateHeading eyebrow="Habit" title="Your daily rhythm" />
          <p className="mt-1 text-[12px] leading-relaxed text-[var(--color-bronze)]">
            Reminders that gently invite, never demand.
          </p>
          <ul className="mt-3 space-y-2">
            <RhythmRow icon="🌅" time="7:00 AM" label="Verse + Reflection" />
            <RhythmRow icon="☀️" time="12:30 PM" label="Breath prayer + Challenge check" />
            <RhythmRow icon="🌙" time="9:00 PM" label="Examen — what did I walk in?" />
          </ul>
          <button
            onClick={() => toast("Reminder editor opening...")}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-gold-2)]/15 py-2 text-[12px] font-semibold text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)] active:scale-[0.99]"
          >
            <BellIcon width={14} height={14} />
            Adjust reminders
          </button>
        </div>
      </div>

      {/* Support ACTS — donate / invite / website */}
      <button
        onClick={() => setShowSupport(true)}
        className="relative mx-6 mt-4 flex w-auto items-center gap-3 overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a1a06] via-[#3d2509] to-[#2a1a06] p-4 text-left ring-1 ring-[var(--color-gold-3)] active:scale-[0.99]"
      >
        <AdinkraDotsBg />
        <StarOctagram
          width={14}
          height={14}
          className="absolute right-3 top-3 text-[var(--color-gold-2)] shimmer"
        />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]">
          <span className="text-xl">💛</span>
        </div>
        <div className="relative min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--feature-deep-gold)]">
            Stand with us
          </p>
          <p className="mt-0.5 font-display text-[14px] tracking-wide text-[var(--feature-accent)]">
            Support ACTS
          </p>
          <p className="mt-0.5 text-[10px] text-[var(--feature-fg)]/70">
            Donate · Invite a friend · Visit ALIVE
          </p>
        </div>
      </button>

      {/* Settings */}
      <div className="mx-6 mt-4 rounded-3xl bg-[var(--color-charcoal)] p-2 shadow-sm ring-1 ring-[var(--color-line)]">
        <SettingRow
          icon={<LockIcon width={16} height={16} />}
          label="Anonymity & Privacy"
          onClick={() => toast("Privacy controls — coming soon")}
        />
        <SettingRow
          icon={<BellIcon width={16} height={16} />}
          label="Notifications"
          onClick={() => toast("Notification settings — coming soon")}
        />
        <SettingRow
          icon={<BookIcon width={16} height={16} />}
          label="My study journal"
          onClick={() => toast("Opens your study journal")}
        />
        <SettingRow
          icon={<HandsIcon width={16} height={16} />}
          label="My prayers (private)"
          onClick={() => toast("Your private prayer history")}
          last
        />
      </div>

      <div className="mx-6 my-4">
        <KenteStrip className="rounded-md ring-1 ring-[var(--color-line)]" />
      </div>

      {picking && (
        <LocationPicker
          current={location}
          onClose={() => setPicking(false)}
          onSave={(loc) => {
            onSetLocation(loc);
            setPicking(false);
          }}
        />
      )}
    </div>
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
        <span className="font-display text-[22px] tracking-wide text-[var(--color-gold-1)]">{n}</span>
      </div>
      <p className="mt-1 text-[10px] font-medium text-[var(--color-bronze)]">{label}</p>
    </div>
  );
}

function ToggleRow({
  label,
  hint,
  value,
  onToggle,
}: {
  label: string;
  hint: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-2xl bg-[var(--tint-soft)] px-3 py-2 ring-1 ring-[var(--color-line)]">
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-semibold text-[var(--color-cream)]">{label}</p>
        <p className="text-[10px] text-[var(--color-bronze)]">{hint}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          value ? "bg-[var(--color-gold-2)]" : "bg-[var(--color-line-strong)]"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-[var(--color-cream)] shadow transition-all ${
            value ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function RhythmRow({ icon, time, label }: { icon: string; time: string; label: string }) {
  return (
    <li className="flex items-center gap-3 rounded-xl bg-[var(--color-charcoal)] px-3 py-2 ring-1 ring-[var(--color-line)]">
      <span className="text-lg">{icon}</span>
      <div className="flex-1">
        <p className="text-[11px] font-semibold text-[var(--color-gold-1)]">{time}</p>
        <p className="text-[11px] text-[var(--color-bronze)]">{label}</p>
      </div>
      <Lozenge width={10} height={10} className="text-[var(--color-gold-2)]" />
    </li>
  );
}

function FaithRow({
  emoji,
  eyebrow,
  label,
  onClick,
}: {
  emoji: string;
  eyebrow: string;
  label: string;
  onClick?: () => void;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-xl bg-[var(--tint-soft)] px-3 py-2 text-left ring-1 ring-[var(--color-line)] ${
        onClick ? "active:scale-[0.99]" : ""
      }`}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold-2)] text-[13px] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]">
        {emoji}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          {eyebrow}
        </p>
        <p className="text-[12px] font-medium text-[var(--color-cream)]">{label}</p>
      </div>
      {onClick && <span className="text-[var(--color-gold-3)]">›</span>}
    </Comp>
  );
}

function SettingRow({
  icon,
  label,
  last,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  last?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-3 py-3 text-left active:bg-[var(--tint-soft)] ${
        last ? "" : "border-b border-[var(--color-line)]"
      }`}
    >
      <span className="text-[var(--color-gold-2)]">{icon}</span>
      <span className="flex-1 text-[13px] font-medium text-[var(--color-cream)]">{label}</span>
      <span className="text-[var(--color-bronze)]">›</span>
    </button>
  );
}