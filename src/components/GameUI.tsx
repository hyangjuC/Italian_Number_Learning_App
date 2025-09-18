import { Heart, Star, Flame } from "lucide-react";
import { motion } from "motion/react";

interface GameUIProps {
  hearts: number;
  maxHearts: number;
  xp: number;
  streak: number;
  level: string;
}

export function GameUI({ hearts, maxHearts, xp, streak, level }: GameUIProps) {
  // 홈 화면에서는 간단한 UI, 레슨 화면에서는 레슨명 표시
  const isHome = level === "이탈리아 숫자";
  
  return (
    <div className="flex items-center justify-between w-full p-4 bg-white shadow-flat-2 border-b border-[var(--italian-gray-200)] font-['Pretendard']">
      {/* Hearts */}
      <div className="flex items-center gap-1">
        {Array.from({ length: maxHearts }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 1 }}
            animate={{ scale: i < hearts ? 1 : 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <Heart
              className={`w-7 h-7 ${
                i < hearts ? "fill-[var(--italian-red)] text-[var(--italian-red)]" : "text-[var(--italian-gray-300)]"
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Level (only show on lesson screens) */}
      {!isHome && (
        <div className="text-center">
          <div className="text-sm font-semibold text-[var(--italian-gray-700)] px-3 py-1 bg-[var(--italian-gray-100)] rounded-full border border-[var(--italian-gray-300)]">
            🍝 {level}
          </div>
        </div>
      )}

      {/* XP only */}
      <div className="flex items-center gap-1 bg-[var(--italian-green-50)] px-3 py-1 rounded-full">
        <Star className="w-5 h-5 text-[var(--italian-green)] fill-[var(--italian-green)]" />
        <span className="text-sm font-semibold text-[var(--italian-green-800)]">{xp}</span>
      </div>
    </div>
  );
}