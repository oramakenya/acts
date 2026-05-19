import { useState } from "react";
import { PhoneFrame } from "./components/PhoneFrame";
import { BottomNav } from "./components/BottomNav";
import { Onboarding } from "./components/Onboarding";
import { Dashboard } from "./screens/Dashboard";
import { PracticalLiving } from "./screens/PracticalLiving";
import { PrayerWall } from "./screens/PrayerWall";
import { StudyHub } from "./screens/StudyHub";
import { Profile } from "./screens/Profile";
import { Communities } from "./screens/Communities";
import { Feelings } from "./screens/Feelings";
import { initialProgress, initialUser, type GeoPin } from "./data/content";
import {
  ArabesqueDivider,
  KenteStrip,
  StarOctagram,
  Lozenge,
  IslamicTile,
  OrnateHeading,
  MashrabiyaBg,
  AdinkraDotsBg,
} from "./components/Ornament";
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import { CompanionProvider } from "./components/CompanionContext";
import { FaithProvider } from "./components/FaithContext";
import { SunIcon, MoonIcon } from "./components/icons";

export type Screen =
  | "dashboard"
  | "practical"
  | "feelings"
  | "prayer"
  | "community"
  | "study"
  | "profile";

export default function App() {
  return (
    <ThemeProvider>
      <CompanionProvider>
        <FaithProvider>
          <AppShell />
        </FaithProvider>
      </CompanionProvider>
    </ThemeProvider>
  );
}

function AppShell() {
  const [onboarded, setOnboarded] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage?.getItem("acts.onboarded") === "true";
  });

  // Persist the onboarded flag so re-opens land on the home screen
  function completeOnboarding() {
    setOnboarded(true);
    try {
      window.localStorage?.setItem("acts.onboarded", "true");
    } catch {
      /* ignore */
    }
  }
  function resetOnboarding() {
    setOnboarded(false);
    try {
      window.localStorage?.removeItem("acts.onboarded");
    } catch {
      /* ignore */
    }
  }
  const [screen, setScreen] = useState<Screen>("dashboard");

  const [location, setLocation] = useState<GeoPin | null>(initialUser.location);
  const [shareLocation, setShareLocation] = useState(initialUser.shareLocationOnPrayers);
  const [showOnGlobe, setShowOnGlobe] = useState(initialUser.showOnGlobe);

  const [streak] = useState(initialProgress.streakDays);
  const [prayersOffered, setPrayersOffered] = useState(initialProgress.prayersOffered);
  const [challengesCompleted, setChallengesCompleted] = useState(initialProgress.challengesCompleted);
  const [studySessions, setStudySessions] = useState(initialProgress.studySessions);
  const [versesReflected, setVersesReflected] = useState(initialProgress.versesReflected);

  const [challengeDoneToday, setChallengeDoneToday] = useState(false);
  const [reflectedToday, setReflectedToday] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-ink)] px-4 py-10 transition-colors duration-500">
      {/* Decorative background layers */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, var(--page-glow-1), transparent 45%), radial-gradient(circle at 80% 80%, var(--page-glow-2), transparent 50%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <MashrabiyaBg />
      </div>
      <AdinkraDotsBg />

      {/* Global theme toggle (top-right corner of the page, outside the phone) */}
      <GlobalThemeToggle />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-center">
        <div className="mx-auto shrink-0">
          <PhoneFrame>
            {!onboarded ? (
              <Onboarding onDone={completeOnboarding} />
            ) : (
              <>
                <div className="flex-1 overflow-hidden">
                  {screen === "dashboard" && (
                    <Dashboard
                      navigate={setScreen}
                      challengeDone={challengeDoneToday}
                      onCompleteChallenge={() => {
                        if (!challengeDoneToday) {
                          setChallengeDoneToday(true);
                          setChallengesCompleted((n) => n + 1);
                        }
                      }}
                      reflected={reflectedToday}
                      onReflect={() => {
                        if (!reflectedToday) {
                          setReflectedToday(true);
                          setVersesReflected((n) => n + 1);
                        }
                      }}
                      streak={streak}
                      prayersOffered={prayersOffered}
                    />
                  )}
                  {screen === "practical" && <PracticalLiving />}
                  {screen === "feelings" && <Feelings />}
                  {screen === "prayer" && (
                    <PrayerWall
                      onPrayed={() => setPrayersOffered((n) => n + 1)}
                      userLocation={location}
                      shareLocation={shareLocation && showOnGlobe}
                    />
                  )}
                  {screen === "community" && (
                    <Communities
                      homeChurchId={initialUser.homeChurchId}
                      userLocation={location}
                    />
                  )}
                  {screen === "study" && (
                    <StudyHub onStudied={() => setStudySessions((n) => n + 1)} />
                  )}
                  {screen === "profile" && (
                    <Profile
                      streak={streak}
                      prayersOffered={prayersOffered}
                      challengesCompleted={challengesCompleted}
                      studySessions={studySessions}
                      versesReflected={versesReflected}
                      location={location}
                      shareLocation={shareLocation}
                      showOnGlobe={showOnGlobe}
                      onSetLocation={(loc) => setLocation(loc)}
                      onClearLocation={() => setLocation(null)}
                      onToggleShareLocation={() => setShareLocation((s) => !s)}
                      onToggleShowOnGlobe={() => setShowOnGlobe((s) => !s)}
                      onResetOnboarding={resetOnboarding}
                    />
                  )}
                </div>
                <BottomNav active={screen} onChange={setScreen} />
              </>
            )}
          </PhoneFrame>
        </div>

        <DesignPanel />
      </div>
    </div>
  );
}

function DesignPanel() {
  return (
    <aside className="relative max-w-md space-y-5 lg:sticky lg:top-10">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-gold-3)]">
          an app by <span className="text-[var(--color-gold-1)]">ALIVE</span>
        </p>
        <h1 className="mt-2 font-display text-[64px] leading-none tracking-[0.06em] text-gold-grad">
          ACTS
        </h1>
        <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.3em] text-[var(--color-bronze)]">
          Live the Word. Together.
        </p>
        <div className="mt-3 text-[var(--color-gold-3)]">
          <ArabesqueDivider width={260} />
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-cream)]/85 font-serif">
          A unified mobile app for collective church life — built around four
          non-negotiable pillars and a daily rhythm that turns scripture into
          shared practice. Black and gold. Patterned. Rooted.
        </p>
      </header>

      <Card>
        <OrnateHeading eyebrow="Aesthetic" title="A church in gold" />
        <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-[var(--color-cream)]/85 font-serif">
          <li>
            <strong className="text-[var(--color-gold-1)]">Black & gold</strong> — onyx
            surfaces, burnished gold (#d4a017), warm cream type. Reverent without
            being dim.
          </li>
          <li>
            <strong className="text-[var(--color-gold-1)]">African motifs</strong> —
            Kente strip dividers, mud-cloth borders, Adinkra dot fields. Earthy,
            communal, ancestral.
          </li>
          <li>
            <strong className="text-[var(--color-gold-1)]">Arabic geometry</strong> —
            mashrabiya lattice backgrounds, 8-point star ornaments, arabesque
            dividers between sections.
          </li>
          <li>
            <strong className="text-[var(--color-gold-1)]">Typography</strong> —
            Cinzel for display titles, Amiri serif for scripture & reflection,
            Inter for UI.
          </li>
        </ul>
      </Card>

      <Card>
        <OrnateHeading eyebrow="Four pillars" title="One unified house" />
        <ul className="mt-3 space-y-3 text-[13px] leading-relaxed text-[var(--color-cream)]/85">
          <li className="flex gap-2">
            <Lozenge width={12} height={12} className="mt-1 shrink-0 text-[var(--color-gold-2)]" />
            <span>
              <strong className="text-[var(--color-gold-1)]">Practical Living</strong> —
              NT imperatives organized by life dimension. Each command paired with
              one concrete action for today.
            </span>
          </li>
          <li className="flex gap-2">
            <Lozenge width={12} height={12} className="mt-1 shrink-0 text-[var(--color-gold-2)]" />
            <span>
              <strong className="text-[var(--color-gold-1)]">Prayer Wall</strong> —
              engineered anonymity + an interactive globe of city-pinned prayers
              from around the world.
            </span>
          </li>
          <li className="flex gap-2">
            <Lozenge width={12} height={12} className="mt-1 shrink-0 text-[var(--color-gold-2)]" />
            <span>
              <strong className="text-[var(--color-gold-1)]">Study Hub</strong> — the
              four disciplines (Apologetics, Hermeneutics, Exegesis, Isagogics)
              distilled into searchable Q&A and Learning Paths.
            </span>
          </li>
          <li className="flex gap-2">
            <Lozenge width={12} height={12} className="mt-1 shrink-0 text-[var(--color-gold-2)]" />
            <span>
              <strong className="text-[var(--color-gold-1)]">Communities</strong> —
              your home church and discoverable congregations: feeds, sermon
              notes, group challenges, members-only prayer.
            </span>
          </li>
        </ul>
      </Card>

      <Card>
        <OrnateHeading eyebrow="New" title="Companion & My Pilgrimage" />
        <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-[var(--color-cream)]/85 font-serif">
          <li>
            <strong className="text-[var(--color-gold-1)]">Choose Julius (🦁) or Grace (🌿)</strong> — a companion who greets you each morning, encourages you, and walks through challenges with you.
          </li>
          <li>
            <strong className="text-[var(--color-gold-1)]">My Pilgrimage</strong> — inside Living, the "put off / put on" framework from Ephesians 4. Quit an addiction. Start a practice. Daily check-ins, victory streaks, your own scripture anchor.
          </li>
        </ul>
      </Card>

      <Card>
        <OrnateHeading eyebrow="New" title="Ask the body & Testimonies" />
        <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-[var(--color-cream)]/85 font-serif">
          <li>
            <strong className="text-[var(--color-gold-1)]">Ask the body</strong> — in Study, post a question anonymously and receive answers from scholars across traditions (Reformed, Anglican, Catholic, Patristic) <em>and</em> testimonies from believers in cities around the world.
          </li>
          <li>
            <strong className="text-[var(--color-gold-1)]">Rejoice with them</strong> — on the Prayer Wall, testimonies of answered prayer get their own gold-bordered cards and a <strong>🙌 rejoice counter</strong> so the body can praise God together — not just pray together.
          </li>
        </ul>
      </Card>

      <Card>
        <OrnateHeading eyebrow="New" title="Church gathering tabs" />
        <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-[var(--color-cream)]/85 font-serif">
          <li>
            <strong className="text-[var(--color-gold-1)]">📅 Events</strong> — services, prayer nights, retreats, men's breakfasts. RSVP with capacity bars, or host your own.
          </li>
          <li>
            <strong className="text-[var(--color-gold-1)]">🌍 Missions</strong> — short-term trips, local outreach, ongoing projects. "I want to go" interest counters, funding progress bars, and post your own.
          </li>
          <li>
            <strong className="text-[var(--color-gold-1)]">🤝 Support</strong> — financial needs, meal trains, moving help, childcare. Urgency tags (Now / This week / Ongoing), giving bars, and "I'll help" counters.
          </li>
        </ul>
      </Card>

      <Card>
        <OrnateHeading eyebrow="New" title="Support ACTS" />
        <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-[var(--color-cream)]/85 font-serif">
          <li>
            <strong className="text-[var(--color-gold-1)]">Inside the Me tab</strong> — a gold-bordered "Support ACTS" card opens a full page with three actions:
          </li>
          <li>
            <strong className="text-[var(--color-gold-1)]">💛 Give to ALIVE</strong> — one-time or monthly, $10–$250 or custom, with Card / Apple Pay / Google Pay / PayPal.
          </li>
          <li>
            <strong className="text-[var(--color-gold-1)]">🤍 Invite a friend</strong> — pre-written message, copyable link, share to Messages / Email / WhatsApp / Instagram / Twitter.
          </li>
          <li>
            <strong className="text-[var(--color-gold-1)]">🌐 Visit alive.studio</strong> — mocked in-app preview of the ALIVE company site (mission, team, other apps, contact).
          </li>
        </ul>
      </Card>

      <Card>
        <OrnateHeading eyebrow="Try it" title="The prototype" />
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-[13px] leading-relaxed text-[var(--color-cream)]/85 font-serif">
          <li>Walk through onboarding — <strong className="text-[var(--color-gold-1)]">choose your companion</strong>, name yourself.</li>
          <li>On <strong className="text-[var(--color-gold-1)]">Today</strong>, hear from your companion, mark the challenge, reflect on the verse.</li>
          <li>Open <strong className="text-[var(--color-gold-1)]">Living → My Pilgrimage</strong> → start a "putting off" or "putting on" journey.</li>
          <li>Open <strong className="text-[var(--color-gold-1)]">Heart</strong> → tap a feeling → receive scripture that meets you.</li>
          <li>Open <strong className="text-[var(--color-gold-1)]">Church</strong> → start a community → invite friends → share a private prayer.</li>
          <li>Visit <strong className="text-[var(--color-gold-1)]">Me</strong> to switch companion, rename yourself, pin a city, toggle theme.</li>
        </ol>
        <div className="mt-3 text-[var(--color-gold-3)]">
          <ArabesqueDivider />
        </div>
        <div className="mt-3">
          <KenteStrip className="rounded-md ring-1 ring-[var(--color-line)]" />
        </div>
      </Card>

      {/* Corner star */}
      <div className="absolute -top-4 right-0 text-[var(--color-gold-3)]">
        <IslamicTile size={64} />
      </div>
      <div className="absolute -left-6 top-12 text-[var(--color-gold-3)]">
        <StarOctagram width={18} height={18} />
      </div>
    </aside>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[var(--color-charcoal)] p-5 shadow-[0_20px_60px_-20px_rgba(212,160,23,0.25)] ring-1 ring-[var(--color-gold-4)]">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <MashrabiyaBg />
      </div>
      <StarOctagram
        width={12}
        height={12}
        className="absolute right-3 top-3 text-[var(--color-gold-3)]"
      />
      <div className="relative">{children}</div>
    </section>
  );
}

function GlobalThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full bg-[var(--color-charcoal)] px-3 py-2 text-[12px] font-semibold text-[var(--color-gold-1)] shadow-lg ring-1 ring-[var(--color-gold-3)] backdrop-blur transition-all hover:scale-105 active:scale-95"
    >
      {theme === "dark" ? (
        <>
          <SunIcon width={14} height={14} />
          <span className="hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <MoonIcon width={14} height={14} />
          <span className="hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
}
