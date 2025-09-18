# 🤝 Contributing to Numeri Italiani

Numeri Italiani 프로젝트에 기여해주셔서 감사합니다! 이 가이드는 프로젝트에 기여하는 방법을 설명합니다.

## 📋 기여 방법

### 1. 이슈 리포트
버그를 발견하거나 새로운 기능을 제안하고 싶으시면:

1. [Issues](https://github.com/your-username/numeri-italiani/issues)에서 기존 이슈 확인
2. 새로운 이슈 생성
3. 명확한 제목과 설명 작성
4. 재현 단계 (버그의 경우) 또는 기능 설명 포함

### 2. Pull Request 절차

1. **Fork** 이 저장소
2. 새로운 **feature branch** 생성:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. 변경사항 **commit**:
   ```bash
   git commit -m 'Add: 새로운 멋진 기능'
   ```
4. branch에 **push**:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Pull Request** 생성

## 🎯 기여 가능한 영역

### 🐛 버그 수정
- UI/UX 버그 수정
- 게임 로직 오류 수정
- 성능 최적화
- 접근성 개선

### ✨ 새로운 기능
- 새로운 게임 모드
- 추가 언어 지원
- 학습 컨텐츠 확장
- 소셜 기능 개선

### 📚 문서화
- README 개선
- 코드 주석 추가
- API 문서 작성
- 사용자 가이드 작성

### 🎨 디자인
- UI/UX 개선
- 애니메이션 추가
- 색상/테마 개선
- 반응형 디자인 향상

## 💻 개발 환경 설정

### 필요 조건
- Node.js 16+
- npm 8+
- Git

### 설치 및 실행
```bash
# 저장소 클론
git clone https://github.com/your-username/numeri-italiani.git
cd numeri-italiani

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 빌드 테스트
npm run build
```

## 📝 코딩 스타일

### TypeScript
- **엄격한 타입 검사** 사용
- 명확한 **인터페이스** 정의
- **any 타입** 사용 최소화

### React
- **함수형 컴포넌트** 사용
- **useState, useEffect** 등 Hooks 활용
- **Props 타입** 명시

### 스타일링
- **Tailwind CSS** 클래스 사용
- **CSS 변수**로 테마 관리
- **반응형 디자인** 고려

### 파일 구조
```
components/
├── ui/              # 재사용 가능한 UI 컴포넌트
├── GameUI.tsx       # 게임 관련 컴포넌트
├── QuizScreen.tsx   # 화면별 컴포넌트
└── ...

data/
├── lessons.ts       # 데이터 정의
└── badges.ts

styles/
└── globals.css      # 전역 스타일
```

## 📋 Pull Request 체크리스트

- [ ] 기능이 의도한 대로 작동하는가?
- [ ] 기존 테스트가 통과하는가?
- [ ] 새로운 기능에 대한 테스트를 작성했는가?
- [ ] 코드가 프로젝트 스타일을 따르는가?
- [ ] 문서가 업데이트되었는가?
- [ ] 커밋 메시지가 명확한가?

## 📜 커밋 메시지 규칙

커밋 메시지는 다음 형식을 따라주세요:

```
타입: 간단한 설명

더 자세한 설명 (선택사항)
```

### 타입
- `Add:` 새로운 기능 추가
- `Fix:` 버그 수정
- `Update:` 기존 기능 수정
- `Remove:` 코드/파일 삭제
- `Docs:` 문서 수정
- `Style:` 스타일 변경
- `Refactor:` 코드 리팩토링
- `Test:` 테스트 추가/수정

### 예시
```
Add: 이탈리아어 TTS 음성 기능

Web Speech API를 활용하여 숫자 발음을 들을 수 있는 기능을 추가했습니다.
- SpeechButton 컴포넌트 생성
- 퀴즈 화면에 음성 버튼 통합
- 브라우저 호환성 체크 포함
```

## 🔍 코드 리뷰

Pull Request를 제출하면 다음과 같은 항목들이 검토됩니다:

### 기능성
- 요구사항을 충족하는가?
- 기존 기능에 영향을 주지 않는가?
- 엣지 케이스가 고려되었는가?

### 코드 품질
- 읽기 쉽고 이해하기 쉬운가?
- 재사용 가능한 구조인가?
- 성능에 문제가 없는가?

### 사용자 경험
- 직관적인 인터페이스인가?
- 접근성이 고려되었는가?
- 반응형 디자인이 적용되었는가?

## 🐛 버그 리포트 템플릿

```markdown
## 버그 설명
명확하고 간결한 버그 설명

## 재현 단계
1. '...' 으로 이동
2. '...' 클릭
3. '...' 까지 스크롤
4. 오류 확인

## 예상 동작
무엇이 일어날 것으로 예상했는지 설명

## 실제 동작
실제로 무엇이 일어났는지 설명

## 스크린샷
가능하다면 스크린샷 첨부

## 환경
- OS: [e.g. iOS]
- 브라우저: [e.g. chrome, safari]
- 버전: [e.g. 22]

## 추가 컨텍스트
버그에 대한 기타 컨텍스트 추가
```

## ✨ 기능 요청 템플릿

```markdown
## 기능 설명
추가하고 싶은 기능에 대한 명확하고 간결한 설명

## 문제/필요성
이 기능이 해결하는 문제나 필요성 설명

## 제안하는 해결책
원하는 해결책에 대한 명확하고 간결한 설명

## 대안
고려한 대안들에 대한 명확하고 간결한 설명

## 추가 컨텍스트
기능 요청에 대한 기타 컨텍스트나 스크린샷 추가
```

## 📞 연락처

궁금한 점이 있으시면 언제든지 연락해주세요:

- GitHub Issues: [이슈 생성](https://github.com/your-username/numeri-italiani/issues)
- Email: your-email@example.com

## 🙏 감사의 말

모든 기여자들에게 감사드립니다! 여러분의 기여가 Numeri Italiani를 더 좋은 앱으로 만들어갑니다.

---

**Grazie mille per il vostro contributo! 🇮🇹**