import { motion, AnimatePresence } from "motion/react";
import { CheckCircle } from "lucide-react";
import { ItalianNumber } from "../data/lessons";
import { SpeechButton } from "./SpeechButton";
import { useEffect, useState } from "react";

interface SuccessFeedbackProps {
  number: ItalianNumber;
  isVisible: boolean;
  onClose: () => void;
}

// Firework particle component
function FireworkParticle({ x, y, color, delay }: { x: number; y: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full"
      style={{ 
        backgroundColor: color,
        left: x,
        top: y,
        boxShadow: `0 0 10px ${color}`,
      }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{
        scale: [0, 1.5, 0],
        opacity: [1, 1, 0],
        x: [0, Math.random() * 400 - 200],
        y: [0, Math.random() * 300 - 150],
      }}
      transition={{
        duration: 2,
        delay: delay,
        ease: "easeOut"
      }}
    />
  );
}

// Fireworks explosion component
function FireworksExplosion() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number }>>([]);

  useEffect(() => {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    const newParticles = [];

    // Create multiple explosion points
    for (let explosion = 0; explosion < 3; explosion++) {
      const explosionX = Math.random() * 300 + 50;
      const explosionY = Math.random() * 200 + 100;
      
      // Create particles for each explosion
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: explosion * 20 + i,
          x: explosionX,
          y: explosionY,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: explosion * 0.3 + Math.random() * 0.5,
        });
      }
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <FireworkParticle
          key={particle.id}
          x={particle.x}
          y={particle.y}
          color={particle.color}
          delay={particle.delay}
        />
      ))}
    </div>
  );
}

export function SuccessFeedback({ number, isVisible, onClose }: SuccessFeedbackProps) {
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowFireworks(true);
      // Stop fireworks after animation
      const timer = setTimeout(() => {
        setShowFireworks(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      {/* Fireworks Background */}
      <AnimatePresence>
        {showFireworks && <FireworksExplosion />}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.5, y: 50 }}
        animate={{ 
          scale: [0.5, 1.1, 1], 
          y: [50, -10, 0],
          rotate: [0, -2, 2, 0]
        }}
        exit={{ scale: 0.5, y: 50 }}
        transition={{ 
          type: "spring", 
          bounce: 0.4,
          duration: 0.8
        }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background celebration glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Celebration Icon */}
        <div className="mb-6 relative z-10">
          <motion.div
            className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-yellow-200 to-orange-300 flex items-center justify-center shadow-flat-2"
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, 1.3, 1], 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              className="text-5xl"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              🎉
            </motion.span>
          </motion.div>
          
          {/* Floating celebration emojis */}
          {['🎊', '✨', '🌟', '💫'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{
                left: `${20 + i * 20}%`,
                top: `${10 + (i % 2) * 30}%`,
              }}
              initial={{ opacity: 0, y: 20, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                y: [20, -30, -60], 
                scale: [0, 1, 0.5],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 3, 
                delay: 0.5 + i * 0.2,
                ease: "easeOut"
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        {/* Success Title */}
        <div className="mb-6 relative z-10">
          <motion.div 
            className="flex items-center justify-center mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            >
              <CheckCircle className="w-10 h-10 text-[var(--italian-green)] mr-3" />
            </motion.div>
            <motion.h2 
              className="text-3xl font-bold text-[var(--italian-green)] italian-script"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Bravo! 정답!
            </motion.h2>
          </motion.div>
          
          {/* Celebration text */}
          <motion.p
            className="text-lg text-[var(--italian-gray-700)] italian-script"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Fantastico! 🇮🇹
          </motion.p>
        </div>

        {/* Number Display */}
        <motion.div 
          className="mb-6 relative z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, type: "spring", bounce: 0.3 }}
        >
          <motion.div 
            className="text-8xl mb-4 text-[var(--italian-green)] font-bold"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {number.number}
          </motion.div>
          
          {/* 두에 (2번째로 크게) */}
          <motion.div 
            className="text-4xl mb-3 text-[var(--italian-gray-800)] font-bold relative flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <span>{number.italian}</span>
            <SpeechButton 
              text={number.italian} 
              size="sm"
              variant="outline"
              className="bg-white border-[var(--italian-green)] text-[var(--italian-green)] hover:bg-[var(--italian-green)] hover:text-white"
            />
          </motion.div>
          
          {/* 한국어 */}
          <motion.div 
            className="text-2xl mb-2 text-[var(--italian-gray-700)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {number.korean}
          </motion.div>
          
          {/* 이탈리아어 발음 */}
          <motion.div 
            className="text-lg text-[var(--italian-gray-600)] italic"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            ({number.pronunciation})
          </motion.div>
        </motion.div>

        {/* Continue Button */}
        <motion.div 
          className="flex justify-center mt-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.button
            onClick={onClose}
            className="px-8 py-4 bg-[var(--italian-green)] hover:bg-[var(--italian-green-dark)] text-white rounded-2xl font-bold shadow-flat-2 hover:shadow-flat-3 border-2 border-[var(--italian-green-dark)] text-lg"
            whileHover={{ 
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            🚀 다음 문제
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}