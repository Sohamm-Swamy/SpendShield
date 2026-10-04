import { FoundationCheck } from '@/components/FoundationCheck';
import { PlaceholderScreen } from '@/components/PlaceholderScreen';

export default function HomeScreen() {
  return (
    <PlaceholderScreen
      icon="🛡️"
      title="SpendShield"
      subtitle="Foundation is live. Phase 2 brings logging, budgets and insights.">
      <FoundationCheck />
    </PlaceholderScreen>
  );
}