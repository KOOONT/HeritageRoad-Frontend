import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import { Tabs } from 'expo-router';
import { useTheme } from '@rneui/themed';
import { COLORS } from '../../constants/ui';
import { TABS } from '../../constants/options';

const TabsLayout = () => {
  const { theme } = useTheme();

  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false, 
        tabBarActiveTintColor: COLORS.primary, 
        tabBarShowLabel: false ,
        tabBarActiveBackgroundColor: theme.colors.background,
        tabBarInactiveBackgroundColor: theme.colors.background,
      }}
    >
      {TABS.map((tab, index) => (
        tab.param ? 
        <Tabs.Screen
          key={index}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => <Icon size={22} name={tab.icon} color={color} />,
            href: {
              pathname: tab.name,
              params: tab.param
            },
          }}
        /> :
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