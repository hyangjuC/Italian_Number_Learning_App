import { motion } from "motion/react";
import { Star, Trophy, Home } from "lucide-react";
import { Button } from "./ui/button";
import { GameUI } from "./GameUI";

interface StarCollectionProps {
  totalStars: number;
  completedLessons: string[];
  onBackHome: () => void;
  hearts: number;
  maxHearts: number;
  xp: number;
  streak: number;
}

export function StarCollection({ totalStars, completedLessons, onBackHome, hearts, maxHearts, xp, streak }: StarCollectionProps) {
  // 레벨별 별 표시
  const beginnerStars = Math.min(totalStars, 9); // 초급 3개 레슨 × 3개 별
  const intermediateStars = Math.max(0, Math.min(totalStars - 9, 9)); // 중급 3개 레슨 × 3개 별
  const advancedStars = Math.max(0, totalStars - 18); // 고급 3개 레슨 × 3개 별

  const renderStars = (count: number, maxCount: number, color: string) => {
    return (
      <div className="flex gap-1 justify-center">
        {Array.from({ length: maxCount }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: i < count ? [0, 1.2, 1] : 1,
              rotate: i < count ? 360 : 0
            }}
            transition={{ 
              duration: 0.6, 
              delay: i * 0.1,
              ease: "easeOut"
            }}
          >
            <Star
              className={`w-8 h-8 ${
                i < count 
                  ? `${color} fill-current` 
                  : "text-[var(--italian-gray-300)]"
              }`}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-italian-food-pattern font-['Pretendard'] pb-24">
      <GameUI 
        hearts={hearts}
        maxHearts={maxHearts}
        xp={xp}
        streak={streak}
        level="나의 별 모음"
      />
      
      <div className="p-4 space-y-8">
        {/* Title */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl"
          >
            🌟
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--italian-gray-900)] italian-elegant">
              나의 별 모음
            </h1>
            <p className="text-lg text-[var(--italian-gray-600)]">
              공부한 만큼 별이 쌓여요!
            </p>
          </div>
        </div>

        {/* Total Stars Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 shadow-flat-2 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-12 h-12 text-amber-400 fill-amber-400" />
            </motion.div>
            <span className="text-5xl font-bold text-[var(--italian-green)] italian-elegant">
              {totalStars}
            </span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-12 h-12 text-amber-400 fill-amber-400" />
            </motion.div>
          </div>
          <p className="text-xl text-[var(--italian-gray-600)] font-medium">
            총 모은 별의 개수
          </p>
        </motion.div>

        {/* Level Progress */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-[var(--italian-gray-900)] italian-elegant">
            레벨별 진행도
          </h2>

          {/* 초급 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-6 shadow-flat-2"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[var(--italian-green-100)] rounded-full flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--italian-green)]">초급</h3>
                <p className="text-sm text-[var(--italian-gray-600)]">숫자 1-10</p>
              </div>
            </div>
            {renderStars(beginnerStars, 9, "text-[var(--italian-green)]")}
            <p className="text-center mt-2 text-sm text-[var(--italian-gray-600)]">
              {beginnerStars}/9 별
            </p>
          </motion.div>

          {/* 중급 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl p-6 shadow-flat-2"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌿</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-600">중급</h3>
                <p className="text-sm text-[var(--italian-gray-600)]">숫자 11-20</p>
              </div>
            </div>
            {renderStars(intermediateStars, 9, "text-amber-500")}
            <p className="text-center mt-2 text-sm text-[var(--italian-gray-600)]">
              {intermediateStars}/9 별
            </p>
          </motion.div>

          {/* 고급 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-3xl p-6 shadow-flat-2"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[var(--italian-red-100)] rounded-full flex items-center justify-center">
                <span className="text-2xl">🌳</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--italian-red)]">고급</h3>
                <p className="text-sm text-[var(--italian-gray-600)]">숫자 20-100</p>
              </div>
            </div>
            {renderStars(advancedStars, 9, "text-[var(--italian-red)]")}
            <p className="text-center mt-2 text-sm text-[var(--italian-gray-600)]">
              {advancedStars}/9 별
            </p>
          </motion.div>
        </div>

        {/* Achievement Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-[var(--italian-green-50)] to-[var(--italian-red-50)] rounded-3xl p-6 text-center"
        >
          <div className="text-4xl mb-3">🏆</div>
          <h3 className="text-xl font-bold text-[var(--italian-gray-900)] mb-2">
            완료한 레슨
          </h3>
          <div className="text-3xl font-bold text-[var(--italian-green)] mb-1">
            {completedLessons.length}개
          </div>
          <p className="text-sm text-[var(--italian-gray-600)]">
            총 9개 레슨 중
          </p>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-white rounded-full h-3 shadow-inner">
              <motion.div
                className="bg-gradient-to-r from-[var(--italian-green)] to-[var(--italian-red)] h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(completedLessons.length / 9) * 100}%` }}
                transition={{ duration: 1, delay: 1 }}
              />
            </div>
            <p className="text-xs text-[var(--italian-gray-500)] mt-2">
              {Math.round((completedLessons.length / 9) * 100)}% 완료
            </p>
          </div>
        </motion.div>

        {/* Encouraging Message */}
        {totalStars > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center p-6 bg-white rounded-3xl shadow-flat-1"
          >
            <div className="text-3xl mb-2">🎉</div>
            <h3 className="text-lg font-bold text-[var(--italian-green)] italian-script">
              Bravo! 잘하고 있어요!
            </h3>
            <p className="text-sm text-[var(--italian-gray-600)] mt-1">
              계속해서 이탈리아 숫자를 마스터해보세요!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}