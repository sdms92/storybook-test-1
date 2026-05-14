import { Badge } from '@/components/Badge/Badge';
import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';

export default function Home() {
  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
        Storybook 실습 프로젝트
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '40px' }}>
        컴포넌트 확인은 <code>npm run storybook</code> 으로 실행하세요.
      </p>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Buttons</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button label="Primary" variant="primary" />
          <Button label="Secondary" variant="secondary" />
          <Button label="Danger" variant="danger" />
          <Button label="Ghost" variant="ghost" />
          <Button label="Loading" loading />
          <Button label="Disabled" disabled />
        </div>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Badges</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge label="기본" />
          <Badge label="정보" variant="info" />
          <Badge label="성공" variant="success" dot />
          <Badge label="경고" variant="warning" dot />
          <Badge label="오류" variant="error" />
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Cards</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Card
            title="컴포넌트 개발"
            description="Storybook으로 컴포넌트를 독립적으로 개발합니다."
            badge={<Badge label="진행 중" variant="info" dot />}
          />
          <Card title="로딩 상태" loading />
        </div>
      </section>
    </main>
  );
}
