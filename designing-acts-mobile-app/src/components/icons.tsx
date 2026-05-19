import type { SVGProps } from "react";

const base = (props: SVGProps<SVGSVGElement>) => ({
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const HomeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-6h4v6" />
  </svg>
);

export const HeartIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 20s-7-4.5-9-9.5C1.5 6.5 4.5 4 7.5 4c1.7 0 3.3.9 4.5 2.5C13.2 4.9 14.8 4 16.5 4c3 0 6 2.5 4.5 6.5C19 15.5 12 20 12 20Z" />
  </svg>
);

export const BookIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4Z" />
    <path d="M20 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8Z" />
  </svg>
);

export const HandsIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M7 11V5a1.5 1.5 0 0 1 3 0v6" />
    <path d="M10 10V4a1.5 1.5 0 0 1 3 0v7" />
    <path d="M13 10V5a1.5 1.5 0 0 1 3 0v8" />
    <path d="M16 9a1.5 1.5 0 0 1 3 0v6a6 6 0 0 1-6 6h-1a6 6 0 0 1-5.3-3.2L4 13" />
  </svg>
);

export const UserIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

export const ChevronRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const ChevronLeft = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="m15 6-6 6 6 6" />
  </svg>
);

export const SparkIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
  </svg>
);

export const FlameIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 21c4 0 7-2.7 7-6.5 0-3-2-5-3-6 0 2-1 3-2 3 0-3-2-5-4-7-1 4-5 5-5 10 0 3.8 3 6.5 7 6.5Z" />
  </svg>
);

export const CheckIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="m5 12 5 5L20 7" />
  </svg>
);

export const PlusIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const SearchIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const BellIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8" />
    <path d="M10 21a2 2 0 0 0 4 0" />
  </svg>
);

export const LockIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

export const QuoteIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M7 7h4v4H7c0 3 1 4 4 4v2c-5 0-7-2-7-7V7Z" />
    <path d="M14 7h4v4h-4c0 3 1 4 4 4v2c-5 0-7-2-7-7V7Z" />
  </svg>
);

export const CloseIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const SunIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

export const MoonIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);

export const HeartSparkIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    {/* Heart */}
    <path d="M12 20s-6-4-8-8.5C2.6 7.3 5 5 7.5 5c1.5 0 3 .8 4.5 2.5C13.5 5.8 15 5 16.5 5c2.5 0 4.9 2.3 3.5 6.5C18 16 12 20 12 20Z" />
    {/* Spark/radiance lines */}
    <path d="M3 4l1 1M21 4l-1 1M3 9h1M20 9h1" opacity="0.6" />
  </svg>
);
