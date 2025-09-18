export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  condition: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  xpReward: number;
}

export interface UserBadge {
  badgeId: string;
  earnedAt: Date;
  progress?: number;
}

export const badges: Badge[] = [
  // 완료 관련 배지
  {
    id: "perfectionist",
    name: "완벽주의자",
    description: "문제를 모두 맞췄어요!",
    emoji: "🌟",
    condition: "퀴즈에서 100% 정답",
    rarity: "common",
    xpReward: 50,
  },
  {
    id: "excellent_learner",
    name: "우수학습자", 
    description: "80% 이상 정답을 맞췄어요!",
    emoji: "⭐",
    condition: "퀴즈에서 80% 이상 정답",
    rarity: "common",
    xpReward: 30,
  },
  
  // 연속 학습 배지
  {
    id: "streak_master",
    name: "연속학습 마스터",
    description: "7일 연속 학습을 완료했어요!",
    emoji: "🔥",
    condition: "7일 연속 학습",
    rarity: "rare",
    xpReward: 100,
  },
  {
    id: "dedication",
    name: "꾸준함의 달인",
    description: "30일 연속 학습을 완료했어요!",
    emoji: "💎",
    condition: "30일 연속 학습",
    rarity: "epic",
    xpReward: 300,
  },
  
  // 레벨 완료 배지
  {
    id: "beginner_graduate",
    name: "초급 졸업생",
    description: "초급 과정을 모두 완료했어요!",
    emoji: "🌱",
    condition: "초급 레슨 모두 완료",
    rarity: "common",
    xpReward: 150,
  },
  {
    id: "intermediate_graduate",
    name: "중급 졸업생", 
    description: "중급 과정을 모두 완료했어요!",
    emoji: "🌿",
    condition: "중급 레슨 모두 완료",
    rarity: "rare",
    xpReward: 250,
  },
  {
    id: "advanced_graduate",
    name: "고급 졸업생",
    description: "고급 과정을 모두 완료했어요!",
    emoji: "🌳",
    condition: "고급 레슨 모두 완료",
    rarity: "epic",
    xpReward: 400,
  },
  {
    id: "italian_master",
    name: "이탈리아 숫자 마스터",
    description: "모든 과정을 완료했어요!",
    emoji: "🏆",
    condition: "모든 레슨 완료",
    rarity: "legendary",
    xpReward: 500,
  },
  
  // 특별 배지
  {
    id: "first_perfect",
    name: "첫 번째 완벽",
    description: "처음으로 만점을 받았어요!",
    emoji: "🎯",
    condition: "첫 만점",
    rarity: "common",
    xpReward: 75,
  },
  {
    id: "speed_learner",
    name: "빠른 학습자",
    description: "빠르게 문제를 해결했어요!",
    emoji: "⚡",
    condition: "빠른 정답",
    rarity: "rare",
    xpReward: 80,
  },
  {
    id: "comeback_king",
    name: "컴백의 왕",
    description: "실패 후 다시 도전해서 성공했어요!",
    emoji: "👑",
    condition: "실패 후 재도전 성공",
    rarity: "rare",
    xpReward: 120,
  },
  {
    id: "friend_supporter",
    name: "친구 응원왕",
    description: "친구들에게 응원을 많이 보냈어요!",
    emoji: "💝",
    condition: "친구 응원 10회",
    rarity: "rare",
    xpReward: 100,
  },
];

export function checkBadgeEarned(
  badgeId: string, 
  gameState: any, 
  lessonResult?: any
): boolean {
  switch (badgeId) {
    case "perfectionist":
      return lessonResult && lessonResult.score === lessonResult.totalQuestions;
      
    case "excellent_learner":
      return lessonResult && (lessonResult.score / lessonResult.totalQuestions) >= 0.8;
      
    case "first_perfect":
      return lessonResult && 
        lessonResult.score === lessonResult.totalQuestions && 
        !gameState.earnedBadges.some((b: UserBadge) => b.badgeId === "first_perfect");
        
    case "beginner_graduate":
      const beginnerLessons = ["beginner-1", "beginner-2", "beginner-3"];
      return beginnerLessons.every(id => gameState.completedLessons.includes(id));
      
    case "intermediate_graduate":
      const intermediateLessons = ["intermediate-1", "intermediate-2", "intermediate-3"];
      return intermediateLessons.every(id => gameState.completedLessons.includes(id));
      
    case "advanced_graduate":
      const advancedLessons = ["advanced-1", "advanced-2"];
      return advancedLessons.every(id => gameState.completedLessons.includes(id));
      
    case "italian_master":
      return gameState.completedLessons.length >= 8; // 모든 레슨
      
    case "streak_master":
      return gameState.streak >= 7;
      
    case "dedication":
      return gameState.streak >= 30;
      
    default:
      return false;
  }
}

export function getBadgesByRarity(rarity: Badge["rarity"]): Badge[] {
  return badges.filter(badge => badge.rarity === rarity);
}

export function getRarityColor(rarity: Badge["rarity"]): string {
  switch (rarity) {
    case "common": return "bg-gray-100 text-gray-800 border-gray-300";
    case "rare": return "bg-blue-100 text-blue-800 border-blue-300";
    case "epic": return "bg-purple-100 text-purple-800 border-purple-300";
    case "legendary": return "bg-amber-100 text-amber-800 border-amber-300";
  }
}