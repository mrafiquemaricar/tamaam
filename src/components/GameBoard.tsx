import React, { useState, useEffect } from 'react';
import { CardItem } from '../types/game';
import { Card } from './Card';
import { soundManager } from '../utils/sound';
import { triggerHaptic, hapticPatterns } from '../utils/haptics';

interface GameBoardProps {
  cards: CardItem[];
  onMatch: (pairId: string) => void;
  onMismatch: () => void;
  isPaused: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  cards: initialCards,
  onMatch,
  onMismatch,
  isPaused,
}) => {
  const [cards, setCards] = useState<CardItem[]>(initialCards);
  const [flippedCards, setFlippedCards] = useState<CardItem[]>([]);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [shakingCardIds, setShakingCardIds] = useState<string[]>([]);

  // Update internal cards state if props change (e.g. game restart)
  useEffect(() => {
    setCards(initialCards);
    setFlippedCards([]);
    setIsEvaluating(false);
    setShakingCardIds([]);
  }, [initialCards]);

  const handleCardClick = (clickedCard: CardItem) => {
    if (isEvaluating || isPaused || clickedCard.isFlipped || clickedCard.isMatched) {
      return;
    }

    // Play click sound & haptics
    soundManager.playFlip();
    triggerHaptic(hapticPatterns.flip);

    // Flip target card
    const updatedCards = cards.map((c) =>
      c.id === clickedCard.id ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    // When 2 cards are face up, evaluate match
    if (newFlipped.length === 2) {
      setIsEvaluating(true);

      const [firstCard, secondCard] = newFlipped;

      if (firstCard.pairId === secondCard.pairId) {
        // MATCH FOUND!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === firstCard.pairId
                ? { ...c, isFlipped: true, isMatched: true }
                : c
            )
          );
          setFlippedCards([]);
          setIsEvaluating(false);

          soundManager.playMatch();
          triggerHaptic(hapticPatterns.match);
          onMatch(firstCard.pairId);
        }, 300);
      } else {
        // MISMATCH!
        setTimeout(() => {
          setShakingCardIds([firstCard.id, secondCard.id]);
          soundManager.playMismatch();
          triggerHaptic(hapticPatterns.mismatch);
          onMismatch();
        }, 300);

        // Flip back after short delay (~600ms)
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id || c.id === secondCard.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setShakingCardIds([]);
          setIsEvaluating(false);
        }, 900);
      }
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-1 sm:p-3 overflow-hidden">
      {/* 
        Responsive Viewport Grid:
        Portrait (default): 4 columns x 6 rows
        Landscape / Wide: 6 columns x 4 rows
        Calculates max height so the board never requires page scroll!
      */}
      <div className="w-full h-full max-w-2xl max-h-[calc(100vh-70px)] grid grid-cols-4 portrait:grid-cols-4 landscape:grid-cols-6 gap-1.5 sm:gap-2.5 justify-items-center items-center">
        {cards.map((card) => (
          <div key={card.id} className="w-full h-full min-h-0 flex items-center justify-center">
            <Card
              card={card}
              isShaking={shakingCardIds.includes(card.id)}
              onCardClick={handleCardClick}
              disabled={isEvaluating || isPaused || card.isMatched || card.isFlipped}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
