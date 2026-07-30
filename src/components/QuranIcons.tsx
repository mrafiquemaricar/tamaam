import React from 'react';

interface IconProps {
  iconKey: string;
  className?: string;
}

export const QuranIcon: React.FC<IconProps> = ({ iconKey, className = "w-10 h-10" }) => {
  switch (iconKey) {
    case 'kaaba':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <rect x="16" y="20" width="32" height="32" rx="3" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
          <path d="M16 28H48" stroke="#fbbf24" strokeWidth="3" strokeDasharray="2 2" />
          <rect x="34" y="36" width="8" height="16" rx="1" fill="#d97706" stroke="#fef08a" strokeWidth="1" />
          <circle cx="38" cy="44" r="1" fill="#fef08a" />
        </svg>
      );

    case 'mushaf':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <path d="M12 44C20 40 28 42 32 46C36 42 44 40 52 44V20C44 16 36 18 32 22C28 18 20 16 12 20V44Z" fill="#065f46" stroke="#fbbf24" strokeWidth="2" />
          <path d="M32 22V46" stroke="#fbbf24" strokeWidth="2" />
          <path d="M18 28H26M18 34H24M38 28H46M40 34H46" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 48L32 58L44 48" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'mosque':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <path d="M20 48V32C20 24 32 16 32 16C32 16 44 24 44 32V48H20Z" fill="#0d9488" stroke="#fbbf24" strokeWidth="2" />
          <path d="M32 10V16" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="32" cy="8" r="2" fill="#fbbf24" />
          <path d="M28 48V38C28 36 36 36 36 38V48" fill="#0f766e" stroke="#fbbf24" strokeWidth="1.5" />
          <rect x="12" y="24" width="6" height="24" fill="#065f46" stroke="#fbbf24" strokeWidth="1.5" />
          <rect x="46" y="24" width="6" height="24" fill="#065f46" stroke="#fbbf24" strokeWidth="1.5" />
        </svg>
      );

    case 'crescent':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <path d="M42 16C30 16 22 26 24 38C26 50 38 54 46 48C34 50 26 40 28 30C30 20 38 16 42 16Z" fill="#f59e0b" stroke="#fef08a" strokeWidth="1.5" />
          <polygon points="44,20 46,25 51,25 47,28 49,33 44,30 39,33 41,28 37,25 42,25" fill="#fbbf24" />
        </svg>
      );

    case 'fanous':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <path d="M24 24L32 12L40 24L44 40L32 48L20 40L24 24Z" fill="#d97706" stroke="#fef08a" strokeWidth="2" />
          <line x1="32" y1="4" x2="32" y2="12" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="32" cy="30" r="4" fill="#fef08a" className="animate-pulse" />
          <path d="M24 48L32 56L40 48" stroke="#b45309" strokeWidth="2" />
        </svg>
      );

    case 'sajjada':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <rect x="18" y="12" width="28" height="40" rx="2" fill="#047857" stroke="#fbbf24" strokeWidth="2" />
          <path d="M24 24C24 20 32 16 32 16C32 16 40 20 40 24V40H24V24Z" fill="#065f46" stroke="#fef08a" strokeWidth="1.5" />
          <line x1="18" y1="8" x2="46" y2="8" stroke="#d97706" strokeWidth="2" strokeDasharray="2 2" />
          <line x1="18" y1="56" x2="46" y2="56" stroke="#d97706" strokeWidth="2" strokeDasharray="2 2" />
        </svg>
      );

    case 'olive':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <path d="M16 48C24 40 32 32 48 16" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="28" cy="28" rx="8" ry="5" transform="rotate(-30 28 28)" fill="#65a30d" stroke="#365314" strokeWidth="1.5" />
          <ellipse cx="40" cy="38" rx="8" ry="5" transform="rotate(30 40 38)" fill="#65a30d" stroke="#365314" strokeWidth="1.5" />
          <ellipse cx="36" cy="22" rx="5" ry="8" transform="rotate(15 36 22)" fill="#84cc16" stroke="#365314" strokeWidth="1.5" />
        </svg>
      );

    case 'sunburst':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="12" fill="#f59e0b" stroke="#fef08a" strokeWidth="2" />
          <path d="M32 8V14M32 50V56M8 32H14M50 32H56M15 15L19 19M45 45L49 49M15 49L19 45M45 19L49 15" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'moon':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <path d="M40 12C28 12 20 22 22 34C24 46 36 50 44 44C32 46 24 36 26 26C28 16 36 12 40 12Z" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="2" />
          <circle cx="20" cy="18" r="1.5" fill="#e0f2fe" />
          <circle cx="16" cy="32" r="2" fill="#e0f2fe" />
          <circle cx="48" cy="22" r="1.5" fill="#e0f2fe" />
        </svg>
      );

    case 'water':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <path d="M32 12C32 12 16 32 16 42C16 50.8 23.2 56 32 56C40.8 56 48 50.8 48 42C48 32 32 12 32 12Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
          <path d="M26 38C26 34 32 24 32 24" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'mountain':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <polygon points="32,14 10,50 54,50" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
          <polygon points="32,14 26,24 32,22 38,26" fill="#f8fafc" />
          <polygon points="44,28 28,50 60,50" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
        </svg>
      );

    case 'palmtree':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <path d="M32 54C32 54 34 36 30 24" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          <path d="M30 24C22 18 10 20 8 26C16 28 26 26 30 24Z" fill="#15803d" stroke="#166534" strokeWidth="1.5" />
          <path d="M30 24C38 18 50 20 52 26C44 28 34 26 30 24Z" fill="#15803d" stroke="#166534" strokeWidth="1.5" />
          <path d="M30 24C30 14 34 8 32 6C28 12 28 20 30 24Z" fill="#16a34a" stroke="#166534" strokeWidth="1.5" />
        </svg>
      );

    case 'heart':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <path d="M32 52C32 52 12 36 12 22C12 15 17 10 24 10C28 10 31 12 32 14C33 12 36 10 40 10C47 10 52 15 52 22C52 36 32 52 32 52Z" fill="#e11d48" stroke="#fda4af" strokeWidth="2" />
        </svg>
      );

    case 'pen':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <path d="M44 10L54 20L24 50H14V40L44 10Z" fill="#d97706" stroke="#fef08a" strokeWidth="2" />
          <path d="M14 50L8 56" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'shield':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <path d="M32 10L48 16V32C48 44 32 54 32 54C32 54 16 44 16 32V16L32 10Z" fill="#1d4ed8" stroke="#93c5fd" strokeWidth="2" />
          <path d="M32 20V42M21 31H43" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'dawn':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <path d="M10 44H54" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 44C20 34 25 26 32 26C39 26 44 34 44 44H20Z" fill="#fbbf24" />
          <path d="M32 12V20M16 20L22 24M48 20L42 24" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'star':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <polygon points="32,8 39,24 56,24 42,35 47,51 32,41 17,51 22,35 8,24 25,24" fill="#fbbf24" stroke="#fef08a" strokeWidth="2" />
        </svg>
      );

    case 'fountain':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <rect x="16" y="44" width="32" height="10" rx="3" fill="#0d9488" stroke="#5eead4" strokeWidth="2" />
          <path d="M32 44V24M32 24C26 24 20 16 20 16M32 24C38 24 44 16 44 16" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'dates':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <ellipse cx="24" cy="34" rx="8" ry="12" fill="#78350f" stroke="#b45309" strokeWidth="2" transform="rotate(-15 24 34)" />
          <ellipse cx="40" cy="34" rx="8" ry="12" fill="#78350f" stroke="#b45309" strokeWidth="2" transform="rotate(15 40 34)" />
          <path d="M32 14V22M32 22L24 26M32 22L40 26" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'scale':
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <path d="M32 12V48M20 48H44" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
          <path d="M14 20H50" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 20L8 34H20L14 20ZM50 20L44 34H56L50 20Z" fill="#065f46" stroke="#fbbf24" strokeWidth="1.5" />
        </svg>
      );

    default:
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="20" fill="#047857" stroke="#fbbf24" strokeWidth="2" />
        </svg>
      );
  }
};
