import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, User, BookOpen } from "lucide-react";
import { GameUI } from "./components/GameUI";
import { LessonCard } from "./components/LessonCard";
import { QuizScreen } from "./components/QuizScreen";
import { SortingGame } from "./components/SortingGame";
import { ResultScreen } from "./components/ResultScreen";
import { FriendSystem } from "./components/FriendSystem";
import { IntroScreen } from "./components/IntroScreen";
import { BottomNavigation } from "./components/BottomNavigation";
import { StarCollection } from "./components/StarCollection";
import { RewardScreen } from "./components/RewardScreen";
import { Button } from "./components/ui/button";
import { lessons, generateQuizQuestions, generateMatchingPairs } from "./data/lessons";
import { badges, UserBadge, checkBadgeEarned } from "./data/badges";

// 다국어 텍스트
const appContent = {
  KR: {
    homeTitle: "Numeri Italiani",
    homeSubtitle: "이탈리아 숫자를 배워보세요!",
    levelLabel: "이탈리아 숫자"
  },
  EN: {
    homeTitle: "Numeri Italiani", 
    homeSubtitle: "Learn Italian Numbers!",
    levelLabel: "Italian Numbers"
  }
};

// 시도 횟수에 따른 등급 계산 함수
function calculateGrade(score: number, totalQuestions: number, attempts: number) {
  const perfectAttempts = totalQuestions; // 완벽한 시도 횟수 (각 문제당 1번)
  
  let medal: "gold" | "silver" | "bronze" | null = null;
  let stars = 0;
  let xpMultiplier = 1;

  if (attempts === perfectAttempts) {
    // 완벽: 한 번에 모든 문제를 맞춤
    medal = "gold";
    stars = 3;
    xpMultiplier = 1.5; // 50% 보너스
  } else if (attempts <= perfectAttempts + 2) {
    // 우수: 2번 이하의 실수
    medal = "silver";
    stars = 2;
    xpMultiplier = 1.2; // 20% 보너스
  } else if (attempts <= perfectAttempts + 4) {
    // 양호: 4번 이하의 실수
    medal = "bronze";
    stars = 1;
    xpMultiplier = 1.0; // 보너스 없음
  } else {
    // 그 외: 많은 실수
    medal = null;
    stars = 0;
    xpMultiplier = 0.8; // 20% 감소
  }

  return { medal, stars, xpMultiplier };
}

type Screen = "intro" | "home" | "lesson" | "result" | "friends" | "stars" | "rewards";
type Language = "KR" | "EN";

interface GameState {
  hearts: number;
  maxHearts: number;
  xp: number;
  streak: number;
  completedLessons: string[];
  earnedBadges: UserBadge[];
}

interface LessonResult {
  score: number;
  totalQuestions: number;
  attempts?: number;
  xpEarned: number;
  newBadge?: string;
  medal?: "gold" | "silver" | "bronze" | null;
  stars?: number;
}

interface Friend {
  id: string;
  name: string;
  streak: number;
  lastActive: string;
  canSendEncouragement: boolean;
}

interface EncouragementMessage {
  id: string;
  friendName: string;
  message: string;
  timestamp: string;
  emoji: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("intro");
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>("KR");
  const [gameState, setGameState] = useState<GameState>({
    hearts: 3,
    maxHearts: 3,
    xp: 0,
    streak: 1,
    completedLessons: [],
    earnedBadges: [],
  });



  // Mock friends data
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: "1",
      name: "마리아",
      streak: 5,
      lastActive: "2시간 전",
      canSendEncouragement: true,
    },
    {
      id: "2", 
      name: "지오반니",
      streak: 12,
      lastActive: "1일 전",
      canSendEncouragement: false,
    },
  ]);

  const [encouragementsReceived, setEncouragementReceived] = useState(2);
  const userCode = "ITL789";
  
  // Mock encouragement messages
  const [encouragementMessages, setEncouragementMessages] = useState<EncouragementMessage[]>([
    {
      id: "1",
      friendName: "마리아",
      message: "오늘도 이탈리아어 공부 화이팅! 🇮🇹",
      timestamp: "2시간 전",
      emoji: "💪"
    },
    {
      id: "2", 
      friendName: "지오반니",
      message: "숫자 익히는 거 정말 잘하고 있어! 👏",
      timestamp: "5시간 전",
      emoji: "🌟"
    },
    {
      id: "3",
      friendName: "루카",
      message: "같이 열심��� 해보자! Andiamo! 🚀",
      timestamp: "어제",
      emoji: "🔥"
    }
  ]);
  const [currentResult, setCurrentResult] = useState<LessonResult | null>(null);

  const currentLesson = currentLessonId ? lessons.find(l => l.id === currentLessonId) : null;

  const handleStartApp = () => {
    setCurrentScreen("home");
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const handleBottomNavChange = (screen: "home" | "friends" | "stars" | "rewards") => {
    setCurrentScreen(screen);
  };

  const handleLessonStart = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    setCurrentScreen("lesson");
  };

  const handleLessonComplete = (score: number, totalQuestions: number = 6, attempts?: number) => {
    // 등급 계산 (시도 횟수가 있는 경우에만)
    let medal: "gold" | "silver" | "bronze" | null = null;
    let stars = 0;
    let xpMultiplier = 1;
    
    if (attempts && currentLesson?.type === "sorting") {
      const grade = calculateGrade(score, totalQuestions, attempts);
      medal = grade.medal;
      stars = grade.stars;
      xpMultiplier = grade.xpMultiplier;
    } else {
      // 퀴즈나 다른 게임은 기본 별 3개
      stars = 3;
    }

    const baseXP = score * 10;
    const xpEarned = Math.round(baseXP * xpMultiplier);
    const lessonResult = { score, totalQuestions, attempts };
    
    // 새 게임 상태 생성 (레슨 완료 포함)
    const newGameState = {
      ...gameState,
      xp: gameState.xp + xpEarned,
      completedLessons: gameState.completedLessons.includes(currentLessonId!) 
        ? gameState.completedLessons 
        : [...gameState.completedLessons, currentLessonId!],
    };
    
    // 배지 확인 및 추가
    const newBadges: UserBadge[] = [];
    let badgeXP = 0;
    
    badges.forEach(badge => {
      const alreadyEarned = gameState.earnedBadges.some(b => b.badgeId === badge.id);
      if (!alreadyEarned && checkBadgeEarned(badge.id, newGameState, lessonResult)) {
        newBadges.push({
          badgeId: badge.id,
          earnedAt: new Date(),
        });
        badgeXP += badge.xpReward;
      }
    });
    
    // 최종 게임 상태 업데이트
    const finalGameState = {
      ...newGameState,
      xp: newGameState.xp + badgeXP,
      earnedBadges: [...gameState.earnedBadges, ...newBadges],
    };
    
    setGameState(finalGameState);
    
    // 첫 번째 획득한 배지 이름 가져오기 (ResultScreen 표시용)
    const newBadgeName = newBadges.length > 0 
      ? badges.find(b => b.id === newBadges[0].badgeId)?.name 
      : undefined;
    
    setCurrentResult({
      score,
      totalQuestions,
      attempts,
      xpEarned: xpEarned + badgeXP,
      newBadge: newBadgeName,
      medal,
      stars
    });

    setCurrentScreen("result");
  };

  const handleHeartLost = () => {
    setGameState(prev => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1),
    }));
  };

  const handleSendEncouragement = (friendId: string) => {
    setFriends(prev => 
      prev.map(friend => 
        friend.id === friendId 
          ? { ...friend, canSendEncouragement: false }
          : friend
      )
    );
  };

  const handleAddFriend = (friendCode: string) => {
    // Mock adding friend
    const newFriend: Friend = {
      id: Date.now().toString(),
      name: `사용자 ${friendCode}`,
      streak: Math.floor(Math.random() * 10) + 1,
      lastActive: "방금 전",
      canSendEncouragement: true,
    };
    setFriends(prev => [...prev, newFriend]);
  };

  const isLessonLocked = (lessonId: string, level: string) => {
    if (level === "초급") return false;
    if (level === "중급") {
      // Unlock if any beginner lesson is completed
      return !gameState.completedLessons.some(id => 
        lessons.find(l => l.id === id)?.level === "초급"
      );
    }
    if (level === "고급") {
      // Unlock if any intermediate lesson is completed
      return !gameState.completedLessons.some(id => 
        lessons.find(l => l.id === id)?.level === "중급"
      );
    }
    return false;
  };

  const getLessonStars = (lessonId: string) => {
    // Mock stars based on completion
    return gameState.completedLessons.includes(lessonId) ? 3 : 0;
  };

  const getNextLesson = (currentLessonId: string) => {
    const currentIndex = lessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex === -1 || currentIndex === lessons.length - 1) {
      return null;
    }
    
    const nextLesson = lessons[currentIndex + 1];
    const isNextLocked = isLessonLocked(nextLesson.id, nextLesson.level);
    
    return isNextLocked ? null : nextLesson;
  };

  const handleNextLesson = () => {
    if (currentLessonId) {
      const nextLesson = getNextLesson(currentLessonId);
      if (nextLesson) {
        setCurrentLessonId(nextLesson.id);
        setCurrentScreen("lesson");
      }
    }
  };

  // Intro Screen
  if (currentScreen === "intro") {
    return <IntroScreen onStart={handleStartApp} onLanguageChange={handleLanguageChange} />;
  }

  // Home Screen
  if (currentScreen === "home") {
    return (
      <div className="min-h-screen bg-italian-food-pattern font-['Pretendard'] pb-24">
        <GameUI
          hearts={gameState.hearts}
          maxHearts={gameState.maxHearts}
          xp={gameState.xp}
          streak={gameState.streak}
          level={appContent[language].levelLabel}
        />

        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="text-5xl">🇮🇹</div>
              <h1 className="text-3xl font-bold text-[var(--italian-gray-900)] italian-elegant">
                {appContent[language].homeTitle}
              </h1>
              <p className="text-lg text-[var(--italian-gray-600)] font-medium">{appContent[language].homeSubtitle}</p>
            </motion.div>
          </div>

          {/* Lessons Grid */}
          <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <LessonCard
                  title={lesson.title}
                  level={lesson.level}
                  isLocked={isLessonLocked(lesson.id, lesson.level)}
                  isCompleted={gameState.completedLessons.includes(lesson.id)}
                  stars={getLessonStars(lesson.id)}
                  maxStars={3}
                  gameType={lesson.type}
                  onClick={() => handleLessonStart(lesson.id)}
                  language={language}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation 
          currentScreen={currentScreen} 
          onScreenChange={handleBottomNavChange}
          language={language}
        />
      </div>
    );
  }

  // Lesson Screen
  if (currentScreen === "lesson" && currentLesson) {
    if (currentLesson.type === "quiz") {
      const questions = generateQuizQuestions(currentLesson.numbers);
      return (
        <div>
          <GameUI
            hearts={gameState.hearts}
            maxHearts={gameState.maxHearts}
            xp={gameState.xp}
            streak={gameState.streak}
            level={currentLesson.title}
          />
          <QuizScreen
            questions={questions}
            onComplete={(score, total) => handleLessonComplete(score, total)}
            onHeartLost={handleHeartLost}
            onHome={() => setCurrentScreen("home")}
            language={language}
          />
        </div>
      );
    } else {
      const pairs = generateMatchingPairs(currentLesson.numbers);
      return (
        <div>
          <GameUI
            hearts={gameState.hearts}
            maxHearts={gameState.maxHearts}
            xp={gameState.xp}
            streak={gameState.streak}
            level={currentLesson.title}
          />
          <SortingGame
            pairs={pairs}
            onComplete={(score, total, attempts) => handleLessonComplete(score, total, attempts)}
            onHeartLost={handleHeartLost}
            onHome={() => setCurrentScreen("home")}
            language={language}
          />
        </div>
      );
    }
  }

  // Result Screen
  if (currentScreen === "result" && currentLesson && currentResult) {
    const nextLesson = getNextLesson(currentLesson.id);
    const hasNextLesson = nextLesson !== null;
    
    return (
      <ResultScreen
        score={currentResult.score}
        totalQuestions={currentResult.totalQuestions}
        attempts={currentResult.attempts}
        xpEarned={currentResult.xpEarned}
        newBadge={currentResult.newBadge}
        medal={currentResult.medal}
        stars={currentResult.stars}
        onRestart={() => setCurrentScreen("lesson")}
        onHome={() => setCurrentScreen("home")}
        onNextLesson={hasNextLesson ? handleNextLesson : undefined}
        hasNextLesson={hasNextLesson}
        language={language}
      />
    );
  }

  // Friends Screen
  if (currentScreen === "friends") {
    return (
      <div className="pb-24">
        <FriendSystem
          friends={friends}
          userCode={userCode}
          encouragementsReceived={encouragementsReceived}
          encouragementMessages={encouragementMessages}
          onSendEncouragement={handleSendEncouragement}
          onAddFriend={handleAddFriend}
          hearts={gameState.hearts}
          maxHearts={gameState.maxHearts}
          xp={gameState.xp}
          streak={gameState.streak}
          language={language}
        />
        <BottomNavigation 
          currentScreen={currentScreen} 
          onScreenChange={handleBottomNavChange}
          language={language}
        />
      </div>
    );
  }

  // Stars Collection Screen
  if (currentScreen === "stars") {
    const totalStars = gameState.completedLessons.length * 3; // 3 stars per completed lesson
    return (
      <div>
        <StarCollection 
          totalStars={totalStars}
          completedLessons={gameState.completedLessons}
          onBackHome={() => setCurrentScreen("home")}
          hearts={gameState.hearts}
          maxHearts={gameState.maxHearts}
          xp={gameState.xp}
          streak={gameState.streak}
          language={language}
        />
        <BottomNavigation 
          currentScreen={currentScreen} 
          onScreenChange={handleBottomNavChange}
          language={language}
        />
      </div>
    );
  }

  // Rewards Screen
  if (currentScreen === "rewards") {
    const totalStars = gameState.completedLessons.length * 3;
    return (
      <div>
        <RewardScreen 
          xp={gameState.xp}
          earnedBadges={gameState.earnedBadges}
          totalStars={totalStars}
          onBackHome={() => setCurrentScreen("home")}
          hearts={gameState.hearts}
          maxHearts={gameState.maxHearts}
          streak={gameState.streak}
          language={language}
        />
        <BottomNavigation 
          currentScreen={currentScreen} 
          onScreenChange={handleBottomNavChange}
          language={language}
        />
      </div>
    );
  }

  return null;
}