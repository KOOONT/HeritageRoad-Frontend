import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from '@rneui/themed';
import { COLORS } from '../../constants/ui';
import { TABS } from '../../constants/options';

const TabsLayout = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView edges={['top']} style={[styles.safearea, { backgroundColor: theme.colors.background }]}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Tabs 
          screenOptions={{ 
            headerShown: false, 
            tabBarActiveTintColor: COLORS.primary, 
            tabBarShowLabel: false ,
            tabBarActiveBackgroundColor: theme.colors.background,
            tabBarInactiveBackgroundColor: theme.colors.background,
            tabBarBackground: () => <></>
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
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backfaceVisibility: 'hidden',
  }
});
export default TabsLayout;