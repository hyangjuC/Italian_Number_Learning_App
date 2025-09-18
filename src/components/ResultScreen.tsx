import { motion } from "motion/react";
import { Star, Trophy, RotateCcw, Home, Gift, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  attempts?: number;
  xpEarned: number;
  newBadge?: string;
  medal?: "gold" | "silver" | "bronze" | null;
  stars?: number;
  onRestart: () => void;
  onHome: () => void;
  onNextLesson?: () => void;
  hasNextLesson?: boolean;
}

export function ResultScreen({
  score,
  totalQuestions,
  attempts,
  xpEarned,
  newBadge,
  medal,
  stars: providedStars,
  onRestart,
  onHome,
  onNextLesson,
  hasNextLesson,
}: ResultScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  // 제공된 별 개수가 있으면 사용, 없으면 기본 계산
  const stars = providedStars !== undefined ? providedStars : Math.ceil((score / totalQuestions) * 3);

  const getResultMessage = () => {
    if (medal === "gold") return "완벽해요! 🎉";
    if (medal === "silver") return "훌륭해요! 👏";
    if (medal === "bronze") return "잘했어요! 💪";
    if (score === totalQuestions) return "완벽해요! 🎉";
    if (percentage >= 80) return "훌륭해요! 👏";
    if (percentage >= 60) return "잘했어요! 💪";
    if (percentage >= 40) return "좋은 시도예요! 🌟";
    return "다시 도전해보세요! 📚";
  };

  const getResultEmoji = () => {
    if (medal === "gold") return "🥇";
    if (medal === "silver") return "🥈";
    if (medal === "bronze") return "🥉";
    if (score === totalQuestions) return "🥇";
    if (percentage >= 80) return "🥈";
    if (percentage >= 60) return "🥉";
    if (percentage >= 40) return "💪";
    return "📖";
  };

  const getResultColor = () => {
    if (score === totalQuestions) return "bg-[var(--italian-green-50)]";
    if (percentage >= 80) return "bg-[var(--italian-green-50)]";
    if (percentage >= 60) return "bg-[var(--italian-gray-50)]";
    if (percentage >= 40) return "bg-[var(--italian-gray-50)]";
    return "bg-[var(--italian-gray-50)]";
  };

  return (
    <div className={`min-h-screen ${getResultColor()} p-4 flex items-center justify-center font-['Pretendard']`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Main Result */}
        <div className="bg-white rounded-3xl p-8 shadow-flat-3 border border-[var(--italian-gray-100)] text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="text-8xl"
          >
            {getResultEmoji()}
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-2xl">{getResultMessage()}</h2>
            <p className="text-gray-600">
              {score}/{totalQuestions} 문제를 맞췄어요!
            </p>
            {attempts && (
              <p className="text-sm text-[var(--italian-gray-500)]">
                총 {attempts}회 시도했어요!
              </p>
            )}
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              >
                <Star
                  className={`w-8 h-8 ${
                    i < stars
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </motion.div>
            ))}
          </div>

          {/* XP Earned */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-[var(--italian-green-50)] rounded-2xl p-4 border border-[var(--italian-green-200)]"
          >
            <div className="flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-[var(--italian-green)] fill-[var(--italian-green)]" />
              <span className="text-[var(--italian-green-800)] font-medium">
                +{xpEarned} XP 획득!
              </span>
            </div>
          </motion.div>

          {/* New Badge */}
          {newBadge && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="bg-[var(--italian-red-50)] rounded-2xl p-4 border border-[var(--italian-red-200)]"
            >
              <div className="flex items-center justify-center gap-2">
                <Gift className="w-5 h-5 text-[var(--italian-red)]" />
                <span className="text-[var(--italian-red-800)] font-medium">
                  새 배지: {newBadge}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="space-y-3"
        >
          {/* Next Lesson Button (shown first if available) */}
          {hasNextLesson && onNextLesson && (
            <Button
              onClick={onNextLesson}
              className="w-full h-14 bg-[var(--italian-green)] hover:bg-[var(--italian-green-dark)] text-white rounded-2xl shadow-flat-2 hover:shadow-flat-3 transition-all duration-200"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              다음 단계 도전하기
            </Button>
          )}
          
          <Button
            onClick={onRestart}
            variant={hasNextLesson ? "outline" : "default"}
            className={`w-full h-14 rounded-2xl shadow-flat-2 hover:shadow-flat-3 transition-all duration-200 ${
              hasNextLesson 
                ? "border-2 border-[var(--italian-gray-300)] hover:bg-[var(--italian-gray-50)]" 
                : "bg-[var(--italian-green)] hover:bg-[var(--italian-green-dark)] text-white"
            }`}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            다시 도전하기
          </Button>
          
          <Button
            onClick={onHome}
            variant="outline"
            className="w-full h-14 border-2 border-[var(--italian-gray-300)] rounded-2xl shadow-flat-1 hover:shadow-flat-2 hover:bg-[var(--italian-gray-50)] transition-all duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            홈으로 돌아가기
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}