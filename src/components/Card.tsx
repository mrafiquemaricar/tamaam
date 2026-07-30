import React from 'react';
import { CardItem } from '../types/game';
import { Check } from 'lucide-react';
import { QuranIcon } from './QuranIcons';

interface CardProps {
  card: CardItem;
  isShaking: boolean;
  onCardClick: (card: CardItem) => void;
  disabled: boolean;
}

export const Card: React.FC<CardProps> = ({ card, isShaking, onCardClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onCardClick(card);
    }
  };

  const isFlippedOrMatched = card.isFlipped || card.isMatched;

  // Granular Container Query & Length-based Font Sizing Helpers
  const getArabicFontSize = (text?: string) => {
    if (!text) return '';
    const len = text.length;
    if (len > 18) return 'text-[10px] sm:text-xs leading-tight';
    if (len > 13) return 'text-[11px] sm:text-sm leading-tight';
    if (len > 8) return 'text-xs sm:text-base leading-snug';
    if (len > 5) return 'text-sm sm:text-lg leading-snug';
    return 'text-base sm:text-xl leading-snug';
  };

  const getEnglishFontSize = (text?: string) => {
    if (!text) return '';
    const len = text.length;
    if (len > 22) return 'text-[8px] sm:text-[10px] leading-none font-semibold';
    if (len > 15) return 'text-[9px] sm:text-xs leading-tight font-bold';
    if (len > 9) return 'text-[10px] sm:text-xs leading-tight font-bold';
    return 'text-xs sm:text-sm leading-tight font-extrabold';
  };

  const getBadgeLabel = () => {
    if (card.type === 'arabic') return 'AR';
    if (card.type === 'english') return 'EN';
    if (card.type.startsWith('symbol')) return 'IMG';
    if (card.type === 'hybrid_symbol') return 'IMG';
    return 'WORD';
  };

  return (
    <div
      onClick={handleClick}
      className={`relative w-full h-full perspective-1000 cursor-pointer touch-manipulation select-none transition-transform duration-150 active:scale-95 ${
        card.isMatched ? 'cursor-default' : ''
      }`}
      role="button"
      tabIndex={0}
      aria-label={`Memory card: ${card.mainText || card.iconKey}`}
    >
      <div
        className={`w-full h-full rounded-lg sm:rounded-xl shadow-md transform-style-3d relative ${
          isFlippedOrMatched ? 'rotate-y-180' : ''
        } ${isShaking ? 'animate-shake' : ''}`}
      >
        {/* ================= CARD BACK (Face Down) ================= */}
        <div className="absolute inset-0 w-full h-full rounded-lg sm:rounded-xl bg-islamic-pattern border border-amber-500/40 shadow-inner flex items-center justify-center backface-hidden overflow-hidden group">
          {/* Subtle Golden Inner Border */}
          <div className="absolute inset-1 border border-amber-400/30 rounded pointer-events-none" />

          {/* Central Emblem */}
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-900/90 border border-amber-400/60 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-amber-400/20" viewBox="0 0 24 24">
              <path d="M12 2L14.5 8.5L21 9L16 13.5L18 20L12 16L6 20L8 13.5L3 9L9.5 8.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* ================= CARD FRONT (Face Up) ================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-lg sm:rounded-xl border rotate-y-180 backface-hidden p-1 flex flex-col justify-between items-center text-center overflow-hidden transition-all duration-300 relative ${
            card.isMatched
              ? 'bg-gradient-to-b from-emerald-900/95 to-teal-950/95 border-amber-400/80 text-amber-100 animate-match shadow-amber-500/20'
              : card.iconKey
              ? 'bg-slate-900/95 border-amber-400/60 text-slate-100 shadow-md'
              : card.type === 'arabic'
              ? 'bg-slate-900/95 border-amber-500/60 text-slate-100 shadow-md'
              : 'bg-slate-900/95 border-teal-500/60 text-slate-100 shadow-md'
          }`}
        >
          {/* ABSOLUTE FLOATING BADGES */}
          <div className="absolute top-0.5 left-0.5 z-10">
            <span
              className={`text-[7px] sm:text-[8px] font-bold tracking-tight uppercase px-1 py-0.25 rounded ${
                card.iconKey
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : card.type === 'arabic'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
              }`}
            >
              {getBadgeLabel()}
            </span>
          </div>

          {card.isMatched && (
            <div className="absolute top-0.5 right-0.5 z-10">
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow-sm">
                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
              </span>
            </div>
          )}

          {/* MAIN CARD CONTENT (SVG IMAGE OR TEXT) */}
          <div className="flex-1 w-full flex flex-col items-center justify-center px-0.5 pt-3.5 pb-0.5 min-h-0 text-center">
            {card.iconKey ? (
              <div className="flex flex-col items-center justify-center space-y-1 my-auto">
                <QuranIcon iconKey={card.iconKey} className="w-9 h-9 sm:w-12 sm:h-12 drop-shadow-md hover:scale-105 transition-transform" />
                {card.mainText && (
                  <span className="text-[10px] sm:text-xs font-bold text-amber-300 leading-tight">
                    {card.mainText}
                  </span>
                )}
              </div>
            ) : card.type === 'arabic' || (card.mainText && /[\u0600-\u06FF]/.test(card.mainText)) ? (
              <span
                dir="rtl"
                className={`font-arabic text-amber-200 font-bold drop-shadow-sm select-none break-words max-w-full ${getArabicFontSize(
                  card.mainText
                )}`}
              >
                {card.mainText}
              </span>
            ) : (
              <span
                className={`font-sans text-slate-100 drop-shadow-sm select-none break-words max-w-full ${getEnglishFontSize(
                  card.mainText
                )}`}
              >
                {card.mainText}
              </span>
            )}
          </div>

          {/* SECONDARY SUBTEXT LABEL */}
          {card.subText && (
            <div className="w-full pt-0.5 border-t border-slate-800/80 shrink-0">
              {/[\u0600-\u06FF]/.test(card.subText) ? (
                <span
                  dir="rtl"
                  className="block font-arabic text-[9px] sm:text-[11px] text-amber-400/90 font-medium leading-tight whitespace-normal break-words px-0.5 max-w-full"
                >
                  {card.subText}
                </span>
              ) : (
                <span className="block text-[8px] sm:text-[10px] text-slate-400 font-medium leading-tight whitespace-normal break-words px-0.5 max-w-full">
                  {card.subText}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
