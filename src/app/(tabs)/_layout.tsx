import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import { Tabs } from 'expo-router';
import { COLORS } from '../../constants/ui';
import { TABS } from '../../constants/options';

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: COLORS.primary, tabBarShowLabel: false }}>
      {TABS.map((tab, index) => (
        <Tabs.Screen
          key={index}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => <Icon size={22} name={tab.icon} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}

export default TabsLayout;