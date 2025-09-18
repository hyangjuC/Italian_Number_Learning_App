# 🇮🇹 Numeri Italiani - Italian Numbers Learning App

> **재미있게 배우는 이탈리아 숫자! Learn Italian numbers with fun!**

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-10.16-FF6B6B?logo=framer)](https://motion.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

**Numeri Italiani**는 게이미피케이션과 소셜 기능을 활용하여 이탈리아 숫자를 재미있게 학습할 수 있는 모바일 퍼스트 웹 애플리케이션입니다.

![App Preview](https://via.placeholder.com/800x400/009246/ffffff?text=🇮🇹+Numeri+Italiani)

## ✨ 주요 특징

### 🎮 **다양한 학습 모드**
- **🔢 퀴즈 모드**: 다지선다 문제로 숫자 맞추기
- **🃏 카드 매칭**: 드래그 앤 드롭으로 숫자와 이탈리아어 단어 매칭
- **🎵 음성 학습**: Web Speech API를 활용한 이탈리아어 발음 듣기

### 🏆 **게이미피케이션 시스템**
- **❤️ 하트 시스템**: 실패 3회 제한으로 긴장감 조성
- **⭐ XP & 레벨**: 정답 시 +10 XP 획득, 레벨업 시스템
- **🔥 스트릭**: 연속 학습 일수 추적
- **🏅 배지 수집**: 다양한 성취 조건의 배지 시스템
- **⭐ 별 수집**: 레슨별 최대 3개 별 획득 (시도 횟수에 따른 등급)

### 📚 **단계별 학습 시스템**
| 레벨 | 범위 | 해제 조건 |
|------|------|----------|
| 🟢 **초급** | 1-10 | 처음부터 이용 가능 |
| 🟡 **중급** | 11-20 | 초급 레슨 1개 완료 시 |
| 🔴 **고급** | 20-100 | 중급 레슨 1개 완료 시 |

### 👥 **소셜 기능**
- **친구 코드 시스템**: 고유 코드로 친구 추가
- **💌 응원 메시지**: 하루 1회 친구에게 응원 전송
- **🎁 하트 보너스**: 친구 응원으로 하트 +1 또는 XP 보너스

### 🌐 **다국어 지원**
- **🇰🇷 한국어** / **🇺🇸 영어** 완전 지원
- 실시간 언어 전환
- 모든 UI 텍스트 완전 현지화

### 🎨 **디자인 시스템**
- **이탈리아 국기 색상** 테마 (녹색 메인, 빨강 서브, 흰색)
- **Material Design 3.0** 스타일 가이드
- **Flat Design** 그림자 및 애니메이션
- **반응형 모바일 퍼스트** 디자인

## 🚀 빠른 시작

### 📋 필요 조건
- **Node.js** 16.0.0 이상
- **npm** 8.0.0 이상
- 모던 웹 브라우저 (Chrome, Firefox, Safari, Edge)

### ⚡ 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/your-username/numeri-italiani.git
cd numeri-italiani

# 2. 의존성 설치
npm install

# 3. 개발 서버 시작
npm run dev

# 4. 브라우저에서 http://localhost:3000 열기
```

### 🏗️ 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 코드 품질 검사
npm run lint

# 코드 자동 수정
npm run lint:fix
```

## 📱 화면 및 기능

### 🏠 **홈 화면**
- 레슨 카드 그리드 레이아웃
- 단계별 잠금/해제 상태 시각화
- 완료한 레슨의 별점 표시
- 상단 게임 UI (하트, XP, 스트릭)

### 🎯 **퀴즈 화면**
- 진행률 프로그레스 바
- 4지선다 문제 형식
- 정답/오답 즉시 피드백
- 이탈리아어 TTS 음성 지원
- 애니메이션 성공/실패 효과

### 🃏 **매칭 게임**
- 드래그 앤 드롭 인터페이스
- 시도 횟수 기반 등급 시스템
- 실시간 점수 계산
- 부드러운 애니메이션 효과

### 🏆 **결과 화면**
- 획득 XP 및 새 배지 표시
- 메달 등급 (금/은/동)
- 별 획득 현황
- 다음 레슨 바로가기

### 👥 **친구 시스템**
- 친구 목록 및 온라인 상태
- 응원 메시지 주고받기
- 사용자 고유 친구 코드
- 친구 추가 기능

### ⭐ **수집품 화면**
- 획득한 별 총 개수
- 완료한 레슨 목록
- 배지 컬렉션
- 성취도 통계

## 🛠️ 기술 스택

### **Frontend**
- **⚛️ React 18** - 최신 리액트 훅과 함수형 컴포넌트
- **📘 TypeScript 5** - 타입 안정성과 개발자 경험
- **🎨 Tailwind CSS 4.0** - 유틸리티 퍼스트 CSS 프레임워크
- **✨ Motion** - 부드러운 애니메이션과 전환 효과

### **UI Components**
- **🧩 ShadCN/UI** - 접근성을 고려한 재사용 가능한 컴포넌트
- **🎭 Radix UI** - 헤드리스 UI 프리미티브
- **🔤 Lucide React** - 벡터 아이콘 라이브러리

### **Development Tools**
- **⚡ Vite** - 빠른 빌드 도구
- **📏 ESLint** - 코드 품질 검사
- **🎯 PostCSS** - CSS 후처리
- **📦 npm** - 패키지 관리

### **Browser APIs**
- **🎵 Web Speech API** - 이탈리아어 텍스트 음성 변환
- **💾 Local Storage** - 진행상황 로컬 저장 (예정)

## 📁 프로젝트 구조

```
numeri-italiani/
├── 📄 App.tsx                    # 메인 애플리케이션 컴포넌트
├── 📁 components/                # React 컴포넌트
│   ├── 📁 ui/                   # ShadCN UI 기본 컴포넌트
│   ├── 🎮 GameUI.tsx            # 게임 상단 UI (하트, XP, 스트릭)
│   ├── 🎯 QuizScreen.tsx        # 퀴즈 화면
│   ├── 🃏 SortingGame.tsx       # 매칭 게임 화면
│   ├── 🏆 ResultScreen.tsx      # 결과 화면
│   ├── 👥 FriendSystem.tsx      # 친구 시스템
│   ├── ⭐ StarCollection.tsx    # 별 수집 화면
│   ├── 🏅 RewardScreen.tsx      # 보상 화면
│   ├── 🧭 BottomNavigation.tsx  # 하단 네비게이션
│   ├── 📚 LessonCard.tsx        # 레슨 카드 컴포넌트
│   ├── 🎵 SpeechButton.tsx      # TTS 음성 버튼
│   └── ✨ SuccessFeedback.tsx   # 성공 피드백
├── 📁 data/                     # 데이터 정의
│   ├── 📖 lessons.ts           # 레슨 데이터
│   └── 🏅 badges.ts            # 배지 시스템
├── 📁 styles/                   # 스타일 파일
│   └── 🎨 globals.css          # 전역 CSS 및 테마
├── 📄 package.json             # 프로젝트 설정
├── 📄 tsconfig.json           # TypeScript 설정
├── 📄 tailwind.config.js      # Tailwind 설정
└── 📄 vite.config.ts          # Vite 빌드 설정
```

## 🎯 학습 시스템 상세

### 📊 **점수 및 등급 시스템**

#### 퀴즈 모드
- 정답당 **10 XP** 기본 획득
- 전체 문제 정답 시 **별 3개** 자동 획득
- 연속 정답 보너스

#### 매칭 게임 모드
| 성능 | 시도 횟수 | 메달 | 별 | XP 배율 |
|------|----------|------|-----|---------|
| 🥇 **완벽** | 완벽한 시도 | 금메달 | ⭐⭐⭐ | 1.5x (+50%) |
| 🥈 **우수** | +2회 실수 | 은메달 | ⭐⭐ | 1.2x (+20%) |
| 🥉 **양호** | +4회 실수 | 동메달 | ⭐ | 1.0x (기본) |
| 📝 **완료** | 그 외 | 없음 | - | 0.8x (-20%) |

### 🏅 **배지 시스템**

| 배지 | 조건 | XP 보상 |
|------|------|---------|
| 🎯 **첫 걸음** | 첫 레슨 완료 | +50 XP |
| 🔥 **연속 학습자** | 3일 연속 학습 | +100 XP |
| 💯 **완벽주의자** | 완벽한 점수 달성 | +200 XP |
| 🏆 **초급 마스터** | 모든 초급 레슨 완료 | +300 XP |
| 🎓 **중급 마스터** | 모든 중급 레슨 완료 | +500 XP |
| 👑 **고급 마스터** | 모든 고급 레슨 완료 | +1000 XP |

## 🎨 디자인 가이드

### 🇮🇹 **이탈리아 테마 색상**
```css
/* 메인 색상 */
--italian-green: #009246    /* 이탈리아 국기 녹색 */
--italian-red: #CE2B37      /* 이탈리아 국기 빨강 */
--italian-white: #FFFFFF    /* 순백색 */

/* 보조 색상 */
--italian-green-light: #00a84f
--italian-green-dark: #007a39
--italian-red-light: #d9474f
--italian-red-dark: #b5242e
```

### ✍️ **타이포그래피**
- **메인 폰트**: Pretendard (한글), system-ui (fallback)
- **헤딩 폰트**: Freight Big Pro (영문 제목)
- **장식 폰트**: Dancing Script (이탈리아어 강조)

### 🎭 **애니메이션 원칙**
- **Natural Motion**: 물리 기반 easing
- **Purposeful**: 기능적 의미가 있는 애니메이션
- **Delightful**: 사용자 경험을 향상시키는 미묘한 효과

## 🔧 개발 가이드

### 🎯 **컴포넌트 설계 원칙**
- **Single Responsibility**: 하나의 명확한 책임
- **Reusability**: 재사용 가능한 구조
- **Accessibility**: WCAG 2.1 AA 준수
- **Performance**: 최적화된 렌더링

### 📝 **코딩 컨벤션**
```typescript
// TypeScript 인터페이스
interface GameState {
  hearts: number;
  xp: number;
  streak: number;
  completedLessons: string[];
}

// React 함수형 컴포넌트
export function QuizScreen({ 
  questions, 
  onComplete 
}: QuizScreenProps) {
  // Hook 사용
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 명확한 함수명
  const handleAnswerSelect = (answer: string) => {
    // 구현...
  };
  
  return (
    <div className="quiz-container">
      {/* JSX */}
    </div>
  );
}
```

### 🎨 **스타일링 가이드**
```tsx
// Tailwind 유틸리티 클래스 사용
<button className="
  bg-italian-green 
  text-white 
  px-6 py-3 
  rounded-lg 
  hover:bg-italian-green-dark 
  transition-colors 
  duration-200
">
  시작하기
</button>

// CSS 변수 활용
<div style={{ 
  backgroundColor: 'var(--italian-green)',
  color: 'var(--italian-white)'
}}>
```

## 🌟 향후 계획

### 🚀 **단기 목표 (v1.1)**
- [ ] 로컬 스토리지를 통한 진행상황 저장
- [ ] PWA 지원 (오프라인 모드)
- [ ] 더 많은 배지 종류 추가
- [ ] 성능 최적화

### 🎯 **중기 목표 (v2.0)**
- [ ] 실제 백엔드 연동 (Supabase)
- [ ] 실시간 친구 시스템
- [ ] 추가 이탈리아어 학습 컨텐츠
- [ ] 음성 인식 기능

### 🔮 **장기 목표 (v3.0)**
- [ ] AI 기반 개인화 학습
- [ ] 다른 언어 지원 확장
- [ ] 네이티브 모바일 앱
- [ ] 글로벌 리더보드

## 🧪 테스트

### 🔍 **지원되는 브라우저**
| 브라우저 | 버전 | TTS 지원 |
|----------|------|----------|
| 🌏 Chrome | 90+ | ✅ |
| 🦊 Firefox | 88+ | ✅ |
| 🧭 Safari | 14+ | ✅ |
| 🔷 Edge | 90+ | ✅ |

### 📱 **모바일 지원**
- iOS Safari 14+
- Android Chrome 90+
- 반응형 터치 인터페이스
- 모바일 최적화 애니메이션

## 🤝 기여하기

이 프로젝트에 기여하고 싶으시다면 [CONTRIBUTING.md](./CONTRIBUTING.md)를 참조해주세요!

### 🔧 **기여 가능한 영역**
- 🐛 버그 수정
- ✨ 새로운 기능 추가
- 📚 문서 개선
- 🎨 UI/UX 향상
- 🌐 다국어 번역
- 🧪 테스트 추가

### 📋 **간단한 기여 절차**
1. 이 저장소를 **Fork**
2. 새로운 **feature branch** 생성
3. 변경사항 **commit**
4. **Pull Request** 생성

## 📞 문의 및 지원

### 💬 **커뮤니케이션**
- **GitHub Issues**: [버그 리포트 & 기능 요청](https://github.com/your-username/numeri-italiani/issues)
- **Email**: your-email@example.com
- **Discord**: [커뮤니티 서버](https://discord.gg/your-server)

### ❓ **자주 묻는 질문**

<details>
<summary><strong>Q: 음성이 나오지 않아요</strong></summary>

A: 브라우저에서 음성 기능이 활성화되어 있는지 확인해주세요. Chrome의 경우 설정 > 개인정보 및 보안 > 사이트 설정 > 마이크에서 허용해주세요.
</details>

<details>
<summary><strong>Q: 친구 코드는 어떻게 생성되나요?</strong></summary>

A: 현재는 목업 데이터를 사용하고 있습니다. 실제 백엔드 연동 시 고유한 친구 코드가 자동 생성됩니다.
</details>

<details>
<summary><strong>Q: 진행상황이 저장되나요?</strong></summary>

A: 현재는 세션 동안만 저장됩니다. v1.1에서 로컬 스토리지 저장 기능이 추가될 예정입니다.
</details>

## 📄 라이센스

이 프로젝트는 [MIT 라이센스](./LICENSE) 하에 배포됩니다.

```
MIT License

Copyright (c) 2024 Numeri Italiani

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

## 🙏 감사의 말

### 👏 **기여자들**
- **개발**: 메인 개발팀
- **디자인**: UI/UX 디자인팀  
- **번역**: 다국어 번역 커뮤니티
- **테스트**: 베타 테스터들

### 🎯 **영감을 준 프로젝트들**
- Duolingo - 게이미피케이션 아이디어
- Memrise - 기억법 학습 방식
- Anki - 간격 반복 학습 시스템

### 🛠️ **오픈소스 라이브러리**
- [React](https://reactjs.org/) - UI 프레임워크
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크  
- [Motion](https://motion.dev/) - 애니메이션 라이브러리
- [ShadCN/UI](https://ui.shadcn.com/) - UI 컴포넌트

---

<div align="center">

**🇮🇹 Buona fortuna con i numeri italiani! 🇮🇹**

*Made with ❤️ for Italian language learners*

[⭐ Star this repo](https://github.com/your-username/numeri-italiani) • [🐛 Report Bug](https://github.com/your-username/numeri-italiani/issues) • [💡 Request Feature](https://github.com/your-username/numeri-italiani/issues)

</div>