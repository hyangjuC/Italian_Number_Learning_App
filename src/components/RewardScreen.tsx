import { motion } from "motion/react";
import { Star, Trophy, Gift, Award, Home } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { GameUI } from "./GameUI";
import { badges, UserBadge, getRarityColor } from "../data/badges";

interface RewardScreenProps {
  xp: number;
  earnedBadges: UserBadge[];
  totalStars: number;
  onBackHome: () => void;
  hearts: number;
  maxHearts: number;
  streak: number;
}

export function RewardScreen({ xp, earnedBadges, totalStars, onBackHome, hearts, maxHearts, streak }: RewardScreenProps) {
  const earnedBadgeIds = earnedBadges.map(b => b.badgeId);
  const completedBadges = badges.filter(badge => earnedBadgeIds.includes(badge.id));
  const uncompletedBadges = badges.filter(badge => !earnedBadgeIds.includes(badge.id));

  const getXPLevel = (xp: number) => Math.floor(xp / 100) + 1;
  const getXPProgress = (xp: number) => (xp % 100);

  const rarityStats = {
    common: completedBadges.filter(b => b.rarity === "common").length,
    rare: completedBadges.filter(b => b.rarity === "rare").length,
    epic: completedBadges.filter(b => b.rarity === "epic").length,
    legendary: completedBadges.filter(b => b.rarity === "legendary").length,
  };

  return (
    <div className="min-h-screen bg-italian-food-pattern font-['Pretendard'] pb-24">
      <GameUI 
        hearts={hearts}
        maxHearts={maxHearts}
        xp={xp}
        streak={streak}
        level="나의 리워드"
      />
      <div className="p-4 space-y-6">
        {/* Title */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl"
          >
            🎁
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--italian-gray-900)] italian-elegant">
              나의 리워드
            </h1>
            <p className="text-lg text-[var(--italian-gray-600)]">
              학습하며 얻은 보상들을 확인해보세요!
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          {/* XP & Level */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 shadow-flat-2 text-center"
          >
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-[var(--italian-green)]">
              Level {getXPLevel(xp)}
            </div>
            <div className="text-sm text-[var(--italian-gray-600)] mb-2">
              {xp} XP
            </div>
            <div className="w-full bg-[var(--italian-gray-200)] rounded-full h-2">
              <div 
                className="bg-[var(--italian-green)] h-2 rounded-full transition-all duration-500"
                style={{ width: `${getXPProgress(xp)}%` }}
              />
            </div>
            <div className="text-xs text-[var(--italian-gray-500)] mt-1">
              다음 레벨까지 {100 - getXPProgress(xp)} XP
            </div>
          </motion.div>

          {/* Total Stars */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-flat-2 text-center"
          >
            <div className="text-3xl mb-2">🌟</div>
            <div className="text-2xl font-bold text-amber-500">
              {totalStars}
            </div>
            <div className="text-sm text-[var(--italian-gray-600)]">
              총 획득한 별
            </div>
          </motion.div>
        </div>

        {/* Badge Summary */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-[var(--italian-green)]" />
            <h2 className="text-xl font-bold">배지 컬렉션</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--italian-green)]">
                {completedBadges.length}
              </div>
              <div className="text-sm text-[var(--italian-gray-600)]">획득한 배지</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--italian-gray-400)]">
                {badges.length}
              </div>
              <div className="text-sm text-[var(--italian-gray-600)]">전체 배지</div>
            </div>
          </div>

          {/* Rarity Breakdown */}
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center">
              <div className="w-8 h-8 bg-gray-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">{rarityStats.common}</span>
              </div>
              <div className="text-xs text-[var(--italian-gray-500)]">일반</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">{rarityStats.rare}</span>
              </div>
              <div className="text-xs text-[var(--italian-gray-500)]">희귀</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                <span className="text-xs font-bold text-purple-600">{rarityStats.epic}</span>
              </div>
              <div className="text-xs text-[var(--italian-gray-500)]">에픽</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-amber-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                <span className="text-xs font-bold text-amber-600">{rarityStats.legendary}</span>
              </div>
              <div className="text-xs text-[var(--italian-gray-500)]">전설</div>
            </div>
          </div>
        </Card>

        {/* Earned Badges */}
        {completedBadges.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[var(--italian-gray-900)]">🏆 획득한 배지</h3>
            <div className="grid grid-cols-1 gap-3">
              {completedBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 bg-gradient-to-r from-[var(--italian-green-50)] to-white border-l-4 border-l-[var(--italian-green)]">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{badge.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-[var(--italian-gray-900)]">{badge.name}</h4>
                          <Badge className={`text-xs ${getRarityColor(badge.rarity)}`}>
                            {badge.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-[var(--italian-gray-600)] mb-1">{badge.description}</p>
                        <div className="flex items-center gap-1 text-xs text-[var(--italian-green)]">
                          <Star className="w-3 h-3" />
                          +{badge.xpReward} XP
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Uncompleted Badges */}
        {uncompletedBadges.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[var(--italian-gray-900)]">🎯 도전할 배지</h3>
            <div className="grid grid-cols-1 gap-3">
              {uncompletedBadges.slice(0, 5).map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 bg-[var(--italian-gray-50)] border-dashed border-2 border-[var(--italian-gray-300)]">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl opacity-50">{badge.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-[var(--italian-gray-700)]">{badge.name}</h4>
                          <Badge className={`text-xs ${getRarityColor(badge.rarity)} opacity-70`}>
                            {badge.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-[var(--italian-gray-500)] mb-1">{badge.condition}</p>
                        <div className="flex items-center gap-1 text-xs text-[var(--italian-gray-400)]">
                          <Star className="w-3 h-3" />
                          +{badge.xpReward} XP
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center p-6 bg-white rounded-2xl shadow-flat-1"
        >
          <div className="text-3xl mb-2">💪</div>
          <h3 className="text-lg font-bold text-[var(--italian-green)] italian-script">
            Bravissimo! 계속 화이팅!
          </h3>
          <p className="text-sm text-[var(--italian-gray-600)] mt-1">
            더 많은 배지를 획득하며 이탈리아 숫자 마스터가 되어보세요!
          </p>
        </motion.div>
      </div>
    </div>
  );
}