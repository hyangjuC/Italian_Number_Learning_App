import { useState } from "react";
import { motion } from "motion/react";
import { Users, Send, Heart, Gift, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { GameUI } from "./GameUI";

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

interface FriendSystemProps {
  friends: Friend[];
  userCode: string;
  encouragementsReceived: number;
  encouragementMessages: EncouragementMessage[];
  onSendEncouragement: (friendId: string) => void;
  onAddFriend: (friendCode: string) => void;
  hearts: number;
  maxHearts: number;
  xp: number;
  streak: number;
}

export function FriendSystem({
  friends,
  userCode,
  encouragementsReceived,
  encouragementMessages,
  onSendEncouragement,
  onAddFriend,
  hearts,
  maxHearts,
  xp,
  streak,
}: FriendSystemProps) {
  const [friendCode, setFriendCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddFriend = () => {
    if (friendCode.trim()) {
      onAddFriend(friendCode.trim());
      setFriendCode("");
    }
  };

  const nextMessage = () => {
    setCurrentMessageIndex((prev) => 
      prev === encouragementMessages.length - 1 ? 0 : prev + 1
    );
  };

  const prevMessage = () => {
    setCurrentMessageIndex((prev) => 
      prev === 0 ? encouragementMessages.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-italian-food-pattern font-['Pretendard'] pb-24">
      <GameUI 
        hearts={hearts}
        maxHearts={maxHearts}
        xp={xp}
        streak={streak}
        level="친구 응원"
      />
      
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div 
              className="text-6xl mx-auto"
              style={{
                filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.15))",
                transform: "perspective(100px) rotateX(10deg) rotateY(-5deg)"
              }}
            >
              👥
            </div>
            <h1 className="text-3xl font-bold text-[var(--italian-gray-900)] italian-elegant">
              친구 응원
            </h1>
            <p className="text-lg text-[var(--italian-gray-600)]">
              친구들과 함께 학습하고 서로 응원해보세요!
            </p>
          </motion.div>
        </div>

        {/* Encouragement Messages Carousel */}
        {encouragementMessages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-[var(--italian-gray-900)] mb-4 italian-elegant">
              💌 받은 응원 메시지
            </h2>
            <div className="relative bg-white rounded-3xl p-6 shadow-flat-2 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="outline"
                  onClick={prevMessage}
                  className="w-10 h-10 rounded-full border-2 border-[var(--italian-green)] text-[var(--italian-green)] hover:bg-[var(--italian-green-50)]"
                  disabled={encouragementMessages.length <= 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <div className="flex gap-2">
                  {encouragementMessages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentMessageIndex 
                          ? "bg-[var(--italian-green)]" 
                          : "bg-[var(--italian-gray-300)]"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={nextMessage}
                  className="w-10 h-10 rounded-full border-2 border-[var(--italian-green)] text-[var(--italian-green)] hover:bg-[var(--italian-green-50)]"
                  disabled={encouragementMessages.length <= 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <motion.div
                key={currentMessageIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-3"
              >
                <div className="text-4xl">
                  {encouragementMessages[currentMessageIndex].emoji}
                </div>
                <div className="space-y-2">
                  <p className="text-xl text-[var(--italian-gray-900)] font-medium">
                    "{encouragementMessages[currentMessageIndex].message}"
                  </p>
                  <div className="text-sm text-[var(--italian-gray-600)]">
                    <span className="font-medium">
                      {encouragementMessages[currentMessageIndex].friendName}
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      {encouragementMessages[currentMessageIndex].timestamp}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Friends Profiles and Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-[var(--italian-gray-900)] mb-4 italian-elegant">
            👨‍👩‍👧‍👦 친구 프로필
          </h2>
          
          {friends.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 shadow-flat-2 text-center">
              <div className="text-4xl mb-3">😴</div>
              <h3 className="text-xl font-medium text-[var(--italian-gray-700)] mb-2">
                아직 친구가 없어요
              </h3>
              <p className="text-sm text-[var(--italian-gray-600)]">
                친구 코드를 공유해서 함께 학습해보세요!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {friends.map((friend, index) => (
                <motion.div
                  key={friend.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-3 shadow-flat-2"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[var(--italian-green-100)] to-[var(--italian-green-200)] rounded-full flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[var(--italian-gray-900)]">
                        {friend.name}
                      </h3>
                      <p className="text-xs text-[var(--italian-gray-600)]">
                        {friend.lastActive}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--italian-gray-600)]">연속 학습</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">🔥</span>
                        <span className="text-sm font-bold text-[var(--italian-green)]">
                          {friend.streak}일
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--italian-gray-600)]">상태</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        friend.lastActive.includes("시간") 
                          ? "bg-[var(--italian-green-100)] text-[var(--italian-green-800)]"
                          : "bg-[var(--italian-gray-100)] text-[var(--italian-gray-600)]"
                      }`}>
                        {friend.lastActive.includes("시간") ? "온라인" : "오프라인"}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => onSendEncouragement(friend.id)}
                    disabled={!friend.canSendEncouragement}
                    className={`w-full rounded-xl text-sm py-2 ${
                      friend.canSendEncouragement 
                        ? "bg-[var(--italian-green)] hover:bg-[var(--italian-green-dark)] text-white shadow-flat-2" 
                        : "bg-[var(--italian-gray-100)] text-[var(--italian-gray-600)] cursor-not-allowed"
                    }`}
                  >
                    {friend.canSendEncouragement ? (
                      <>
                        <Send className="w-3 h-3 mr-1" />
                        응원 보내기
                      </>
                    ) : (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        응원 완료
                      </>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* My Friend Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-[var(--italian-gray-900)] mb-4 italian-elegant">
            🔗 내 친구 코드
          </h2>
          <div className="bg-white rounded-3xl p-6 shadow-flat-2 space-y-4">
            <div className="text-center">
              <div className="text-3xl mb-2">📱</div>
              <p className="text-lg text-[var(--italian-gray-600)] mb-4">
                이 코드를 친구에게 공유하세요!
              </p>
            </div>
            <div className="flex gap-3">
              <Input
                value={userCode}
                readOnly
                className="text-center text-2xl font-mono tracking-wider font-bold text-[var(--italian-green)] bg-[var(--italian-green-50)] border-2 border-[var(--italian-green-200)] rounded-2xl"
              />
              <Button
                onClick={handleCopyCode}
                variant="outline"
                className="px-6 rounded-2xl border-2 border-[var(--italian-green)] text-[var(--italian-green)] hover:bg-[var(--italian-green-50)] shadow-flat-1"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    복사완료
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    복사
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Add Friend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-[var(--italian-gray-900)] mb-4 italian-elegant">
            ➕ 친구 추가
          </h2>
          <div className="bg-white rounded-3xl p-6 shadow-flat-2 space-y-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🤝</div>
              <p className="text-lg text-[var(--italian-gray-600)] mb-4">
                친구의 코드를 입력해서 함께 학습해보세요!
              </p>
            </div>
            <div className="flex gap-3">
              <Input
                placeholder="친구 코드를 입력하세요 (예: ITL123)"
                value={friendCode}
                onChange={(e) => setFriendCode(e.target.value.toUpperCase())}
                className="text-center text-lg font-mono tracking-wider rounded-2xl border-2 border-[var(--italian-gray-200)] focus:border-[var(--italian-green)]"
              />
              <Button 
                onClick={handleAddFriend}
                disabled={!friendCode.trim()}
                className="px-6 rounded-2xl bg-[var(--italian-green)] hover:bg-[var(--italian-green-dark)] text-white shadow-flat-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Users className="w-4 h-4 mr-2" />
                추가
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-br from-[var(--italian-green-50)] to-[var(--italian-red-50)] rounded-3xl p-6 border-2 border-[var(--italian-green-100)]"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">💡</span>
            <h3 className="text-xl font-bold text-[var(--italian-gray-900)]">친구 응원 팁</h3>
          </div>
          <ul className="space-y-2 text-[var(--italian-gray-700)]">
            <li className="flex items-start gap-2">
              <span className="text-[var(--italian-green)] font-bold">•</span>
              <span>하루에 한 번씩 친구에게 응원을 보낼 수 있어요</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--italian-green)] font-bold">•</span>
              <span>응원을 받으면 하트 +1 또는 XP 보너스를 받아요</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--italian-green)] font-bold">•</span>
              <span>함께 학습하면 더 재미있고 오래 지속할 수 있어요!</span>
            </li>
          </ul>
        </motion.div>

        {/* Today's Encouragements Received Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-white rounded-3xl p-6 shadow-flat-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--italian-gray-900)]">
                  오늘 받은 응원
                </h3>
                <p className="text-sm text-[var(--italian-gray-600)]">
                  친구들이 보내준 마음
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              <span className="text-3xl font-bold text-[var(--italian-green)]">
                {encouragementsReceived}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}