# 🚀 배포 가이드

Numeri Italiani 프로젝트를 다양한 플랫폼에 배포하는 방법을 안내합니다.

## 📋 목차

- [Vercel 배포 (권장)](#vercel-배포)
- [Netlify 배포](#netlify-배포)
- [GitHub Pages 배포](#github-pages-배포)
- [도커 배포](#도커-배포)
- [환경 변수 설정](#환경-변수-설정)

## 🌟 Vercel 배포 (권장)

### 1. 자동 배포 (GitHub 연동)
1. [Vercel](https://vercel.com)에 회원가입/로그인
2. "New Project" 클릭
3. GitHub 저장소 선택
4. 프로젝트 설정:
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   ```
5. "Deploy" 클릭

### 2. CLI 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서
vercel

# 프로덕션 배포
vercel --prod
```

### 3. 환경 변수 설정
Vercel 대시보드에서 Settings > Environment Variables:
```
VITE_APP_NAME=Numeri Italiani
VITE_GA_MEASUREMENT_ID=your-ga-id
```

## 🔷 Netlify 배포

### 1. 자동 배포
1. [Netlify](https://netlify.com)에 로그인
2. "New site from Git" 클릭
3. GitHub 저장소 연결
4. 빌드 설정:
   ```
   Build command: npm run build
   Publish directory: dist
   ```

### 2. Drag & Drop 배포
```bash
# 로컬에서 빌드
npm run build

# dist 폴더를 Netlify에 드래그 앤 드롭
```

### 3. CLI 배포
```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 배포
netlify deploy

# 프로덕션 배포
netlify deploy --prod
```

## 📄 GitHub Pages 배포

### 1. 자동 배포 (GitHub Actions)
`.github/workflows/deploy.yml` 파일이 이미 설정되어 있습니다.

### 2. 수동 설정
1. 저장소 Settings > Pages
2. Source: "GitHub Actions" 선택
3. `main` 브랜치에 푸시하면 자동 배포

### 3. 베이스 URL 설정
```javascript
// vite.config.ts
export default defineConfig({
  base: '/numeri-italiani/', // 저장소 이름
  // ... 기타 설정
})
```

## 🐳 도커 배포

### 1. Dockerfile 생성
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. nginx.conf 설정
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

### 3. 빌드 및 실행
```bash
# 이미지 빌드
docker build -t numeri-italiani .

# 컨테이너 실행
docker run -p 8080:80 numeri-italiani
```

## ⚙️ 환경 변수 설정

### 개발 환경
```bash
# .env.local 파일 생성
cp .env.example .env.local

# 값 설정
VITE_APP_NAME=Numeri Italiani
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_DEV_MODE=true
```

### 프로덕션 환경
각 플랫폼의 환경 변수 설정 페이지에서:

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `VITE_APP_NAME` | 앱 이름 | Numeri Italiani |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics ID | G-XXXXXXXXXX |
| `VITE_API_URL` | API 서버 URL | https://api.example.com |
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL | https://xxx.supabase.co |
| `VITE_SUPABASE_ANON_KEY` | Supabase 익명 키 | eyJ... |

## 🔧 빌드 최적화

### 1. Bundle 분석
```bash
# Bundle analyzer 추가
npm install --save-dev rollup-plugin-analyzer

# 분석 실행
npm run build
```

### 2. 성능 최적화
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['motion'],
          ui: ['lucide-react']
        }
      }
    }
  }
})
```

## 📊 배포 후 체크리스트

### ✅ 기능 테스트
- [ ] 홈 화면 정상 로딩
- [ ] 퀴즈 게임 동작
- [ ] 매칭 게임 동작
- [ ] 친구 시스템 UI
- [ ] TTS 음성 기능
- [ ] 다국어 전환
- [ ] 반응형 디자인

### ✅ 성능 체크
- [ ] 초기 로딩 시간 < 3초
- [ ] Lighthouse 점수 > 90
- [ ] Core Web Vitals 통과
- [ ] 모바일 최적화

### ✅ SEO 및 메타데이터
- [ ] 제목 및 설명 태그
- [ ] Open Graph 이미지
- [ ] Favicon 설정
- [ ] robots.txt (필요시)

## 🚨 트러블슈팅

### 빌드 에러
```bash
# 종속성 재설치
rm -rf node_modules package-lock.json
npm install

# 캐시 클리어
npm run build -- --force
```

### 배포 후 404 에러
SPA 라우팅 설정 확인:
```javascript
// Vercel: vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}

// Netlify: _redirects
/*    /index.html   200
```

### 환경 변수 인식 안됨
- `VITE_` 접두사 확인
- 빌드 후 재배포
- 플랫폼별 환경 변수 설정 확인

---

**배포 성공을 기원합니다! 🚀**