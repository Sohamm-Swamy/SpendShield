import { useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { haptics } from '@/lib/haptics';
import { parseAddExpenseParams } from '@/lib/deepLinks';

export default function AddExpenseScreen() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const draft = parseAddExpenseParams(params);

  const hasParams =
    draft.amount !== null ||
    draft.merchant !== null ||
    draft.note !== null ||
    draft.category !== null;

  return (
    <View className="flex-1 bg-void px-5 pt-6">
      <View className="rounded-2xl border border-border bg-surface p-5">
        <Text className="text-xs font-bold uppercase tracking-widest text-text-tertiary">
          Interceptor target
        </Text>

        <Text className="mt-4 font-mono text-5xl font-bold text-text-primary">
          {draft.amount !== null ? `₹${draft.amount}` : '₹0'}
        </Text>

        <Text className="mt-2 text-sm text-text-secondary">
          {draft.merchant ?? 'No merchant supplied'}
        </Text>

        {draft.note ? (
          <Text className="mt-1 text-sm text-text-tertiary">{draft.note}</Text>
        ) : null}

        {draft.category ? (
          <View className="mt-4 self-start rounded-lg border border-accent-dim bg-accent-dim px-3 py-1.5">
            <Text className="text-xs font-semibold text-accent-glow">
              {draft.category}
            </Text>
          </View>
        ) : null}

        <Text className="mt-5 text-xs leading-5 text-text-tertiary">
          {hasParams
            ? 'Deep link received and parsed. Amount entry, category picking and the need/want toggle arrive in Phase 2.'
            : 'No deep link params. Open spendshield://add?amount=450&merchant=Swiggy&category=food to prefill this screen.'}
        </Text>
      </View>

      <View className="flex-1" />

      <Pressable
        onPress={() => void haptics.commit()}
        className="mb-2 rounded-2xl bg-accent py-4 active:bg-accent-glow"
        style={{ marginBottom: Math.max(insets.bottom, 16) }}>
        <Text className="text-center text-base font-bold text-text-primary">
          Log expense
        </Text>
      </Pressable>
    </View>
  );
}