import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useTheme, useThemeMode } from '@rneui/themed';
import { COLORS } from '../../constants/ui';
import { TABS } from '../../constants/options';

const TabsLayout = () => {
  const colorScheme = useColorScheme(); // 시스템 다크 모드 감지
  const { theme } = useTheme();
  const { setMode } = useThemeMode();
  
  useEffect(() => {
    if(colorScheme == 'dark'){
      setMode('dark');
    }else{
      setMode('light');
    }
  }, []);
  
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