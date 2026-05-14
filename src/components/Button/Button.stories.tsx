/**
 * ## 이 파일이 보여주는 Storybook 기능
 *
 * - **Args / Controls**: `argTypes`로 Controls 패널에서 variant·size·disabled 등을 실시간으로 바꿀 수 있습니다.
 * - **Actions**: `fn()`으로 만든 스파이 함수를 onClick에 연결하면 Actions 패널에서 클릭 이벤트를 확인합니다.
 * - **Multiple Stories**: 같은 컴포넌트의 다양한 상태(Primary, Danger, Loading …)를 각각의 스토리로 분리합니다.
 * - **Custom Render**: `AllVariants` 스토리처럼 `render` 함수로 여러 컴포넌트를 한 화면에 배치할 수 있습니다.
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'ghost'],
      description: '버튼 스타일 변형',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: '버튼 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
    },
    label: {
      control: 'text',
      description: '버튼 텍스트',
    },
  },
  // fn()은 storybook/test의 스파이 함수 — Actions 패널에 로그를 남깁니다
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { label: '확인', variant: 'primary' },
};

export const Secondary: Story = {
  args: { label: '취소', variant: 'secondary' },
};

export const Danger: Story = {
  args: { label: '삭제', variant: 'danger' },
};

export const Ghost: Story = {
  args: { label: '더보기', variant: 'ghost' },
};

export const Small: Story = {
  args: { label: '작은 버튼', size: 'sm' },
};

export const Large: Story = {
  args: { label: '큰 버튼', size: 'lg' },
};

export const Disabled: Story = {
  args: { label: '비활성화', disabled: true },
};

export const Loading: Story = {
  args: { label: '저장', loading: true },
};

// render 함수로 여러 버튼을 한 스토리에 나란히 배치
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button label="Primary" variant="primary" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Danger" variant="danger" />
      <Button label="Ghost" variant="ghost" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button label="Small" size="sm" />
      <Button label="Medium" size="md" />
      <Button label="Large" size="lg" />
    </div>
  ),
};
