import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, radius, space, typography } from '@kandid/ui-tokens';

export interface TabBarProps {
  state: {
    index: number;
    routes: Array<{ key: string; name: string }>;
  };
  navigation?: {
    emit: (event: any) => any;
    navigate: (name: string) => void;
  };
  descriptors?: Record<string, any>;
  insets?: { top: number; bottom: number; left: number; right: number };
  navigateToTab?: (routeKey: string) => void;
}

interface TabItem {
  name: string;
  label: string;
  iconText: string;
}

const TABS_LEFT: TabItem[] = [
  { name: 'index', label: 'home', iconText: '⌂' },
  { name: 'poses', label: 'poses', iconText: '✦' },
];

const TABS_RIGHT: TabItem[] = [
  { name: 'best-shots', label: 'best shots', iconText: '❖' },
  { name: 'profile', label: 'profile', iconText: '👤' },
];

export const TabBar: React.FC<TabBarProps> = ({
  state,
  navigation,
  navigateToTab: routerNavigateToTab,
}) => {
  const router = useRouter();
  const currentRouteName = state.routes[state.index]?.name;

  const navigateToTab = (routeName: string) => {
    const isFocused = currentRouteName === routeName;
    if (navigation?.emit) {
      const event = navigation.emit({
        type: 'tabPress',
        target: routeName,
        canPreventDefault: true,
      });
      if (!isFocused && !event?.defaultPrevented) {
        navigation.navigate(routeName);
      }
    } else if (routerNavigateToTab) {
      const targetRoute = state.routes.find(r => r.name === routeName);
      if (targetRoute && !isFocused) {
        routerNavigateToTab(targetRoute.key);
      }
    }
  };

  const openCamera = () => {
    router.push('/camera' as any);
  };

  const renderTab = (tab: TabItem) => {
    const isFocused = currentRouteName === tab.name;
    const color = isFocused ? colors.text.primary : colors.text.secondary;

    return (
      <TouchableOpacity
        key={tab.name}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={tab.label}
        onPress={() => navigateToTab(tab.name)}
        style={styles.tabButton}
        activeOpacity={0.7}
      >
        <Text style={[styles.tabIcon, { color }]}>{tab.iconText}</Text>
        <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View pointerEvents="box-none" style={styles.floatingContainer}>
      <View style={styles.pillContainer}>
        <View style={styles.tabGroup}>{TABS_LEFT.map(renderTab)}</View>

        {/* prominent central elevated gold camera button */}
        <View style={styles.centerButtonWrapper}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="open camera guide"
            onPress={openCamera}
            style={styles.goldCameraButton}
            activeOpacity={0.85}
          >
            <Text style={styles.cameraIcon}>📷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabGroup}>{TABS_RIGHT.map(renderTab)}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 24,
    left: space.marginMobile,
    right: space.marginMobile,
    alignItems: 'center',
    zIndex: 50,
  },
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 380,
    height: 64,
    backgroundColor: Platform.OS === 'android' ? colors.background.hudFallback : colors.background.hud,
    borderRadius: radius['3xl'],
    borderWidth: 1,
    borderColor: colors.border.medium,
    paddingHorizontal: space.sm,
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  tabGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 54,
    height: 48,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  tabLabel: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelSm,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: typography.letterSpacing.normal,
  },
  centerButtonWrapper: {
    top: -12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space.xs,
  },
  goldCameraButton: {
    width: 58,
    height: 58,
    borderRadius: radius.pill,
    backgroundColor: colors.brand.gold,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.brand.goldDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 2,
    borderColor: colors.background.primary,
  },
  cameraIcon: {
    fontSize: 24,
    color: colors.text.onGold, // strictly espresso text on gold per DESIGN.md
  },
});
