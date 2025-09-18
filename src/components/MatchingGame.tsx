import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, Home } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { SpeechButton } from "./SpeechButton";
import { italianNumbers, ItalianNumber } from "../data/lessons";

interface MatchingPair {
  id: string;
  number: number;
  italian: string;
}

interface MatchingGameProps {
  pairs: MatchingPair[];
  onComplete: (score: number, totalQuestions: number) => void;
  onHeartLost: () => void;
  onHome?: () => void;
}

interface Card {
  id: string;
  value: string | number;
  type: "number" | "italian";
  pairId: string;
}

export function MatchingGame({ pairs, onComplete, onHeartLost, onHome }: MatchingGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [wrongCards, setWrongCards] = useState<string[]>([]);

  useEffect(() => {
    // Create cards array from pairs
    const gameCards: Card[] = [];
    pairs.forEach((pair) => {
      gameCards.push({
        id: `${pair.id}-number`,
        value: pair.number,
        type: "number",
        pairId: pair.id,
      });
      gameCards.push({
        id: `${pair.id}-italian`,
        value: pair.italian,
        type: "italian",
        pairId: pair.id,
      });
    });
    
    // Shuffle cards once and keep position fixed
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);

    // Start preview phase
    setShowPreview(true);
    setGameStarted(false);
    setCountdown(5);

    // Countdown timer
    const timer = setTimeout(() => {
      setShowPreview(false);
      setGameStarted(true);
    }, 5000);

    // Countdown updates
    const countdownTimers: NodeJS.Timeout[] = [];
    for (let i = 1; i <= 4; i++) {
      countdownTimers.push(
        setTimeout(() => {
          setCountdown(5 - i);
        }, i * 1000)
      );
    }

    return () => {
      clearTimeout(timer);
      countdownTimers.forEach(clearTimeout);
    };
  }, [pairs]);

  const handleCardClick = (cardId: string) => {
    if (!gameStarted) return; // Prevent clicking during preview
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (matchedPairs.includes(cardId)) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setAttempts(attempts + 1);
      
      const card1 = cards.find(c => c.id === newFlippedCards[0]);
      const card2 = cards.find(c => c.id === newFlippedCards[1]);

      if (card1 && card2 && card1.pairId === card2.pairId) {
        // Match found
        setTimeout(() => {
          setMatchedPairs([...matchedPairs, card1.id, card2.id]);
          setFlippedCards([]);
          setScore(score + 1);
          
          // Check if game is complete
          if (matchedPairs.length + 2 === cards.length) {
            // Show congratulations before completing
            setShowCongratulations(true);
            setTimeout(() => {
              onComplete(score + 1, pairs.length);
            }, 3000);
          }
        }, 800);
      } else {
        // No match - show shake animation and reset
        setWrongCards([card1.id, card2.id]);
        setTimeout(() => {
          setFlippedCards([]);
          setWrongCards([]);
          // Continue game without losing heart - just show visual feedback
        }, 1000);
      }
    }
  };

  const progress = (matchedPairs.length / cards.length) * 100;

  return (
    <div className="min-h-screen bg-italian-food-pattern p-4 font-['Pretendard']">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-semibold text-[var(--italian-gray-700)]">
            <span>매칭: {matchedPairs.length / 2}/{pairs.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3 bg-[var(--italian-gray-200)]" />
        </div>

        {/* Instructions */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3 text-[var(--italian-gray-900)]">숫자와 이탈리아어를 짝지으세요!</h2>
          {showPreview ? (
            <motion.p 
              className="text-[var(--italian-green)] font-semibold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              카드 위치를 기억하세요! ({countdown}초)
            </motion.p>
          ) : (
            <p className="text-[var(--italian-gray-600)] font-medium">카드를 두 개씩 선택하여 같은 의미끼리 맞춰보세요</p>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {cards.map((card) => {
            const isFlipped = flippedCards.includes(card.id);
            const isMatched = matchedPairs.includes(card.id);
            const shouldShowFront = showPreview || isFlipped || isMatched;
            
            return (
              <motion.div
                key={card.id}
                whileHover={!isMatched && gameStarted && !flippedCards.includes(card.id) ? { scale: 1.05 } : {}}
                whileTap={!isMatched && gameStarted && !flippedCards.includes(card.id) ? { scale: 0.95 } : {}}
                animate={wrongCards.includes(card.id) ? {
                  x: [-3, 3, -3, 3, -2, 2, 0],
                  transition: { duration: 0.6, ease: "easeInOut" }
                } : {}}
                className="aspect-square"
              >
                <div
                  onClick={() => handleCardClick(card.id)}
                  className={`relative w-full h-full transition-all duration-300 transform-gpu ${
                    isMatched || !gameStarted || flippedCards.includes(card.id) ? "cursor-default" : "cursor-pointer"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: shouldShowFront ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Card Back */}
                  <div
                    className="absolute inset-0 bg-italian-primary-gradient rounded-2xl flex items-center justify-center shadow-flat-2"
                    style={{
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="text-white text-3xl font-bold">🇮🇹</div>
                  </div>

                  {/* Card Front */}
                  <div
                    className={`absolute inset-0 rounded-2xl flex items-center justify-center shadow-flat-2 p-3 ${
                      isMatched 
                        ? "bg-[var(--italian-green-100)] border-2 border-[var(--italian-green)]" 
                        : wrongCards.includes(card.id)
                        ? "bg-[var(--italian-red-50)] border-2 border-[var(--italian-red)]"
                        : "bg-white border-2 border-[var(--italian-gray-200)]"
                    }`}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="text-center relative">
                      <div className={`font-bold ${
                        card.type === "number" ? "text-3xl text-[var(--italian-green)]" : "text-lg text-[var(--italian-red)]"
                      }`}>
                        {card.value}
                      </div>
                      {/* Speech button for cards - only show when card is visible */}
                      {shouldShowFront && !isMatched && (
                        <div className="absolute -top-1 -right-1" onClick={(e) => e.stopPropagation()}>
                          <SpeechButton 
                            text={card.value.toString()} 
                            size="sm"
                            variant="ghost"
                            className={`${
                              card.type === "number" 
                                ? "border-[var(--italian-green-300)] text-[var(--italian-green)] hover:bg-[var(--italian-green)] hover:text-white"
                                : "border-[var(--italian-red-300)] text-[var(--italian-red)] hover:bg-[var(--italian-red)] hover:text-white"
                            }`}
                          />
                        </div>
                      )}
                      {isMatched && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2"
                        >
                          <CheckCircle className="w-7 h-7 text-[var(--italian-green)] bg-white rounded-full shadow-material-1" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Attempts Counter */}
        <div className="text-center text-[var(--italian-gray-600)] font-medium">
          시도 횟수: {attempts}
        </div>
      </div>



      {/* Congratulations Modal */}
      <AnimatePresence>
        {showCongratulations && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: -100 }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 300,
                duration: 0.6
              }}
              className="bg-white rounded-3xl p-8 mx-4 max-w-md w-full text-center shadow-flat-4"
            >
              {/* Celebration Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ 
                  duration: 0.8,
                  times: [0, 0.6, 1],
                  ease: "easeOut"
                }}
                className="text-8xl mb-4"
              >
                🎉
              </motion.div>
              
              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl font-bold text-[var(--italian-green)] mb-3 italian-script"
              >
                Congratulazioni!
              </motion.h2>
              
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-xl font-semibold text-[var(--italian-gray-800)] mb-2"
              >
                축하합니다!
              </motion.p>
              
              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-lg text-[var(--italian-gray-600)] mb-6"
              >
                모든 카드를 성공적으로 매칭했어요! 🇮🇹
              </motion.p>
              
              {/* Floating confetti */}
              {['🎊', '✨', '🌟', '💫', '🎈'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + (i % 2) * 20}%`,
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0], 
                    scale: [0, 1, 1.2, 0.8], 
                    rotate: [0, 180, 360],
                    y: [0, -20, -40, -60]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    delay: 0.2 + i * 0.1,
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
              
              {/* Progress indicator */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
                className="h-1 bg-[var(--italian-green)] rounded-full mb-2"
              />
              <p className="text-sm text-[var(--italian-gray-500)]">
                잠시 후 결과 화면으로 이동합니다...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Home Button - Fixed Position */}
      {onHome && (
        <Button
          onClick={onHome}
          variant="outline"
          className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-white border-2 border-[var(--italian-green)] text-[var(--italian-green)] hover:bg-[var(--italian-green)] hover:text-white shadow-flat-3 hover:shadow-flat-4 transition-all duration-200 z-40"
        >
          <Home className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}