import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, XCircle, ArrowRight, Home, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { SuccessFeedback } from "./SuccessFeedback";
import { MatchingGame } from "./MatchingGame";
import { SpeechButton } from "./SpeechButton";
import { italianNumbers, ItalianNumber, generateMatchingPairs } from "../data/lessons";

interface Question {
  number: number;
  italian: string;
  options: string[];
  correct: string;
}

interface QuizScreenProps {
  questions: Question[];
  onComplete: (score: number, totalQuestions: number) => void;
  onHeartLost: () => void;
  onHome?: () => void;
}

export function QuizScreen({ questions, onComplete, onHeartLost, onHome }: QuizScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);
  const [currentCorrectNumber, setCurrentCorrectNumber] = useState<ItalianNumber | null>(null);
  const [showBonusGame, setShowBonusGame] = useState(false);
  const [bonusScore, setBonusScore] = useState(0);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const totalQuestions = 5; // 5 quiz questions
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    setShowFeedback(true);

    const isCorrect = answer === question.correct;
    
    if (isCorrect) {
      setScore(score + 1);
      // Show success feedback for correct answers
      const correctNumber = italianNumbers.find(n => n.number === question.number);
      if (correctNumber) {
        setCurrentCorrectNumber(correctNumber);
        setTimeout(() => {
          setShowSuccessFeedback(true);
        }, 1000);
      }
    } else {
      // Show incorrect feedback but continue without losing heart
    }

    setTimeout(() => {
      if (currentQuestion + 1 < totalQuestions) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setShowFeedback(false);
      } else {
        // Start bonus game after 5 questions
        setShowBonusGame(true);
      }
    }, isCorrect ? 4000 : 2000);
  };

  const handleBonusComplete = (bonusGameScore: number, bonusTotal: number) => {
    setBonusScore(bonusGameScore);
    // Complete with total score from both quiz and bonus
    onComplete(score + bonusGameScore, totalQuestions + bonusTotal);
  };

  const isCorrect = selectedAnswer === question.correct;

  // Show bonus matching game
  if (showBonusGame) {
    // Create pairs from the questions for bonus game
    const bonusPairs = questions.slice(0, 5).map((q, index) => ({
      id: `bonus-${index}`,
      number: q.number,
      italian: q.italian,
    }));
    const matchingPairs = generateMatchingPairs(bonusPairs.map(p => ({
      number: p.number,
      italian: p.italian,
      pronunciation: "",
      korean: "",
      english: "",
    })));

    return (
      <div className="min-h-screen bg-italian-food-pattern">
        {/* Bonus Game Header */}
        <div className="bg-gradient-to-r from-[var(--italian-green)] to-[var(--italian-red)] p-4 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center justify-center gap-2 mb-2"
            >
              <Star className="w-6 h-6 text-yellow-300" />
              <h2 className="text-2xl font-bold">보너스 라운드!</h2>
              <Star className="w-6 h-6 text-yellow-300" />
            </motion.div>
            <p className="text-lg opacity-90">
              퀴즈를 완료했어요! 이제 카드 매칭으로 복습해보세요
            </p>
          </div>
        </div>
        
        <MatchingGame
          pairs={matchingPairs}
          onComplete={handleBonusComplete}
          onHeartLost={onHeartLost}
          onHome={onHome}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-italian-food-pattern p-4 font-['Pretendard']">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-semibold text-[var(--italian-gray-700)]">
            <span>문제 {currentQuestion + 1}/{totalQuestions}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3 bg-[var(--italian-gray-200)]" />
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="bg-white rounded-3xl p-8 shadow-flat-2 border border-[var(--italian-gray-100)]">
            <h2 className="text-3xl font-bold mb-4 text-[var(--italian-gray-900)]">다음 숫자는?</h2>
            <div className="relative">
              <div className="text-7xl font-bold text-[var(--italian-green)] mb-8">
                {question.number}
              </div>
              {/* Speech button for the number */}
              <div className="absolute top-2 right-2">
                <SpeechButton 
                  text={question.number.toString()} 
                  size="md"
                />
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === question.correct;
              
              let buttonStyle = "bg-white border-2 border-[var(--italian-green)] text-[var(--italian-green)] hover:bg-[var(--italian-green-50)] shadow-flat-2 hover:shadow-flat-3";
              
              if (isAnswered) {
                if (isCorrectOption) {
                  buttonStyle = "bg-[var(--italian-green)] border-2 border-[var(--italian-green)] text-white shadow-flat-3";
                } else if (isSelected && !isCorrectOption) {
                  buttonStyle = "bg-[var(--italian-red)] border-2 border-[var(--italian-red)] text-white shadow-flat-2";
                } else {
                  buttonStyle = "bg-[var(--italian-gray-100)] border-2 border-[var(--italian-gray-300)] text-[var(--italian-gray-600)] shadow-flat-1";
                }
              } else if (isSelected) {
                buttonStyle = "bg-[var(--italian-green-100)] border-2 border-[var(--italian-green)] text-[var(--italian-green)] shadow-flat-3";
              }

              return (
                <motion.div
                  key={option}
                  whileHover={!isAnswered ? { scale: 1.02 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                >
                  <Button
                    onClick={() => handleAnswerSelect(option)}
                    disabled={isAnswered}
                    className={`w-full h-16 text-xl font-semibold rounded-2xl transition-all duration-200 ${buttonStyle}`}
                    variant="outline"
                  >
                    <div className="flex items-center justify-center w-full">
                      <span className="text-center">{option}</span>
                      {isAnswered && isCorrectOption && (
                        <CheckCircle className="w-7 h-7 text-white ml-2" />
                      )}
                      {isAnswered && isSelected && !isCorrectOption && (
                        <XCircle className="w-7 h-7 text-white ml-2" />
                      )}
                    </div>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Feedback Animation */}
        <AnimatePresence>
          {showFeedback && !isCorrect && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
            >
              <motion.div
                className="text-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
              >
                <motion.div
                  initial={{ rotate: 0, scale: 1 }}
                  animate={{ 
                    rotate: [-5, 5, -5, 5, 0],
                    scale: [1, 1.2, 1, 1.1, 1]
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="text-9xl mb-4"
                >
                  😅
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="bg-white rounded-2xl p-6 shadow-flat-3 max-w-sm mx-4"
                >
                  <h3 className="text-2xl font-bold text-[var(--italian-red)] mb-2 italian-script">
                    Ops! 다시 해보세요
                  </h3>
                  <p className="text-lg text-[var(--italian-gray-600)]">
                    괜찮아요, 다시 도전! 💪
                  </p>
                  
                  {/* Cute floating hearts */}
                  {['💙', '💚', '❤️'].map((heart, i) => (
                    <motion.span
                      key={i}
                      className="absolute text-2xl"
                      style={{
                        left: `${30 + i * 25}%`,
                        top: `${20 + (i % 2) * 20}%`,
                      }}
                      initial={{ opacity: 0, scale: 0, y: 10 }}
                      animate={{ 
                        opacity: [0, 1, 0], 
                        scale: [0, 1, 0.5], 
                        y: [10, -20, -40],
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        duration: 2, 
                        delay: 0.5 + i * 0.2,
                        ease: "easeOut"
                      }}
                    >
                      {heart}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Feedback */}
        {currentCorrectNumber && (
          <SuccessFeedback
            number={currentCorrectNumber}
            isVisible={showSuccessFeedback}
            onClose={() => {
              setShowSuccessFeedback(false);
              setCurrentCorrectNumber(null);
            }}
          />
        )}

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
    </div>
  );
}