import { AdminDashboard } from "./screens/AdminDashboard";
import { UserWidget } from "./components/UserWidget";
import { AuthProvider, useAuth } from './AuthProvider';
import { AuthForm } from './AuthForm';
import { useState } from "react";
import { BottomNav } from "./components/BottomNav";
import { Onboarding } from "./components/Onboarding";
import { Dashboard } from "./screens/Dashboard";
import { PracticalLiving } from "./screens/PracticalLiving";
import {PrayerWall } from "./screens/PrayerWall";
import { StudyHub } from "./screens/StudyHub";
import { Profile } from "./screens/Profile";
import { Communities } from "./screens/Communities";
import { Feelings } from "./screens/Feelings";
import { initialProgress, initialUser, type GeoPin } from "./data/content";
import { MashrabiyaBg, AdinkraDotsBg } from "./components/Ornament";
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
  | "profile"
  | "admin";

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <AuthForm />;
  }

  return (
    <CompanionProvider>
      <FaithProvider>
        <AppShell />
      </FaithProvider>
    </CompanionProvider>
  );
}

function AppShell() {
  const [onboarded, setOnboarded] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage?.getItem("acts.onboarded") === "true";
  });

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
    // Uses 100dvh (dynamic viewport height) so it fits perfectly on mobile browsers
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[var(--color-ink)] transition-colors duration-500">
      
      {/* Backgrounds */}
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

      {/* Top Floating Controls */}
      <div className="absolute top-4 right-4 z-50 flex gap-4">
        <GlobalThemeToggle />
        <UserWidget />
      </div>

      {/* Main App Area */}
      {!onboarded ? (
        <div className="flex-1 overflow-y-auto">
          <Onboarding onDone={completeOnboarding} />
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
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
                navigate={(nextScreen) => setScreen(nextScreen as Screen)}
              />
            )}
            {screen === "admin" && (
              <AdminDashboard navigate={(nextScreen) => setScreen(nextScreen as Screen)} />
            )}
          </div>
          
          {/* 
            Bottom Nav Wrapper 
            'pb-[env(safe-area-inset-bottom)]' ensures it doesn't collide with the iPhone home bar
          */}
          <div className="relative z-40 shrink-0 border-t border-[var(--color-line)] bg-[var(--color-ink)] pb-[env(safe-area-inset-bottom)]">
            <BottomNav active={screen} onChange={setScreen} />
          </div>
        </>
      )}
    </div>
  );
}

function GlobalThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex items-center gap-2 rounded-full bg-[var(--color-charcoal)] px-3 py-2 text-[12px] font-semibold text-[var(--color-gold-1)] shadow-lg ring-1 ring-[var(--color-gold-3)] backdrop-blur transition-all hover:scale-105 active:scale-95"
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

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}