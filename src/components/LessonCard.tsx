import { Lock, CheckCircle, Star } from "lucide-react";
import { motion } from "motion/react";

interface LessonCardProps {
  title: string;
  level: "초급" | "중급" | "고급";
  isLocked: boolean;
  isCompleted: boolean;
  stars: number;
  maxStars: number;
  gameType: "quiz" | "matching";
  onClick: () => void;
}

export function LessonCard({
  title,
  level,
  isLocked,
  isCompleted,
  stars,
  maxStars,
  gameType,
  onClick,
}: LessonCardProps) {
  const levelColors = {
    초급: "bg-[var(--italian-green-100)] text-[var(--italian-green-800)] border-[var(--italian-green-200)]",
    중급: "bg-amber-100 text-amber-800 border-amber-200",
    고급: "bg-[var(--italian-red-100)] text-[var(--italian-red-800)] border-[var(--italian-red-200)]",
  };

  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.02 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      className={`relative p-6 rounded-3xl cursor-pointer transition-all font-['Pretendard'] ${
        isLocked
          ? "bg-[var(--italian-gray-100)] border-[var(--italian-gray-200)] cursor-not-allowed shadow-flat-1"
          : "bg-white border-[var(--italian-gray-200)] hover:shadow-flat-3 shadow-flat-1 border-2"
      }`}
      onClick={!isLocked ? onClick : undefined}
    >
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--italian-gray-100)]/90 rounded-3xl">
          <Lock className="w-8 h-8 text-[var(--italian-gray-400)]" />
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${levelColors[level]}`}
          >
            {level}
          </span>
          {isCompleted && (
            <CheckCircle className="w-7 h-7 text-[var(--italian-green)] fill-[var(--italian-green)]" />
          )}
        </div>

        <h3 className="text-xl font-semibold text-[var(--italian-gray-900)]">{title}</h3>

        <div className="flex items-center gap-1">
          {Array.from({ length: maxStars }).map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 ${
                i < stars
                  ? "text-amber-400 fill-amber-400"
                  : "text-[var(--italian-gray-300)]"
              }`}
            />
          ))}
        </div>

        <div className="text-sm font-medium text-[var(--italian-gray-600)]">
          5분 이내 • 5개 문제 • {gameType === "quiz" ? "퀴즈" : "매칭"}
        </div>
      </div>
    </motion.div>
  );
}