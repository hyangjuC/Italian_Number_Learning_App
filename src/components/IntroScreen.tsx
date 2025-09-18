import { motion } from "motion/react";
import { Button } from "./ui/button";

interface IntroScreenProps {
  onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-50 to-blue-50 font-['Pretendard'] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-10 w-24 h-24 bg-gray-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6 space-y-12 max-w-md mx-auto text-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          {/* Italian Flag Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", bounce: 0.4 }}
            className="text-6xl mb-4"
          >
            🇮🇹
          </motion.div>
          
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl font-bold text-[var(--italian-gray-900)] mb-2 italian-elegant"
          >
            Numeri Italiani
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-[var(--italian-gray-600)] font-medium"
          >
            이탈리아 숫자를 배워요!
          </motion.p>
        </motion.div>

        {/* Feature Buttons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-2 gap-4"
        >
          {/* Quiz Button */}
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-flat-2 hover:shadow-flat-4 transition-all duration-300 group text-center"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🧩</div>
            <div className="text-base font-semibold text-[var(--italian-gray-800)]">재미있는 퀴즈</div>
          </motion.div>

          {/* Stars Button */}
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-flat-2 hover:shadow-flat-4 transition-all duration-300 group text-center"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">⭐</div>
            <div className="text-base font-semibold text-[var(--italian-gray-800)]">별 수집</div>
          </motion.div>

          {/* Friends Button */}
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-flat-2 hover:shadow-flat-4 transition-all duration-300 group text-center"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">👥</div>
            <div className="text-base font-semibold text-[var(--italian-gray-800)]">친구와 공유하기</div>
          </motion.div>

          {/* Rewards Button */}
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-flat-2 hover:shadow-flat-4 transition-all duration-300 group text-center"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🎁</div>
            <div className="text-base font-semibold text-[var(--italian-gray-800)]">리워드 받기</div>
          </motion.div>
        </motion.div>

        {/* Main CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 12px 30px rgba(0, 146, 70, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="w-full bg-[var(--italian-green)] hover:bg-[var(--italian-green-dark)] text-white rounded-2xl py-5 px-6 font-bold text-lg shadow-flat-3 hover:shadow-flat-4 transition-all duration-300 flex items-center justify-center"
          >
            🚀 지금 시작하기
          </motion.button>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="text-sm text-[var(--italian-gray-500)] font-medium"
          >
            ☕ 에스프레소 한 잔 마시는 시간이면 충분해요!
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}