/**
 * ## 이 파일이 보여주는 Storybook 기능
 *
 * - **Play 함수**: `Interactive` 스토리는 `play`로 자동 인터랙션을 실행합니다.
 *   버튼 클릭 → 모달 열림 → 닫기 버튼 클릭 → 모달 닫힘을 자동으로 검증합니다.
 * - **userEvent**: 실제 사용자처럼 클릭·타이핑을 시뮬레이션합니다.
 * - **expect + screen**: `expect(dialog).toBeInTheDocument()`로 DOM 상태를 단언합니다.
 *   createPortal로 document.body에 렌더된 요소는 `screen`으로 탐색합니다.
 * - **render + useState**: 내부 상태가 필요한 스토리는 render 함수에서 래퍼 컴포넌트를 씁니다.
 */

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { expect, fn, screen, userEvent, within } from 'storybook/test';
import { Button } from '../Button/Button';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: '모달 너비',
    },
    isOpen: { control: 'boolean', description: '열림 여부 (Controls로 직접 토글 가능)' },
    title: { control: 'text', description: '모달 제목' },
  },
  args: {
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Controls 패널에서 isOpen을 직접 토글해볼 수 있는 스토리
export const Open: Story = {
  args: {
    isOpen: true,
    title: '모달 제목',
    children: (
      <p style={{ margin: 0 }}>
        모달 내용입니다. Controls 패널에서 <strong>isOpen</strong>을 토글하거나{' '}
        <strong>size</strong>를 바꿔보세요.
      </p>
    ),
  },
};

export const SmallSize: Story = {
  args: {
    isOpen: true,
    title: '작은 모달',
    size: 'sm',
    children: <p style={{ margin: 0 }}>작은 크기의 모달입니다.</p>,
  },
};

export const LargeSize: Story = {
  args: {
    isOpen: true,
    title: '큰 모달',
    size: 'lg',
    children: (
      <p style={{ margin: 0 }}>
        큰 모달은 긴 내용을 담을 때 사용합니다. 여기에 폼, 표, 긴 설명 등을 넣을 수 있습니다.
      </p>
    ),
  },
};

// useState가 필요한 인터랙티브 스토리 — render 함수로 래퍼 컴포넌트 사용
function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button label="모달 열기" onClick={() => setIsOpen(true)} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="인터랙티브 모달">
        <p style={{ margin: '0 0 16px' }}>
          버튼 클릭, ESC 키, 배경 클릭으로 모달을 닫을 수 있습니다.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button label="취소" variant="secondary" size="sm" onClick={() => setIsOpen(false)} />
          <Button label="확인" variant="primary" size="sm" onClick={() => setIsOpen(false)} />
        </div>
      </Modal>
    </div>
  );
}

// play 함수: 버튼 클릭 → 모달 열림 → 닫기 버튼 클릭 → 모달 닫힘을 자동 검증
export const Interactive: Story = {
  render: () => <ModalDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. 모달 열기 버튼 클릭
    await userEvent.click(canvas.getByRole('button', { name: '모달 열기' }));

    // 2. createPortal로 document.body에 렌더되므로 screen으로 탐색
    const dialog = await screen.findByRole('dialog');
    await expect(dialog).toBeInTheDocument();

    // 3. 취소 버튼 클릭
    await userEvent.click(within(dialog).getByRole('button', { name: '취소' }));

    // 4. 모달이 닫혔는지 확인
    await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  },
};
