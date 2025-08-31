# 🍌 나도바나나 이미지 생성기

Gemini AI를 활용한 단일 HTML 파일 + Netlify Functions 구조의 이미지 생성 웹 앱

## 🚀 배포 방법

### 1단계: GitHub 저장소에 푸시
```bash
git add .
git commit -m "feat: Single HTML + Netlify Functions deployment ready"
git push
```

### 2단계: Netlify 배포
1. [Netlify](https://netlify.com)에 로그인
2. "New site from Git" 클릭
3. GitHub 저장소 `nadobanana_v1` 선택
4. Build settings:
   - Build command: (비워두기)
   - Publish directory: `.` (루트)
5. Environment variables 설정:
   - `GEMINI_API_KEY`: 구글 AI Studio에서 발급받은 API 키

### 3단계: 배포 완료
- 배포 URL에서 바로 실행 가능
- 단일 HTML 파일 + 서버리스 함수로 완전한 앱 동작

## 📁 프로젝트 구조

```
├── index.html                 # 메인 앱 (단일 HTML 파일)
├── netlify/functions/        # 서버리스 함수
│   ├── generate-image.js     # 이미지 생성 API
│   └── edit-image.js         # 이미지 수정 API
├── netlify.toml              # Netlify 설정
├── package.json              # 의존성 관리
└── README.md                 # 이 파일
```

## 🔧 기능

### ✨ 이미지 생성
- 텍스트 프롬프트로 AI 이미지 생성
- Gemini Imagen-4.0 모델 사용

### 🖼️ 이미지 수정
- 기존 이미지 업로드 후 수정
- Gemini 2.5 Flash Image Preview 모델 사용

### 💾 히스토리 관리
- 생성된 이미지 로컬 저장 (최대 50개)
- 다운로드 및 공유 기능

### 📱 반응형 디자인
- 모바일/데스크톱 최적화
- Tailwind CSS 사용

## 🔑 환경변수

Netlify Dashboard에서 설정 필요:

```
GEMINI_API_KEY=your-gemini-api-key-here
```

## 🛠️ 로컬 개발

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:8888 접속
```

## 📈 성능 최적화

- 단일 HTML 파일로 초기 로딩 최적화
- Tailwind CSS CDN 사용으로 번들 크기 최소화
- 서버리스 함수로 API 호출 최적화
- LocalStorage로 히스토리 캐싱

## 🔒 보안

- CORS 헤더 적용
- CSP (Content Security Policy) 설정
- API 키는 서버 사이드에서만 사용
- XSS 보호 헤더 적용

## 📊 배포 후 확인사항

1. ✅ 메인 페이지 로딩
2. ✅ 이미지 생성 기능
3. ✅ 이미지 수정 기능
4. ✅ 히스토리 저장/불러오기
5. ✅ 다운로드/공유 기능
6. ✅ 모바일 반응형

## 🐛 트러블슈팅

### API 키 오류
- Netlify Dashboard에서 `GEMINI_API_KEY` 환경변수 확인
- Google AI Studio에서 API 키 재생성

### CORS 오류
- `netlify.toml`의 헤더 설정 확인
- Functions의 CORS 헤더 확인

### 빌드 오류
- `package.json`의 Node.js 버전 확인
- Netlify Functions의 의존성 확인

---

**FLAG-20250831-1600-003** - Single HTML + Netlify Functions 배포 준비 완료