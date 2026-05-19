import { useState } from "react";
import type { Church, Invite } from "../data/content";
import { CloseIcon, CheckIcon } from "./icons";
import { ArabesqueDivider, StarOctagram } from "./Ornament";
import { useToast } from "./Toast";

const inviteSuggestions = [
  "Family member",
  "Small group friend",
  "Coworker",
  "Old church friend",
  "Neighbor",
];

export function InviteFriendsModal({
  church,
  onClose,
  onInvite,
}: {
  church: Church;
  onClose: () => void;
  onInvite: (invite: Invite) => void;
}) {
  const [tab, setTab] = useState<"link" | "email" | "sms">("link");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const inviteUrl = `acts.app/join/${church.inviteCode}`;
  const inviteMessage = `Hey! Join our ACTS community "${church.name}". Use code ${church.inviteCode} or tap ${inviteUrl}.`;

  function handleCopy(text: string, label: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopied(true);
    toast(`${label} copied`);
    setTimeout(() => setCopied(false), 1800);
  }

  function handleSend() {
    if (!name.trim()) return;
    const method = tab === "link" ? "Link" : tab === "email" ? "Email" : "SMS";
    onInvite({
      id: `iv-${Date.now()}`,
      name: name.trim(),
      method,
      status: "Pending",
      sentAgo: "just now",
    });
    toast(`Invite sent to ${name.trim()}`);
    setName("");
    setContact("");
  }

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-black/75">
      <div className="max-h-[92%] w-full overflow-y-auto rounded-t-3xl bg-[var(--color-onyx)] p-5 pb-7 ring-1 ring-[var(--color-gold-3)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{church.emoji}</span>
            <h3 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
              Invite friends
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[var(--color-gold-1)] ring-1 ring-[var(--color-line)]"
          >
            <CloseIcon width={16} height={16} />
          </button>
        </div>
        <p className="mt-1 text-[12px] text-[var(--color-bronze)]">
          Grow {church.name} with the people the Lord puts in front of you.
        </p>
        <div className="mt-2 text-[var(--color-gold-3)]">
          <ArabesqueDivider />
        </div>

        {/* Invite code hero */}
        <div className="relative mt-3 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1006] via-[#3a2308] to-[#1a1006] p-4 ring-1 ring-[var(--color-gold-3)]">
          <StarOctagram
            width={14}
            height={14}
            className="absolute right-3 top-3 text-[var(--color-gold-2)]"
          />
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
            Invite code
          </p>
          <p className="mt-1 font-display text-[32px] tracking-[0.3em] text-gold-grad">
            {church.inviteCode}
          </p>
          <button
            onClick={() => handleCopy(church.inviteCode, "Code")}
            className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-gold-2)] px-3 py-1.5 text-[11px] font-semibold text-black ring-1 ring-[var(--color-gold-1)]"
          >
            {copied ? <CheckIcon width={12} height={12} /> : <span>📋</span>}
            {copied ? "Copied" : "Copy code"}
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex rounded-full bg-[var(--color-charcoal)] p-1 ring-1 ring-[var(--color-line)]">
          {(["link", "email", "sms"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-full py-1.5 text-[11px] font-semibold transition ${
                tab === t
                  ? "bg-[var(--color-gold-2)] text-black"
                  : "text-[var(--color-bronze)]"
              }`}
            >
              {t === "link" && "🔗 Link"}
              {t === "email" && "✉️ Email"}
              {t === "sms" && "💬 SMS"}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-3 rounded-2xl bg-[var(--color-charcoal)] p-3 ring-1 ring-[var(--color-line)]">
          {tab === "link" && (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
                Shareable link
              </p>
              <div className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-black/40 px-3 py-2 ring-1 ring-[var(--color-line)]">
                <span className="truncate text-[12px] text-[var(--color-cream)]">
                  {inviteUrl}
                </span>
                <button
                  onClick={() => handleCopy(inviteUrl, "Link")}
                  className="rounded-full bg-[var(--color-gold-2)] px-2.5 py-1 text-[10px] font-semibold text-black"
                >
                  Copy
                </button>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                <ShareChip icon="💬" label="Messages" onClick={() => handleCopy(inviteMessage, "Message")} />
                <ShareChip icon="📧" label="Email" onClick={() => handleCopy(inviteMessage, "Message")} />
                <ShareChip icon="📱" label="WhatsApp" onClick={() => handleCopy(inviteMessage, "Message")} />
                <ShareChip icon="📷" label="Instagram" onClick={() => handleCopy(inviteMessage, "Message")} />
                <ShareChip icon="🐦" label="Twitter" onClick={() => handleCopy(inviteMessage, "Message")} />
                <ShareChip icon="•••" label="More" onClick={() => handleCopy(inviteMessage, "Message")} />
              </div>
            </>
          )}
          {tab === "email" && (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
                Send an email invite
              </p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Friend's name"
                className="mt-2 w-full rounded-xl bg-black/40 p-2.5 text-[12px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
              />
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="email@example.com"
                className="mt-2 w-full rounded-xl bg-black/40 p-2.5 text-[12px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
              />
            </>
          )}
          {tab === "sms" && (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
                Send a text invite
              </p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Friend's name"
                className="mt-2 w-full rounded-xl bg-black/40 p-2.5 text-[12px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
              />
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="+1 555 0123"
                className="mt-2 w-full rounded-xl bg-black/40 p-2.5 text-[12px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
              />
            </>
          )}

          {tab !== "link" && (
            <>
              <p className="mt-3 text-[10px] uppercase tracking-wider text-[var(--color-gold-3)]">
                Quick label
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {inviteSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setName(s)}
                    className="rounded-full bg-black/40 px-2 py-1 text-[10px] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <button
                onClick={handleSend}
                disabled={!name.trim()}
                className="mt-3 w-full rounded-xl bg-[var(--color-gold-2)] py-2 text-[12px] font-semibold text-black disabled:opacity-40"
              >
                Send invite
              </button>
            </>
          )}
        </div>

        {/* Sent invites */}
        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
            Sent invites ({church.invites.length})
          </p>
          {church.invites.length === 0 ? (
            <p className="mt-2 rounded-xl bg-[var(--color-charcoal)] p-3 text-center text-[11px] text-[var(--color-bronze)] ring-1 ring-[var(--color-line)]">
              No invites yet. Be brave — ask one person today.
            </p>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {church.invites.map((iv) => (
                <li
                  key={iv.id}
                  className="flex items-center justify-between rounded-xl bg-[var(--color-charcoal)] px-3 py-2 ring-1 ring-[var(--color-line)]"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-medium text-[var(--color-cream)]">
                      {iv.name}
                    </p>
                    <p className="text-[10px] text-[var(--color-muted)]">
                      via {iv.method} · {iv.sentAgo}
                    </p>
                  </div>
                  <StatusPill status={iv.status} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4">
          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-[var(--color-charcoal)] py-2.5 text-[12px] font-semibold text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
          >
            Done
          </button>
        </div>
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
      className="flex flex-col items-center gap-1 rounded-xl bg-black/40 px-2 py-2 ring-1 ring-[var(--color-line)] active:scale-95"
    >
      <span className="text-base">{icon}</span>
      <span className="text-[9px] text-[var(--color-bronze)]">{label}</span>
    </button>
  );
}

function StatusPill({ status }: { status: Invite["status"] }) {
  const map = {
    Pending: "bg-[var(--color-gold-2)]/15 text-[var(--color-gold-1)] ring-[var(--color-gold-3)]",
    Joined: "bg-[#2a3a14] text-[#a8d65a] ring-[#4a6a14]",
    Declined: "bg-[#3a1a14] text-[#d68a5a] ring-[#6a2a14]",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${map[status]}`}>
      {status}
    </span>
  );
}
