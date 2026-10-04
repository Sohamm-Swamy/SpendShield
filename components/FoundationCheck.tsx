import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useSession } from '@/hooks/useSession';
import { haptics } from '@/lib/haptics';
import { getPermissionStatus, sendTestNotification } from '@/lib/notifications';
import { storageDriver } from '@/lib/storage';

type Row = {
  label: string;
  value: string;
  ok: boolean;
};

type PermissionState = 'granted' | 'denied' | 'undetermined';

function RowItem({ label, value, ok }: Row) {
  return (
    <View className="flex-row items-center justify-between border-b border-border py-3">
      <Text className="flex-1 pr-3 text-xs text-text-secondary">{label}</Text>
      <Text className="font-mono text-xs" numberOfLines={1}>
        <Text className={ok ? 'text-success' : 'text-warning'}>{value}</Text>
      </Text>
    </View>
  );
}

function Action({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="mr-2 mt-3 rounded-xl border border-border bg-elevated px-4 py-3 active:bg-hover">
      <Text className="text-xs font-semibold text-text-primary">{label}</Text>
    </Pressable>
  );
}

/**
 * Phase 1 only. Confirms on-device that routing, NativeWind, Supabase,
 * storage, haptics and notifications are actually wired up.
 */
export function FoundationCheck() {
  const { session, isConfigured, isLoading } = useSession();
  const [incomingUrl, setIncomingUrl] = useState<string | null>(null);
  const [permission, setPermission] = useState<PermissionState>('undetermined');
  const [notificationResult, setNotificationResult] = useState<string | null>(
    null
  );

  useEffect(() => {
    void Linking.getInitialURL().then(setIncomingUrl);

    const subscription = Linking.addEventListener('url', ({ url }) => {
      setIncomingUrl(url);
    });

    void getPermissionStatus().then(setPermission);

    return () => subscription.remove();
  }, []);

  const sendNotification = useCallback(async () => {
    await haptics.commit();
    const sent = await sendTestNotification();
    setNotificationResult(sent ? 'sent' : 'unavailable');
    setPermission(await getPermissionStatus());
  }, []);

  const runtime =
    Constants.executionEnvironment === 'storeClient'
      ? 'store'
      : Constants.executionEnvironment;

  const configuredScheme = Constants.expoConfig?.scheme;
  const scheme =
    Array.isArray(configuredScheme) ? configuredScheme[0] : configuredScheme;

  const rows: Row[] = [
    {
      label: 'Runtime',
      value: runtime,
      ok: true,
    },
    {
      label: 'Scheme',
      value: scheme ?? 'none',
      ok: Boolean(scheme),
    },
    {
      label: 'Storage driver',
      value: storageDriver,
      ok: true,
    },
    {
      label: 'Supabase env',
      value: isConfigured ? 'present' : 'missing',
      ok: isConfigured,
    },
    {
      label: 'Session',
      value: isLoading ? 'loading' : session ? 'signed in' : 'anonymous',
      ok: isConfigured,
    },
    {
      label: 'Notifications',
      value: permission,
      ok: permission === 'granted',
    },
    {
      label: 'Deep link',
      value: incomingUrl ?? 'none received',
      ok: incomingUrl !== null,
    },
  ];

  return (
    <View className="rounded-2xl border border-border bg-surface p-4">
      <Text className="text-xs font-bold uppercase tracking-widest text-text-tertiary">
        Foundation check
      </Text>

      <View className="mt-2">
        {rows.map((row) => (
          <RowItem key={row.label} {...row} />
        ))}
      </View>

      <View className="mt-1 flex-row flex-wrap">
        <Action label="Test haptics" onPress={() => void haptics.success()} />
        <Action label="Test notification" onPress={() => void sendNotification()} />
      </View>

      {notificationResult ? (
        <Text className="mt-3 text-xs text-text-secondary">
          Notification result: {notificationResult}
        </Text>
      ) : null}
    </View>
  );
}