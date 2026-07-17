import { useFaith } from "./FaithContext"; // Adjust path to your context

export function JourneyContentCard() {
  // 1. Pull the current language level from your global state
  const { languageLevel } = useFaith();

  // 2. Set a fallback just in case they skipped onboarding or it's null
  const currentLevel = languageLevel || "standard";

  // 3. Define your text variations (in production, this would come from a database or JSON file)
  const devotionalContent = {
    simple: "God loves you deeply and wants you to trust Him. When you place your trust in Him, you will find true peace in your heart.",
    standard: "Through faith, we are justified by grace. This active trust in Christ brings a lasting, deep-seated peace to our daily lives.",
    theological: "Justification is fundamentally a forensic act of God's unmerited grace. Through sola fide, the believer is imputed with Christ's perfect righteousness, resulting in eschatological shalom."
  };

  return (
    <div className="rounded-3xl bg-[var(--color-feature)] p-6 shadow-xl ring-1 ring-[var(--color-gold-3)]">
      <h3 className="font-display text-[22px] text-gold-grad mb-3">
        Today's Reflection
      </h3>
      
      {/* 4. This dynamically grabs the right version of text instantly */}
      <p className="text-[14px] leading-relaxed text-[var(--feature-fg)]/90 font-serif transition-all duration-300">
        {devotionalContent[currentLevel]}
      </p>
    </div>
  );
}