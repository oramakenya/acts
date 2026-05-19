import { useState } from "react";
import type {
  Church,
  ChurchEvent,
  Mission,
  SupportNeed,
} from "../data/content";
import {
  CloseIcon,
  CheckIcon,
  PlusIcon,
  ChevronRight,
} from "./icons";
import { ArabesqueDivider, Lozenge, StarOctagram, OrnateHeading } from "./Ornament";
import { useToast } from "./Toast";
import { useCompanion } from "./CompanionContext";

// ─────────────────────────────────────────────────────────
// EVENTS TAB
// ─────────────────────────────────────────────────────────

const eventKinds: ChurchEvent["kind"][] = [
  "Service",
  "Prayer Night",
  "Bible Study",
  "Retreat",
  "Conference",
  "Social",
  "Outreach",
];

const kindEmoji: Record<ChurchEvent["kind"], string> = {
  Service: "⛪",
  "Prayer Night": "🕯️",
  "Bible Study": "📖",
  Retreat: "⛰️",
  Conference: "🎤",
  Social: "🍞",
  Outreach: "🌾",
};

export function EventsTab({
  church,
  onToggleAttend,
  onPost,
}: {
  church: Church;
  onToggleAttend: (eventId: string) => void;
  onPost: (event: ChurchEvent) => void;
}) {
  const [composing, setComposing] = useState(false);
  const toast = useToast();

  return (
    <div className="space-y-3">
      <div className="rounded-3xl bg-[var(--color-gold-2)]/10 p-4 ring-1 ring-[var(--color-gold-3)]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-1)]">
          Events with {church.name}
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-[var(--color-cream)]/85 font-serif italic">
          Gather in person. Tap any event to mark yourself attending — or host your own.
        </p>
      </div>

      {church.joined && (
        <button
          onClick={() => setComposing(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-gold-2)] py-2.5 text-[12px] font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] active:scale-[0.99]"
        >
          <PlusIcon width={14} height={14} /> Host an event
        </button>
      )}

      {church.events.length === 0 ? (
        <div className="rounded-3xl bg-[var(--color-charcoal)] p-6 text-center ring-1 ring-[var(--color-line)]">
          <p className="text-3xl">📅</p>
          <p className="mt-2 font-display text-[14px] tracking-wide text-[var(--color-gold-1)]">
            No events scheduled
          </p>
          <p className="mt-1 text-[11px] text-[var(--color-bronze)]">
            {church.joined ? "Tap 'Host an event' to start the calendar." : "Check back soon."}
          </p>
        </div>
      ) : (
        church.events.map((ev) => (
          <EventCard
            key={ev.id}
            ev={ev}
            isMember={church.joined}
            onAttend={() => {
              onToggleAttend(ev.id);
              toast(ev.isAttending ? "Removed from attending" : `🎉 You're attending ${ev.title}`);
            }}
          />
        ))
      )}

      {composing && (
        <EventComposer
          city={church.city + ", " + church.country}
          onClose={() => setComposing(false)}
          onPost={(ev) => {
            onPost(ev);
            setComposing(false);
            toast("📅 Event posted");
          }}
        />
      )}
    </div>
  );
}

function EventCard({
  ev,
  isMember,
  onAttend,
}: {
  ev: ChurchEvent;
  isMember: boolean;
  onAttend: () => void;
}) {
  const pct = ev.capacity ? Math.round((ev.attending / ev.capacity) * 100) : 0;
  return (
    <article className="rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line-strong)]">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-gold-2)]/15 text-xl ring-1 ring-[var(--color-gold-3)]">
          {kindEmoji[ev.kind]}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-[var(--tint)] px-2 py-0.5 text-[9px] font-medium text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]">
              {ev.kind}
            </span>
            <span className="text-[10px] text-[var(--color-muted)]">{ev.postedAgo}</span>
          </div>
          <h3 className="mt-1 font-display text-[15px] leading-tight tracking-wide text-[var(--color-gold-1)]">
            {ev.title}
          </h3>
          <p className="mt-1 text-[11px] font-semibold text-[var(--color-bronze)]">
            🗓 {ev.dateLabel}
          </p>
          <p className="text-[10px] text-[var(--color-muted)]">
            📍 {ev.venue} · {ev.city}
          </p>
        </div>
      </div>

      <p className="mt-3 text-[12px] leading-relaxed text-[var(--color-cream)]/90 font-serif">
        {ev.description}
      </p>

      {/* Attendance */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-[var(--color-bronze)]">
        <span>
          <strong className="text-[var(--color-gold-1)]">{ev.attending}</strong>{" "}
          {ev.capacity ? `of ${ev.capacity}` : ""} attending
        </span>
        {ev.capacity && <span>{pct}% full</span>}
      </div>
      {ev.capacity && (
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[var(--tint)]">
          <div
            className="h-full rounded-full bg-[var(--color-gold-2)] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}

      {isMember && (
        <button
          onClick={onAttend}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-2 text-[12px] font-semibold transition active:scale-[0.99] ${
            ev.isAttending
              ? "bg-[var(--color-gold-4)]/30 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
              : "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
          }`}
        >
          {ev.isAttending ? (
            <>
              <CheckIcon width={12} height={12} /> You're attending
            </>
          ) : (
            "RSVP — count me in"
          )}
        </button>
      )}

      <p className="mt-2 text-center text-[10px] text-[var(--color-muted)]">
        Hosted by {ev.hostName}
      </p>
    </article>
  );
}

function EventComposer({
  city,
  onClose,
  onPost,
}: {
  city: string;
  onClose: () => void;
  onPost: (ev: ChurchEvent) => void;
}) {
  const [kind, setKind] = useState<ChurchEvent["kind"]>("Service");
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [dateLabel, setDateLabel] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState<string>("");
  const { companion } = useCompanion();

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-[var(--scrim)]">
      <div className="max-h-[94%] w-full overflow-y-auto rounded-t-3xl bg-[var(--color-onyx)] p-5 pb-7 ring-1 ring-[var(--color-gold-3)]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
            Host an event
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
            {companion.name}: "Gathering is itself a form of obedience. Make space."
          </p>
        </div>

        <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Kind of gathering
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {eventKinds.map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] ${
                kind === k
                  ? "bg-[var(--color-gold-2)] text-[var(--on-accent)]"
                  : "bg-[var(--color-charcoal)] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]"
              }`}
            >
              <span>{kindEmoji[k]}</span> {k}
            </button>
          ))}
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title"
          autoFocus
          className="mt-3 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[14px] font-semibold text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        <input
          value={dateLabel}
          onChange={(e) => setDateLabel(e.target.value)}
          placeholder="When (e.g. Sat, Mar 16 · 7:30am)"
          className="mt-2 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        <input
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          placeholder={`Venue (in ${city})`}
          className="mt-2 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        <input
          value={capacity}
          onChange={(e) => setCapacity(e.target.value.replace(/\D/g, ""))}
          placeholder="Capacity (optional)"
          inputMode="numeric"
          className="mt-2 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Tell people what to expect."
          className="mt-2 w-full resize-none rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />

        <button
          onClick={() => {
            if (!title.trim() || !dateLabel.trim()) return;
            onPost({
              id: `ev-${Date.now()}`,
              title: title.trim(),
              kind,
              hostName: "You",
              hostInitial: "S",
              city,
              venue: venue.trim() || "TBD",
              dateLabel: dateLabel.trim(),
              description: description.trim() || "Show up. Be present.",
              attending: 1,
              capacity: capacity ? Number(capacity) : undefined,
              isAttending: true,
              postedAgo: "just now",
            });
          }}
          disabled={!title.trim() || !dateLabel.trim()}
          className="mt-3 w-full rounded-2xl bg-[var(--color-gold-2)] py-3 text-sm font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] disabled:opacity-40"
        >
          <span className="inline-flex items-center gap-2">
            <Lozenge width={10} height={10} /> Post event <Lozenge width={10} height={10} />
          </span>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MISSIONS TAB
// ─────────────────────────────────────────────────────────

const missionKinds: Mission["kind"][] = [
  "Short-term trip",
  "Local outreach",
  "Ongoing project",
  "Translation",
  "Disaster relief",
];

export function MissionsTab({
  church,
  onToggleInterest,
  onPost,
}: {
  church: Church;
  onToggleInterest: (missionId: string) => void;
  onPost: (mission: Mission) => void;
}) {
  const [composing, setComposing] = useState(false);
  const toast = useToast();

  return (
    <div className="space-y-3">
      <div className="rounded-3xl bg-[#1a2a14]/40 p-4 ring-1 ring-[#4a6a14]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#b0d68a]">
          Missions & outreach
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-[var(--color-cream)]/85 font-serif italic">
          Go where you are sent. Send what you cannot go with.
        </p>
      </div>

      {church.joined && (
        <button
          onClick={() => setComposing(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-gold-2)] py-2.5 text-[12px] font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] active:scale-[0.99]"
        >
          <PlusIcon width={14} height={14} /> Post a mission
        </button>
      )}

      {church.missions.length === 0 ? (
        <div className="rounded-3xl bg-[var(--color-charcoal)] p-6 text-center ring-1 ring-[var(--color-line)]">
          <p className="text-3xl">🌍</p>
          <p className="mt-2 font-display text-[14px] tracking-wide text-[var(--color-gold-1)]">
            No active missions
          </p>
          <p className="mt-1 text-[11px] text-[var(--color-bronze)]">
            {church.joined
              ? "Post the first mission or outreach opportunity."
              : "Check back soon."}
          </p>
        </div>
      ) : (
        church.missions.map((m) => (
          <MissionCard
            key={m.id}
            m={m}
            isMember={church.joined}
            onInterest={() => {
              onToggleInterest(m.id);
              toast(m.isInterested ? "Removed from interested" : "🙋 You're in — leader will reach out");
            }}
            onGive={() => toast("Opening secure giving...")}
          />
        ))
      )}

      {composing && (
        <MissionComposer
          onClose={() => setComposing(false)}
          onPost={(m) => {
            onPost(m);
            setComposing(false);
            toast("🌍 Mission posted");
          }}
        />
      )}
    </div>
  );
}

function MissionCard({
  m,
  isMember,
  onInterest,
  onGive,
}: {
  m: Mission;
  isMember: boolean;
  onInterest: () => void;
  onGive: () => void;
}) {
  const pct = m.goal ? Math.round(((m.raised || 0) / m.goal) * 100) : 0;
  return (
    <article className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a2a14]/40 to-[#0f1a08]/40 p-4 shadow-sm ring-1 ring-[#4a6a14]/60">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#1a2a14]/60 px-2 py-0.5 text-[10px] font-medium text-[#b0d68a] ring-1 ring-[#4a6a14]">
          🌾 {m.kind}
        </span>
        <span className="text-[10px] text-[var(--color-muted)]">{m.postedAgo}</span>
      </div>
      <h3 className="mt-2 font-display text-[15px] leading-tight tracking-wide text-[var(--color-gold-1)]">
        {m.title}
      </h3>
      <p className="mt-1 text-[11px] font-semibold text-[var(--color-bronze)]">
        📍 {m.location} · 🗓 {m.dates}
      </p>
      <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-cream)]/90 font-serif">
        {m.description}
      </p>

      {/* Needed roles */}
      {m.needed.length > 0 && (
        <>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
            Needed
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            {m.needed.map((n) => (
              <span
                key={n}
                className="rounded-full bg-[var(--tint)] px-2 py-0.5 text-[10px] text-[var(--color-cream)] ring-1 ring-[var(--color-line)]"
              >
                {n}
              </span>
            ))}
          </div>
        </>
      )}

      {/* Funding */}
      {m.goal && (
        <div className="mt-3 rounded-2xl bg-[var(--tint-soft)] p-3 ring-1 ring-[var(--color-line)]">
          <div className="flex items-center justify-between text-[10px] text-[var(--color-bronze)]">
            <span>
              <strong className="text-[var(--color-gold-1)]">
                ${(m.raised || 0).toLocaleString()}
              </strong>{" "}
              of ${m.goal.toLocaleString()}
            </span>
            <span>{pct}%</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[var(--tint)]">
            <div
              className="h-full rounded-full bg-[var(--color-gold-2)] transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          {isMember && (
            <button
              onClick={onGive}
              className="mt-2 w-full rounded-xl bg-[var(--color-gold-2)]/15 py-1.5 text-[11px] font-semibold text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
            >
              💛 Give toward this mission
            </button>
          )}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-[10px] text-[var(--color-bronze)]">
        <span>
          🙋 <strong className="text-[var(--color-gold-1)]">{m.interestedCount}</strong> interested
        </span>
        <span>Led by {m.hostName}</span>
      </div>

      {isMember && (
        <button
          onClick={onInterest}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-2 text-[12px] font-semibold transition active:scale-[0.99] ${
            m.isInterested
              ? "bg-[var(--color-gold-4)]/30 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
              : "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
          }`}
        >
          {m.isInterested ? (
            <>
              <CheckIcon width={12} height={12} /> You're in
            </>
          ) : (
            "I want to go"
          )}
        </button>
      )}
    </article>
  );
}

function MissionComposer({
  onClose,
  onPost,
}: {
  onClose: () => void;
  onPost: (m: Mission) => void;
}) {
  const [kind, setKind] = useState<Mission["kind"]>("Local outreach");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [description, setDescription] = useState("");
  const [needed, setNeeded] = useState("");
  const [goal, setGoal] = useState("");
  const { companion } = useCompanion();

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-[var(--scrim)]">
      <div className="max-h-[94%] w-full overflow-y-auto rounded-t-3xl bg-[var(--color-onyx)] p-5 pb-7 ring-1 ring-[var(--color-gold-3)]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
            Post a mission
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
            {companion.name}: "The harvest is plentiful. Be specific about what you need."
          </p>
        </div>

        <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Kind
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {missionKinds.map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`rounded-full px-2.5 py-1 text-[11px] ${
                kind === k
                  ? "bg-[var(--color-gold-2)] text-[var(--on-accent)]"
                  : "bg-[var(--color-charcoal)] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Mission title"
          autoFocus
          className="mt-3 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[14px] font-semibold text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g. Nairobi, Kenya)"
          className="mt-2 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        <input
          value={dates}
          onChange={(e) => setDates(e.target.value)}
          placeholder="Dates (e.g. Jun 14–24, 2026)"
          className="mt-2 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="What is this mission?"
          className="mt-2 w-full resize-none rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        <input
          value={needed}
          onChange={(e) => setNeeded(e.target.value)}
          placeholder="Roles needed (comma-separated)"
          className="mt-2 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value.replace(/\D/g, ""))}
          placeholder="Funding goal in USD (optional)"
          inputMode="numeric"
          className="mt-2 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />

        <button
          onClick={() => {
            if (!title.trim() || !location.trim()) return;
            onPost({
              id: `m-${Date.now()}`,
              title: title.trim(),
              kind,
              location: location.trim(),
              dates: dates.trim() || "TBD",
              description: description.trim() || "Details coming.",
              needed: needed
                .split(",")
                .map((n) => n.trim())
                .filter(Boolean),
              raised: 0,
              goal: goal ? Number(goal) : undefined,
              hostName: "You",
              hostInitial: "S",
              interestedCount: 1,
              isInterested: true,
              postedAgo: "just now",
            });
          }}
          disabled={!title.trim() || !location.trim()}
          className="mt-3 w-full rounded-2xl bg-[var(--color-gold-2)] py-3 text-sm font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] disabled:opacity-40"
        >
          <span className="inline-flex items-center gap-2">
            <Lozenge width={10} height={10} /> Post mission <Lozenge width={10} height={10} />
          </span>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SUPPORT TAB
// ─────────────────────────────────────────────────────────

const supportKinds: SupportNeed["kind"][] = [
  "Financial",
  "Practical help",
  "In-kind",
  "Meals",
  "Housing",
  "Childcare",
];

const urgencyColor: Record<SupportNeed["urgency"], string> = {
  Now: "bg-[#5a1a1a]/40 text-[#f5b07a] ring-[#7a3030]",
  "This week": "bg-[var(--color-gold-2)]/15 text-[var(--color-gold-1)] ring-[var(--color-gold-3)]",
  Ongoing: "bg-[var(--tint)] text-[var(--color-bronze)] ring-[var(--color-line)]",
};

export function SupportTab({
  church,
  onToggleHelp,
  onPost,
}: {
  church: Church;
  onToggleHelp: (needId: string) => void;
  onPost: (need: SupportNeed) => void;
}) {
  const [composing, setComposing] = useState(false);
  const toast = useToast();

  return (
    <div className="space-y-3">
      <div className="rounded-3xl bg-[#5a1a1a]/20 p-4 ring-1 ring-[#7a3030]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#f5b07a]">
          Carry one another's burdens
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-[var(--color-cream)]/85 font-serif italic">
          "Bear one another's burdens, and so fulfill the law of Christ." — Gal 6:2
        </p>
      </div>

      {church.joined && (
        <button
          onClick={() => setComposing(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-gold-2)] py-2.5 text-[12px] font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] active:scale-[0.99]"
        >
          <PlusIcon width={14} height={14} /> Post a need
        </button>
      )}

      {church.supportNeeds.length === 0 ? (
        <div className="rounded-3xl bg-[var(--color-charcoal)] p-6 text-center ring-1 ring-[var(--color-line)]">
          <p className="text-3xl">🤝</p>
          <p className="mt-2 font-display text-[14px] tracking-wide text-[var(--color-gold-1)]">
            No active needs
          </p>
          <p className="mt-1 text-[11px] text-[var(--color-bronze)]">
            {church.joined
              ? "Post a need for yourself or someone you know."
              : "Check back soon."}
          </p>
        </div>
      ) : (
        church.supportNeeds.map((s) => (
          <SupportCard
            key={s.id}
            s={s}
            isMember={church.joined}
            onHelp={() => {
              onToggleHelp(s.id);
              toast(s.isHelping ? "Removed from helping" : "🤝 You signed up to help");
            }}
            onGive={() => toast("Opening secure giving...")}
          />
        ))
      )}

      {composing && (
        <SupportComposer
          city={church.city + ", " + church.country}
          onClose={() => setComposing(false)}
          onPost={(s) => {
            onPost(s);
            setComposing(false);
            toast("🤝 Need posted — the body is responding");
          }}
        />
      )}
    </div>
  );
}

function SupportCard({
  s,
  isMember,
  onHelp,
  onGive,
}: {
  s: SupportNeed;
  isMember: boolean;
  onHelp: () => void;
  onGive: () => void;
}) {
  const isFunding = s.kind === "Financial" && s.goal;
  const pct = s.goal ? Math.round(((s.raised || 0) / s.goal) * 100) : 0;
  return (
    <article className="rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line-strong)]">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-[var(--tint)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]">
          {s.kind}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ring-1 ${urgencyColor[s.urgency]}`}
        >
          {s.urgency}
        </span>
      </div>
      <h3 className="mt-2 font-display text-[15px] leading-tight tracking-wide text-[var(--color-gold-1)]">
        {s.title}
      </h3>
      <p className="mt-1 text-[11px] text-[var(--color-bronze)]">
        for {s.beneficiary} · 📍 {s.city}
      </p>
      <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-cream)]/90 font-serif">
        {s.story}
      </p>

      {/* Funding bar */}
      {isFunding && (
        <div className="mt-3 rounded-2xl bg-[var(--tint-soft)] p-3 ring-1 ring-[var(--color-line)]">
          <div className="flex items-center justify-between text-[10px] text-[var(--color-bronze)]">
            <span>
              <strong className="text-[var(--color-gold-1)]">
                ${(s.raised || 0).toLocaleString()}
              </strong>{" "}
              of ${(s.goal ?? 0).toLocaleString()}
            </span>
            <span>{pct}%</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[var(--tint)]">
            <div
              className="h-full rounded-full bg-[var(--color-gold-2)] transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          {isMember && (
            <button
              onClick={onGive}
              className="mt-2 w-full rounded-xl bg-[var(--color-gold-2)]/15 py-1.5 text-[11px] font-semibold text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
            >
              💛 Give
            </button>
          )}
        </div>
      )}

      <p className="mt-3 text-[10px] text-[var(--color-bronze)]">
        🤝 <strong className="text-[var(--color-gold-1)]">{s.helpersCount}</strong>{" "}
        helping · posted {s.postedAgo}
      </p>

      {isMember && (
        <button
          onClick={onHelp}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-2 text-[12px] font-semibold transition active:scale-[0.99] ${
            s.isHelping
              ? "bg-[var(--color-gold-4)]/30 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
              : "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
          }`}
        >
          {s.isHelping ? (
            <>
              <CheckIcon width={12} height={12} /> You're helping
            </>
          ) : (
            "I'll help"
          )}
        </button>
      )}
    </article>
  );
}

function SupportComposer({
  city,
  onClose,
  onPost,
}: {
  city: string;
  onClose: () => void;
  onPost: (s: SupportNeed) => void;
}) {
  const [kind, setKind] = useState<SupportNeed["kind"]>("Practical help");
  const [urgency, setUrgency] = useState<SupportNeed["urgency"]>("This week");
  const [title, setTitle] = useState("");
  const [beneficiary, setBeneficiary] = useState("An anonymous member");
  const [story, setStory] = useState("");
  const [goal, setGoal] = useState("");
  const { companion } = useCompanion();

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-[var(--scrim)]">
      <div className="max-h-[94%] w-full overflow-y-auto rounded-t-3xl bg-[var(--color-onyx)] p-5 pb-7 ring-1 ring-[var(--color-gold-3)]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
            Post a need
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
            {companion.name}: "Asking for help is itself an act of trust. The body wants to carry this."
          </p>
        </div>

        <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Kind of help
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {supportKinds.map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`rounded-full px-2.5 py-1 text-[11px] ${
                kind === k
                  ? "bg-[var(--color-gold-2)] text-[var(--on-accent)]"
                  : "bg-[var(--color-charcoal)] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Urgency
        </p>
        <div className="mt-2 flex gap-1.5">
          {(["Now", "This week", "Ongoing"] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUrgency(u)}
              className={`flex-1 rounded-full py-1.5 text-[11px] font-semibold ring-1 ${
                urgency === u
                  ? urgencyColor[u]
                  : "bg-[var(--color-charcoal)] text-[var(--color-bronze)] ring-[var(--color-line)]"
              }`}
            >
              {u}
            </button>
          ))}
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief title"
          autoFocus
          className="mt-3 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[14px] font-semibold text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        <input
          value={beneficiary}
          onChange={(e) => setBeneficiary(e.target.value)}
          placeholder="Beneficiary (e.g. 'An anonymous member')"
          className="mt-2 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows={4}
          placeholder="Tell the story. What does the body need to know?"
          className="mt-2 w-full resize-none rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        {kind === "Financial" && (
          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value.replace(/\D/g, ""))}
            placeholder="Funding goal in USD"
            inputMode="numeric"
            className="mt-2 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
          />
        )}

        <button
          onClick={() => {
            if (!title.trim() || !story.trim()) return;
            onPost({
              id: `s-${Date.now()}`,
              title: title.trim(),
              kind,
              beneficiary: beneficiary.trim() || "An anonymous member",
              city,
              story: story.trim(),
              raised: kind === "Financial" ? 0 : undefined,
              goal: kind === "Financial" && goal ? Number(goal) : undefined,
              helpersCount: 0,
              urgency,
              postedAgo: "just now",
            });
          }}
          disabled={!title.trim() || !story.trim()}
          className="mt-3 w-full rounded-2xl bg-[var(--color-gold-2)] py-3 text-sm font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] disabled:opacity-40"
        >
          <span className="inline-flex items-center gap-2">
            <Lozenge width={10} height={10} /> Post need <Lozenge width={10} height={10} />
          </span>
        </button>
      </div>
    </div>
  );
}

// Suppress unused imports
void StarOctagram;
void OrnateHeading;
void ChevronRight;
