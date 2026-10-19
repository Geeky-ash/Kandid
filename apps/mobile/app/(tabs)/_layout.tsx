import React from 'react';
import { Tabs } from 'expo-router';
import { TabBar } from '../../src/components/navigation/TabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'home' }} />
      <Tabs.Screen name="poses" options={{ title: 'poses' }} />
      <Tabs.Screen name="best-shots" options={{ title: 'best shots' }} />
      <Tabs.Screen name="profile" options={{ title: 'profile' }} />
    </Tabs>
  );
}
