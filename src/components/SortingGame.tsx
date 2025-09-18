import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, Home, ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { SuccessFeedback } from "./SuccessFeedback";
import { SpeechButton } from "./SpeechButton";
import { italianNumbers, ItalianNumber } from "../data/lessons";

interface MatchingPair {
  id: string;
  number: number;
  italian: string;
}

interface SortingGameProps {
  pairs: MatchingPair[];
  onComplete: (score: number, totalQuestions: number, attempts: number) => void;
  onHeartLost: () => void;
  onHome?: () => void;
}

interface SortingItem {
  id: string;
  value: string | number;
  type: "number" | "italian";
  pairId: string;
  isMatched: boolean;
}

export function SortingGame({ pairs, onComplete, onHeartLost, onHome }: SortingGameProps) {
  const [leftItems, setLeftItems] = useState<SortingItem[]>([]);
  const [rightItems, setRightItems] = useState<SortingItem[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);
  const [currentMatchedNumber, setCurrentMatchedNumber] = useState<ItalianNumber | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [wrongMatch, setWrongMatch] = useState<{ left: string | null; right: string | null }>({ left: null, right: null });

  useEffect(() => {
    // Create left (numbers) and right (italian) items
    const leftSide: SortingItem[] = pairs.map((pair) => ({
      id: `${pair.id}-number`,
      value: pair.number,
      type: "number",
      pairId: pair.id,
      isMatched: false,
    }));

    const rightSide: SortingItem[] = pairs.map((pair) => ({
      id: `${pair.id}-italian`,
      value: pair.italian,
      type: "italian",
      pairId: pair.id,
      isMatched: false,
    }));

    // Shuffle right side for difficulty
    const shuffledRight = rightSide.sort(() => Math.random() - 0.5);
    
    setLeftItems(leftSide);
    setRightItems(shuffledRight);
  }, [pairs]);

  const handleItemClick = (itemId: string, side: "left" | "right") => {
    if (side === "left") {
      setSelectedLeft(selectedLeft === itemId ? null : itemId);
    } else {
      setSelectedRight(selectedRight === itemId ? null : itemId);
    }

    // Check for match when both items are selected
    if (selectedLeft && side === "right") {
      checkMatch(selectedLeft, itemId);
    } else if (selectedRight && side === "left") {
      checkMatch(itemId, selectedRight);
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    setAttempts(attempts + 1);
    
    const leftItem = leftItems.find(item => item.id === leftId);
    const rightItem = rightItems.find(item => item.id === rightId);

    if (leftItem && rightItem && leftItem.pairId === rightItem.pairId) {
      // Match found!
      setScore(score + 1);
      setMatchedPairs([...matchedPairs, leftItem.pairId]);
      
      // Update items to show as matched
      setLeftItems(prev => prev.map(item => 
        item.id === leftId ? { ...item, isMatched: true } : item
      ));
      setRightItems(prev => prev.map(item => 
        item.id === rightId ? { ...item, isMatched: true } : item
      ));

      // Show success feedback
      const pair = pairs.find(p => p.id === leftItem.pairId);
      if (pair) {
        const matchedNumber = italianNumbers.find(n => n.number === pair.number);
        if (matchedNumber) {
          setCurrentMatchedNumber(matchedNumber);
          setShowSuccessFeedback(true);
        }
      }

      // Reset selections immediately for correct match
      setSelectedLeft(null);
      setSelectedRight(null);

      // Check if game is complete
      if (matchedPairs.length + 1 === pairs.length) {
        setTimeout(() => {
          onComplete(score + 1, pairs.length, attempts + 1);
        }, 2000);
      }
    } else {
      // Wrong match - show shake animation but continue game
      setWrongMatch({ left: leftId, right: rightId });
      setTimeout(() => {
        setWrongMatch({ left: null, right: null });
        setSelectedLeft(null);
        setSelectedRight(null);
        // Continue game without losing heart - just show visual feedback
      }, 800);
    }
  };

  const progress = (matchedPairs.length / pairs.length) * 100;

  return (
    <div className="min-h-screen bg-italian-food-pattern p-4 font-['Pretendard']">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-semibold text-[var(--italian-gray-700)]">
            <span>매칭: {matchedPairs.length}/{pairs.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3 bg-[var(--italian-gray-200)]" />
        </div>

        {/* Instructions */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[var(--italian-gray-900)]">
            숫자와 이탈리아어를 연결하세요!
          </h2>
          <p className="text-[var(--italian-gray-600)] font-medium">
            왼쪽 숫자와 오른쪽 이탈리아어를 하나씩 선택해서 짝을 맞춰보세요
          </p>
          <div className="flex items-center justify-center gap-2 text-[var(--italian-green)] font-medium">
            <span>숫자</span>
            <ArrowDown className="w-4 h-4 rotate-[-45deg]" />
            <span>이탈리아어</span>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Side - Numbers */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-center text-[var(--italian-green)] bg-[var(--italian-green-50)] py-2 rounded-2xl">
              숫자
            </h3>
            <div className="space-y-3">
              {leftItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={!item.isMatched ? { scale: 1.02 } : {}}
                  whileTap={!item.isMatched ? { scale: 0.98 } : {}}
                  animate={wrongMatch.left === item.id ? {
                    x: [-4, 4, -4, 4, -2, 2, 0],
                    transition: { duration: 0.6, ease: "easeInOut" }
                  } : {}}
                  onClick={() => !item.isMatched && handleItemClick(item.id, "left")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 min-h-[80px] ${
                    item.isMatched
                      ? "bg-[var(--italian-green-100)] border-[var(--italian-green)] cursor-default"
                      : selectedLeft === item.id
                      ? "bg-[var(--italian-green-50)] border-[var(--italian-green)] shadow-flat-3"
                      : wrongMatch.left === item.id
                      ? "bg-[var(--italian-red-50)] border-[var(--italian-red)]"
                      : "bg-white border-[var(--italian-gray-200)] hover:border-[var(--italian-green)] shadow-flat-1"
                  }`}
                >
                  <div className="flex items-center justify-center h-full relative">
                    <span className="text-2xl font-bold text-[var(--italian-green)]">
                      {item.value}
                    </span>
                    {item.isMatched && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-2"
                      >
                        <CheckCircle className="w-6 h-6 text-[var(--italian-green)]" />
                      </motion.div>
                    )}
                    {/* Speech button for numbers */}
                    <div className="absolute top-1 right-1" onClick={(e) => e.stopPropagation()}>
                      <SpeechButton 
                        text={item.value.toString()} 
                        size="sm"
                        variant="ghost"
                        className="border-[var(--italian-green-300)] text-[var(--italian-green)] hover:bg-[var(--italian-green)] hover:text-white"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - Italian Words */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-center text-[var(--italian-red)] bg-[var(--italian-red-50)] py-2 rounded-2xl">
              이탈리아어
            </h3>
            <div className="space-y-3">
              {rightItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={!item.isMatched ? { scale: 1.02 } : {}}
                  whileTap={!item.isMatched ? { scale: 0.98 } : {}}
                  animate={wrongMatch.right === item.id ? {
                    x: [-4, 4, -4, 4, -2, 2, 0],
                    transition: { duration: 0.6, ease: "easeInOut" }
                  } : {}}
                  onClick={() => !item.isMatched && handleItemClick(item.id, "right")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 min-h-[80px] ${
                    item.isMatched
                      ? "bg-[var(--italian-red-100)] border-[var(--italian-red)] cursor-default"
                      : selectedRight === item.id
                      ? "bg-[var(--italian-red-50)] border-[var(--italian-red)] shadow-flat-3"
                      : wrongMatch.right === item.id
                      ? "bg-[var(--italian-red-50)] border-[var(--italian-red)]"
                      : "bg-white border-[var(--italian-gray-200)] hover:border-[var(--italian-red)] shadow-flat-1"
                  }`}
                >
                  <div className="flex items-center justify-center h-full relative">
                    <span className="text-2xl font-bold text-[var(--italian-red)] italic">
                      {item.value}
                    </span>
                    {item.isMatched && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-2"
                      >
                        <CheckCircle className="w-6 h-6 text-[var(--italian-red)]" />
                      </motion.div>
                    )}
                    {/* Speech button for Italian words */}
                    <div className="absolute top-1 right-1" onClick={(e) => e.stopPropagation()}>
                      <SpeechButton 
                        text={item.value.toString()} 
                        size="sm"
                        variant="ghost"
                        className="border-[var(--italian-red-300)] text-[var(--italian-red)] hover:bg-[var(--italian-red)] hover:text-white"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Attempts Counter */}
        <div className="text-center text-[var(--italian-gray-600)] font-medium">
          시도 횟수: {attempts}
        </div>
      </div>

      {/* Success Feedback */}
      {currentMatchedNumber && (
        <SuccessFeedback
          number={currentMatchedNumber}
          isVisible={showSuccessFeedback}
          onClose={() => {
            setShowSuccessFeedback(false);
            setCurrentMatchedNumber(null);
          }}
        />
      )}

      {/* Home Button */}
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