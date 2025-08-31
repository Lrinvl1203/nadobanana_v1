# 🍌 나도바나나 이미지 생성기

Gemini AI를 활용한 단일 HTML 파일 + Netlify Functions 구조의 이미지 생성 웹 앱

## 🚀 배포 방법

### 1단계: GitHub 저장소에 푸시
```bash
git add .
git commit -m "feat: User API key input system + Single HTML deployment"
git push
```

### 2단계: Netlify 배포
1. [Netlify](https://netlify.com)에 로그인
2. "Add new site" → "Import an existing project" 클릭
3. "Deploy with GitHub" 선택
4. GitHub 저장소 `nadobanana_v1` 선택
5. Build settings:
   - Build command: (비워두기)
   - Publish directory: `.` (루트)
6. **환경변수 설정 불필요!** (사용자가 직접 입력)

### 3단계: 배포 완료 ✅
- 배포 URL에서 바로 실행 가능
- 사용자가 각자 API 키를 입력하여 사용
- 다중 사용자 배포 준비 완료!

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

## 🔑 API 키 설정

**사용자별 개별 설정 시스템**

- ✅ 환경변수 설정 불필요
- ✅ 각 사용자가 개별 API 키 입력
- ✅ 브라우저 LocalStorage에 안전 저장
- ✅ 언제든지 재설정 가능 (🔑 버튼)

### API 키 발급 방법:
1. [Google AI Studio](https://makersuite.google.com/app/apikey) 접속
2. "Create API key" 클릭
3. 생성된 키를 웹앱에서 입력
4. 완료!

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
- 웹앱 우측 상단 🔑 버튼 클릭하여 재설정
- Google AI Studio에서 API 키 재생성
- API 키 유효성 확인 (최소 10자 이상)

### CORS 오류
- `netlify.toml`의 헤더 설정 확인
- Functions의 CORS 헤더 확인

### 빌드 오류
- `package.json`의 Node.js 버전 확인
- Netlify Functions의 의존성 확인

---

## 🎯 배포 특징

### ✅ 다중 사용자 친화적
- 각 사용자가 개별 API 키 사용
- 환경변수 설정 불필요
- 즉시 배포 가능

### ✅ 보안 최적화
- API 키는 클라이언트에서만 처리
- 서버에 저장되지 않음
- LocalStorage 안전 저장

### ✅ 사용 편의성
- 원클릭 배포
- 직관적 UI/UX
- 모바일 완벽 지원

---

**FLAG-20250831-1630-004** - 다중 사용자 API 키 시스템 + Single HTML 배포 준비 완료