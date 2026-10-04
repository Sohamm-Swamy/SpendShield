/**
 * Local-notification helpers.
 *
 * `expo-notifications` is required lazily rather than imported at module
 * scope: Expo Go ships a reduced build of this module, and a static import
 * would risk taking down the whole app at boot. Phase 1 only needs this to
 * prove the dependency is wired up.
 */

type NotificationsModule = typeof import('expo-notifications');

type NotificationPermission = 'granted' | 'denied' | 'undetermined';

function loadNotifications(): NotificationsModule | null {
  try {
    return require('expo-notifications') as NotificationsModule;
  } catch {
    return null;
  }
}

export async function getPermissionStatus(): Promise<NotificationPermission> {
  const notifications = loadNotifications();
  if (!notifications) return 'undetermined';

  const { status } = await notifications.getPermissionsAsync();
  return status;
}

export async function requestPermission(): Promise<NotificationPermission> {
  const notifications = loadNotifications();
  if (!notifications) return 'undetermined';

  const { status } = await notifications.requestPermissionsAsync();
  return status;
}

export async function sendTestNotification(): Promise<boolean> {
  const notifications = loadNotifications();
  if (!notifications) return false;

  const permission = await requestPermission();
  if (permission !== 'granted') return false;

  await notifications.scheduleNotificationAsync({
    content: {
      title: 'SpendShield',
      body: 'Foundation check: notifications are wired up.',
      data: { source: 'foundation-check' },
    },
    trigger: null,
  });

  return true;
}