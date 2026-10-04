import type { ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';

type PlaceholderScreenProps = {
  title: string;
  subtitle: string;
  icon: string;
  children?: ReactNode;
};

/**
 * Shared shell for the Phase 1 placeholder tabs. Everything below the header
 * is optional so a screen can drop in real content later without rework.
 */
export function PlaceholderScreen({
  title,
  subtitle,
  icon,
  children,
}: PlaceholderScreenProps) {
  return (
    <ScrollView
      className="flex-1 bg-void"
      contentContainerClassName="px-5 pt-16 pb-24"
      showsVerticalScrollIndicator={false}>
      <View className="items-center">
        <View className="h-20 w-20 items-center justify-center rounded-3xl border border-border bg-elevated">
          <Text className="text-3xl">{icon}</Text>
        </View>
      </View>

      <Text className="mt-6 text-center text-2xl font-bold text-text-primary">
        {title}
      </Text>
      <Text className="mt-2 text-center text-sm leading-5 text-text-secondary">
        {subtitle}
      </Text>

      {children ? <View className="mt-8">{children}</View> : null}
    </ScrollView>
  );
}