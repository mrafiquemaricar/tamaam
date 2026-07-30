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
        className={`w-full h-full rounded-xl transform-style-3d relative ${
          isFlippedOrMatched ? 'rotate-y-180' : ''
        } ${isShaking ? 'animate-shake' : ''}`}
      >
        {/* ================= CARD BACK (Face Down - Flat & Minimal) ================= */}
        <div className="absolute inset-0 w-full h-full rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center backface-hidden overflow-hidden group">
          {/* Subtle Flat Corner Accents */}
          <div className="absolute inset-1 border border-slate-700/40 rounded-lg pointer-events-none" />

          {/* Central Flat Emblem */}
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-indigo-500/80 transform rotate-45" />
          </div>
        </div>

        {/* ================= CARD FRONT (Face Up - Flat & Contemporary) ================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-xl border rotate-y-180 backface-hidden p-1 flex flex-col justify-between items-center text-center overflow-hidden transition-all duration-200 relative ${
            card.isMatched
              ? 'bg-emerald-950/90 border-2 border-emerald-400 text-emerald-100 animate-match'
              : card.type === 'arabic'
              ? 'bg-slate-900 border-2 border-amber-500/50 text-slate-100'
              : card.iconKey
              ? 'bg-slate-900 border-2 border-purple-500/50 text-slate-100'
              : 'bg-slate-900 border-2 border-indigo-500/50 text-slate-100'
          }`}
        >
          {/* ABSOLUTE FLOATING BADGES */}
          <div className="absolute top-1 left-1 z-10">
            <span
              className={`text-[8px] sm:text-[9px] font-extrabold tracking-wider uppercase px-1.5 py-0.5 rounded-md ${
                card.type === 'arabic'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : card.iconKey
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                  : 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
              }`}
            >
              {getBadgeLabel()}
            </span>
          </div>

          {card.isMatched && (
            <div className="absolute top-1 right-1 z-10">
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-bold">
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
              </span>
            </div>
          )}

          {/* MAIN CARD CONTENT */}
          <div className="flex-1 w-full flex flex-col items-center justify-center px-1 pt-4 pb-1 min-h-0 text-center">
            {card.iconKey ? (
              <div className="flex flex-col items-center justify-center space-y-1 my-auto">
                <QuranIcon iconKey={card.iconKey} className="w-9 h-9 sm:w-12 sm:h-12" />
                {card.mainText && (
                  <span className="text-[10px] sm:text-xs font-bold text-slate-200 leading-tight">
                    {card.mainText}
                  </span>
                )}
              </div>
            ) : card.type === 'arabic' || (card.mainText && /[\u0600-\u06FF]/.test(card.mainText)) ? (
              <span
                dir="rtl"
                className={`font-arabic text-amber-300 font-bold select-none break-words max-w-full ${getArabicFontSize(
                  card.mainText
                )}`}
              >
                {card.mainText}
              </span>
            ) : (
              <span
                className={`font-sans text-slate-100 select-none break-words max-w-full ${getEnglishFontSize(
                  card.mainText
                )}`}
              >
                {card.mainText}
              </span>
            )}
          </div>

          {/* SECONDARY SUBTEXT LABEL */}
          {card.subText && (
            <div className="w-full pt-1 border-t border-slate-800 shrink-0">
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
