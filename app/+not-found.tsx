import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View className="flex-1 items-center justify-center bg-void px-8">
        <Text className="text-5xl">🛰️</Text>
        <Text className="mt-6 text-center text-lg font-bold text-text-primary">
          This screen does not exist.
        </Text>
        <Text className="mt-2 text-center text-sm text-text-secondary">
          Check the route, or head back to Mission Control.
        </Text>

        <Link href="/" className="mt-8 rounded-xl bg-accent px-6 py-3 active:bg-accent-glow">
          <Text className="text-sm font-bold text-text-primary">Go to Home</Text>
        </Link>
      </View>
    </>
  );
}