/**
 * ## 이 파일이 보여주는 Storybook 기능
 *
 * - **ArgTypes 세부 설정**: `control: { type: 'select' }`로 드롭다운 컨트롤을 지정합니다.
 * - **tags: ['autodocs']**: Storybook이 Props 테이블과 설명을 자동으로 문서 페이지에 생성합니다.
 * - **render 함수**: `AllVariants`처럼 args 없이 직접 JSX를 반환해 여러 상태를 한눈에 볼 수 있습니다.
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: '뱃지 색상 변형',
    },
    dot: {
      control: 'boolean',
      description: '앞에 점(dot) 표시 여부',
    },
    label: {
      control: 'text',
      description: '뱃지 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: '기본', variant: 'default' },
};

export const Info: Story = {
  args: { label: '정보', variant: 'info' },
};

export const Success: Story = {
  args: { label: '성공', variant: 'success' },
};

export const Warning: Story = {
  args: { label: '경고', variant: 'warning' },
};

export const Error: Story = {
  args: { label: '오류', variant: 'error' },
};

export const WithDot: Story = {
  args: { label: '활성', variant: 'success', dot: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge label="기본" variant="default" />
      <Badge label="정보" variant="info" />
      <Badge label="성공" variant="success" dot />
      <Badge label="경고" variant="warning" dot />
      <Badge label="오류" variant="error" />
    </div>
  ),
};
