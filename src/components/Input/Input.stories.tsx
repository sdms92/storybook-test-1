/**
 * ## 이 파일이 보여주는 Storybook 기능
 *
 * - **Decorators (스토리 단위)**: `FormGroup` 스토리는 `decorators` 배열로 해당 스토리만
 *   폼 레이아웃 박스 안에 감쌉니다. 전역 decorator와 달리 특정 스토리에만 적용됩니다.
 * - **Actions + fn()**: onChange·onFocus·onBlur를 스파이로 등록해 Actions 패널에서
 *   이벤트 호출 횟수와 인자를 확인합니다.
 * - **다양한 상태 스토리**: 에러, 비활성화, 비밀번호 타입을 각각의 스토리로 분리합니다.
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
      description: '입력 타입',
    },
    disabled: { control: 'boolean', description: '비활성화 여부' },
    error: { control: 'text', description: '에러 메시지 (없으면 undefined)' },
    label: { control: 'text', description: '라벨 텍스트' },
    placeholder: { control: 'text', description: 'placeholder 텍스트' },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: '입력하세요' },
};

export const WithLabel: Story = {
  args: { label: '이름', placeholder: '이름을 입력하세요' },
};

export const WithError: Story = {
  args: {
    label: '이메일',
    placeholder: 'user@example.com',
    error: '올바른 이메일 형식이 아닙니다',
  },
};

export const Disabled: Story = {
  args: { label: '비활성화 필드', placeholder: '입력 불가', disabled: true },
};

export const Password: Story = {
  args: { label: '비밀번호', placeholder: '비밀번호를 입력하세요', type: 'password' },
};

// Decorator 예제: 이 스토리에서만 폼 컨테이너로 감쌉니다
export const FormGroup: Story = {
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          backgroundColor: '#ffffff',
          width: '360px',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#111827' }}>
          회원가입
        </h3>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <Input label="이름" placeholder="이름을 입력하세요" />
      <Input label="이메일" placeholder="user@example.com" type="email" />
      <Input
        label="비밀번호"
        placeholder="8자 이상 입력하세요"
        type="password"
        error="비밀번호는 8자 이상이어야 합니다"
      />
    </>
  ),
};
