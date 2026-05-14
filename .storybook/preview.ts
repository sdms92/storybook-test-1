/**
 * Global Storybook 설정
 *
 * - parameters: 모든 스토리에 적용되는 기본 파라미터
 * - decorators: 모든 스토리를 감싸는 전역 래퍼 (여기서는 사용 안 함)
 *
 * 개별 스토리에서 parameters를 재정의하면 전역 설정을 덮어씁니다.
 */

import type { Preview } from '@storybook/nextjs';

const preview: Preview = {
  parameters: {
    // 기본 배경색 목록 — Storybook 툴바에서 전환 가능
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'gray', value: '#f3f4f6' },
        { name: 'dark', value: '#1f2937' },
      ],
    },
    // Controls 패널에서 색상/날짜 관련 prop을 자동으로 적절한 컨트롤로 매핑
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
