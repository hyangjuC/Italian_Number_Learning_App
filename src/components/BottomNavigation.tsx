import { Home, Users, Gift } from "lucide-react";
import { motion } from "motion/react";

interface BottomNavigationProps {
  currentScreen: string;
  onScreenChange: (screen: "home" | "friends" | "stars" | "rewards") => void;
}

export function BottomNavigation({ currentScreen, onScreenChange }: BottomNavigationProps) {
  const navItems = [
    {
      id: "home",
      label: "홈",
      emoji: "🏠",
      icon: Home,
      color: "bg-[var(--italian-green)]",
      activeColor: "text-[var(--italian-green)]",
      inactiveColor: "text-[var(--italian-gray-500)]"
    },
    {
      id: "friends",
      label: "친구",
      emoji: "👥",
      icon: Users,
      color: "bg-[var(--italian-green)]",
      activeColor: "text-[var(--italian-green)]",
      inactiveColor: "text-[var(--italian-gray-500)]"
    },
    {
      id: "rewards",
      label: "리워드",
      emoji: "🎁",
      icon: Gift,
      color: "bg-[var(--italian-green)]",
      activeColor: "text-[var(--italian-green)]",
      inactiveColor: "text-[var(--italian-gray-500)]"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-[var(--italian-gray-200)] shadow-flat-3 font-['Pretendard']">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onScreenChange(item.id as "home" | "friends" | "rewards")}
              className="flex flex-col items-center py-2 px-3 rounded-2xl transition-all duration-200 min-w-[70px]"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isActive ? item.color : "bg-[var(--italian-gray-100)]"
                }`}
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <div className={`text-2xl ${isActive ? "filter brightness-125" : "opacity-70"}`}>
                  {item.emoji}
                </div>
              </motion.div>
              <span 
                className={`text-xs font-medium mt-1 transition-colors duration-200 ${
                  isActive 
                    ? item.activeColor 
                    : item.inactiveColor
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="w-1 h-1 bg-current rounded-full mt-1"
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}