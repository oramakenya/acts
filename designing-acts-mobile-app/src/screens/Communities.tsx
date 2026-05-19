import { useEffect, useMemo, useRef, useState } from "react";
import {
  churches as seedChurches,
  type Church,
  type ChurchPost,
  type PrayerRequest,
  type Invite,
  type GeoPin,
  type ChurchEvent,
  type Mission,
  type SupportNeed,
} from "../data/content";
import { EventsTab, MissionsTab, SupportTab } from "../components/ChurchTabs";
import {
  ChevronLeft,
  ChevronRight,
  PlusIcon,
  CloseIcon,
  CheckIcon,
} from "../components/icons";
import { WorldMap, type MapPin } from "../components/WorldMap";
import {
  ArabesqueDivider,
  KenteStrip,
  MudClothBorder,
  Lozenge,
  StarOctagram,
  AdinkraDotsBg,
  OrnateHeading,
} from "../components/Ornament";
import { CreateChurchModal } from "../components/CreateChurchModal";
import { InviteFriendsModal } from "../components/InviteFriendsModal";
import { PrivatePrayerWall, pickAnonName } from "../components/PrivatePrayerWall";
import { useToast } from "../components/Toast";

export function Communities({
  homeChurchId,
  userLocation,
}: {
  homeChurchId: string;
  userLocation: GeoPin | null;
}) {
  const [churches, setChurches] = useState<Church[]>(seedChurches);
  const [openId, setOpenId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const toast = useToast();

  function toggleJoin(id: string) {
    setChurches((cs) =>
      cs.map((c) =>
        c.id === id
          ? { ...c, joined: !c.joined, members: c.members + (c.joined ? -1 : 1) }
          : c
      )
    );
    const church = churches.find((c) => c.id === id);
    if (church) {
      toast(church.joined ? "Left the community" : `Joined ${church.name}`);
    }
  }
  function addPost(churchId: string, post: ChurchPost) {
    setChurches((cs) =>
      cs.map((c) => (c.id === churchId ? { ...c, posts: [post, ...c.posts] } : c))
    );
  }
  function toggleAmen(churchId: string, postId: string) {
    setChurches((cs) =>
      cs.map((c) =>
        c.id === churchId
          ? {
              ...c,
              posts: c.posts.map((p) =>
                p.id === postId
                  ? {
                      ...p,
                      hasAmened: !p.hasAmened,
                      amens: p.amens + (p.hasAmened ? -1 : 1),
                    }
                  : p
              ),
            }
          : c
      )
    );
  }
  function addComment(churchId: string, postId: string, text: string) {
    setChurches((cs) =>
      cs.map((c) =>
        c.id === churchId
          ? {
              ...c,
              posts: c.posts.map((p) =>
                p.id === postId
                  ? {
                      ...p,
                      comments: [
                        ...p.comments,
                        {
                          id: `cm-${Date.now()}`,
                          author: "Sarah (you)",
                          initial: "S",
                          text,
                          ago: "just now",
                        },
                      ],
                    }
                  : p
              ),
            }
          : c
      )
    );
  }

  // Private prayer wall operations
  function privatePray(churchId: string, prayerId: string) {
    setChurches((cs) =>
      cs.map((c) =>
        c.id === churchId
          ? {
              ...c,
              privatePrayers: c.privatePrayers.map((p) =>
                p.id === prayerId && !p.hasPrayed
                  ? { ...p, hasPrayed: true, prayedCount: p.prayedCount + 1 }
                  : p
              ),
            }
          : c
      )
    );
  }
  function privateEncourage(churchId: string, prayerId: string, text: string) {
    setChurches((cs) =>
      cs.map((c) =>
        c.id === churchId
          ? {
              ...c,
              privatePrayers: c.privatePrayers.map((p) =>
                p.id === prayerId
                  ? {
                      ...p,
                      encouragements: [
                        { id: `pe-${Date.now()}`, text, ago: "just now" },
                        ...p.encouragements,
                      ],
                    }
                  : p
              ),
            }
          : c
      )
    );
  }
  function privatePost(churchId: string, cat: PrayerRequest["category"], body: string) {
    const newPrayer: PrayerRequest = {
      id: `pp-${Date.now()}`,
      anonymousName: pickAnonName(),
      postedAgo: "just now",
      category: cat,
      body,
      prayedCount: 0,
      encouragements: [],
    };
    setChurches((cs) =>
      cs.map((c) =>
        c.id === churchId
          ? { ...c, privatePrayers: [newPrayer, ...c.privatePrayers] }
          : c
      )
    );
  }

  function addInvite(churchId: string, invite: Invite) {
    setChurches((cs) =>
      cs.map((c) =>
        c.id === churchId ? { ...c, invites: [invite, ...c.invites] } : c
      )
    );
  }

  // Events
  function toggleEventAttend(churchId: string, eventId: string) {
    setChurches((cs) =>
      cs.map((c) =>
        c.id === churchId
          ? {
              ...c,
              events: c.events.map((e) =>
                e.id === eventId
                  ? {
                      ...e,
                      isAttending: !e.isAttending,
                      attending: e.attending + (e.isAttending ? -1 : 1),
                    }
                  : e
              ),
            }
          : c
      )
    );
  }
  function addEvent(churchId: string, ev: ChurchEvent) {
    setChurches((cs) =>
      cs.map((c) =>
        c.id === churchId ? { ...c, events: [ev, ...c.events] } : c
      )
    );
  }

  // Missions
  function toggleMissionInterest(churchId: string, missionId: string) {
    setChurches((cs) =>
      cs.map((c) =>
        c.id === churchId
          ? {
              ...c,
              missions: c.missions.map((m) =>
                m.id === missionId
                  ? {
                      ...m,
                      isInterested: !m.isInterested,
                      interestedCount:
                        m.interestedCount + (m.isInterested ? -1 : 1),
                    }
                  : m
              ),
            }
          : c
      )
    );
  }
  function addMission(churchId: string, m: Mission) {
    setChurches((cs) =>
      cs.map((c) =>
        c.id === churchId ? { ...c, missions: [m, ...c.missions] } : c
      )
    );
  }

  // Support
  function toggleSupportHelp(churchId: string, needId: string) {
    setChurches((cs) =>
      cs.map((c) =>
        c.id === churchId
          ? {
              ...c,
              supportNeeds: c.supportNeeds.map((s) =>
                s.id === needId
                  ? {
                      ...s,
                      isHelping: !s.isHelping,
                      helpersCount: s.helpersCount + (s.isHelping ? -1 : 1),
                    }
                  : s
              ),
            }
          : c
      )
    );
  }
  function addSupportNeed(churchId: string, s: SupportNeed) {
    setChurches((cs) =>
      cs.map((c) =>
        c.id === churchId ? { ...c, supportNeeds: [s, ...c.supportNeeds] } : c
      )
    );
  }

  function handleCreate(church: Church) {
    setChurches((cs) => [church, ...cs]);
    setCreating(false);
    toast(`${church.name} founded`);
    // jump directly into the new community
    setTimeout(() => setOpenId(church.id), 100);
  }

  const open = openId ? churches.find((c) => c.id === openId) ?? null : null;

  if (open) {
    return (
      <ChurchDetail
        church={open}
        isHome={open.id === homeChurchId}
        onBack={() => setOpenId(null)}
        onJoin={() => toggleJoin(open.id)}
        onAmen={(postId) => toggleAmen(open.id, postId)}
        onComment={(postId, text) => addComment(open.id, postId, text)}
        onAddPost={(post) => addPost(open.id, post)}
        onPrivatePray={(prayerId) => privatePray(open.id, prayerId)}
        onPrivateEncourage={(prayerId, text) => privateEncourage(open.id, prayerId, text)}
        onPrivatePost={(cat, body) => privatePost(open.id, cat, body)}
        onInvite={(iv) => addInvite(open.id, iv)}
        onEventAttend={(eventId) => toggleEventAttend(open.id, eventId)}
        onEventPost={(ev) => addEvent(open.id, ev)}
        onMissionInterest={(mId) => toggleMissionInterest(open.id, mId)}
        onMissionPost={(m) => addMission(open.id, m)}
        onSupportHelp={(sId) => toggleSupportHelp(open.id, sId)}
        onSupportPost={(s) => addSupportNeed(open.id, s)}
      />
    );
  }

  const joined = churches.filter((c) => c.joined);
  const discover = churches.filter((c) => !c.joined);
  const founded = churches.filter((c) => c.isFounder);

  const pins: MapPin[] = churches.map((c) => ({
    id: c.id,
    lat: c.lat,
    lon: c.lon,
    tone: c.joined ? "gold" : "cream",
    pulse: c.joined,
    size: 2,
  }));

  return (
    <div className="flex h-full flex-col overflow-y-auto pt-10 pat-mudcloth">
      <div className="px-6 pt-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-3)]">
          Pillar 4
        </p>
        <h1 className="mt-1 font-display text-[24px] tracking-wide text-gold-grad">
          Communities
        </h1>
        <div className="mt-1 text-[var(--color-gold-3)]">
          <ArabesqueDivider width={200} />
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-cream)]/80">
          Local churches, walking together. Or start your own with the people the Lord has put around you.
        </p>
      </div>

      {/* Start community CTA */}
      <div className="mx-6 mt-4">
        <button
          onClick={() => setCreating(true)}
          className="group relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a1a06] via-[#3d2509] to-[#2a1a06] p-4 text-left ring-1 ring-[var(--color-gold-3)] active:scale-[0.99]"
        >
          <AdinkraDotsBg />
          <StarOctagram
            width={16}
            height={16}
            className="absolute right-3 top-3 text-[var(--color-gold-2)] shimmer"
          />
          <div className="relative flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-gold-2)] text-black ring-1 ring-[var(--color-gold-1)]">
              <PlusIcon width={22} height={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[15px] tracking-wide text-gold-grad">
                Start a community
              </p>
              <p className="mt-0.5 text-[11px] text-[var(--color-bronze)]">
                Found your own church or small group. Invite friends. Pray together privately.
              </p>
            </div>
          </div>
        </button>
      </div>

      {founded.length > 0 && (
        <p className="mx-6 mt-2 text-[10px] text-[var(--color-bronze)]">
          ✨ You founded {founded.length} {founded.length === 1 ? "community" : "communities"}
        </p>
      )}

      <div className="mx-5 mt-4">
        <WorldMap pins={pins} height={150} onPinClick={(id) => setOpenId(id)} showGrid>
          <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-1 text-[10px] font-medium text-[var(--color-gold-1)] backdrop-blur ring-1 ring-[var(--color-gold-4)]">
            {churches.length} churches on ACTS
          </div>
          <div className="absolute bottom-2 right-3 flex items-center gap-2 text-[9px] text-[var(--color-gold-1)]/80">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5d97a]" /> Yours
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5e6c4]" /> Discover
            </span>
          </div>
        </WorldMap>
      </div>

      <section className="mt-5 px-6">
        <OrnateHeading eyebrow="Walking with you" title={`Your churches (${joined.length})`} />
        <div className="mt-3 space-y-2.5">
          {joined.map((c) => (
            <ChurchCard
              key={c.id}
              church={c}
              isHome={c.id === homeChurchId}
              onClick={() => setOpenId(c.id)}
            />
          ))}
        </div>
      </section>

      <section className="mt-5 px-6 pb-4">
        <OrnateHeading eyebrow="Around the world" title="Discover" />
        <div className="mt-3 space-y-2.5">
          {discover.map((c) => (
            <ChurchCard
              key={c.id}
              church={c}
              isHome={false}
              onClick={() => setOpenId(c.id)}
            />
          ))}
        </div>
      </section>

      <div className="mx-6 mb-4">
        <KenteStrip className="rounded-md ring-1 ring-[var(--color-line)]" />
      </div>

      {creating && (
        <CreateChurchModal
          onClose={() => setCreating(false)}
          onCreate={handleCreate}
          defaultLocation={userLocation}
        />
      )}
    </div>
  );
}

function ChurchCard({
  church,
  isHome,
  onClick,
}: {
  church: Church;
  isHome: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="block w-full overflow-hidden rounded-3xl bg-[var(--color-charcoal)] text-left shadow-sm ring-1 ring-[var(--color-line-strong)] active:scale-[0.99]"
    >
      <div className={`relative bg-gradient-to-br ${church.themeColor} px-4 pt-3 text-[var(--color-cream)]`}>
        <AdinkraDotsBg />
        <div className="relative flex items-center justify-between">
          <span className="text-2xl">{church.emoji}</span>
          <div className="flex items-center gap-1">
            {church.isFounder && (
              <span className="rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]">
                Founder
              </span>
            )}
            {isHome && (
              <span className="rounded-full bg-[var(--color-gold-2)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-black ring-1 ring-[var(--color-gold-1)]">
                Home
              </span>
            )}
          </div>
        </div>
        <p className="relative mt-1 font-display text-[16px] tracking-wide text-[var(--color-gold-1)]">
          {church.name}
        </p>
        <p className="relative text-[10px] text-[var(--color-bronze)]">
          📍 {church.city}, {church.country} · {church.members} {church.members === 1 ? "member" : "members"}
        </p>
        <div className="relative mt-2 text-[var(--color-gold-3)]">
          <MudClothBorder height={6} />
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="text-[11px] italic text-[var(--color-bronze)] font-serif">
          "{church.tagline}"
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] text-[var(--color-muted)]">
            This week: {church.weeklyVerse}
          </span>
          <span className="text-[11px] font-semibold text-[var(--color-gold-1)]">
            {church.joined ? "Open ›" : "View ›"}
          </span>
        </div>
      </div>
    </button>
  );
}

function ChurchDetail({
  church,
  isHome,
  onBack,
  onJoin,
  onAmen,
  onComment,
  onAddPost,
  onPrivatePray,
  onPrivateEncourage,
  onPrivatePost,
  onInvite,
  onEventAttend,
  onEventPost,
  onMissionInterest,
  onMissionPost,
  onSupportHelp,
  onSupportPost,
}: {
  church: Church;
  isHome: boolean;
  onBack: () => void;
  onJoin: () => void;
  onAmen: (postId: string) => void;
  onComment: (postId: string, text: string) => void;
  onAddPost: (p: ChurchPost) => void;
  onPrivatePray: (prayerId: string) => void;
  onPrivateEncourage: (prayerId: string, text: string) => void;
  onPrivatePost: (cat: PrayerRequest["category"], body: string) => void;
  onInvite: (iv: Invite) => void;
  onEventAttend: (eventId: string) => void;
  onEventPost: (ev: ChurchEvent) => void;
  onMissionInterest: (missionId: string) => void;
  onMissionPost: (m: Mission) => void;
  onSupportHelp: (needId: string) => void;
  onSupportPost: (s: SupportNeed) => void;
}) {
  type Tab = "feed" | "pray" | "events" | "missions" | "support" | "members" | "about";
  const [tab, setTab] = useState<Tab>("feed");
  const [composing, setComposing] = useState(false);
  const [inviting, setInviting] = useState(false);
  const toast = useToast();

  const challengePct = useMemo(
    () =>
      Math.round(
        (church.groupChallenge.participating /
          Math.max(church.groupChallenge.total, 1)) * 100
      ),
    [church]
  );

  return (
    <div className="relative flex h-full flex-col overflow-hidden pt-10">
      {/* Header banner */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${church.themeColor} px-5 pb-4 pt-2 text-[var(--color-cream)]`}>
        <AdinkraDotsBg />
        <div className="relative flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-4)]"
          >
            <ChevronLeft width={18} height={18} />
          </button>
          <div className="flex items-center gap-2">
            {church.joined && (
              <button
                onClick={() => setInviting(true)}
                className="flex items-center gap-1 rounded-full bg-[var(--color-gold-2)] px-3 py-1.5 text-[11px] font-semibold text-black ring-1 ring-[var(--color-gold-1)]"
              >
                <PlusIcon width={12} height={12} /> Invite
              </button>
            )}
            <button
              onClick={onJoin}
              className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                church.joined
                  ? "bg-black/40 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
                  : "bg-[var(--color-gold-2)] text-black ring-1 ring-[var(--color-gold-1)]"
              }`}
            >
              {church.joined ? (
                <span className="flex items-center gap-1">
                  <CheckIcon width={12} height={12} /> Joined
                </span>
              ) : (
                "Join church"
              )}
            </button>
          </div>
        </div>
        <div className="relative mt-3 flex items-center gap-3">
          <span className="text-3xl">{church.emoji}</span>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-[20px] tracking-wide text-gold-grad">
              {church.name}
            </h2>
            <p className="text-[11px] text-[var(--color-bronze)]">
              📍 {church.city}, {church.country} · {church.members}{" "}
              {church.members === 1 ? "member" : "members"}
            </p>
          </div>
        </div>
        <p className="relative mt-2 text-[12px] italic text-[var(--color-cream)]/85 font-serif">
          "{church.tagline}"
        </p>

        <div className="relative mt-3 flex flex-wrap gap-1.5">
          {isHome && (
            <span className="rounded-full bg-[var(--color-gold-2)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-black">
              Home church
            </span>
          )}
          {church.isFounder && (
            <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]">
              You founded this
            </span>
          )}
        </div>

        <div className="relative mt-3 text-[var(--color-gold-3)]">
          <MudClothBorder height={8} />
        </div>
      </div>

      {/* Tabs — horizontally scrollable with a visible "more →" arrow */}
      <ChurchTabsBar tab={tab} setTab={setTab} />

      <div className="flex-1 overflow-y-auto px-5 pb-4 pt-3 pat-mudcloth">
        {tab === "feed" && (
          <FeedTab
            church={church}
            onAmen={onAmen}
            onComment={onComment}
            challengePct={challengePct}
            onJoinChallenge={() => toast("You're walking in this challenge!")}
          />
        )}
        {tab === "pray" && (
          <PrivatePrayerWall
            churchName={church.name}
            prayers={church.privatePrayers}
            isMember={church.joined}
            onPray={onPrivatePray}
            onEncourage={onPrivateEncourage}
            onPost={onPrivatePost}
          />
        )}
        {tab === "events" && (
          <EventsTab
            church={church}
            onToggleAttend={onEventAttend}
            onPost={onEventPost}
          />
        )}
        {tab === "missions" && (
          <MissionsTab
            church={church}
            onToggleInterest={onMissionInterest}
            onPost={onMissionPost}
          />
        )}
        {tab === "support" && (
          <SupportTab
            church={church}
            onToggleHelp={onSupportHelp}
            onPost={onSupportPost}
          />
        )}
        {tab === "members" && (
          <MembersTab church={church} onOpenInvite={() => setInviting(true)} />
        )}
        {tab === "about" && <AboutTab church={church} onOpenInvite={() => setInviting(true)} />}
      </div>

      {tab === "feed" && church.joined && (
        <button
          onClick={() => setComposing(true)}
          className="absolute bottom-5 right-5 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-gold-2)] text-black shadow-xl ring-4 ring-[var(--color-gold-4)]/60 active:scale-95"
        >
          <PlusIcon width={20} height={20} />
        </button>
      )}

      {composing && (
        <PostComposer
          onClose={() => setComposing(false)}
          onPost={(post) => {
            onAddPost(post);
            setComposing(false);
            toast("Posted to your church");
          }}
        />
      )}

      {inviting && (
        <InviteFriendsModal
          church={church}
          onClose={() => setInviting(false)}
          onInvite={onInvite}
        />
      )}
    </div>
  );
}

type ChurchTab = "feed" | "pray" | "events" | "missions" | "support" | "members" | "about";

function ChurchTabsBar({
  tab,
  setTab,
}: {
  tab: ChurchTab;
  setTab: (t: ChurchTab) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const tabs: { id: ChurchTab; label: string }[] = [
    { id: "feed", label: "Feed" },
    { id: "pray", label: "🔒 Prayer" },
    { id: "events", label: "📅 Events" },
    { id: "missions", label: "🌍 Missions" },
    { id: "support", label: "🤝 Support" },
    { id: "members", label: "Members" },
    { id: "about", label: "About" },
  ];

  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 4);
    setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    return () => el.removeEventListener("scroll", updateArrows);
  }, []);

  function scrollByDir(dir: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 160, behavior: "smooth" });
  }

  return (
    <div className="relative border-b border-[var(--color-line)] bg-[var(--color-onyx)]">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`shrink-0 px-3.5 py-3 text-[11px] font-semibold transition ${
              tab === t.id
                ? "border-b-2 border-[var(--color-gold-2)] text-[var(--color-gold-1)]"
                : "text-[var(--color-muted)]"
            }`}
          >
            {t.label}
          </button>
        ))}
        {/* Right padding so the last tab clears the arrow */}
        <div className="w-8 shrink-0" />
      </div>

      {/* Left fade + arrow */}
      {showLeftArrow && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[var(--color-onyx)] via-[var(--color-onyx)] to-transparent" />
          <button
            onClick={() => scrollByDir(-1)}
            aria-label="Scroll tabs left"
            className="absolute left-1 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-gold-2)] text-[var(--on-accent)] shadow-lg ring-2 ring-[var(--color-gold-1)] active:scale-95"
          >
            <ChevronLeft width={16} height={16} />
          </button>
        </>
      )}

      {/* Right fade + subtle arrow */}
      {showRightArrow && (
        <>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--color-onyx)] via-[var(--color-onyx)] to-transparent" />
          <button
            onClick={() => scrollByDir(1)}
            aria-label="More tabs — scroll right"
            className="absolute right-1 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-gold-2)] text-[var(--on-accent)] shadow-md ring-1 ring-[var(--color-gold-1)] active:scale-95 shimmer"
          >
            <ChevronRight width={14} height={14} />
          </button>
        </>
      )}
    </div>
  );
}

function FeedTab({
  church,
  onAmen,
  onComment,
  challengePct,
  onJoinChallenge,
}: {
  church: Church;
  onAmen: (id: string) => void;
  onComment: (id: string, text: string) => void;
  challengePct: number;
  onJoinChallenge: () => void;
}) {
  const [joinedChallenge, setJoinedChallenge] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl bg-[var(--color-gold-2)]/10 p-4 ring-1 ring-[var(--color-gold-3)]">
        <StarOctagram
          width={14}
          height={14}
          className="absolute right-3 top-3 text-[var(--color-gold-2)]"
        />
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-1)]">
          Group challenge — this week
        </p>
        <p className="mt-1 font-display text-[14px] tracking-wide text-[var(--color-cream)]">
          {church.groupChallenge.title}
        </p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-black/40">
          <div
            className="h-full rounded-full bg-[var(--color-gold-2)] transition-all"
            style={{ width: `${challengePct}%` }}
          />
        </div>
        <p className="mt-1 text-[10px] text-[var(--color-bronze)]">
          {church.groupChallenge.participating}/{church.groupChallenge.total} walking in
          this · {challengePct}%
        </p>
        {church.joined && (
          <button
            onClick={() => {
              setJoinedChallenge(true);
              onJoinChallenge();
            }}
            disabled={joinedChallenge}
            className={`mt-3 w-full rounded-xl py-2 text-[12px] font-semibold transition ${
              joinedChallenge
                ? "bg-[var(--color-gold-4)]/30 text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]"
                : "bg-[var(--color-gold-2)] text-black ring-1 ring-[var(--color-gold-1)]"
            }`}
          >
            {joinedChallenge ? "✓ Walking in this" : "I'm in"}
          </button>
        )}
      </div>

      <div className="relative mt-3 overflow-hidden rounded-3xl bg-black p-4 text-[var(--color-cream)] ring-1 ring-[var(--color-gold-4)]">
        <AdinkraDotsBg />
        <p className="relative text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          We're sitting in
        </p>
        <p className="relative mt-1 font-display text-[16px] tracking-wide text-[var(--color-gold-1)]">
          {church.weeklyVerse}
        </p>
        <p className="relative mt-1 text-[11px] text-[var(--color-bronze)]">
          Tap into Practical Living to act on it today.
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {church.posts.length === 0 ? (
          <div className="rounded-3xl bg-[var(--color-charcoal)] p-6 text-center ring-1 ring-[var(--color-line)]">
            <p className="text-3xl">🌱</p>
            <p className="mt-2 font-display text-[14px] tracking-wide text-[var(--color-gold-1)]">
              The feed is empty
            </p>
            <p className="mt-1 text-[11px] text-[var(--color-bronze)]">
              {church.joined
                ? "Tap the + to share the first reflection."
                : "Join this church to read and post in the feed."}
            </p>
          </div>
        ) : (
          church.posts.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              onAmen={() => onAmen(p.id)}
              onComment={(text) => onComment(p.id, text)}
            />
          ))
        )}
      </div>
    </>
  );
}

function PostCard({
  post,
  onAmen,
  onComment,
}: {
  post: ChurchPost;
  onAmen: () => void;
  onComment: (text: string) => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [text, setText] = useState("");

  const kindColor: Record<ChurchPost["kind"], string> = {
    Reflection: "bg-[var(--color-gold-2)]/15 text-[var(--color-gold-1)] ring-[var(--color-gold-3)]",
    Announcement: "bg-[#7a5a14]/30 text-[var(--color-gold-1)] ring-[var(--color-gold-4)]",
    "Sermon Note": "bg-[var(--color-gold-2)]/20 text-[var(--color-gold-1)] ring-[var(--color-gold-3)]",
    Question: "bg-[#5a1a1a]/40 text-[#f5d97a] ring-[#7a3030]",
  };

  return (
    <article className="rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line-strong)]">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-gold-2)] text-[12px] font-bold text-black ring-1 ring-[var(--color-gold-1)]">
          {post.authorInitial}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold text-[var(--color-gold-1)]">
            {post.authorName}
          </p>
          <p className="text-[10px] text-[var(--color-bronze)]">
            {post.authorRole} · {post.postedAgo}
          </p>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ${kindColor[post.kind]}`}>
          {post.kind}
        </span>
      </div>

      {post.title && (
        <h3 className="mt-3 font-display text-[15px] tracking-wide leading-tight text-[var(--color-gold-1)]">
          {post.title}
        </h3>
      )}
      <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-cream)]/90 font-serif">
        {post.body}
      </p>
      {post.scripture && (
        <p className="mt-2 inline-flex items-center gap-1 rounded-xl bg-[var(--color-gold-2)]/15 px-3 py-1.5 text-[11px] font-semibold text-[var(--color-gold-1)] ring-1 ring-[var(--color-gold-3)]">
          <Lozenge width={10} height={10} /> {post.scripture}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-[var(--color-line)] pt-2">
        <button
          onClick={onAmen}
          className={`flex items-center gap-1.5 text-[11px] font-semibold transition active:scale-95 ${
            post.hasAmened ? "text-[var(--color-gold-1)]" : "text-[var(--color-bronze)]"
          }`}
        >
          <span>🙏</span>
          <span>{post.amens}</span>
          <span className="font-medium text-[var(--color-muted)]">
            {post.hasAmened ? "amen'd" : "amen"}
          </span>
        </button>
        <button
          onClick={() => setShowComments((s) => !s)}
          className="text-[11px] text-[var(--color-bronze)]"
        >
          💬 {post.comments.length}{" "}
          {post.comments.length === 1 ? "reply" : "replies"}
        </button>
      </div>

      {showComments && (
        <div className="mt-3 space-y-2 border-t border-[var(--color-line)] pt-3">
          {post.comments.map((c) => (
            <div key={c.id} className="flex items-start gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold-4)] text-[10px] font-bold text-black">
                {c.initial}
              </span>
              <div className="min-w-0 flex-1 rounded-2xl bg-black/40 px-3 py-2 ring-1 ring-[var(--color-line)]">
                <p className="text-[11px] font-semibold text-[var(--color-gold-1)]">
                  {c.author}
                  <span className="ml-2 text-[9px] font-normal text-[var(--color-muted)]">
                    {c.ago}
                  </span>
                </p>
                <p className="text-[12px] leading-snug text-[var(--color-cream)]/90">
                  {c.text}
                </p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 pt-1">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Reply with grace..."
              className="flex-1 rounded-full bg-black/40 px-3 py-2 text-[12px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
            />
            <button
              onClick={() => {
                if (text.trim()) {
                  onComment(text.trim());
                  setText("");
                }
              }}
              disabled={!text.trim()}
              className="rounded-full bg-[var(--color-gold-2)] px-3 py-2 text-[11px] font-semibold text-black disabled:opacity-40"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

function MembersTab({
  church,
  onOpenInvite,
}: {
  church: Church;
  onOpenInvite: () => void;
}) {
  const toast = useToast();

  // Mock member directory built from invites + a couple of seed members
  const founderRow = church.isFounder
    ? [{ id: "you", name: "You (founder)", role: "Founder", joinedAgo: "founding" }]
    : [];
  const seedMembers = [
    { id: "m1", name: church.pastor, role: "Pastor", joinedAgo: "—" },
    { id: "m2", name: "Anna L.", role: "Member", joinedAgo: "3 months ago" },
    { id: "m3", name: "Marcus T.", role: "Member", joinedAgo: "1 month ago" },
    { id: "m4", name: "Jenny W.", role: "Worship Lead", joinedAgo: "2 months ago" },
  ];
  const joinedFromInvites = church.invites
    .filter((iv) => iv.status === "Joined")
    .map((iv) => ({ id: iv.id, name: iv.name, role: "Member", joinedAgo: iv.sentAgo }));

  const all = [...founderRow, ...seedMembers, ...joinedFromInvites].slice(0, church.members);

  return (
    <div className="space-y-3">
      <div className="rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line)]">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
            Invite code
          </p>
          <button
            onClick={() => {
              if (navigator.clipboard) navigator.clipboard.writeText(church.inviteCode).catch(() => {});
              toast("Code copied");
            }}
            className="text-[10px] font-medium text-[var(--color-gold-1)]"
          >
            Copy
          </button>
        </div>
        <p className="mt-1 font-display text-[22px] tracking-[0.25em] text-gold-grad">
          {church.inviteCode}
        </p>
        <p className="mt-1 text-[10px] text-[var(--color-bronze)]">
          Share this code with anyone you want in the room.
        </p>
        <button
          onClick={onOpenInvite}
          className="mt-3 w-full rounded-xl bg-[var(--color-gold-2)] py-2 text-[12px] font-semibold text-black ring-1 ring-[var(--color-gold-1)]"
        >
          Invite friends
        </button>
      </div>

      {/* Pending invites */}
      {church.invites.length > 0 && (
        <div className="rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line)]">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
            Invites ({church.invites.length})
          </p>
          <ul className="mt-2 space-y-1.5">
            {church.invites.map((iv) => (
              <li
                key={iv.id}
                className="flex items-center justify-between rounded-xl bg-black/40 px-3 py-2 ring-1 ring-[var(--color-line)]"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-medium text-[var(--color-cream)]">
                    {iv.name}
                  </p>
                  <p className="text-[10px] text-[var(--color-muted)]">
                    via {iv.method} · {iv.sentAgo}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${
                    iv.status === "Joined"
                      ? "bg-[#2a3a14] text-[#a8d65a] ring-[#4a6a14]"
                      : iv.status === "Declined"
                      ? "bg-[#3a1a14] text-[#d68a5a] ring-[#6a2a14]"
                      : "bg-[var(--color-gold-2)]/15 text-[var(--color-gold-1)] ring-[var(--color-gold-3)]"
                  }`}
                >
                  {iv.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Members directory */}
      <div className="rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line)]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Members ({church.members})
        </p>
        <ul className="mt-2 space-y-1.5">
          {all.map((m) => (
            <li
              key={m.id}
              className="flex items-center gap-3 rounded-xl bg-black/40 px-3 py-2 ring-1 ring-[var(--color-line)]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-gold-2)] text-[11px] font-bold text-black ring-1 ring-[var(--color-gold-1)]">
                {m.name.charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-medium text-[var(--color-cream)]">{m.name}</p>
                <p className="text-[10px] text-[var(--color-muted)]">
                  {m.role} · {m.joinedAgo}
                </p>
              </div>
              <button className="text-[11px] font-semibold text-[var(--color-gold-1)]">
                Pray
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AboutTab({ church, onOpenInvite }: { church: Church; onOpenInvite: () => void }) {
  return (
    <div className="space-y-3">
      <div className="rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line)]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Pastor / leader
        </p>
        <p className="mt-1 font-display text-[15px] tracking-wide text-[var(--color-gold-1)]">
          {church.pastor}
        </p>
      </div>
      <div className="rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line)]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Location
        </p>
        <p className="mt-1 font-display text-[15px] tracking-wide text-[var(--color-gold-1)]">
          {church.city}, {church.country}
        </p>
        <p className="mt-1 text-[11px] text-[var(--color-bronze)]">
          Lat {church.lat.toFixed(2)} · Lon {church.lon.toFixed(2)}
        </p>
      </div>
      <div className="rounded-3xl bg-[var(--color-charcoal)] p-4 shadow-sm ring-1 ring-[var(--color-line)]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Membership
        </p>
        <p className="mt-1 font-display text-[15px] tracking-wide text-[var(--color-gold-1)]">
          {church.members} {church.members === 1 ? "member" : "members"} on ACTS
        </p>
        <p className="mt-1 text-[11px] text-[var(--color-bronze)]">
          Walking together in {church.weeklyVerse} this week.
        </p>
        {church.joined && (
          <button
            onClick={onOpenInvite}
            className="mt-3 w-full rounded-xl bg-[var(--color-gold-2)] py-2 text-[12px] font-semibold text-black ring-1 ring-[var(--color-gold-1)]"
          >
            Invite friends
          </button>
        )}
      </div>
    </div>
  );
}

function PostComposer({
  onClose,
  onPost,
}: {
  onClose: () => void;
  onPost: (p: ChurchPost) => void;
}) {
  const [kind, setKind] = useState<ChurchPost["kind"]>("Reflection");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [scripture, setScripture] = useState("");

  return (
    <div className="absolute inset-0 z-30 flex items-end bg-black/70">
      <div className="max-h-[92%] w-full overflow-y-auto rounded-t-3xl bg-[var(--color-onyx)] p-5 pb-7 ring-1 ring-[var(--color-gold-4)]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
            Share with your church
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

        <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold-3)]">
          Type
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {(["Reflection", "Question", "Sermon Note", "Announcement"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`rounded-full px-2.5 py-1 text-[11px] ${
                kind === k
                  ? "bg-[var(--color-gold-2)] text-black"
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
          placeholder="Title (optional)"
          className="mt-3 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] font-semibold text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          maxLength={800}
          placeholder="What is the Lord teaching you? Speak with grace."
          className="mt-2 w-full resize-none rounded-2xl bg-[var(--color-charcoal)] p-3 text-[13px] text-[var(--color-cream)] outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />
        <input
          value={scripture}
          onChange={(e) => setScripture(e.target.value)}
          placeholder="Scripture (optional, e.g. Romans 12:18)"
          className="mt-2 w-full rounded-2xl bg-[var(--color-charcoal)] p-3 text-[12px] text-[var(--color-cream)]/90 outline-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-2)]"
        />

        <button
          onClick={() => {
            if (!body.trim()) return;
            onPost({
              id: `cp-${Date.now()}`,
              authorRole: "Member",
              authorInitial: "S",
              authorName: "Sarah (you)",
              postedAgo: "just now",
              kind,
              title: title.trim() || undefined,
              body: body.trim(),
              scripture: scripture.trim() || undefined,
              amens: 0,
              comments: [],
            });
          }}
          disabled={!body.trim()}
          className="mt-3 w-full rounded-2xl bg-[var(--color-gold-2)] py-3 text-sm font-semibold text-black ring-1 ring-[var(--color-gold-1)] disabled:opacity-40"
        >
          Post to your church
        </button>
      </div>
    </div>
  );
}


