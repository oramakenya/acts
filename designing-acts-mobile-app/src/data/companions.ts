// Companions — the voice that walks alongside the user.
// Choose Julius (male) or Grace (female) at onboarding.
// Their personality colors every greeting, reminder, and encouragement.

export type CompanionId = "julius" | "grace";

export type Companion = {
  id: CompanionId;
  name: string;
  pronouns: string;
  initial: string;
  emoji: string; // simple avatar fallback
  accentClasses: string; // tailwind gradient for their card
  tagline: string;
  description: string;
  voice: string; // one-sentence tone description
  // Templated phrases — {name} is replaced with the user's first name.
  morningGreeting: string;
  middayCheckIn: string;
  eveningExamen: string;
  challengeNudge: string;
  prayerEncouragement: string;
  streakEncouragement: string;
  reflectionPrompt: string;
  pilgrimageEncouragement: string;
};

export const companions: Companion[] = [
  {
    id: "julius",
    name: "Julius",
    pronouns: "he/him",
    initial: "J",
    emoji: "🦁",
    accentClasses: "from-[#2a1a06] to-[#5a3a10]",
    tagline: "A steady brother, walking with you.",
    description:
      "Julius speaks plain and steady. He calls you to courage, names hard things honestly, and reminds you of who Christ says you are.",
    voice: "Direct. Warm. Calls you up, not out.",
    morningGreeting:
      "Peace to you, {name}. The Lord's mercies are new this morning — let's walk in them together.",
    middayCheckIn:
      "Brother/sister {name}, take a breath. What is the Lord asking of you in this hour?",
    eveningExamen:
      "{name}, before you sleep — where did you see Him today? Where did you walk well? Where did you stumble? Bring it all to Him.",
    challengeNudge:
      "Today's challenge isn't heroic, {name}. It's faithful. That's the whole point. Take the step.",
    prayerEncouragement:
      "Well done, {name}. That prayer was heard before you finished writing it.",
    streakEncouragement:
      "{name}, faithfulness over flash. Day by day is how a life is built. Keep going.",
    reflectionPrompt:
      "Don't rush past it, {name}. Sit with what the Spirit is stirring in you.",
    pilgrimageEncouragement:
      "{name}, the old man is dying. The new is being put on. The work is real — and so is the help.",
  },
  {
    id: "grace",
    name: "Grace",
    pronouns: "she/her",
    initial: "G",
    emoji: "🌿",
    accentClasses: "from-[#1a2a14] to-[#3a5a1c]",
    tagline: "A gentle sister, holding space with you.",
    description:
      "Grace speaks softly and slowly. She invites you to breathe, to receive, to remember you are loved before you are useful.",
    voice: "Tender. Patient. Reminds you that you are held.",
    morningGreeting:
      "Good morning, {name}. He is with you before your feet touch the floor. Receive His peace.",
    middayCheckIn:
      "{name}, pause for a moment. Breathe. He is closer than your next breath.",
    eveningExamen:
      "Dear {name}, lay the day down gently. What gifts did He give you? What burdens can you release now?",
    challengeNudge:
      "{name}, you don't have to be perfect — just present. The small step is enough today.",
    prayerEncouragement:
      "{name}, your prayer was held. He hears you, even the words you couldn't form.",
    streakEncouragement:
      "{name}, you keep showing up — and He keeps meeting you. There's a quiet glory in that.",
    reflectionPrompt:
      "{name}, what feeling rises as you read this? There's no wrong answer here.",
    pilgrimageEncouragement:
      "{name}, the journey is slow and the Shepherd is patient. You are not behind. Keep walking.",
  },
];

export function getCompanion(id: CompanionId): Companion {
  return companions.find((c) => c.id === id) ?? companions[0];
}

export function speak(
  template: string,
  userName: string,
  companion: Companion
): string {
  return template
    .replace(/\{name\}/g, userName)
    .replace(/\{companion\}/g, companion.name);
}
