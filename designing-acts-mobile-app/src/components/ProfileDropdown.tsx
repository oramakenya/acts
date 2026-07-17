import { useState, useEffect, useRef } from "react";
import { useCompanion } from "./CompanionContext";
import { ReadingLevelToggle } from "./ReadingLevelToggle";
import { ArabesqueDivider } from "./Ornament";
import { LockIcon } from "./icons"; // Adjust import to your icons file

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { userName, companion } = useCompanion();

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button: User's Avatar / Companion Emoji */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-gold-2)] text-[18px] text-[var(--on-accent)] ring-2 ring-[var(--color-gold-1)] shadow-md transition-transform active:scale-95"
      >
        {companion?.emoji || "👤"}
      </button>

      {/* The Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 mt-2 w-72 origin-top-right overflow-hidden rounded-3xl bg-[var(--color-feature)] shadow-2xl ring-1 ring-[var(--color-gold-3)] animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Header Area */}
          <div className="flex flex-col items-center bg-[var(--feature-tint)] px-5 py-4 text-center">
            <h3 className="font-display text-[20px] text-gold-grad">
              {userName || "Pilgrim"}
            </h3>
            <p className="mt-0.5 text-[11px] italic text-[var(--feature-fg-muted)] font-serif">
              Walking with {companion?.name || "a companion"}
            </p>
            <div className="mt-3 text-[var(--feature-deep-gold)]">
              <ArabesqueDivider width={80} />
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col p-2">
            
            {/* Reading Level Toggle Section */}
            <div className="flex flex-col gap-2 rounded-2xl p-3 hover:bg-[var(--feature-tint)]/50 transition-colors">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-[var(--feature-accent)]">
                  Reading Complexity
                </p>
              </div>
              <ReadingLevelToggle />
            </div>

            <div className="h-px w-full bg-[var(--feature-line)] my-1" />

            {/* Other Settings Actions */}
            <button className="flex w-full items-center justify-between rounded-2xl p-3 text-left hover:bg-[var(--feature-tint)] transition-colors">
              <span className="text-[12px] font-medium text-[var(--feature-accent)]">
                Change Companion
              </span>
              <span className="text-[16px]">{companion?.emoji || "👤"}</span>
            </button>

            <button className="flex w-full items-center justify-between rounded-2xl p-3 text-left hover:bg-[var(--feature-tint)] transition-colors">
              <span className="text-[12px] font-medium text-[var(--feature-accent)]">
                Account & Privacy
              </span>
              <LockIcon width={14} height={14} className="text-[var(--feature-deep-gold)]" />
            </button>

            <div className="h-px w-full bg-[var(--feature-line)] my-1" />

            <button className="flex w-full items-center justify-center rounded-2xl p-3 text-[12px] font-semibold text-[var(--feature-fg-muted)] hover:bg-[var(--feature-tint)] hover:text-[var(--feature-accent)] transition-colors">
              Sign Out
            </button>

          </div>
        </div>
      )}
    </div>
  );
}