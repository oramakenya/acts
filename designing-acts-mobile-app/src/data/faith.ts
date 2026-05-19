// Faith Journey — non-judgmental, descriptive starting points.
// Used by onboarding to set the user's posture so the app meets them where they are.

// ─────────────────────────────────────────────────────────
// FAITH LEVEL — where the heart is right now
// ─────────────────────────────────────────────────────────

export type FaithLevel =
  | "exploring"
  | "atheist"
  | "agnostic"
  | "spiritual"
  | "new"
  | "returning"
  | "growing"
  | "mature";

export type FaithLevelOption = {
  id: FaithLevel;
  emoji: string;
  label: string;
  short: string;       // one-line clarification shown beside the label
  description: string; // longer definition shown when selected
};

export const faithLevels: FaithLevelOption[] = [
  {
    id: "exploring",
    emoji: "🌱",
    label: "Just exploring",
    short: "Curious. Open. No labels yet.",
    description:
      "You're not sure what you believe, but you're curious enough to look. ACTS will meet you with honest answers, no pressure.",
  },
  {
    id: "atheist",
    emoji: "🌫️",
    label: "Atheist",
    short: "I don't believe God exists — but I'm here.",
    description:
      "Someone who does not believe in the existence of God or any divine being. You're welcome here. Many of the great Christian thinkers started exactly where you are.",
  },
  {
    id: "agnostic",
    emoji: "❓",
    label: "Agnostic",
    short: "Unsure if God exists or can be known.",
    description:
      "Someone who believes the existence of God is unknown or unknowable. ACTS won't pretend to have every answer — but we'll walk through the hard questions with you.",
  },
  {
    id: "spiritual",
    emoji: "✨",
    label: "Spiritual, not religious",
    short: "I believe in something beyond, but not in church.",
    description:
      "You sense something transcendent but feel cautious about organized religion. ACTS focuses on relationship over institution — start there.",
  },
  {
    id: "new",
    emoji: "🕊️",
    label: "New in the faith",
    short: "Recently became a Christian.",
    description:
      "You've recently said yes to following Jesus. This app will help you build the daily rhythms — scripture, prayer, community — that early faith needs.",
  },
  {
    id: "returning",
    emoji: "🔄",
    label: "Returning to faith",
    short: "Walking back after time away.",
    description:
      "You knew Him before, drifted, and feel a tug back. ACTS won't shame the gap — it'll help you rebuild gently, one practice at a time.",
  },
  {
    id: "growing",
    emoji: "🌿",
    label: "Growing disciple",
    short: "Established believer wanting to go deeper.",
    description:
      "You've walked with Christ for a while and want to keep growing in maturity, knowledge, and practice. ACTS gives you the rhythms and the depth.",
  },
  {
    id: "mature",
    emoji: "🦁",
    label: "Mature believer",
    short: "Long-time follower, often discipling others.",
    description:
      "You've walked the road for years and may be leading others. ACTS supports your study, deepens your prayer life, and connects you with the global body.",
  },
];

// ─────────────────────────────────────────────────────────
// BIBLE FAMILIARITY — how well you know the Word
// ─────────────────────────────────────────────────────────

export type BibleLevel =
  | "never"
  | "browsed"
  | "occasional"
  | "regular"
  | "daily"
  | "studied";

export type BibleLevelOption = {
  id: BibleLevel;
  emoji: string;
  label: string;
  short: string;
  description: string;
};

export const bibleLevels: BibleLevelOption[] = [
  {
    id: "never",
    emoji: "📕",
    label: "Never opened it",
    short: "I've never read the Bible.",
    description:
      "That's a great place to start. ACTS will introduce you to Scripture gently — one verse at a time, with context, never overwhelming.",
  },
  {
    id: "browsed",
    emoji: "📖",
    label: "Read some passages",
    short: "Familiar with famous verses or stories.",
    description:
      "You know a few stories or verses — maybe John 3:16, the Christmas story, or the Sermon on the Mount. ACTS will help you connect the dots into the larger story.",
  },
  {
    id: "occasional",
    emoji: "📘",
    label: "Read occasionally",
    short: "I read sometimes, not on a schedule.",
    description:
      "You pick it up now and then. ACTS will help you build a gentle daily rhythm without making it feel like homework.",
  },
  {
    id: "regular",
    emoji: "📗",
    label: "Read regularly",
    short: "Most days, working through books.",
    description:
      "You're already in the habit. ACTS will deepen what you do — adding context, study tools, and a community to discuss with.",
  },
  {
    id: "daily",
    emoji: "📙",
    label: "Daily reader",
    short: "Read every day, often in plans.",
    description:
      "Scripture is part of your daily life. ACTS gives you tools to study deeper, journal reflections, and walk through structured learning paths.",
  },
  {
    id: "studied",
    emoji: "📚",
    label: "Formally studied",
    short: "Bible college, seminary, or self-taught at depth.",
    description:
      "You've studied at depth — exegesis, hermeneutics, biblical languages. ACTS gives you a place to share what you know and lead others through the Study Hub.",
  },
];

// ─────────────────────────────────────────────────────────
// COMMUNITY STATUS — connection to other believers
// ─────────────────────────────────────────────────────────

export type CommunityStatus =
  | "none"
  | "looking"
  | "small-group"
  | "online"
  | "church"
  | "leading";

export type CommunityStatusOption = {
  id: CommunityStatus;
  emoji: string;
  label: string;
  short: string;
  description: string;
};

export const communityStatuses: CommunityStatusOption[] = [
  {
    id: "none",
    emoji: "🌍",
    label: "Walking alone",
    short: "Not currently in any Christian community.",
    description:
      "Faith was never meant to be walked alone. ACTS will connect you to the global body — and help you find a local church when you're ready.",
  },
  {
    id: "looking",
    emoji: "🔍",
    label: "Looking for community",
    short: "Actively searching for a church or group.",
    description:
      "You want to belong somewhere. ACTS will show you nearby churches on the globe and help you start a small group of your own.",
  },
  {
    id: "small-group",
    emoji: "🤝",
    label: "In a small group",
    short: "Meet with a handful of believers regularly.",
    description:
      "You have a few people you walk with. ACTS can become your small group's shared space — prayer wall, group challenges, and a private feed.",
  },
  {
    id: "online",
    emoji: "💻",
    label: "Online community only",
    short: "I connect with believers online, not in person.",
    description:
      "You're plugged in digitally. ACTS gives you both — the global online body and tools to start meeting people in person where you are.",
  },
  {
    id: "church",
    emoji: "⛪",
    label: "Part of a local church",
    short: "Regularly attending and connected.",
    description:
      "You have a home church. ACTS gives that church its own space here — pin your city to find it on the globe, or invite your pastor to join.",
  },
  {
    id: "leading",
    emoji: "🦁",
    label: "Leading / pastoring",
    short: "I shepherd a community of believers.",
    description:
      "You lead a community. ACTS gives you tools to shepherd them well — sermon notes, group challenges, members-only prayer, mission planning.",
  },
];
