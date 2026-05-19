// Feelings & Encouragement — scripture by what the heart is carrying.
// Curated, not exhaustive. Designed to meet, not preach.

export type Tone =
  | "hope"
  | "peace"
  | "joy"
  | "comfort"
  | "strength"
  | "trust"
  | "fear"
  | "anxiety"
  | "grief"
  | "doubt"
  | "loneliness"
  | "anger"
  | "shame"
  | "absolution"
  | "gratitude"
  | "encouragement";

export type Passage = {
  reference: string;
  text: string;
  whyItMeets: string;
};

export type FeelingCategory = {
  id: Tone;
  name: string;
  emoji: string;
  short: string;        // one-line tagline
  invitation: string;   // longer pastoral note shown on the detail screen
  kind: "hard" | "soft"; // hard = difficult feeling, soft = uplifting feeling
  passages: Passage[];
};

export const feelingCategories: FeelingCategory[] = [
  // ── SOFT (uplifting / pursued) ───────────────────────────
  {
    id: "hope",
    name: "Hope",
    emoji: "🌅",
    short: "When the morning seems far off.",
    invitation:
      "Hope in scripture is not optimism. It is the certainty that God has spoken, and what He says will stand. Read these slowly. Let them re-anchor you.",
    kind: "soft",
    passages: [
      {
        reference: "Romans 15:13",
        text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
        whyItMeets: "Hope here is a gift to ask for, not a mood to manufacture.",
      },
      {
        reference: "Lamentations 3:21–23",
        text: "Yet this I call to mind and therefore I have hope: Because of the LORD's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
        whyItMeets: "Hope held by an exhausted prophet, in the ruins of a city. It still held.",
      },
      {
        reference: "Hebrews 6:19",
        text: "We have this hope as an anchor for the soul, firm and secure.",
        whyItMeets: "Not a feeling — an anchor. Even when the boat is tossed.",
      },
      {
        reference: "Psalm 130:5–6",
        text: "I wait for the LORD, my whole being waits, and in his word I put my hope. I wait for the Lord more than watchmen wait for the morning.",
        whyItMeets: "When all you can do is wait, waiting is the work.",
      },
    ],
  },
  {
    id: "peace",
    name: "Peace",
    emoji: "🕊️",
    short: "When your mind won't settle.",
    invitation:
      "Christ's peace is not the absence of trouble — it is His presence inside it. Breathe slowly as you read.",
    kind: "soft",
    passages: [
      {
        reference: "John 14:27",
        text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
        whyItMeets: "His peace is given, not earned. You don't have to perform for it.",
      },
      {
        reference: "Philippians 4:6–7",
        text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
        whyItMeets: "Peace is the result of honest, specific prayer. Name what's heavy.",
      },
      {
        reference: "Isaiah 26:3",
        text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
        whyItMeets: "Peace follows trust. Trust follows looking.",
      },
      {
        reference: "Psalm 4:8",
        text: "In peace I will lie down and sleep, for you alone, LORD, make me dwell in safety.",
        whyItMeets: "A prayer for the night when sleep won't come.",
      },
    ],
  },
  {
    id: "joy",
    name: "Joy",
    emoji: "✨",
    short: "When you want to remember what you have.",
    invitation:
      "Joy in scripture is deeper than happiness. It can sit beside sorrow without being canceled. Receive.",
    kind: "soft",
    passages: [
      {
        reference: "Nehemiah 8:10",
        text: "Do not grieve, for the joy of the LORD is your strength.",
        whyItMeets: "Joy is fuel. Not a reward for strong people — strength for tired ones.",
      },
      {
        reference: "Psalm 16:11",
        text: "You make known to me the path of life; you will fill me with joy in your presence, with eternal pleasures at your right hand.",
        whyItMeets: "Joy is found in presence, not in circumstance.",
      },
      {
        reference: "James 1:2–4",
        text: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance.",
        whyItMeets: "Joy that survives trial — because the trial is doing something in you.",
      },
      {
        reference: "Zephaniah 3:17",
        text: "The LORD your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.",
        whyItMeets: "He sings over you. Let that land.",
      },
    ],
  },
  {
    id: "comfort",
    name: "Comfort",
    emoji: "🤍",
    short: "When you need to be held.",
    invitation:
      "Comfort is not a quick fix — it is the felt nearness of God when nothing else can be fixed. Stay here a while.",
    kind: "soft",
    passages: [
      {
        reference: "Psalm 34:18",
        text: "The LORD is close to the brokenhearted and saves those who are crushed in spirit.",
        whyItMeets: "He doesn't keep distance from grief. He moves toward it.",
      },
      {
        reference: "2 Corinthians 1:3–4",
        text: "Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles, so that we can comfort those in any trouble with the comfort we ourselves receive from God.",
        whyItMeets: "What you receive now will become what you give later. Nothing is wasted.",
      },
      {
        reference: "Isaiah 41:10",
        text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
        whyItMeets: "Five promises in one verse. Read it five times.",
      },
      {
        reference: "Matthew 11:28–30",
        text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.",
        whyItMeets: "He calls Himself gentle. The only One who could have demanded did not.",
      },
    ],
  },
  {
    id: "strength",
    name: "Strength",
    emoji: "🦁",
    short: "When you are running on empty.",
    invitation:
      "Scripture rarely promises that the load gets lighter. It promises that the shoulder gets stronger.",
    kind: "soft",
    passages: [
      {
        reference: "Isaiah 40:29–31",
        text: "He gives strength to the weary and increases the power of the weak… those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
        whyItMeets: "Renewal is for the weary, not the strong.",
      },
      {
        reference: "Philippians 4:13",
        text: "I can do all this through him who gives me strength.",
        whyItMeets: "Paul wrote this while learning contentment in hunger. Strength is for sustaining, not just succeeding.",
      },
      {
        reference: "2 Corinthians 12:9",
        text: "My grace is sufficient for you, for my power is made perfect in weakness.",
        whyItMeets: "Your weakness isn't a problem to fix — it's the room His power moves through.",
      },
      {
        reference: "Ephesians 6:10",
        text: "Finally, be strong in the Lord and in his mighty power.",
        whyItMeets: "Be strong in Him — not in yourself. The location matters.",
      },
    ],
  },
  {
    id: "trust",
    name: "Trust",
    emoji: "🌾",
    short: "When the path isn't clear.",
    invitation:
      "Trust is not certainty about the next step. It is certainty about the One who knows it.",
    kind: "soft",
    passages: [
      {
        reference: "Proverbs 3:5–6",
        text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
        whyItMeets: "Permission to stop figuring it out yourself.",
      },
      {
        reference: "Psalm 37:3–5",
        text: "Trust in the LORD and do good; dwell in the land and enjoy safe pasture. Take delight in the LORD, and he will give you the desires of your heart. Commit your way to the LORD; trust in him and he will do this.",
        whyItMeets: "Trust isn't passive — it's accompanied by 'do good' and 'commit your way.'",
      },
      {
        reference: "Jeremiah 17:7–8",
        text: "But blessed is the one who trusts in the LORD, whose confidence is in him. They will be like a tree planted by the water that sends out its roots by the stream… its leaves are always green.",
        whyItMeets: "Trust grows root systems that drought can't kill.",
      },
    ],
  },
  {
    id: "gratitude",
    name: "Gratitude",
    emoji: "🌻",
    short: "When you want to remember His goodness.",
    invitation:
      "Gratitude is not a feeling we wait for. It is a discipline we begin. The list is always longer than we think.",
    kind: "soft",
    passages: [
      {
        reference: "1 Thessalonians 5:16–18",
        text: "Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
        whyItMeets: "Three short commands. The third one shapes the first two.",
      },
      {
        reference: "Psalm 103:1–5",
        text: "Praise the LORD, my soul; all my inmost being, praise his holy name. Praise the LORD, my soul, and forget not all his benefits — who forgives all your sins and heals all your diseases, who redeems your life from the pit and crowns you with love and compassion.",
        whyItMeets: "David preaches to his own soul. Sometimes you have to.",
      },
      {
        reference: "Colossians 3:15–17",
        text: "Let the peace of Christ rule in your hearts… and be thankful… And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him.",
        whyItMeets: "Gratitude isn't an interlude. It's a way of life.",
      },
    ],
  },
  {
    id: "absolution",
    name: "Absolution",
    emoji: "🕯️",
    short: "When you can't forgive yourself.",
    invitation:
      "If God has forgiven you, the work is done. Self-condemnation is not humility — it is unbelief in His mercy. Receive.",
    kind: "soft",
    passages: [
      {
        reference: "1 John 1:9",
        text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.",
        whyItMeets: "Confession opens the door. Forgiveness is already on the other side.",
      },
      {
        reference: "Romans 8:1",
        text: "Therefore, there is now no condemnation for those who are in Christ Jesus.",
        whyItMeets: "Now. Not later. Not after you've earned it.",
      },
      {
        reference: "Psalm 103:11–12",
        text: "For as high as the heavens are above the earth, so great is his love for those who fear him; as far as the east is from the west, so far has he removed our transgressions from us.",
        whyItMeets: "East and west never meet. Neither will you and that sin, ever again.",
      },
      {
        reference: "Isaiah 1:18",
        text: "Come now, let us settle the matter,' says the LORD. 'Though your sins are like scarlet, they shall be as white as snow; though they are red as crimson, they shall be like wool.",
        whyItMeets: "He invites you to settle what you've been carrying. Bring it.",
      },
      {
        reference: "Micah 7:19",
        text: "You will again have compassion on us; you will tread our sins underfoot and hurl all our iniquities into the depths of the sea.",
        whyItMeets: "Not placed away. Hurled.",
      },
    ],
  },
  {
    id: "encouragement",
    name: "Encouragement",
    emoji: "🔥",
    short: "When you need a word over you.",
    invitation:
      "These are verses to speak out loud. Quietly, if you have to. But out loud.",
    kind: "soft",
    passages: [
      {
        reference: "Joshua 1:9",
        text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
        whyItMeets: "A commission given before Joshua had done anything heroic.",
      },
      {
        reference: "Galatians 6:9",
        text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.",
        whyItMeets: "The harvest is coming. Keep going.",
      },
      {
        reference: "1 Corinthians 15:58",
        text: "Therefore, my dear brothers and sisters, stand firm. Let nothing move you. Always give yourselves fully to the work of the Lord, because you know that your labor in the Lord is not in vain.",
        whyItMeets: "Not in vain. Even the part nobody sees.",
      },
      {
        reference: "Zechariah 4:6",
        text: "Not by might nor by power, but by my Spirit, says the LORD Almighty.",
        whyItMeets: "You were never meant to do it on your own strength anyway.",
      },
    ],
  },

  // ── HARD (difficult / met) ───────────────────────────────
  {
    id: "fear",
    name: "Fear",
    emoji: "🛡️",
    short: "When you're afraid of what's next.",
    invitation:
      "Scripture says 'do not fear' more than any other command — because God knows we are afraid. He doesn't shame the fear. He answers it with His presence.",
    kind: "hard",
    passages: [
      {
        reference: "Isaiah 41:10",
        text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
        whyItMeets: "The cure for fear is not certainty about the future. It is company in it.",
      },
      {
        reference: "Psalm 23:4",
        text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
        whyItMeets: "Through. Not around. He walks the valley too.",
      },
      {
        reference: "2 Timothy 1:7",
        text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.",
        whyItMeets: "Timidity is not your true voice. The Spirit is.",
      },
      {
        reference: "Psalm 56:3",
        text: "When I am afraid, I put my trust in you.",
        whyItMeets: "When — not if. Even David expected fear. Trust is the response.",
      },
    ],
  },
  {
    id: "anxiety",
    name: "Anxiety",
    emoji: "🌿",
    short: "When your mind won't stop spinning.",
    invitation:
      "Anxiety is real, and scripture does not dismiss it. It invites you to bring it — specifically, repeatedly — to the One who cares.",
    kind: "hard",
    passages: [
      {
        reference: "1 Peter 5:7",
        text: "Cast all your anxiety on him because he cares for you.",
        whyItMeets: "Cast — a deliberate throw. Not 'place gently and hope it stays.'",
      },
      {
        reference: "Matthew 6:34",
        text: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
        whyItMeets: "Today's grace is for today's troubles. Tomorrow's will come with its own.",
      },
      {
        reference: "Philippians 4:6–7",
        text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
        whyItMeets: "Peace is the gift. Specific prayer is the path.",
      },
      {
        reference: "Psalm 94:19",
        text: "When anxiety was great within me, your consolation brought me joy.",
        whyItMeets: "Anxiety doesn't have the last word. Consolation does.",
      },
    ],
  },
  {
    id: "grief",
    name: "Grief",
    emoji: "🌧️",
    short: "When the loss is fresh — or old.",
    invitation:
      "Jesus wept. You may, too. Grief is not faithlessness. It is love with nowhere to go yet. Sit with these verses; don't rush past them.",
    kind: "hard",
    passages: [
      {
        reference: "John 11:35",
        text: "Jesus wept.",
        whyItMeets: "The shortest verse. The deepest comfort. He weeps with you.",
      },
      {
        reference: "Psalm 34:18",
        text: "The LORD is close to the brokenhearted and saves those who are crushed in spirit.",
        whyItMeets: "Closeness is the promise. Not explanation. Closeness.",
      },
      {
        reference: "Revelation 21:4",
        text: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.",
        whyItMeets: "A promise about the end of all tears. Hold this for the days you can't.",
      },
      {
        reference: "Psalm 56:8",
        text: "You keep track of all my sorrows. You have collected all my tears in your bottle. You have recorded each one in your book.",
        whyItMeets: "Not one tear is unseen. Not one.",
      },
      {
        reference: "Lamentations 3:32–33",
        text: "Though he brings grief, he will show compassion, so great is his unfailing love. For he does not willingly bring affliction or grief to anyone.",
        whyItMeets: "He is not casual with your sorrow.",
      },
    ],
  },
  {
    id: "doubt",
    name: "Doubt",
    emoji: "🌫️",
    short: "When faith feels thin.",
    invitation:
      "Honest doubt is closer to faith than performed certainty. Scripture is full of people who doubted — and were not cast out.",
    kind: "hard",
    passages: [
      {
        reference: "Mark 9:24",
        text: "I do believe; help me overcome my unbelief!",
        whyItMeets: "The most honest prayer in the gospels. Pray it as your own.",
      },
      {
        reference: "Jude 22",
        text: "Be merciful to those who doubt.",
        whyItMeets: "If God commands mercy toward the doubter, He has it for you too.",
      },
      {
        reference: "John 20:27–29",
        text: "Then he said to Thomas, 'Put your finger here; see my hands. Reach out your hand and put it into my side. Stop doubting and believe.'",
        whyItMeets: "Jesus didn't shame Thomas. He showed up — with evidence. He is patient with honest questions.",
      },
      {
        reference: "Psalm 73:23–24",
        text: "Yet I am always with you; you hold me by my right hand. You guide me with your counsel.",
        whyItMeets: "Asaph almost lost his faith — but God did not lose him.",
      },
    ],
  },
  {
    id: "loneliness",
    name: "Loneliness",
    emoji: "🌙",
    short: "When no one seems to see you.",
    invitation:
      "You are not alone, even when the room is. The God who saw Hagar in the wilderness sees you.",
    kind: "hard",
    passages: [
      {
        reference: "Deuteronomy 31:6",
        text: "Be strong and courageous. Do not be afraid or terrified… for the LORD your God goes with you; he will never leave you nor forsake you.",
        whyItMeets: "Never leave. Never forsake. Two negatives, doubled for emphasis.",
      },
      {
        reference: "Psalm 139:7–10",
        text: "Where can I go from your Spirit? Where can I flee from your presence? If I go up to the heavens, you are there; if I make my bed in the depths, you are there.",
        whyItMeets: "There is no room you can enter that He has not already filled.",
      },
      {
        reference: "Genesis 16:13",
        text: "She gave this name to the LORD who spoke to her: 'You are the God who sees me.'",
        whyItMeets: "Hagar — outcast, alone in the desert — gave God a new name: the One who sees.",
      },
      {
        reference: "Matthew 28:20",
        text: "And surely I am with you always, to the very end of the age.",
        whyItMeets: "The last sentence Jesus spoke before ascending. A promise that has not expired.",
      },
    ],
  },
  {
    id: "anger",
    name: "Anger",
    emoji: "🔥",
    short: "When something is not right.",
    invitation:
      "Anger is not always sin. Sometimes it is the right response to wrong. Bring it to the One who is slow to anger and great in mercy.",
    kind: "hard",
    passages: [
      {
        reference: "Ephesians 4:26–27",
        text: "In your anger do not sin: do not let the sun go down while you are still angry, and do not give the devil a foothold.",
        whyItMeets: "Permission to be angry. Caution about what comes next.",
      },
      {
        reference: "James 1:19–20",
        text: "Everyone should be quick to listen, slow to speak and slow to become angry, because human anger does not produce the righteousness that God desires.",
        whyItMeets: "Slow. Not absent. Slow.",
      },
      {
        reference: "Psalm 4:4",
        text: "Tremble and do not sin; when you are on your beds, search your hearts and be silent.",
        whyItMeets: "Bring the anger to bed. Search it there. Don't act on it yet.",
      },
      {
        reference: "Romans 12:19",
        text: "Do not take revenge, my dear friends, but leave room for God's wrath, for it is written: 'It is mine to avenge; I will repay,' says the Lord.",
        whyItMeets: "You don't have to carry justice. There is a Judge.",
      },
    ],
  },
  {
    id: "shame",
    name: "Shame",
    emoji: "🌑",
    short: "When you feel like you are the problem.",
    invitation:
      "Guilt says 'I did wrong.' Shame says 'I am wrong.' Scripture answers shame with a new name and a new family. Receive.",
    kind: "hard",
    passages: [
      {
        reference: "Romans 8:1",
        text: "Therefore, there is now no condemnation for those who are in Christ Jesus.",
        whyItMeets: "If God refuses to condemn you, you can refuse to condemn yourself.",
      },
      {
        reference: "Isaiah 61:7",
        text: "Instead of your shame you will receive a double portion, and instead of disgrace you will rejoice in your inheritance.",
        whyItMeets: "Not just shame removed — a double portion in its place.",
      },
      {
        reference: "Psalm 34:5",
        text: "Those who look to him are radiant; their faces are never covered with shame.",
        whyItMeets: "Look up. Not down.",
      },
      {
        reference: "1 John 3:1",
        text: "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
        whyItMeets: "You are not your worst moment. You are His child.",
      },
      {
        reference: "Hebrews 12:2",
        text: "Looking unto Jesus, the author and finisher of our faith; who for the joy that was set before him endured the cross, despising the shame, and is set down at the right hand of the throne of God.",
        whyItMeets: "He despised the shame — disregarded it. So can you, in Him.",
      },
    ],
  },
];

// Quick helper: tone color tokens (used by the Feelings screen for chips)
export const toneColor: Record<Tone, string> = {
  hope: "from-[#3a2308] to-[#7a5a14]",
  peace: "from-[#1a3a2a] to-[#2a5a3a]",
  joy: "from-[#3a2a08] to-[#7a5a14]",
  comfort: "from-[#2a1a2a] to-[#4a2a4a]",
  strength: "from-[#3a1a08] to-[#7a3a14]",
  trust: "from-[#1a2a3a] to-[#2a4a6a]",
  gratitude: "from-[#3a2a08] to-[#7a6a14]",
  absolution: "from-[#2a2a08] to-[#5a5a14]",
  encouragement: "from-[#3a1a08] to-[#7a4a14]",
  fear: "from-[#1a1a2a] to-[#2a2a4a]",
  anxiety: "from-[#1a2a1a] to-[#2a4a2a]",
  grief: "from-[#1a1a2a] to-[#3a3a4a]",
  doubt: "from-[#1a1a1a] to-[#3a3a3a]",
  loneliness: "from-[#1a1a2a] to-[#3a3a5a]",
  anger: "from-[#3a0a0a] to-[#7a1a1a]",
  shame: "from-[#0a0a0a] to-[#2a2a2a]",
};
