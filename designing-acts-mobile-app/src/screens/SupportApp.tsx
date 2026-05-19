import { useState } from "react";
import {
  ChevronLeft,
  ArrowRight,
  CheckIcon,
  CloseIcon,
  HeartIcon,
  LockIcon,
} from "../components/icons";
import {
  ArabesqueDivider,
  Lozenge,
  StarOctagram,
  MashrabiyaBg,
  AdinkraDotsBg,
  KenteStrip,
  OrnateHeading,
} from "../components/Ornament";
import { useToast } from "../components/Toast";
import { useCompanion } from "../components/CompanionContext";

export function SupportApp({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full flex-col overflow-y-auto pt-10 pat-mudcloth">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-2">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]"
        >
          <ChevronLeft width={18} height={18} />
        </button>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-3)]">
            stand with us
          </p>
          <h1 className="font-display text-[20px] tracking-wide text-gold-grad">
            Support ACTS
          </h1>
        </div>
      </div>

      {/* Hero */}
      <div className="relative mx-5 mt-4 overflow-hidden rounded-3xl bg-[var(--color-feature)] p-5 ring-1 ring-[var(--color-gold-3)]">
        <MashrabiyaBg />
        <StarOctagram
          width={14}
          height={14}
          className="absolute right-3 top-3 text-[var(--color-gold-2)]"
        />
        <p className="relative text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--feature-deep-gold)]">
          an app by ALIVE
        </p>
        <p className="relative mt-1 font-display text-[40px] leading-none tracking-[0.06em] text-gold-grad">
          ACTS
        </p>
        <div className="relative mt-2 text-[var(--feature-deep-gold)]">
          <ArabesqueDivider width={200} />
        </div>
        <p className="relative mt-3 font-serif text-[13px] italic leading-relaxed text-[var(--feature-fg)]/90">
          "Freely you have received; freely give." — Matthew 10:8
        </p>
        <p className="relative mt-2 text-[12px] leading-relaxed text-[var(--feature-fg)]/80">
          ACTS is free and built by <strong className="text-[var(--feature-accent)]">ALIVE</strong>, a small team committed to tools that help the church practice — not just believe. Your support keeps the lights on and the work going.
        </p>
      </div>

      {/* Three primary actions */}
      <div className="space-y-3 px-5 py-4">
        <DonateCard />
        <InviteCard />
        <WebsiteCard />
      </div>

      {/* About ALIVE */}
      <div className="mx-5 mb-4 rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line-strong)]">
        <OrnateHeading eyebrow="who builds ACTS" title="ALIVE" />
        <p className="mt-3 text-[12px] leading-relaxed text-[var(--color-cream)]/90 font-serif">
          ALIVE is a Christ-centered software studio. We build tools the church uses every day — quietly, faithfully, and for the long walk. ACTS is our first app. More are coming.
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <AboutPill emoji="🎯" label="Our mission" />
          <AboutPill emoji="🤝" label="Our team" />
          <AboutPill emoji="📬" label="Contact us" />
        </div>
      </div>

      {/* Closing kente */}
      <div className="mx-5 mb-4">
        <KenteStrip className="rounded-md ring-1 ring-[var(--color-line)]" />
      </div>

      <p className="mb-4 px-5 text-center text-[10px] italic text-[var(--color-bronze)] font-serif">
        Soli Deo gloria · ALIVE © 2026
      </p>
    </div>
  );
}

function AboutPill({ emoji, label }: { emoji: string; label: string }) {
  const toast = useToast();
  return (
    <button
      onClick={() => toast(`${label} — coming soon`)}
      className="flex flex-col items-center gap-1 rounded-2xl bg-[var(--tint)] px-2 py-2 ring-1 ring-[var(--color-line)] active:scale-[0.98]"
    >
      <span className="text-base">{emoji}</span>
      <span className="text-[10px] font-medium text-[var(--color-cream)]">{label}</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────
// DONATE
// ─────────────────────────────────────────────────────────

function DonateCard() {
  const [showDonate, setShowDonate] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowDonate(true)}
        className="relative flex w-full items-center gap-3 overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a1a06] via-[#3d2509] to-[#2a1a06] p-4 text-left ring-1 ring-[var(--color-gold-3)] active:scale-[0.99]"
      >
        <AdinkraDotsBg />
        <Lozenge
          width={12}
          height={12}
          className="absolute right-3 top-3 text-[var(--color-gold-2)] shimmer"
        />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]">
          <span className="text-xl">💛</span>
        </div>
        <div className="relative min-w-0 flex-1">
          <p className="font-display text-[15px] tracking-wide text-[var(--feature-accent)]">
            Give to ALIVE
          </p>
          <p className="mt-0.5 text-[11px] text-[var(--feature-fg)]/70">
            Keep ACTS free for the global body
          </p>
        </div>
        <ArrowRight width={16} height={16} className="relative text-[var(--feature-accent)]" />
      </button>

      {showDonate && <DonateModal onClose={() => setShowDonate(false)} />}
    </>
  );
}

const donateAmounts = [10, 25, 50, 100, 250];

function DonateModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState<number>(25);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState<"once" | "monthly">("monthly");
  const [method, setMethod] = useState<"card" | "applepay" | "googlepay" | "paypal">("card");
  const toast = useToast();
  const { companion } = useCompanion();

  const finalAmount = custom ? Number(custom) : amount;

  function submit() {
    if (!finalAmount || finalAmount < 1) return;
    toast(
      frequency === "monthly"
        ? `💛 Thank you — $${finalAmount}/mo set up`
        : `💛 Thank you — $${finalAmount} gift sent`
    );
    onClose();
  }

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-[var(--scrim)]">
      <div className="max-h-[94%] w-full overflow-y-auto rounded-t-3xl bg-[var(--color-onyx)] p-5 pb-7 ring-1 ring-[var(--color-gold-3)]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
            Give to ALIVE
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
            {companion.name}: "Every gift, no matter the size, keeps a story going."
          </p>
        </div>

        {/* Frequency */}
        <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Frequency
        </p>
        <div className="mt-2 flex gap-1.5">
          {(["once", "monthly"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFrequency(f)}
              className={`flex-1 rounded-full py-2 text-[12px] font-semibold ${
                frequency === f
                  ? "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
                  : "bg-[var(--color-charcoal)] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]"
              }`}
            >
              {f === "once" ? "One-time" : "Monthly · sustains the work"}
            </button>
          ))}
        </div>

        {/* Amount */}
        <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Amount (USD)
        </p>
        <div className="mt-2 grid grid-cols-5 gap-1.5">
          {donateAmounts.map((a) => (
            <button
              key={a}
              onClick={() => {
                setAmount(a);
                setCustom("");
              }}
              className={`rounded-xl py-2 text-[12px] font-semibold ${
                amount === a && !custom
                  ? "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
                  : "bg-[var(--color-charcoal)] text-[var(--color-cream)] ring-1 ring-[var(--color-line)]"
              }`}
            >
              ${a}
            </button>
          ))}
        </div>
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))}
          placeholder="Or custom amount"
          inputMode="numeric"
          className="mt-2 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[14px] font-semibold text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />

        {/* Payment method */}
        <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Payment
        </p>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          <PaymentBtn id="card" active={method === "card"} onClick={() => setMethod("card")} icon="💳" label="Card" />
          <PaymentBtn id="applepay" active={method === "applepay"} onClick={() => setMethod("applepay")} icon="" label="Apple Pay" />
          <PaymentBtn id="googlepay" active={method === "googlepay"} onClick={() => setMethod("googlepay")} icon="G" label="Google Pay" />
          <PaymentBtn id="paypal" active={method === "paypal"} onClick={() => setMethod("paypal")} icon="P" label="PayPal" />
        </div>

        {/* Trust line */}
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-[var(--tint-soft)] px-3 py-2 ring-1 ring-[var(--color-line)]">
          <LockIcon width={12} height={12} className="text-[var(--color-gold-1)]" />
          <p className="text-[10px] text-[var(--color-bronze)]">
            Encrypted by Stripe. ALIVE is a registered company — gifts may be tax-deductible depending on your region.
          </p>
        </div>

        <button
          onClick={submit}
          disabled={!finalAmount || finalAmount < 1}
          className="mt-3 w-full rounded-2xl bg-[var(--color-gold-2)] py-3 text-sm font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)] disabled:opacity-40"
        >
          <span className="inline-flex items-center gap-2">
            <span>💛</span>
            Give ${finalAmount || 0}
            {frequency === "monthly" ? "/mo" : ""}
            <span>💛</span>
          </span>
        </button>

        <p className="mt-3 text-center text-[10px] italic text-[var(--color-bronze)] font-serif">
          "Each one must give as he has decided in his heart." — 2 Cor 9:7
        </p>
      </div>
    </div>
  );
}

function PaymentBtn({
  active,
  onClick,
  icon,
  label,
}: {
  id: string;
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[12px] font-semibold ring-1 ${
        active
          ? "bg-[var(--color-gold-2)] text-[var(--on-accent)] ring-[var(--color-gold-1)]"
          : "bg-[var(--color-charcoal)] text-[var(--color-cream)] ring-[var(--color-line)]"
      }`}
    >
      <span className="text-base">{icon || "•"}</span>
      <span>{label}</span>
      {active && <CheckIcon width={12} height={12} />}
    </button>
  );
}

// ─────────────────────────────────────────────────────────
// INVITE
// ─────────────────────────────────────────────────────────

function InviteCard() {
  const [showInvite, setShowInvite] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowInvite(true)}
        className="relative flex w-full items-center gap-3 overflow-hidden rounded-3xl bg-[var(--color-charcoal)] p-4 text-left ring-1 ring-[var(--color-line-strong)] active:scale-[0.99]"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-gold-2)]/15 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]">
          <HeartIcon width={20} height={20} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[15px] tracking-wide text-[var(--color-gold-1)]">
            Invite a friend to ACTS
          </p>
          <p className="mt-0.5 text-[11px] text-[var(--color-bronze)]">
            Walk together. Pray together. Study together.
          </p>
        </div>
        <ArrowRight width={16} height={16} className="text-[var(--color-gold-1)]" />
      </button>

      {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    </>
  );
}

function InviteModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const toast = useToast();
  const { userName } = useCompanion();
  const inviteUrl = "acts.app";
  const message = `Hey — ${userName} here. I've been using ACTS by ALIVE for daily scripture, prayer, and walking with my church. Try it: ${inviteUrl}`;

  function copy(text: string, label: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopied(true);
    toast(`${label} copied`);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-[var(--scrim)]">
      <div className="max-h-[94%] w-full overflow-y-auto rounded-t-3xl bg-[var(--color-onyx)] p-5 pb-7 ring-1 ring-[var(--color-gold-3)]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
            Invite a friend to ACTS
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

        {/* App link card */}
        <div className="relative mt-3 overflow-hidden rounded-3xl bg-[var(--color-feature)] p-4 ring-1 ring-[var(--color-gold-3)]">
          <MashrabiyaBg />
          <p className="relative text-[9px] font-semibold uppercase tracking-[0.35em] text-[var(--feature-deep-gold)]">
            an app by ALIVE
          </p>
          <p className="relative mt-1 font-display text-[28px] leading-none tracking-[0.06em] text-gold-grad">
            ACTS
          </p>
          <p className="relative mt-2 text-[11px] text-[var(--feature-fg)]/80">
            Live the Word. Together.
          </p>
        </div>

        {/* Pre-written message */}
        <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Your invite message
        </p>
        <textarea
          readOnly
          value={message}
          rows={3}
          className="mt-1 w-full resize-none rounded-2xl bg-[var(--color-charcoal)] p-3 text-[12px] text-[var(--color-cream)]/90 ring-1 ring-[var(--color-line)]"
        />
        <button
          onClick={() => copy(message, "Message")}
          className="mt-2 w-full rounded-xl bg-[var(--color-gold-2)] py-2 text-[12px] font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
        >
          {copied ? "✓ Copied" : "📋 Copy message"}
        </button>

        {/* Link */}
        <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Quick link
        </p>
        <div className="mt-1 flex items-center justify-between gap-2 rounded-xl bg-[var(--color-charcoal)] px-3 py-2 ring-1 ring-[var(--color-line)]">
          <span className="truncate text-[12px] font-semibold text-[var(--color-cream)]">
            {inviteUrl}
          </span>
          <button
            onClick={() => copy(inviteUrl, "Link")}
            className="rounded-full bg-[var(--color-gold-2)] px-2.5 py-1 text-[10px] font-semibold text-[var(--on-accent)]"
          >
            Copy
          </button>
        </div>

        {/* Share chips */}
        <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Share via
        </p>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          <ShareChip icon="💬" label="Messages" onClick={() => copy(message, "Message")} />
          <ShareChip icon="✉️" label="Email" onClick={() => copy(message, "Message")} />
          <ShareChip icon="📱" label="WhatsApp" onClick={() => copy(message, "Message")} />
          <ShareChip icon="📷" label="Instagram" onClick={() => copy(message, "Message")} />
          <ShareChip icon="🐦" label="X / Twitter" onClick={() => copy(message, "Message")} />
          <ShareChip icon="•••" label="More" onClick={() => copy(message, "Message")} />
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-2xl bg-[var(--color-charcoal)] py-2.5 text-[12px] font-semibold text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
        >
          Done
        </button>
      </div>
    </div>
  );
}

function ShareChip({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 rounded-xl bg-[var(--color-charcoal)] px-2 py-2 ring-1 ring-[var(--color-line)] active:scale-95"
    >
      <span className="text-base">{icon}</span>
      <span className="text-[9px] text-[var(--color-bronze)]">{label}</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────
// WEBSITE
// ─────────────────────────────────────────────────────────

function WebsiteCard() {
  const [showWebsite, setShowWebsite] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowWebsite(true)}
        className="relative flex w-full items-center gap-3 overflow-hidden rounded-3xl bg-[var(--color-charcoal)] p-4 text-left ring-1 ring-[var(--color-line-strong)] active:scale-[0.99]"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-gold-2)]/15 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]">
          <span className="text-xl">🌐</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[15px] tracking-wide text-[var(--color-gold-1)]">
            Visit the ALIVE website
          </p>
          <p className="mt-0.5 text-[11px] text-[var(--color-bronze)]">
            Learn about the company behind ACTS
          </p>
        </div>
        <ArrowRight width={16} height={16} className="text-[var(--color-gold-1)]" />
      </button>

      {showWebsite && <WebsiteModal onClose={() => setShowWebsite(false)} />}
    </>
  );
}

function WebsiteModal({ onClose }: { onClose: () => void }) {
  const toast = useToast();

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-[var(--scrim)]">
      <div className="max-h-[94%] w-full overflow-y-auto rounded-t-3xl bg-[var(--color-onyx)] p-5 pb-7 ring-1 ring-[var(--color-gold-3)]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
            ALIVE
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

        {/* Mocked website preview */}
        <div className="relative mt-3 overflow-hidden rounded-3xl bg-[var(--color-feature)] p-5 ring-1 ring-[var(--color-gold-3)]">
          <MashrabiyaBg />
          <div className="relative">
            <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--feature-deep-gold)]">
              alive.studio
            </p>
            <p className="mt-1 font-display text-[36px] leading-none tracking-[0.06em] text-gold-grad">
              ALIVE
            </p>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--feature-accent)]">
              tools for the practicing church
            </p>
            <div className="mt-3 text-[var(--feature-deep-gold)]">
              <ArabesqueDivider />
            </div>
            <p className="mt-3 font-serif text-[12px] leading-relaxed text-[var(--feature-fg)]/90">
              We build software the church uses every day — quietly, faithfully, and for the long walk. ACTS is our first app. More are coming.
            </p>

            <div className="mt-4 space-y-1.5">
              <WebsiteLink emoji="🏠" label="Home" />
              <WebsiteLink emoji="🎯" label="Mission & values" />
              <WebsiteLink emoji="📱" label="Our apps" />
              <WebsiteLink emoji="✍️" label="Field notes (blog)" />
              <WebsiteLink emoji="🤝" label="Partner with us" />
              <WebsiteLink emoji="📬" label="Contact" />
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            toast("Opening alive.studio in your browser...");
            setTimeout(onClose, 800);
          }}
          className="mt-3 w-full rounded-2xl bg-[var(--color-gold-2)] py-3 text-sm font-semibold text-[var(--on-accent)] ring-1 ring-[var(--color-gold-1)]"
        >
          <span className="inline-flex items-center gap-2">
            🌐 Open alive.studio
            <ArrowRight width={14} height={14} />
          </span>
        </button>

        <button
          onClick={onClose}
          className="mt-2 w-full rounded-2xl bg-[var(--color-charcoal)] py-2.5 text-[12px] font-semibold text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}

function WebsiteLink({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[var(--feature-tint)] px-3 py-2 ring-1 ring-[var(--feature-line)]">
      <span className="flex items-center gap-2 text-[12px] text-[var(--feature-fg)]">
        <span className="text-base">{emoji}</span>
        {label}
      </span>
      <span className="text-[var(--feature-accent)]">›</span>
    </div>
  );
}
