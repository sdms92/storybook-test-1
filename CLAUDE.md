# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

```bash
npm run dev          # 개발 서버 실행 (Next.js)
npm run build        # 프로덕션 빌드
npm run lint         # ESLint (next lint)
npm run format       # Prettier 자동 수정
npm run format:check # Prettier 검사 (CI용)
npm run storybook    # Storybook 개발 서버 (포트 6006)
npm run build-storybook # Storybook 정적 빌드
```

목(mock) 데이터와 실제 API 간 전환은 환경 변수로 제어합니다:
```
NEXT_PUBLIC_USE_MOCK=true npm run dev
```

## 목적

Storybook의 다양한 기능과 패턴을 실험해보는 프로젝트입니다.
컴포넌트는 FCIS-Clean 아키텍처(아래 참고)를 따라 구성합니다.

## 아키텍처 — FCIS-Clean (Functional Core, Imperative Shell + Clean)

피처 단위로 `src/features/<feature>/` 하위에 다음 레이어로 구성합니다.

```
src/features/<feature>/
├── core/        순수 비즈니스 로직 — I/O 없음, 부작용 없음
├── shared/
│   ├── convert.ts   검증(Zod) + 도메인 → View 변환 순수 함수
│   └── dto/
│       ├── request.ts   Shell이 API 호출 시 사용하는 입력 타입
│       ├── response.ts  API 응답 타입 (Zod 스키마 + infer)
│       └── view.ts      VM/View가 소비하는 표시용 타입
├── shell/       side effect 담당 — 네트워크, mock, 조율
│   ├── api.ts       실제 fetch 함수
│   ├── mock.ts      목업 데이터 함수
│   └── index.ts     fetcher 주입 팩토리 + 환경 변수 기반 선택
├── view/        UI 컴포넌트 — hook 결과를 렌더링만
│   ├── <Feature>.tsx
│   └── <Feature>.stories.tsx  Storybook 스토리 (co-located)
└── vm/          ViewModel hook — 상태 + shell 호출 조율
    └── use<Feature>.ts
```

### 의존성 규칙

- `view` → `vm` → `shell` → `shared` → `core` (안쪽 방향만 허용)
- `core`와 `shared/convert.ts`는 외부 모듈을 import하지 않음 (Zod 제외)
- `shell/index.ts`의 팩토리 함수로 fetcher를 주입받아 테스트 시 교체 가능
- `vm` hook은 함수 파라미터로 shell 함수를 선택적으로 주입받아 hook 단독 테스트 가능

### 데이터 흐름

```
view (UI 렌더) ↔ vm (상태/이벤트)
                   ↓
              shell/index.ts (조율)
                   ↓
         shell/api.ts or shell/mock.ts (I/O)
                   ↓
        shared/convert.ts (validateResponse → toViewDto)
                   ↓
           core/policy.ts (비즈니스 규칙)
```

## Storybook

- 프레임워크: `@storybook/nextjs` v10 (Next.js 16 + React 19 지원)
- 스토리 파일은 컴포넌트와 동일 디렉터리에 co-located (`*.stories.tsx`)
- 설정 파일: `.storybook/main.ts`, `.storybook/preview.ts`
- `parameters.nextjs.appDirectory: true` 설정 필요

## 코드 스타일

Prettier: 작은따옴표, 줄 너비 90자, ES5 trailing comma, `semi: true`.
ESLint: `eslint-config-next` (Core Web Vitals + TypeScript 규칙).
