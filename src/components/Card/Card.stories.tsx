/**
 * ## 이 파일이 보여주는 Storybook 기능
 *
 * - **ReactNode 타입 Props**: `badge`, `footer`, `children`처럼 JSX를 props로 넘길 때는
 *   args에서는 표현할 수 없으므로 `render` 함수로 직접 작성합니다.
 * - **Story 간 컴포넌트 조합**: Card 스토리 안에 Button, Badge를 함께 사용해
 *   컴포넌트들이 실제로 어떻게 조합되는지 보여줍니다.
 * - **parameters.layout**: `'centered'`(기본) vs `'padded'`의 차이를 스토리별로 다르게 설정합니다.
 * - **parameters.backgrounds**: `Grid` 스토리에서 배경을 회색으로 바꿔 카드 흰색 배경이 잘 보이게 합니다.
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: '카드 제목' },
    description: { control: 'text', description: '카드 설명' },
    loading: { control: 'boolean', description: '스켈레톤 로딩 상태' },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '카드 제목',
    description: '카드에 들어갈 내용을 작성합니다. 여러 줄이 될 수도 있습니다.',
  },
};

// ReactNode props는 render 함수로 직접 넘깁니다
export const WithBadge: Story = {
  render: (args) => (
    <Card
      {...args}
      title="배포 완료"
      description="프로덕션 환경에 성공적으로 배포되었습니다."
      badge={<Badge label="성공" variant="success" dot />}
    />
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <Card
      {...args}
      title="새 기능 안내"
      description="이번 업데이트에서 추가된 기능들을 확인해보세요."
      badge={<Badge label="신규" variant="info" />}
      footer={
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button label="나중에" variant="secondary" size="sm" />
          <Button label="자세히 보기" variant="primary" size="sm" />
        </div>
      }
    />
  ),
};

export const Loading: Story = {
  args: {
    title: '',
    loading: true,
  },
};

export const Clickable: Story = {
  args: {
    title: '클릭 가능한 카드',
    description: 'Actions 패널에서 클릭 이벤트를 확인하세요.',
  },
};

// parameters.backgrounds와 padded 레이아웃으로 그리드 배치 예시
export const Grid: Story = {
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'gray' },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <Card
        title="디자인 시스템"
        description="컴포넌트 라이브러리를 구축합니다."
        badge={<Badge label="진행 중" variant="info" dot />}
      />
      <Card
        title="API 연동"
        description="백엔드 API와 연결합니다."
        badge={<Badge label="완료" variant="success" dot />}
      />
      <Card
        title="테스트 작성"
        description="유닛 테스트와 E2E 테스트를 작성합니다."
        badge={<Badge label="예정" variant="warning" />}
      />
      <Card title="로딩 상태" loading />
    </div>
  ),
};
