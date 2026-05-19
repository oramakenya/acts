// My Pilgrimage — Ephesians 4:22–24 framework
// "Put off the old self... put on the new self."
// Users customize their journey: things to lay down, things to take up.

export type GoalKind = "putoff" | "puton";

export type CheckIn = {
  date: string; // ISO date (YYYY-MM-DD)
  victory: boolean; // did they walk in it today?
  note?: string;
};

export type PilgrimageGoal = {
  id: string;
  kind: GoalKind;
  title: string; // e.g. "Anger at my spouse" or "Daily scripture reading"
  category: string; // e.g. "Speech", "Habit", "Mind"
  why: string; // user's own "why"
  scripture?: string; // verse to anchor the goal
  startedOn: string; // ISO date
  targetDays: number; // how many days the user commits to
  checkIns: CheckIn[];
  active: boolean;
};

export type PilgrimageTemplate = {
  id: string;
  kind: GoalKind;
  title: string;
  category: string;
  why: string;
  scripture: string;
  targetDays: number;
};

// Suggested journeys — users can start with a template or build their own.
export const pilgrimageTemplates: PilgrimageTemplate[] = [
  // ── PUTTING OFF ──────────────────────────────────────────
  {
    id: "t-anger",
    kind: "putoff",
    title: "Quick anger",
    category: "Speech",
    why: "I want my words to bless, not bruise.",
    scripture: "James 1:19–20",
    targetDays: 30,
  },
  {
    id: "t-porn",
    kind: "putoff",
    title: "Pornography",
    category: "Purity",
    why: "I want my eyes and mind to belong to Christ.",
    scripture: "1 Corinthians 6:18",
    targetDays: 90,
  },
  {
    id: "t-phone",
    kind: "putoff",
    title: "Mindless scrolling",
    category: "Mind",
    why: "I want to be present, not numbed.",
    scripture: "Philippians 4:8",
    targetDays: 30,
  },
  {
    id: "t-gossip",
    kind: "putoff",
    title: "Gossip",
    category: "Speech",
    why: "I want to protect the body, not poison it.",
    scripture: "Ephesians 4:29",
    targetDays: 30,
  },
  {
    id: "t-anxiety",
    kind: "putoff",
    title: "Anxious spiraling",
    category: "Mind",
    why: "I want to cast my cares instead of carrying them.",
    scripture: "1 Peter 5:7",
    targetDays: 30,
  },
  {
    id: "t-drink",
    kind: "putoff",
    title: "Drinking to numb",
    category: "Habit",
    why: "I want to face what I've been avoiding — with Him.",
    scripture: "Ephesians 5:18",
    targetDays: 60,
  },

  // ── PUTTING ON ───────────────────────────────────────────
  {
    id: "t-scripture",
    kind: "puton",
    title: "Daily scripture",
    category: "Devotion",
    why: "I want His Word to shape my thoughts each day.",
    scripture: "Psalm 1:2",
    targetDays: 30,
  },
  {
    id: "t-prayer",
    kind: "puton",
    title: "Morning prayer",
    category: "Devotion",
    why: "I want to start the day with Him before anything else.",
    scripture: "Mark 1:35",
    targetDays: 30,
  },
  {
    id: "t-fast",
    kind: "puton",
    title: "Weekly fast",
    category: "Devotion",
    why: "I want to remember that man does not live on bread alone.",
    scripture: "Matthew 4:4",
    targetDays: 60,
  },
  {
    id: "t-serve",
    kind: "puton",
    title: "Serve someone weekly",
    category: "Love",
    why: "I want to love my neighbor with my hands, not just my words.",
    scripture: "Galatians 5:13",
    targetDays: 60,
  },
  {
    id: "t-gratitude",
    kind: "puton",
    title: "Three gratitudes daily",
    category: "Mind",
    why: "I want to see His goodness, even on hard days.",
    scripture: "1 Thessalonians 5:18",
    targetDays: 30,
  },
  {
    id: "t-sabbath",
    kind: "puton",
    title: "Honor the Sabbath",
    category: "Rhythm",
    why: "I want to rest in Him, not perform for Him.",
    scripture: "Exodus 20:8",
    targetDays: 60,
  },
];

// Helper: today's ISO date
export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

// Compute current streak from check-ins
export function currentStreak(goal: PilgrimageGoal): number {
  if (goal.checkIns.length === 0) return 0;
  // Sort by date desc
  const sorted = [...goal.checkIns].sort((a, b) => (a.date < b.date ? 1 : -1));
  let streak = 0;
  const day = new Date();
  for (const c of sorted) {
    const expected = day.toISOString().slice(0, 10);
    if (c.date === expected && c.victory) {
      streak++;
      day.setDate(day.getDate() - 1);
    } else if (c.date === expected && !c.victory) {
      break;
    } else {
      break;
    }
  }
  return streak;
}

// Compute progress percentage toward target days
export function progressPct(goal: PilgrimageGoal): number {
  const victories = goal.checkIns.filter((c) => c.victory).length;
  return Math.min(100, Math.round((victories / Math.max(goal.targetDays, 1)) * 100));
}

// Total victorious days
export function victoryDays(goal: PilgrimageGoal): number {
  return goal.checkIns.filter((c) => c.victory).length;
}

// Seed goals — a couple of in-progress journeys for the demo user
export const seedPilgrimage: PilgrimageGoal[] = [
  {
    id: "g-seed-1",
    kind: "putoff",
    title: "Quick anger at my spouse",
    category: "Speech",
    why: "I want my home to be a place of peace, not tension.",
    scripture: "Ephesians 4:26",
    startedOn: (() => {
      const d = new Date();
      d.setDate(d.getDate() - 9);
      return d.toISOString().slice(0, 10);
    })(),
    targetDays: 30,
    active: true,
    checkIns: (() => {
      const out: CheckIn[] = [];
      for (let i = 0; i < 9; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i - 1);
        out.push({
          date: d.toISOString().slice(0, 10),
          victory: i !== 3 && i !== 6, // two stumbles
        });
      }
      return out;
    })(),
  },
  {
    id: "g-seed-2",
    kind: "puton",
    title: "Morning prayer before phone",
    category: "Devotion",
    why: "I want to start the day with Him before anything else.",
    scripture: "Mark 1:35",
    startedOn: (() => {
      const d = new Date();
      d.setDate(d.getDate() - 14);
      return d.toISOString().slice(0, 10);
    })(),
    targetDays: 30,
    active: true,
    checkIns: (() => {
      const out: CheckIn[] = [];
      for (let i = 0; i < 14; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i - 1);
        out.push({
          date: d.toISOString().slice(0, 10),
          victory: i !== 5 && i !== 11,
        });
      }
      return out;
    })(),
  },
];
