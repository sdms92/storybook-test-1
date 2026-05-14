# Storybook 실습 프로젝트

Next.js 16 + Storybook 10으로 구성된 Storybook 학습용 프로젝트입니다.

## 실행 방법

```bash
npm run storybook      # Storybook 개발 서버 (localhost:6006)
npm run dev            # Next.js 앱 (localhost:3000)
npm run build          # Next.js 프로덕션 빌드
npm run build-storybook # Storybook 정적 빌드
```

---

## Storybook이란?

UI 컴포넌트를 실제 앱과 독립적으로 개발·확인할 수 있는 도구입니다.  
각 컴포넌트의 다양한 상태(props 조합)를 **Story**로 작성하면, Storybook이 카탈로그 형태로 보여줍니다.

```
Button
├── Primary       → 파란 버튼
├── Danger        → 빨간 버튼
├── Disabled      → 비활성 버튼
└── Loading       → 로딩 중 버튼
```

---

## 핵심 개념

### 1. Story (스토리)
컴포넌트의 특정 상태를 정의하는 단위입니다.

```tsx
export const Primary: Story = {
  args: { label: '확인', variant: 'primary' },
};
```

### 2. Args & Controls
Story의 `args`가 Controls 패널과 연결됩니다.  
Storybook UI에서 값을 실시간으로 바꾸면 컴포넌트가 즉시 업데이트됩니다.

```tsx
argTypes: {
  variant: {
    control: { type: 'select' },        // 드롭다운
    options: ['primary', 'secondary'],
  },
  disabled: { control: 'boolean' },    // 체크박스
  label:    { control: 'text' },       // 텍스트 입력
}
```

### 3. Actions
`fn()`으로 만든 스파이 함수를 이벤트 핸들러에 연결하면,  
Actions 패널에서 클릭·변경 이벤트 호출 횟수와 인자를 확인할 수 있습니다.

```tsx
import { fn } from 'storybook/test';

args: {
  onClick: fn(),   // Actions 패널에 로그
}
```

### 4. Decorators (데코레이터)
스토리를 감싸는 래퍼입니다. 전역(`preview.ts`)과 스토리 단위 두 종류가 있습니다.

```tsx
// 이 스토리에서만 폼 컨테이너로 감싸기
export const FormGroup: Story = {
  decorators: [
    (Story) => (
      <div style={{ padding: '24px', border: '1px solid #e5e7eb' }}>
        <Story />
      </div>
    ),
  ],
};
```

### 5. Parameters
레이아웃, 배경색 등 Storybook 환경을 제어합니다.

```tsx
parameters: {
  layout: 'centered',   // 'centered' | 'padded' | 'fullscreen'
  backgrounds: { default: 'gray' },
}
```

### 6. Play 함수
스토리가 렌더된 후 자동으로 실행되는 인터랙션 스크립트입니다.  
사용자 행동을 시뮬레이션하고 결과를 단언(assert)할 수 있습니다.

```tsx
import { expect, userEvent, within, screen } from 'storybook/test';

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 버튼 클릭
    await userEvent.click(canvas.getByRole('button', { name: '모달 열기' }));

    // DOM 단언
    await expect(screen.getByRole('dialog')).toBeInTheDocument();
  },
};
```

### 7. `render` 함수
`args`만으로 표현할 수 없는 복잡한 JSX(ReactNode props, 내부 상태 등)를 직접 작성합니다.

```tsx
export const WithFooter: Story = {
  render: (args) => (
    <Card
      {...args}
      footer={<Button label="확인" />}   // ReactNode는 render에서 직접 넘김
    />
  ),
};
```

### 8. `tags: ['autodocs']`
메타에 추가하면 Storybook이 Props 테이블과 컴포넌트 설명을 자동으로 문서 페이지에 생성합니다.

---

## 컴포넌트 목록

| 컴포넌트 | 위치 | 주요 Storybook 기능 |
|----------|------|---------------------|
| **Button** | `src/components/Button/` | Args, ArgTypes(select/radio/boolean), Actions, render |
| **Badge** | `src/components/Badge/` | ArgTypes, autodocs, render |
| **Input** | `src/components/Input/` | Actions, Decorator(스토리 단위) |
| **Card** | `src/components/Card/` | ReactNode props, Story 간 컴포넌트 조합, backgrounds |
| **Modal** | `src/components/Modal/` | Play 함수, userEvent, expect, screen, useState + render |

---

## 파일 구조

```
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx          ← 컴포넌트 미리보기 페이지
└── components/
    ├── Button/
    │   ├── Button.tsx
    │   └── Button.stories.tsx
    ├── Badge/
    │   ├── Badge.tsx
    │   └── Badge.stories.tsx
    ├── Input/
    │   ├── Input.tsx
    │   └── Input.stories.tsx
    ├── Card/
    │   ├── Card.tsx
    │   └── Card.stories.tsx
    └── Modal/
        ├── Modal.tsx
        └── Modal.stories.tsx
.storybook/
    ├── main.ts            ← 프레임워크, 스토리 경로 설정
    └── preview.ts         ← 전역 parameters, decorators
```

---

## 기술 스택

| 항목 | 버전 |
|------|------|
| Next.js | 16.2.5 |
| React | 19.2.4 |
| Storybook | 10.x (`@storybook/nextjs`) |
| TypeScript | 5.x |
| Zod | 4.x |
