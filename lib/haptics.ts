import * as Haptics from 'expo-haptics';

/**
 * Every primary action gets haptic feedback. Impact styles map to the
 * physical-feel vocabulary: selection for toggles, light for confirmations,
 * medium for commits, heavy for destructive/irreversible actions.
 */

export const haptics = {
  tap: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  select: () => Haptics.selectionAsync(),
  commit: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  warn: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
} as const;