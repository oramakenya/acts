// Centralized content for the ACTS by ALIVE prototype.
// In a production app, these would be served from a backend / CMS.

export const verseOfTheDay = {
  reference: "Romans 12:18",
  text: "If it is possible, as far as it depends on you, live at peace with everyone.",
  context:
    "Paul is writing to a divided church in Rome — Jewish and Gentile believers struggling to coexist. He places the burden of peace on us, not on the other.",
  reflection:
    "Is there one relationship today where peace 'depends on you' to take the next step?",
};

export const dailyChallenge = {
  title: "Send a message of peace",
  description:
    "Reach out to one person you've felt distance from. No agenda — just a kind word, a question about their day, or a simple 'I was thinking of you.'",
  category: "Reconciliation",
  estimatedMinutes: 5,
  tiedTo: "Romans 12:18",
};

export const weeklyTheme = {
  title: "Living at Peace",
  scripture: "Romans 12:9–21",
  days: [
    { day: "Mon", focus: "Bless those who persecute you" },
    { day: "Tue", focus: "Rejoice with those who rejoice" },
    { day: "Wed", focus: "Live in harmony with one another" },
    { day: "Thu", focus: "Do not repay evil for evil" },
    { day: "Fri", focus: "If possible, live at peace" },
    { day: "Sat", focus: "Do not take revenge" },
    { day: "Sun", focus: "Overcome evil with good" },
  ],
};

// ------------------------------------------------------------------
// PRACTICAL LIVING — based on the Isaac framework
// ------------------------------------------------------------------

export type PracticalCategory = {
  id: string;
  dimension: "Interpersonal" | "Intrapersonal";
  title: string;
  blurb: string;
  icon: string;
  imperatives: {
    command: string;
    reference: string;
    today: string; // "How to act on it today"
  }[];
};

export const practicalCategories: PracticalCategory[] = [
  {
    id: "enemies",
    dimension: "Interpersonal",
    title: "Treatment of Enemies",
    blurb: "How Christ reshapes our response to those who oppose us.",
    icon: "🕊️",
    imperatives: [
      {
        command: "Love your enemies and pray for those who persecute you.",
        reference: "Matthew 5:44",
        today:
          "Name one person who has hurt you. Pray a single sentence of blessing over them today — not for change, but for their good.",
      },
      {
        command: "Bless those who curse you; do not repay evil with evil.",
        reference: "Romans 12:14, 17",
        today:
          "If someone speaks against you this week, pause before responding. Choose silence or kindness over the clever reply.",
      },
      {
        command: "Overcome evil with good.",
        reference: "Romans 12:21",
        today:
          "Do one tangible kindness for someone who would not expect it from you.",
      },
    ],
  },
  {
    id: "speech",
    dimension: "Interpersonal",
    title: "Speech & the Tongue",
    blurb: "Words that build up the body rather than tear it down.",
    icon: "💬",
    imperatives: [
      {
        command:
          "Let no corrupting talk come out of your mouths, but only such as is good for building up.",
        reference: "Ephesians 4:29",
        today:
          "Before speaking today, ask: does this build up or tear down? Try it in one conversation.",
      },
      {
        command: "Be quick to listen, slow to speak, slow to anger.",
        reference: "James 1:19",
        today:
          "In your next disagreement, ask one clarifying question before stating your view.",
      },
      {
        command: "Let your speech always be gracious, seasoned with salt.",
        reference: "Colossians 4:6",
        today: "Replace one complaint today with a word of gratitude.",
      },
    ],
  },
  {
    id: "authorities",
    dimension: "Interpersonal",
    title: "Governing Authorities",
    blurb: "Submission, prayer, and witness in the public square.",
    icon: "⚖️",
    imperatives: [
      {
        command: "Be subject to the governing authorities.",
        reference: "Romans 13:1",
        today:
          "Pay what you owe — taxes, respect, honor — without grumbling. Honor a public servant in word today.",
      },
      {
        command: "Pray for kings and all who are in high positions.",
        reference: "1 Timothy 2:1–2",
        today:
          "Pray by name for one local official and one national leader — even one you disagree with.",
      },
    ],
  },
  {
    id: "family",
    dimension: "Interpersonal",
    title: "Family Dynamics",
    blurb: "The home as the first laboratory of discipleship.",
    icon: "🏡",
    imperatives: [
      {
        command:
          "Husbands, love your wives as Christ loved the church. Wives, respect your husbands.",
        reference: "Ephesians 5:25, 33",
        today:
          "Do one act of self-giving service for your spouse today — without being asked, without announcing it.",
      },
      {
        command: "Children, obey your parents in the Lord.",
        reference: "Ephesians 6:1",
        today:
          "Reach out to a parent today — a call, a thank-you, a question about their week.",
      },
      {
        command: "Fathers, do not provoke your children to anger.",
        reference: "Ephesians 6:4",
        today:
          "Apologize to your child for one specific thing. Modeling repentance teaches more than lecturing.",
      },
    ],
  },
  {
    id: "reconciliation",
    dimension: "Interpersonal",
    title: "Reconciliation",
    blurb: "Pursuing peace as an active, costly choice.",
    icon: "🤝",
    imperatives: [
      {
        command:
          "If your brother has something against you, leave your gift, go and be reconciled.",
        reference: "Matthew 5:23–24",
        today:
          "Worship is interrupted by unresolved conflict. Send the message you've been avoiding.",
      },
      {
        command: "If possible, as far as it depends on you, live at peace.",
        reference: "Romans 12:18",
        today:
          "Identify the part of the conflict that depends on you. Take that step — even if the other won't.",
      },
      {
        command: "Forgive as the Lord forgave you.",
        reference: "Colossians 3:13",
        today:
          "Write down one offense you've held onto. Pray to release it. Tear up the paper.",
      },
    ],
  },
  {
    id: "mind",
    dimension: "Intrapersonal",
    title: "Mental Discipline",
    blurb: "Renewing the mind as a daily, deliberate act.",
    icon: "🧠",
    imperatives: [
      {
        command:
          "Be transformed by the renewing of your mind.",
        reference: "Romans 12:2",
        today:
          "Identify one cultural assumption you've absorbed this week. Test it against Scripture.",
      },
      {
        command:
          "Whatever is true, noble, right, pure, lovely — think on these things.",
        reference: "Philippians 4:8",
        today:
          "Audit your inputs today (feeds, shows, conversations). Replace one unhelpful input with one good one.",
      },
      {
        command: "Take every thought captive to obey Christ.",
        reference: "2 Corinthians 10:5",
        today:
          "When an anxious or angry thought arrives, name it, then pray it back to Christ in one sentence.",
      },
    ],
  },
  {
    id: "anxiety",
    dimension: "Intrapersonal",
    title: "Anxiety Management",
    blurb: "Casting cares with specificity and trust.",
    icon: "🌿",
    imperatives: [
      {
        command:
          "Do not be anxious about anything; in everything, by prayer and petition with thanksgiving, present your requests to God.",
        reference: "Philippians 4:6",
        today:
          "Write your top 3 anxieties on paper. Pray each one specifically. Add one sentence of thanks beside each.",
      },
      {
        command: "Cast all your anxiety on him because he cares for you.",
        reference: "1 Peter 5:7",
        today:
          "Set a phone reminder at noon: 'What am I carrying that isn't mine to carry?'",
      },
    ],
  },
  {
    id: "purity",
    dimension: "Intrapersonal",
    title: "Sexual Purity",
    blurb: "Honoring God with body, eyes, and imagination.",
    icon: "🛡️",
    imperatives: [
      {
        command: "Flee from sexual immorality.",
        reference: "1 Corinthians 6:18",
        today:
          "Identify one specific situation, app, or hour of the day that's a known temptation. Build one barrier today.",
      },
      {
        command: "Make no provision for the flesh to gratify its desires.",
        reference: "Romans 13:14",
        today:
          "Tell one trusted brother or sister about a struggle. Secrecy fuels it; honesty starves it.",
      },
    ],
  },
  {
    id: "vigilance",
    dimension: "Intrapersonal",
    title: "Spiritual Vigilance",
    blurb: "Staying awake to the unseen war.",
    icon: "🔥",
    imperatives: [
      {
        command: "Be sober-minded; be watchful. Your adversary the devil prowls.",
        reference: "1 Peter 5:8",
        today:
          "Notice the pattern: where do you most often fall? Pray a defensive prayer over that hour today.",
      },
      {
        command: "Put on the full armor of God.",
        reference: "Ephesians 6:11",
        today:
          "Pray through the armor piece by piece this morning. Name what each piece protects.",
      },
      {
        command: "Pray without ceasing.",
        reference: "1 Thessalonians 5:17",
        today:
          "Set 3 'breath prayer' moments today: morning, midday, evening. One sentence each.",
      },
    ],
  },
];

// ------------------------------------------------------------------
// PRAYER WALL — anonymous community prayer requests
// ------------------------------------------------------------------

export type GeoPin = {
  city: string;
  country: string;
  lat: number; // -90 to 90
  lon: number; // -180 to 180
};

export type PrayerRequest = {
  id: string;
  anonymousName: string; // generated, never tied to identity
  postedAgo: string;
  category: "Healing" | "Family" | "Work" | "Faith" | "Grief" | "Guidance" | "Thanksgiving" | "Testimony";
  body: string;
  prayedCount: number;
  rejoiceCount?: number; // for testimonies/praise posts — others rejoicing with them
  hasPrayed?: boolean;
  hasRejoiced?: boolean;
  isTestimony?: boolean; // marks a praise/answered-prayer post
  encouragements: { id: string; text: string; ago: string }[];
  // Optional, coarse location — only the city/country is shared, never an exact pin.
  location?: GeoPin;
};

export const seedPrayers: PrayerRequest[] = [
  {
    id: "p1",
    anonymousName: "A brother in the body",
    postedAgo: "12 min ago",
    category: "Family",
    body: "My father and I haven't spoken in three years. I want to call him this weekend. Please pray I find the words — and the courage.",
    prayedCount: 47,
    encouragements: [
      { id: "e1", text: "Praying for soft hearts on both sides. The first call is the hardest.", ago: "5 min" },
      { id: "e2", text: "Romans 12:18 over you, friend. He sees this.", ago: "8 min" },
    ],
    location: { city: "Austin", country: "USA", lat: 30.27, lon: -97.74 },
  },
  {
    id: "p2",
    anonymousName: "A sister in Christ",
    postedAgo: "1 hr ago",
    category: "Healing",
    body: "Biopsy results come back Tuesday. Trying to rest in His sovereignty but the waiting is heavy.",
    prayedCount: 132,
    encouragements: [
      { id: "e3", text: "Holding you up before the Father this morning. He is near to the brokenhearted.", ago: "30 min" },
    ],
    location: { city: "Manchester", country: "UK", lat: 53.48, lon: -2.24 },
  },
  {
    id: "p3",
    anonymousName: "Anonymous",
    postedAgo: "3 hr ago",
    category: "Faith",
    body: "I've been going to church for years but lately my prayers feel like they hit the ceiling. I don't doubt God — I just feel far. Pray for nearness.",
    prayedCount: 89,
    encouragements: [
      { id: "e4", text: "Felt this exactly last year. Keep showing up. He meets us in the dry seasons too.", ago: "1 hr" },
      { id: "e5", text: "Psalm 42 is praying for you tonight.", ago: "2 hr" },
    ],
    location: { city: "Lagos", country: "Nigeria", lat: 6.52, lon: 3.38 },
  },
  {
    id: "p4",
    anonymousName: "A fellow saint",
    postedAgo: "5 hr ago",
    category: "Work",
    body: "Got laid off Friday. Mortgage, two kids, and trying to keep my eyes on the Provider instead of the problem.",
    prayedCount: 211,
    encouragements: [
      { id: "e6", text: "Matthew 6:26 — He has not forgotten you. Provision is on the way.", ago: "3 hr" },
    ],
    location: { city: "Toronto", country: "Canada", lat: 43.65, lon: -79.38 },
  },
  {
    id: "p5",
    anonymousName: "A grateful soul",
    postedAgo: "yesterday",
    category: "Testimony",
    isTestimony: true,
    body: "Update: the job came through. I posted here three weeks ago. Thank you, church. Your prayers were heard.",
    prayedCount: 304,
    rejoiceCount: 487,
    encouragements: [
      { id: "e7", text: "To God be the glory! 🙌", ago: "20 hr" },
      { id: "e8", text: "This is the body working as it should. Praise Him.", ago: "18 hr" },
    ],
    location: { city: "Manila", country: "Philippines", lat: 14.6, lon: 120.98 },
  },
  {
    id: "p12",
    anonymousName: "A grateful soul",
    postedAgo: "3 hr ago",
    category: "Testimony",
    isTestimony: true,
    body: "Two years sober today. Posted my first request here when I was 14 days in and didn't think I'd make it. The body has carried me. Glory to His name.",
    prayedCount: 0,
    rejoiceCount: 642,
    encouragements: [
      { id: "e11", text: "Hallelujah! Romans 8:37 over your story.", ago: "1 hr" },
      { id: "e12", text: "Crying with joy reading this. He is faithful.", ago: "2 hr" },
    ],
    location: { city: "Berlin", country: "Germany", lat: 52.52, lon: 13.4 },
  },
  {
    id: "p13",
    anonymousName: "A sister in Christ",
    postedAgo: "5 hr ago",
    category: "Testimony",
    isTestimony: true,
    body: "Reconciled with my sister last night after 7 years of silence. I prayed Romans 12:18 for 90 days straight. He moved her heart, then mine.",
    prayedCount: 0,
    rejoiceCount: 318,
    encouragements: [
      { id: "e13", text: "What He restores, no one can take. So glad for you.", ago: "3 hr" },
    ],
    location: { city: "London", country: "UK", lat: 51.51, lon: -0.13 },
  },
  {
    id: "p14",
    anonymousName: "A brother in the body",
    postedAgo: "yesterday",
    category: "Testimony",
    isTestimony: true,
    body: "Biopsy came back benign. Posted last week asking for prayer — wanted to come back and praise Him with you. Tears of relief tonight.",
    prayedCount: 0,
    rejoiceCount: 521,
    encouragements: [],
    location: { city: "Mexico City", country: "Mexico", lat: 19.43, lon: -99.13 },
  },
  {
    id: "p6",
    anonymousName: "A weary pilgrim",
    postedAgo: "2 hr ago",
    category: "Guidance",
    body: "Considering a major move for my family. Praying for clear leading and unity with my spouse.",
    prayedCount: 64,
    encouragements: [],
    location: { city: "Sydney", country: "Australia", lat: -33.87, lon: 151.21 },
  },
  {
    id: "p7",
    anonymousName: "A child of God",
    postedAgo: "30 min ago",
    category: "Grief",
    body: "Lost my grandmother last week. She taught me to pray. Asking the body to carry this with me.",
    prayedCount: 178,
    encouragements: [
      { id: "e9", text: "May her faith echo in you. Praying you feel His comfort tonight.", ago: "10 min" },
    ],
    location: { city: "Nairobi", country: "Kenya", lat: -1.29, lon: 36.82 },
  },
  {
    id: "p8",
    anonymousName: "A brother in the body",
    postedAgo: "4 hr ago",
    category: "Faith",
    body: "Underground church here. Pray for boldness and protection for our small group meeting tonight.",
    prayedCount: 522,
    encouragements: [
      { id: "e10", text: "Hebrews 13:3 — we remember you as though in chains with you. Praying.", ago: "2 hr" },
    ],
    location: { city: "Tehran", country: "Iran", lat: 35.69, lon: 51.39 },
  },
  {
    id: "p9",
    anonymousName: "A sister in Christ",
    postedAgo: "6 hr ago",
    category: "Healing",
    body: "My son is in the hospital. Doctors are unsure of the diagnosis. Please pray.",
    prayedCount: 401,
    encouragements: [],
    location: { city: "São Paulo", country: "Brazil", lat: -23.55, lon: -46.63 },
  },
  {
    id: "p10",
    anonymousName: "Anonymous",
    postedAgo: "8 hr ago",
    category: "Family",
    body: "Praying for my marriage. We are barely speaking. I don't know how to bridge this gap.",
    prayedCount: 156,
    encouragements: [],
    location: { city: "Seoul", country: "South Korea", lat: 37.57, lon: 126.98 },
  },
  {
    id: "p11",
    anonymousName: "A fellow saint",
    postedAgo: "yesterday",
    category: "Work",
    body: "Starting a small business to support a local mission. Pray for wisdom and provision.",
    prayedCount: 88,
    encouragements: [],
    location: { city: "Mumbai", country: "India", lat: 19.08, lon: 72.88 },
  },
];

// ------------------------------------------------------------------
// USER PROFILE — including optional pinned location
// ------------------------------------------------------------------

export const initialUser = {
  name: "Sarah",
  homeChurchId: "c1",
  location: { city: "Austin", country: "USA", lat: 30.27, lon: -97.74 } as GeoPin | null,
  shareLocationOnPrayers: true,
  showOnGlobe: true,
};

// ------------------------------------------------------------------
// COMMUNITIES (CHURCHES) — collective prayer & posts
// ------------------------------------------------------------------

export type ChurchPost = {
  id: string;
  authorRole: "Pastor" | "Elder" | "Member" | "Worship Lead";
  authorInitial: string;
  authorName: string;
  postedAgo: string;
  kind: "Reflection" | "Announcement" | "Sermon Note" | "Question";
  title?: string;
  body: string;
  scripture?: string;
  amens: number;
  comments: { id: string; author: string; initial: string; text: string; ago: string }[];
  hasAmened?: boolean;
};

export type Invite = {
  id: string;
  name: string;
  method: "Link" | "Email" | "SMS";
  status: "Pending" | "Joined" | "Declined";
  sentAgo: string;
};

export type ChurchEvent = {
  id: string;
  title: string;
  kind: "Service" | "Prayer Night" | "Bible Study" | "Retreat" | "Conference" | "Social" | "Outreach";
  hostName: string;
  hostInitial: string;
  city: string;
  venue: string;
  dateLabel: string; // "Sun, Mar 10 · 10:00am"
  description: string;
  attending: number;
  capacity?: number;
  isAttending?: boolean;
  postedAgo: string;
};

export type Mission = {
  id: string;
  title: string;
  kind: "Short-term trip" | "Local outreach" | "Ongoing project" | "Translation" | "Disaster relief";
  location: string;          // "Nairobi, Kenya" or "Local — Austin"
  dates: string;             // "Jun 14–24, 2026" or "Ongoing"
  description: string;
  needed: string[];          // ["3 medics", "5 builders", "translators"]
  raised?: number;           // funds raised
  goal?: number;             // funding goal
  hostName: string;
  hostInitial: string;
  interestedCount: number;
  isInterested?: boolean;
  postedAgo: string;
};

export type SupportNeed = {
  id: string;
  title: string;
  kind: "Financial" | "Practical help" | "In-kind" | "Meals" | "Housing" | "Childcare";
  beneficiary: string;       // "The Okoye family" or "Anonymous member"
  city: string;
  story: string;
  raised?: number;           // dollars raised
  goal?: number;             // funding goal
  helpersCount: number;      // number who've offered help
  isHelping?: boolean;
  urgency: "Now" | "This week" | "Ongoing";
  postedAgo: string;
};

export type Church = {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  members: number;
  pastor: string;
  tagline: string;
  weeklyVerse: string;
  themeColor: string; // tailwind gradient classes
  emoji: string;
  joined: boolean;
  isFounder?: boolean; // created by current user
  inviteCode: string; // shareable join code
  invites: Invite[];
  privatePrayers: PrayerRequest[]; // members-only prayer wall
  posts: ChurchPost[];
  events: ChurchEvent[];
  missions: Mission[];
  supportNeeds: SupportNeed[];
  groupChallenge: { title: string; participating: number; total: number };
};

export const churches: Church[] = [
  {
    id: "c1",
    name: "Cornerstone Fellowship",
    city: "Austin",
    country: "USA",
    lat: 30.27,
    lon: -97.74,
    members: 312,
    pastor: "Pastor Daniel Reyes",
    tagline: "Christ at the center. Family on mission.",
    weeklyVerse: "Romans 12:9–21",
    themeColor: "from-indigo-700 to-indigo-950",
    emoji: "⛪",
    joined: true,
    inviteCode: "CORNER-7H2",
    invites: [
      { id: "iv1", name: "James M.", method: "Email", status: "Joined", sentAgo: "3 days ago" },
      { id: "iv2", name: "Priya K.", method: "Link", status: "Pending", sentAgo: "1 day ago" },
      { id: "iv3", name: "Marcus T.", method: "SMS", status: "Joined", sentAgo: "1 week ago" },
    ],
    privatePrayers: [
      {
        id: "pp1",
        anonymousName: "A member",
        postedAgo: "1 hr ago",
        category: "Healing",
        body: "Nathan's mother — surgery went well, recovery is slow. Praying for strength for her and for Nathan.",
        prayedCount: 23,
        encouragements: [
          { id: "ppe1", text: "Standing with you family. 'He heals the brokenhearted.'", ago: "30 min" },
        ],
      },
      {
        id: "pp2",
        anonymousName: "An elder",
        postedAgo: "4 hr ago",
        category: "Guidance",
        body: "Big decision before our leadership team this Thursday. Praying for unity and clarity.",
        prayedCount: 41,
        encouragements: [],
      },
      {
        id: "pp3",
        anonymousName: "A member",
        postedAgo: "yesterday",
        category: "Family",
        body: "Pray for the youth retreat this weekend — 28 students going. May they meet the Lord.",
        prayedCount: 67,
        encouragements: [
          { id: "ppe2", text: "Praying for protection and breakthrough!", ago: "20 hr" },
        ],
      },
    ],
    events: [
      {
        id: "ev1",
        title: "Sunday Worship",
        kind: "Service",
        hostName: "Pastor Daniel",
        hostInitial: "D",
        city: "Austin, USA",
        venue: "Cornerstone Sanctuary",
        dateLabel: "Sun, Mar 10 · 10:00am",
        description:
          "Continuing our walk through Romans 12. Coffee at 9:30. Kids' program runs concurrent.",
        attending: 142,
        capacity: 300,
        postedAgo: "2 days ago",
      },
      {
        id: "ev2",
        title: "Wednesday Prayer Night",
        kind: "Prayer Night",
        hostName: "Marcus T.",
        hostInitial: "M",
        city: "Austin, USA",
        venue: "Cornerstone Chapel",
        dateLabel: "Wed, Mar 13 · 7:00pm",
        description:
          "Hour of corporate prayer for the city. Lights dim, music low. Newcomers welcome.",
        attending: 38,
        postedAgo: "4 days ago",
      },
      {
        id: "ev3",
        title: "Men's Breakfast — 'Anger & the Father heart'",
        kind: "Bible Study",
        hostName: "Robert J.",
        hostInitial: "R",
        city: "Austin, USA",
        venue: "Tía Lola's Diner",
        dateLabel: "Sat, Mar 16 · 7:30am",
        description:
          "Practical living series for the men. Bring a friend. Robert is hosting.",
        attending: 22,
        capacity: 40,
        postedAgo: "5 hr ago",
      },
    ],
    missions: [
      {
        id: "ms1",
        title: "Medical clinic week — Kibera",
        kind: "Short-term trip",
        location: "Nairobi, Kenya",
        dates: "Jun 14–24, 2026",
        description:
          "Partnering with Living Word Lagos to run a mobile clinic in the Kibera slum. Cornerstone is sending a team.",
        needed: ["3 medics", "2 nurses", "1 translator", "5 hands-on volunteers"],
        raised: 8200,
        goal: 24000,
        hostName: "Pastor Daniel",
        hostInitial: "D",
        interestedCount: 31,
        postedAgo: "1 week ago",
      },
      {
        id: "ms2",
        title: "Saturday street meals — Downtown Austin",
        kind: "Local outreach",
        location: "Austin, USA",
        dates: "Every Saturday · 6:00pm",
        description:
          "We pack and serve 80 hot meals to the unhoused community downtown. Show up at the church kitchen at 4pm.",
        needed: ["Cooks", "Drivers", "Servers", "Prayer partners"],
        hostName: "Anna L.",
        hostInitial: "A",
        interestedCount: 47,
        postedAgo: "ongoing",
      },
    ],
    supportNeeds: [
      {
        id: "sn1",
        title: "The Okoye family — sudden medical bills",
        kind: "Financial",
        beneficiary: "The Okoye family",
        city: "Austin, USA",
        story:
          "Daniel Okoye (age 7) is in the children's hospital. The family has insurance but the deductible is steep. Praying for Daniel and surrounding the family with the body's hands.",
        raised: 4800,
        goal: 9000,
        helpersCount: 38,
        urgency: "Now",
        postedAgo: "3 days ago",
      },
      {
        id: "sn2",
        title: "Meal train for the Reyes family — new baby!",
        kind: "Meals",
        beneficiary: "The Reyes family",
        city: "Austin, USA",
        story:
          "Pastor Daniel & Maria welcomed baby Eli last week. Signup for a meal slot below. 3 meals/week for 6 weeks.",
        helpersCount: 22,
        urgency: "This week",
        postedAgo: "1 day ago",
      },
      {
        id: "sn3",
        title: "Help moving — single mom of two",
        kind: "Practical help",
        beneficiary: "An anonymous member",
        city: "Austin, USA",
        story:
          "Need 4–6 strong backs Saturday morning, 9am–12pm. Trucks helpful. She'll feed you tacos after.",
        helpersCount: 7,
        urgency: "This week",
        postedAgo: "12 hr ago",
      },
    ],
    groupChallenge: { title: "30 reconciliation calls this month", participating: 84, total: 312 },
    posts: [
      {
        id: "cp1",
        authorRole: "Pastor",
        authorInitial: "D",
        authorName: "Pastor Daniel",
        postedAgo: "2 hr ago",
        kind: "Sermon Note",
        title: "Sunday recap — Living at peace, Romans 12",
        body:
          "Three takeaways from Sunday: (1) peace is something we pursue, not stumble into; (2) 'as far as it depends on you' is a high bar — and a freeing one; (3) blessing our enemies is the family resemblance of the King. Spend the week with v.18 in particular.",
        scripture: "Romans 12:18",
        amens: 47,
        comments: [
          { id: "cc1", author: "Marcus", initial: "M", text: "The bit on 'as far as it depends on you' undid me. Calling my brother today.", ago: "1 hr" },
          { id: "cc2", author: "Anna", initial: "A", text: "Sharing this with my Tuesday women's group 🙏", ago: "30 min" },
        ],
      },
      {
        id: "cp2",
        authorRole: "Worship Lead",
        authorInitial: "J",
        authorName: "Jenny",
        postedAgo: "yesterday",
        kind: "Announcement",
        title: "Worship night — Friday 7pm",
        body:
          "Bring friends. Bring kids. We'll be sitting in Psalms 42–43 and praying over our city. No setlist — just the room and the Spirit.",
        amens: 22,
        comments: [],
      },
      {
        id: "cp3",
        authorRole: "Member",
        authorInitial: "T",
        authorName: "Thomas",
        postedAgo: "2 days ago",
        kind: "Reflection",
        body:
          "Did the daily challenge yesterday — sent a peace message to a coworker I'd been avoiding. He replied within minutes asking to grab coffee. Five minutes of obedience opened a door I'd been keeping shut for a year.",
        amens: 91,
        comments: [
          { id: "cc3", author: "Pastor Daniel", initial: "D", text: "This is the gospel walked out, Thomas. Praising God with you.", ago: "1 day" },
        ],
      },
    ],
  },
  {
    id: "c2",
    name: "Grace Community",
    city: "Manchester",
    country: "UK",
    lat: 53.48,
    lon: -2.24,
    members: 184,
    pastor: "Pastor Imogen Clarke",
    tagline: "Rooted in the Word. Sent to the city.",
    weeklyVerse: "Philippians 4:4–9",
    themeColor: "from-emerald-700 to-emerald-900",
    emoji: "🌿",
    joined: true,
    inviteCode: "GRACE-M4N",
    invites: [
      { id: "iv4", name: "Esther O.", method: "Email", status: "Joined", sentAgo: "2 weeks ago" },
    ],
    privatePrayers: [
      {
        id: "pp4",
        anonymousName: "A member",
        postedAgo: "2 hr ago",
        category: "Work",
        body: "Job interview Friday at 10am. Praying for peace and clear words.",
        prayedCount: 18,
        encouragements: [],
      },
      {
        id: "pp5",
        anonymousName: "An anonymous saint",
        postedAgo: "5 hr ago",
        category: "Faith",
        body: "Wrestling with doubt this season. Don't want to fake it on Sunday. Praying for honest faith.",
        prayedCount: 34,
        encouragements: [
          { id: "ppe3", text: "Honest doubt is closer to faith than performed certainty. Walking with you.", ago: "3 hr" },
        ],
      },
    ],
    events: [
      {
        id: "ev4",
        title: "Sunday Worship",
        kind: "Service",
        hostName: "Pastor Imogen",
        hostInitial: "I",
        city: "Manchester, UK",
        venue: "Grace Community Hall",
        dateLabel: "Sun, Mar 10 · 10:30am",
        description: "Continuing Philippians. Tea afterward in the courtyard.",
        attending: 91,
        capacity: 200,
        postedAgo: "3 days ago",
      },
      {
        id: "ev5",
        title: "Women's tea — 'Anxiety & Phil 4'",
        kind: "Bible Study",
        hostName: "Esther O.",
        hostInitial: "E",
        city: "Manchester, UK",
        venue: "Esther's home",
        dateLabel: "Thu, Mar 14 · 7:30pm",
        description: "Quiet evening of tea, scripture, and honest conversation. 12 spots.",
        attending: 9,
        capacity: 12,
        postedAgo: "yesterday",
      },
    ],
    missions: [
      {
        id: "ms3",
        title: "Refugee welcome — weekly hospitality",
        kind: "Ongoing project",
        location: "Manchester, UK",
        dates: "Ongoing · Tuesdays 5pm",
        description:
          "We host a meal for newly-arrived families each week. Conversation partners and meal cooks needed.",
        needed: ["Cooks", "Conversation partners", "Children's hosts"],
        hostName: "Robert J.",
        hostInitial: "R",
        interestedCount: 18,
        postedAgo: "2 weeks ago",
      },
    ],
    supportNeeds: [
      {
        id: "sn4",
        title: "Heating bill help — elderly member",
        kind: "Financial",
        beneficiary: "An anonymous member",
        city: "Manchester, UK",
        story:
          "Winter heating costs have spiked. A small fund to help one of our older members get through the season warm.",
        raised: 320,
        goal: 800,
        helpersCount: 11,
        urgency: "Now",
        postedAgo: "5 days ago",
      },
    ],
    groupChallenge: { title: "Read Philippians together this week", participating: 121, total: 184 },
    posts: [
      {
        id: "cp4",
        authorRole: "Pastor",
        authorInitial: "I",
        authorName: "Pastor Imogen",
        postedAgo: "5 hr ago",
        kind: "Question",
        title: "What's one anxiety you're handing to Christ this week?",
        body:
          "Don't share details if it's tender — even a one-word category helps the body pray with specificity. Reply below; I'll lift them in our 6am prayer call.",
        scripture: "Philippians 4:6–7",
        amens: 33,
        comments: [
          { id: "cc4", author: "Esther", initial: "E", text: "Finances.", ago: "4 hr" },
          { id: "cc5", author: "Olu", initial: "O", text: "My daughter's school transition.", ago: "3 hr" },
          { id: "cc6", author: "Anonymous member", initial: "·", text: "A medical decision.", ago: "2 hr" },
        ],
      },
      {
        id: "cp5",
        authorRole: "Elder",
        authorInitial: "R",
        authorName: "Robert",
        postedAgo: "yesterday",
        kind: "Reflection",
        body:
          "Sat with Phil 4:8 this morning. Realized how much of my mental real estate is rented out to outrage. Trying a 24-hour fast from the news cycle and replacing it with the Psalms.",
        amens: 56,
        comments: [],
      },
    ],
  },
  {
    id: "c3",
    name: "Living Word Lagos",
    city: "Lagos",
    country: "Nigeria",
    lat: 6.52,
    lon: 3.38,
    members: 540,
    pastor: "Pastor Tunde Adebayo",
    tagline: "A people of the Word and the Spirit.",
    weeklyVerse: "Acts 2:42–47",
    themeColor: "from-amber-600 to-orange-700",
    emoji: "🔥",
    joined: false,
    inviteCode: "LWL-93A",
    invites: [],
    privatePrayers: [],
    events: [
      {
        id: "ev6",
        title: "Sunday Worship — three services",
        kind: "Service",
        hostName: "Pastor Tunde",
        hostInitial: "T",
        city: "Lagos, Nigeria",
        venue: "Living Word Auditorium",
        dateLabel: "Sun, Mar 10 · 7am · 9am · 11am",
        description: "Three identical services. Invite a friend Sunday is on — bring one.",
        attending: 412,
        postedAgo: "1 week ago",
      },
      {
        id: "ev7",
        title: "All-night prayer",
        kind: "Prayer Night",
        hostName: "Pastor Tunde",
        hostInitial: "T",
        city: "Lagos, Nigeria",
        venue: "Main hall",
        dateLabel: "Fri, Mar 22 · 10pm–4am",
        description: "Monthly all-night prayer for the city and the nation.",
        attending: 168,
        postedAgo: "3 days ago",
      },
    ],
    missions: [
      {
        id: "ms4",
        title: "Medical clinic week — Kibera (joint with Cornerstone)",
        kind: "Short-term trip",
        location: "Nairobi, Kenya",
        dates: "Jun 14–24, 2026",
        description:
          "Hosting a joint clinic week with churches around the world. Local team is leading on the ground.",
        needed: ["Logistics lead", "Lagos team — 8 people"],
        raised: 3100,
        goal: 8000,
        hostName: "Pastor Tunde",
        hostInitial: "T",
        interestedCount: 24,
        postedAgo: "1 week ago",
      },
    ],
    supportNeeds: [
      {
        id: "sn5",
        title: "Scholarship — one student to Bible college",
        kind: "Financial",
        beneficiary: "Emeka, age 19",
        city: "Lagos, Nigeria",
        story:
          "Emeka has been faithfully serving in our youth ministry for 4 years. Sponsoring his first year of Bible school.",
        raised: 1200,
        goal: 3500,
        helpersCount: 28,
        urgency: "Ongoing",
        postedAgo: "2 weeks ago",
      },
    ],
    groupChallenge: { title: "Each one bring one — invite a friend Sunday", participating: 203, total: 540 },
    posts: [
      {
        id: "cp6",
        authorRole: "Pastor",
        authorInitial: "T",
        authorName: "Pastor Tunde",
        postedAgo: "3 hr ago",
        kind: "Sermon Note",
        title: "Acts 2 — devoted to four things",
        body:
          "The early church was devoted to teaching, fellowship, breaking of bread, and prayer. Ask yourself this week: which of the four am I weakest in? Lean there.",
        scripture: "Acts 2:42",
        amens: 128,
        comments: [],
      },
    ],
  },
  {
    id: "c4",
    name: "Hillside Chapel",
    city: "Sydney",
    country: "Australia",
    lat: -33.87,
    lon: 151.21,
    members: 96,
    pastor: "Pastor Sam Whittaker",
    tagline: "Small church. Big God. Long obedience.",
    weeklyVerse: "Colossians 3:12–17",
    themeColor: "from-rose-600 to-rose-800",
    emoji: "⛰️",
    joined: false,
    inviteCode: "HILL-2K8",
    invites: [],
    privatePrayers: [],
    events: [
      {
        id: "ev8",
        title: "Sunday Worship",
        kind: "Service",
        hostName: "Pastor Sam",
        hostInitial: "S",
        city: "Sydney, Australia",
        venue: "Hillside Chapel",
        dateLabel: "Sun, Mar 10 · 9:30am",
        description: "Continuing our Colossians series. Brunch after for newcomers.",
        attending: 47,
        capacity: 120,
        postedAgo: "4 days ago",
      },
    ],
    missions: [],
    supportNeeds: [],
    groupChallenge: { title: "Memorize Col 3:12–14 by Sunday", participating: 41, total: 96 },
    posts: [
      {
        id: "cp7",
        authorRole: "Member",
        authorInitial: "K",
        authorName: "Katherine",
        postedAgo: "yesterday",
        kind: "Reflection",
        body:
          "'Bear with each other and forgive one another.' Reading Colossians 3 in the carpark before walking back into a hard conversation. Pray for me, family.",
        scripture: "Colossians 3:13",
        amens: 39,
        comments: [],
      },
    ],
  },
];

// Emojis that can represent a new community/church.
export const churchEmojis = ["⛪", "🌿", "🔥", "⛰️", "🕊️", "🌅", "🌾", "🛡️", "✝️", "📖", "🌟", "🕯️"];

// Theme gradient classes to pair with a new church.
export const churchThemes = [
  { id: "gold", label: "Royal gold", classes: "from-[#3a2308] to-[#5a3a10]" },
  { id: "ember", label: "Ember", classes: "from-[#3a1a0a] to-[#5c2c14]" },
  { id: "olive", label: "Olive", classes: "from-[#1f2a14] to-[#3a4a1a]" },
  { id: "wine", label: "Wine", classes: "from-[#2a0a0a] to-[#5a1a1a]" },
  { id: "midnight", label: "Midnight", classes: "from-[#0f0f1a] to-[#1a1a2e]" },
];

// Generate a short shareable invite code.
export function makeInviteCode(name: string) {
  const prefix = (name || "ACTS").replace(/[^A-Za-z]/g, "").slice(0, 6).toUpperCase() || "ACTS";
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 3; i++) suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `${prefix}-${suffix}`;
}

// Lightweight directory of cities for the location picker.
export const knownCities: GeoPin[] = [
  { city: "Austin", country: "USA", lat: 30.27, lon: -97.74 },
  { city: "New York", country: "USA", lat: 40.71, lon: -74.0 },
  { city: "Los Angeles", country: "USA", lat: 34.05, lon: -118.24 },
  { city: "Toronto", country: "Canada", lat: 43.65, lon: -79.38 },
  { city: "Mexico City", country: "Mexico", lat: 19.43, lon: -99.13 },
  { city: "São Paulo", country: "Brazil", lat: -23.55, lon: -46.63 },
  { city: "London", country: "UK", lat: 51.51, lon: -0.13 },
  { city: "Manchester", country: "UK", lat: 53.48, lon: -2.24 },
  { city: "Berlin", country: "Germany", lat: 52.52, lon: 13.4 },
  { city: "Lagos", country: "Nigeria", lat: 6.52, lon: 3.38 },
  { city: "Nairobi", country: "Kenya", lat: -1.29, lon: 36.82 },
  { city: "Cape Town", country: "South Africa", lat: -33.92, lon: 18.42 },
  { city: "Mumbai", country: "India", lat: 19.08, lon: 72.88 },
  { city: "Manila", country: "Philippines", lat: 14.6, lon: 120.98 },
  { city: "Seoul", country: "South Korea", lat: 37.57, lon: 126.98 },
  { city: "Sydney", country: "Australia", lat: -33.87, lon: 151.21 },
  { city: "Tehran", country: "Iran", lat: 35.69, lon: 51.39 },
];

// ------------------------------------------------------------------
// STUDY HUB — Apologetics, Hermeneutics, Exegesis, Isagogics
// ------------------------------------------------------------------

export type StudyTopic = {
  id: string;
  discipline: "Apologetics" | "Hermeneutics" | "Exegesis" | "Isagogics";
  question: string;
  shortAnswer: string;
  deeper: string;
  scriptures: string[];
  readMinutes: number;
};

export const studyTopics: StudyTopic[] = [
  {
    id: "s1",
    discipline: "Apologetics",
    question: "How do we know the Bible is reliable?",
    shortAnswer:
      "We have more, earlier, and better-preserved manuscripts of the New Testament than any other ancient document — and the gospels were written within living memory of eyewitnesses.",
    deeper:
      "There are over 5,800 Greek NT manuscripts, with fragments dating to within decades of the originals. By comparison, we trust Caesar's Gallic Wars on 10 manuscripts copied 1,000 years after the original. The early church also rejected forgeries and confirmed the canon by apostolic origin, internal consistency, and widespread use.",
    scriptures: ["2 Timothy 3:16", "2 Peter 1:20–21", "Luke 1:1–4"],
    readMinutes: 4,
  },
  {
    id: "s2",
    discipline: "Apologetics",
    question: "If God is good, why is there suffering?",
    shortAnswer:
      "Suffering entered through human rebellion, not divine indifference. God's response was not explanation — it was incarnation. He entered the suffering to redeem it.",
    deeper:
      "The cross is the Christian's answer to suffering: God does not stand outside our pain. He bears it. The resurrection is the promise that suffering does not have the last word. We groan now (Rom 8) but in hope.",
    scriptures: ["Genesis 3", "Romans 8:18–25", "Revelation 21:4"],
    readMinutes: 5,
  },
  {
    id: "s3",
    discipline: "Hermeneutics",
    question: "What is the difference between interpretation and application?",
    shortAnswer:
      "Interpretation asks 'what did this mean to its first hearers?' Application asks 'what does it mean for me now?' You cannot do the second well without doing the first first.",
    deeper:
      "A passage has one meaning (intended by the author, carried in context) but many applications. Skipping interpretation produces moralism or mysticism. Honor the text by reading it in its historical, literary, and theological setting before bringing it home.",
    scriptures: ["2 Timothy 2:15", "Nehemiah 8:8"],
    readMinutes: 3,
  },
  {
    id: "s4",
    discipline: "Hermeneutics",
    question: "How do I read different genres of Scripture?",
    shortAnswer:
      "Narrative tells, doesn't always prescribe. Poetry feels, doesn't always argue. Epistles instruct directly. Apocalyptic uses symbol. Read each genre by its own rules.",
    deeper:
      "Treating a Psalm like a doctrine treatise, or a parable like a chemistry formula, distorts the text. Ask what kind of literature you're reading before you ask what it means. The Bible is one book in many voices.",
    scriptures: ["Psalm 1", "Matthew 13:10–17"],
    readMinutes: 4,
  },
  {
    id: "s5",
    discipline: "Exegesis",
    question: "What does it mean to 'exegete' a passage?",
    shortAnswer:
      "Exegesis means drawing meaning out of the text (ex = out of) rather than reading meaning into it (eisegesis). It's careful, humble listening before speaking.",
    deeper:
      "Good exegesis examines: original language, immediate context, book context, canonical context, historical setting, and theological themes. It treats Scripture as God's Word given through human authors in real moments.",
    scriptures: ["Acts 17:11", "Nehemiah 8:8"],
    readMinutes: 4,
  },
  {
    id: "s6",
    discipline: "Isagogics",
    question: "Why does the historical background of a book matter?",
    shortAnswer:
      "Isagogics studies who wrote a book, to whom, when, why, and in what setting. Without this, a passage floats — and we project our world onto theirs.",
    deeper:
      "Knowing Philippians was written from prison to a church Paul loved deeply changes how 'rejoice always' lands. Knowing Revelation was written to persecuted believers under Domitian changes how we read its symbols. Background is not optional — it's foundational.",
    scriptures: ["Philippians 1:12–14", "Revelation 1:9"],
    readMinutes: 4,
  },
  {
    id: "s7",
    discipline: "Apologetics",
    question: "Did Jesus really rise from the dead?",
    shortAnswer:
      "The empty tomb, the transformed disciples, the explosive growth of a Messianic movement after a public execution, and the testimony of hostile witnesses all point to a real, bodily resurrection.",
    deeper:
      "Even skeptical historians grant the 'minimal facts': Jesus' death by crucifixion, the disciples' sincere belief that they saw Him alive, the conversion of skeptics like Paul and James, and the empty tomb. The resurrection is the best explanation of these facts together.",
    scriptures: ["1 Corinthians 15:3–8", "Acts 2:32"],
    readMinutes: 6,
  },
];

// ------------------------------------------------------------------
// COMMUNITY Q&A — ask a question, get scholarly answers + testimonies
// ------------------------------------------------------------------

export type ScholarlyAnswer = {
  id: string;
  source: string;        // e.g. "Tim Keller", "N.T. Wright", "Augustine"
  credential: string;    // e.g. "Pastor, Redeemer NYC"
  tradition: string;     // e.g. "Reformed", "Anglican", "Catholic", "Patristic"
  answer: string;
  scripture?: string;
  avatar: string;        // emoji avatar
};

export type Testimony = {
  id: string;
  anonymousName: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  story: string;
  postedAgo: string;
  rejoiceCount: number;
  hasRejoiced?: boolean;
};

export type CommunityQuestion = {
  id: string;
  question: string;
  context?: string;       // user's added context
  askedBy: string;        // anonymous name
  askedAgo: string;
  city?: string;
  category: "Apologetics" | "Hermeneutics" | "Exegesis" | "Isagogics" | "Practical" | "Doctrine";
  followCount: number;
  hasFollowed?: boolean;
  scholarlyAnswers: ScholarlyAnswer[];
  testimonies: Testimony[];
};

export const communityQuestions: CommunityQuestion[] = [
  {
    id: "q1",
    question: "How do I keep faith when I don't feel God's presence?",
    context: "I've been a believer for 10 years but the past 6 months have felt like silence. I don't doubt — I just feel far.",
    askedBy: "A weary pilgrim",
    askedAgo: "3 hr ago",
    city: "Manchester, UK",
    category: "Practical",
    followCount: 87,
    scholarlyAnswers: [
      {
        id: "sa1",
        source: "John of the Cross",
        credential: "16th c. mystic, Carmelite reformer",
        tradition: "Catholic mystic",
        avatar: "✝️",
        answer:
          "What you call silence may be what the saints have called the 'dark night.' God withdraws felt presence not to abandon, but to purify love from dependence on feeling. Stay. The night is the work. The morning will come.",
        scripture: "Psalm 42:7",
      },
      {
        id: "sa2",
        source: "C.S. Lewis",
        credential: "Author, A Grief Observed",
        tradition: "Anglican",
        avatar: "📖",
        answer:
          "Our Father refreshes us on the journey, but does not encourage us to mistake the inn for our home. Dry seasons are often the most fruitful ground for the deepest faith — when belief is no longer propped up by emotion.",
        scripture: "Hebrews 11:1",
      },
      {
        id: "sa3",
        source: "Tim Keller",
        credential: "Pastor, Redeemer Presbyterian NYC",
        tradition: "Reformed",
        avatar: "🛐",
        answer:
          "Three practical steps: (1) Keep showing up to the means of grace — Word, prayer, sacrament — even when dry. (2) Confess any unconfessed sin, but don't manufacture guilt. (3) Tell a brother or sister. Hiddenness multiplies the silence.",
        scripture: "James 5:16",
      },
      {
        id: "sa4",
        source: "Augustine of Hippo",
        credential: "4th c. Bishop, Confessions",
        tradition: "Patristic",
        avatar: "🏛️",
        answer:
          "Our hearts are restless until they rest in Thee. The longing you feel is itself a sign of the relationship — only one who has tasted His sweetness can ache at its absence. Press in through prayer, not through striving.",
      },
    ],
    testimonies: [
      {
        id: "t1",
        anonymousName: "A sister in Christ",
        city: "Nairobi",
        country: "Kenya",
        lat: -1.29,
        lon: 36.82,
        story:
          "I had two years of silence after my mother died. I kept showing up to church angry. Then one Tuesday I felt Him — not as a feeling, but as a knowing. He had been there the whole time. The silence was Him teaching me to trust without sight.",
        postedAgo: "1 hr ago",
        rejoiceCount: 42,
      },
      {
        id: "t2",
        anonymousName: "A brother in the body",
        city: "São Paulo",
        country: "Brazil",
        lat: -23.55,
        lon: -46.63,
        story:
          "I felt nothing for 18 months. My pastor told me to journal one gratitude per day, regardless of feeling. By month 14 the journal was overflowing. By month 18 the dryness lifted. He was forming roots I couldn't see.",
        postedAgo: "4 hr ago",
        rejoiceCount: 67,
      },
      {
        id: "t3",
        anonymousName: "A fellow saint",
        city: "Seoul",
        country: "South Korea",
        lat: 37.57,
        lon: 126.98,
        story:
          "Mother Teresa wrote letters about decades of spiritual darkness while serving the poor. She still served. The silence didn't disqualify her — it made her hands faithful. You're in good company.",
        postedAgo: "8 hr ago",
        rejoiceCount: 91,
      },
    ],
  },
  {
    id: "q2",
    question: "Is it okay to be angry with God?",
    context: "After losing my job and my dad in the same month, I'm furious. I don't know if I'm allowed to pray this honestly.",
    askedBy: "Anonymous",
    askedAgo: "yesterday",
    city: "Toronto, Canada",
    category: "Doctrine",
    followCount: 124,
    scholarlyAnswers: [
      {
        id: "sa5",
        source: "N.T. Wright",
        credential: "NT scholar, Bishop of Durham (ret.)",
        tradition: "Anglican",
        avatar: "📜",
        answer:
          "The Psalms are a third of our prayer book, and a great many of them are angry, confused, and wounded. God invited that vocabulary into His own Scripture. Honest lament is not unbelief — it's the prayer of someone who still believes He's listening.",
        scripture: "Psalm 13",
      },
      {
        id: "sa6",
        source: "Philip Yancey",
        credential: "Author, Disappointment with God",
        tradition: "Evangelical",
        avatar: "✒️",
        answer:
          "God is not threatened by your anger. The opposite of faith is not anger — it's indifference. Job spoke harshly to God, and God commended him for speaking 'what is right' (Job 42:7), while rebuking his friends for their tidy theology.",
        scripture: "Job 42:7",
      },
      {
        id: "sa7",
        source: "Henri Nouwen",
        credential: "Priest & author, The Wounded Healer",
        tradition: "Catholic",
        avatar: "🕊️",
        answer:
          "Bring the anger to Him. Don't dress it up. The God who wept at Lazarus's tomb is not asking you to perform composure. The prayer of rage, brought into His presence, becomes the beginning of healing.",
      },
    ],
    testimonies: [
      {
        id: "t4",
        anonymousName: "A child of God",
        city: "Lagos",
        country: "Nigeria",
        lat: 6.52,
        lon: 3.38,
        story:
          "I screamed at God for three weeks after my brother died. Out loud, in the car, in the shower. He never once left. The screaming turned into weeping, the weeping turned into surrender. Don't stop talking to Him.",
        postedAgo: "yesterday",
        rejoiceCount: 156,
      },
      {
        id: "t5",
        anonymousName: "A sister in Christ",
        city: "Sydney",
        country: "Australia",
        lat: -33.87,
        lon: 151.21,
        story:
          "I wrote angry letters to God for a year. Every Sunday I'd open my journal in the back pew and write what I couldn't say out loud. It saved my faith.",
        postedAgo: "2 days ago",
        rejoiceCount: 88,
      },
    ],
  },
  {
    id: "q3",
    question: "How can I share my faith without being weird about it?",
    askedBy: "A young believer",
    askedAgo: "6 hr ago",
    city: "Austin, USA",
    category: "Practical",
    followCount: 53,
    scholarlyAnswers: [
      {
        id: "sa8",
        source: "Rosaria Butterfield",
        credential: "Author, The Gospel Comes with a House Key",
        tradition: "Reformed",
        avatar: "🏡",
        answer:
          "Hospitality is the gospel made visible. You don't need a tract — you need a table. Have people in your home. Eat slowly. Let them see what a Christ-shaped life actually looks like before they ever hear you defend it.",
      },
      {
        id: "sa9",
        source: "Sam Chan",
        credential: "Evangelist, How to Talk About Jesus",
        tradition: "Evangelical",
        avatar: "💬",
        answer:
          "Three questions reshape every conversation: 'What do you think about...?' 'Have you ever...?' 'Can I tell you a story?' These let you turn small talk into soul talk without weirdness. Start there.",
        scripture: "1 Peter 3:15",
      },
    ],
    testimonies: [
      {
        id: "t6",
        anonymousName: "A brother in the body",
        city: "Mumbai",
        country: "India",
        lat: 19.08,
        lon: 72.88,
        story:
          "I never preach. I just invite people to dinner and pray openly before meals. Three coworkers have asked me about Christ in five years. Quiet faithfulness is louder than I thought.",
        postedAgo: "5 hr ago",
        rejoiceCount: 73,
      },
    ],
  },
];

export const learningPaths = [
  {
    id: "lp1",
    title: "Foundations of Biblical Interpretation",
    discipline: "Hermeneutics",
    description:
      "A 5-step path from 'how to read a passage' to 'how to teach it well.'",
    steps: [
      "What is the Bible?",
      "Genre matters: how to read each kind",
      "Context: the verse, the book, the canon",
      "Interpretation vs. application",
      "Bringing it home: the daily study habit",
    ],
    progress: 2,
  },
  {
    id: "lp2",
    title: "Answering Hard Questions",
    discipline: "Apologetics",
    description: "A 6-step path through the questions friends actually ask.",
    steps: [
      "Is the Bible reliable?",
      "Did Jesus really rise?",
      "Why does God allow suffering?",
      "What about other religions?",
      "Faith and science",
      "Sharing answers with grace",
    ],
    progress: 0,
  },
  {
    id: "lp3",
    title: "Reading the Letters of Paul",
    discipline: "Isagogics",
    description: "Setting and message of each Pauline epistle in context.",
    steps: [
      "Paul's world",
      "Romans & Galatians",
      "Corinthians I & II",
      "Prison Epistles",
      "Pastoral Epistles",
    ],
    progress: 1,
  },
];

// ------------------------------------------------------------------
// PROGRESS / GAMIFICATION
// ------------------------------------------------------------------

export const initialProgress = {
  streakDays: 14,
  prayersOffered: 38,
  challengesCompleted: 9,
  studySessions: 6,
  versesReflected: 12,
};

export const badges = [
  { id: "b1", name: "First Step", description: "Completed your first daily challenge", icon: "🌱", earned: true },
  { id: "b2", name: "Faithful Week", description: "7-day engagement streak", icon: "🔥", earned: true },
  { id: "b3", name: "Intercessor", description: "Prayed for 25 requests on the wall", icon: "🤲", earned: true },
  { id: "b4", name: "Student of the Word", description: "Completed a learning path", icon: "📖", earned: false },
  { id: "b5", name: "Peacemaker", description: "Completed all reconciliation challenges", icon: "🕊️", earned: false },
  { id: "b6", name: "Watchman", description: "30-day streak", icon: "⛰️", earned: false },
];

export const churchPulse = {
  prayersOfferedToday: 1247,
  praisesOfferedToday: 423,
  challengesCompletedToday: 312,
  activeMembers: 486,
  congregations: 4,
};
