import { useState } from "react";
import { supabase } from "../supabaseClient";

interface Props {
  navigate: (screen: string) => void;
}

export function AdminDashboard({ navigate }: Props) {
  // Verse Form State
  const [verseText, setVerseText] = useState("");
  const [verseRef, setVerseRef] = useState("");
  const [verseContext, setVerseContext] = useState("");
  const [verseReflection, setVerseReflection] = useState("");

  // Challenge Form State
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeDesc, setChallengeDesc] = useState("");
  const [challengeCat, setChallengeCat] = useState("Identity");
  const [challengeMins, setChallengeMins] = useState(5);
  const [challengeTiedTo, setChallengeTiedTo] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handlePublish() {
    if (!verseText || !challengeTitle) {
      setMessage("⚠️ Please fill in at least the Verse Text and Challenge Title.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // 1. Insert the new verse into Supabase
      const { error: verseError } = await supabase
        .from("daily_content")
        .insert([{
          verse_text: verseText,
          verse_reference: verseRef,
          verse_context: verseContext,
          verse_reflection: verseReflection
        }]);

      if (verseError) throw verseError;

      // 2. Insert the new challenge into Supabase
      const { error: challengeError } = await supabase
        .from("daily_challenges")
        .insert([{
          title: challengeTitle,
          description: challengeDesc,
          category: challengeCat,
          estimated_minutes: challengeMins,
          tied_to: challengeTiedTo
        }]);

      if (challengeError) throw challengeError;

      setMessage("🎉 Broadcast published live successfully!");
      setVerseText("");
      setVerseRef("");
      setVerseContext("");
      setVerseReflection("");
      setChallengeTitle("");
      setChallengeDesc("");
      setChallengeTiedTo("");

    } catch (err: any) {
      console.error(err);
      setMessage(`❌ Error publishing: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] p-6 text-[var(--color-cream)] overflow-y-auto pb-24">
      <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-4 mb-6">
        <h1 className="font-display text-xl text-[var(--color-gold-1)]">ACTS Content Control</h1>
        <button 
          onClick={() => navigate("dashboard")}
          className="px-3 py-1 text-xs rounded-full bg-[var(--color-charcoal)] ring-1 ring-[var(--color-line)] text-[var(--color-gold-3)]"
        >
          ← Back
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 rounded-xl bg-[var(--color-feature)] text-[var(--color-gold-1)] text-xs text-center ring-1 ring-[var(--color-gold-4)]">
          {message}
        </div>
      )}

      {/* VERSE FORM */}
      <section className="bg-[var(--color-charcoal)] p-4 rounded-3xl ring-1 ring-[var(--color-line)] mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-3)] mb-4">New Verse of the Day</h2>
        
        <label className="block text-[11px] text-[var(--color-gold-2)] mb-1">Verse Text</label>
        <textarea 
          value={verseText} 
          onChange={(e) => setVerseText(e.target.value)}
          className="w-full bg-[var(--color-bg)] rounded-xl p-2.5 text-sm mb-3 border-none ring-1 ring-[var(--color-line)] focus:ring-[var(--color-gold-3)] outline-none resize-none h-20"
          placeholder="e.g., Be still, and know..."
        />

        <label className="block text-[11px] text-[var(--color-gold-2)] mb-1">Reference</label>
        <input 
          type="text" 
          value={verseRef} 
          onChange={(e) => setVerseRef(e.target.value)}
          className="w-full bg-[var(--color-bg)] rounded-xl p-2.5 text-sm mb-3 border-none ring-1 ring-[var(--color-line)] outline-none"
          placeholder="e.g., Psalm 46:10"
        />

        <label className="block text-[11px] text-[var(--color-gold-2)] mb-1">Context</label>
        <input 
          type="text" 
          value={verseContext} 
          onChange={(e) => setVerseContext(e.target.value)}
          className="w-full bg-[var(--color-bg)] rounded-xl p-2.5 text-sm mb-3 border-none ring-1 ring-[var(--color-line)] outline-none"
          placeholder="Historical/Theological background"
        />

        <label className="block text-[11px] text-[var(--color-gold-2)] mb-1">Reflection Prompt</label>
        <textarea 
          value={verseReflection} 
          onChange={(e) => setVerseReflection(e.target.value)}
          className="w-full bg-[var(--color-bg)] rounded-xl p-2.5 text-sm mb-4 border-none ring-1 ring-[var(--color-line)] outline-none resize-none h-16"
          placeholder="Question to prompt application..."
        />
      </section>

      {/* CHALLENGE FORM */}
      <section className="bg-[var(--color-charcoal)] p-4 rounded-3xl ring-1 ring-[var(--color-line)] mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-3)] mb-4">New Daily Challenge</h2>

        <label className="block text-[11px] text-[var(--color-gold-2)] mb-1">Title</label>
        <input 
          type="text" 
          value={challengeTitle} 
          onChange={(e) => setChallengeTitle(e.target.value)}
          className="w-full bg-[var(--color-bg)] rounded-xl p-2.5 text-sm mb-3 border-none ring-1 ring-[var(--color-line)] outline-none"
          placeholder="e.g., The Stillness Practice"
        />

        <label className="block text-[11px] text-[var(--color-gold-2)] mb-1">Description</label>
        <textarea 
          value={challengeDesc} 
          onChange={(e) => setChallengeDesc(e.target.value)}
          className="w-full bg-[var(--color-bg)] rounded-xl p-2.5 text-sm mb-3 border-none ring-1 ring-[var(--color-line)] outline-none resize-none h-20"
          placeholder="Action item details..."
        />

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-[11px] text-[var(--color-gold-2)] mb-1">Category</label>
            <input 
              type="text" 
              value={challengeCat} 
              onChange={(e) => setChallengeCat(e.target.value)}
              className="w-full bg-[var(--color-bg)] rounded-xl p-2.5 text-sm border-none ring-1 ring-[var(--color-line)] outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] text-[var(--color-gold-2)] mb-1">Duration (Mins)</label>
            <input 
              type="number" 
              value={challengeMins} 
              onChange={(e) => setChallengeMins(Number(e.target.value))}
              className="w-full bg-[var(--color-bg)] rounded-xl p-2.5 text-sm border-none ring-1 ring-[var(--color-line)] outline-none"
            />
          </div>
        </div>

        <label className="block text-[11px] text-[var(--color-gold-2)] mb-1">Tied To (Scripture Link)</label>
        <input 
          type="text" 
          value={challengeTiedTo} 
          onChange={(e) => setChallengeTiedTo(e.target.value)}
          className="w-full bg-[var(--color-bg)] rounded-xl p-2.5 text-sm mb-2 border-none ring-1 ring-[var(--color-line)] outline-none"
          placeholder="e.g., Psalm 46:10"
        />
      </section>

      <button
        onClick={() => handlePublish()}
        disabled={loading}
        className="w-full py-3 rounded-2xl bg-[var(--color-gold-2)] text-[var(--color-charcoal)] font-semibold tracking-wide text-sm shadow-md active:scale-[0.98] transition-transform disabled:opacity-50"
      >
        {loading ? "Publishing Broadcast..." : "Publish Today's Updates"}
      </button>
    </div>
  );
}