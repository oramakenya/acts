import { useState } from "react";
import type { PrayerRequest } from "../data/content";
import {
  HandsIcon,
  PlusIcon,
  LockIcon,
  CloseIcon,
  ChevronLeft,
} from "./icons";
import { ArabesqueDivider, Lozenge } from "./Ornament";
import { useToast } from "./Toast";

const categories: PrayerRequest["category"][] = [
  "Healing",
  "Family",
  "Work",
  "Faith",
  "Grief",
  "Guidance",
  "Thanksgiving",
];

const anonNames = [
  "A member",
  "An anonymous saint",
  "A brother in this house",
  "A sister in this house",
  "A fellow member",
];

type Props = {
  churchName: string;
  prayers: PrayerRequest[];
  isMember: boolean;
  onPray: (id: string) => void;
  onEncourage: (id: string, text: string) => void;
  onPost: (cat: PrayerRequest["category"], body: string) => void;
};

export function PrivatePrayerWall({
  churchName,
  prayers,
  isMember,
  onPray,
  onEncourage,
  onPost,
}: Props) {
  const [composing, setComposing] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"All" | PrayerRequest["category"]>("All");
  const toast = useToast();

  const list = prayers.filter((p) => filter === "All" || p.category === filter);
  const open = openId ? prayers.find((p) => p.id === openId) : null;

  if (open) {
    return (
      <PrayerDetail
        p={open}
        churchName={churchName}
        isMember={isMember}
        onBack={() => setOpenId(null)}
        onPray={() => {
          if (!open.hasPrayed) {
            onPray(open.id);
            toast("Prayer offered");
          }
        }}
        onEncourage={(text) => {
          onEncourage(open.id, text);
          toast("Encouragement sent");
        }}
      />
    );
  }

  if (!isMember) {
    return (
      <div className="rounded-3xl bg-[#5a1a1a]/30 p-4 ring-1 ring-[#7a3030]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#f5d97a]">
          Members-only space
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-[var(--color-cream)]/90">
          The private prayer wall for {churchName} is visible only to members. Join the
          church above to see prayers and pray with the body.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Privacy notice */}
      <div className="flex items-center gap-2 rounded-2xl bg-black/40 px-3 py-2 ring-1 ring-[var(--color-gold-4)]">
        <LockIcon width={14} height={14} className="text-[var(--color-gold-1)]" />
        <p className="text-[11px] text-[var(--color-cream)]/85">
          Private to {churchName}. Names are still hidden — only the body knows.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-3 -mx-1 overflow-x-auto pb-1">
        <div className="flex gap-1.5 px-1">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium ${
                filter === c
                  ? "bg-[var(--color-gold-2)] text-black"
                  : "bg-[var(--color-charcoal)] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Composer button */}
      <button
        onClick={() => setComposing(true)}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-gold-2)] py-2.5 text-[12px] font-semibold text-black ring-1 ring-[var(--color-gold-1)] active:scale-[0.99]"
      >
        <PlusIcon width={14} height={14} /> Share a request with this church
      </button>

      {/* List */}
      <div className="mt-3 space-y-2">
        {list.length === 0 ? (
          <p className="rounded-2xl bg-[var(--color-charcoal)] p-4 text-center text-[12px] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]">
            No prayers yet in this category. Be the first.
          </p>
        ) : (
          list.map((p) => (
            <button
              key={p.id}
              onClick={() => setOpenId(p.id)}
              className="block w-full rounded-3xl bg-[var(--color-charcoal)] p-4 text-left shadow-sm ring-1 ring-[var(--color-line)] active:scale-[0.99]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]">
                  {p.category}
                </span>
                <span className="text-[10px] text-[var(--color-muted)]">{p.postedAgo}</span>
              </div>
              <p className="mt-2 line-clamp-3 font-serif text-[13px] leading-snug text-[var(--color-cream)]/90">
                {p.body}
              </p>
              <p className="mt-2 text-[10px] italic text-[var(--color-muted)]">
                — {p.anonymousName}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-[var(--color-line)] pt-2">
                <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-gold-1)]">
                  <HandsIcon width={14} height={14} />
                  <span className="font-semibold">{p.prayedCount}</span>
                  <span className="text-[var(--color-muted)]">praying</span>
                </div>
                <span className="text-[11px] text-[var(--color-muted)]">
                  💬 {p.encouragements.length}
                </span>
              </div>
            </button>
          ))
        )}
      </div>

      {composing && (
        <Composer
          churchName={churchName}
          onClose={() => setComposing(false)}
          onPost={(cat, body) => {
            onPost(cat, body);
            setComposing(false);
            toast("Request shared with the body");
          }}
        />
      )}
    </div>
  );
}

function PrayerDetail({
  p,
  churchName,
  isMember,
  onBack,
  onPray,
  onEncourage,
}: {
  p: PrayerRequest;
  churchName: string;
  isMember: boolean;
  onBack: () => void;
  onPray: () => void;
  onEncourage: (text: string) => void;
}) {
  const [text, setText] = useState("");

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-[12px] font-medium text-[var(--color-gold-1)]"
      >
        <ChevronLeft width={14} height={14} /> Back to {churchName}
      </button>

      <div className="mt-3 rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-gold-4)]">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]">
            {p.category}
          </span>
          <span className="text-[10px] text-[var(--color-muted)]">{p.postedAgo}</span>
        </div>
        <p className="mt-3 font-serif text-[15px] leading-relaxed text-[var(--color-cream)]">
          {p.body}
        </p>
        <p className="mt-3 text-[11px] italic text-[var(--color-muted)]">— {p.anonymousName}</p>

        {isMember && (
          <button
            onClick={onPray}
            disabled={p.hasPrayed}
            className={`mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-2.5 text-[13px] font-semibold transition ${
              p.hasPrayed
                ? "bg-[var(--color-gold-4)]/30 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
                : "bg-[var(--color-gold-2)] text-black ring-1 ring-[var(--color-gold-1)] active:scale-[0.99]"
            }`}
          >
            <HandsIcon width={14} height={14} />
            {p.hasPrayed ? "You prayed for this" : "I prayed for this"}
            <span className="ml-1 rounded-full bg-black/20 px-2 py-0.5 text-[10px]">
              {p.prayedCount}
            </span>
          </button>
        )}
      </div>

      <div className="mt-3">
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
              <p className="mt-1 text-[10px] text-[var(--color-muted)]">{e.ago} · anonymous member</p>
            </div>
          ))}
          {p.encouragements.length === 0 && (
            <p className="rounded-2xl bg-[var(--color-charcoal)] p-3 text-center text-[11px] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]">
              Be the first to encourage.
            </p>
          )}
        </div>
      </div>

      {isMember && (
        <div className="mt-3 rounded-2xl bg-[var(--color-gold-2)]/10 p-3 ring-1 ring-[var(--color-gold-3)]">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-1)]">
            Send an encouragement
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            maxLength={200}
            placeholder="Speak life. Quote scripture. Keep it gentle."
            className="mt-2 w-full resize-none rounded-xl bg-black/40 p-2.5 text-[12px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
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
              className="rounded-full bg-[var(--color-gold-2)] px-3 py-1.5 text-[11px] font-semibold text-black disabled:opacity-40"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Composer({
  churchName,
  onClose,
  onPost,
}: {
  churchName: string;
  onClose: () => void;
  onPost: (cat: PrayerRequest["category"], body: string) => void;
}) {
  const [cat, setCat] = useState<PrayerRequest["category"]>("Faith");
  const [body, setBody] = useState("");

  return (
    <div className="absolute inset-0 z-30 flex items-end bg-black/75">
      <div className="max-h-[90%] w-full overflow-y-auto rounded-t-3xl bg-[var(--color-onyx)] p-5 pb-7 ring-1 ring-[var(--color-gold-3)]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
            Share with {churchName}
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

        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-[#5a1a1a]/30 px-3 py-2 ring-1 ring-[#7a3030]">
          <LockIcon width={14} height={14} className="text-[#f5d97a]" />
          <p className="text-[11px] text-[var(--color-cream)]/85">
            Stays inside this church. Your name is never shown.
          </p>
        </div>

        <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Category
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-2.5 py-1 text-[11px] ${
                cat === c
                  ? "bg-[var(--color-gold-2)] text-black"
                  : "bg-[var(--color-charcoal)] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          maxLength={500}
          placeholder="Share what's on your heart. The body is praying."
          className="mt-3 w-full resize-none rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        <p className="text-right text-[10px] text-[var(--color-muted)]">{body.length}/500</p>

        <button
          onClick={() => body.trim() && onPost(cat, body.trim())}
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

// helper for the unused anonNames import
export function pickAnonName() {
  return anonNames[Math.floor(Math.random() * anonNames.length)];
}
