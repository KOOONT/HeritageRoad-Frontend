import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router/stack';
import { ThemeProvider } from '@rneui/themed';
import { Provider } from 'react-redux';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store } from '../redux/store';
import { customTheme } from '../constants/ui';

// Create a client
const queryClient = new QueryClient();

const Layout = () => {
  const colorScheme = useColorScheme(); // 시스템의 색상 모드 감지
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light'); // 초기값 설정

  useEffect(() => {
    // 시스템 설정에 따라 테마 모드 변경
    const mode = colorScheme === 'dark' ? 'dark' : 'light';
    setThemeMode(mode);
    customTheme.mode = mode;
  }, [colorScheme]);

  return (
    <Provider store={store}>
      {/* Provide the client to your App */}
      <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={customTheme}>
        <SafeAreaView 
          edges={['top']} 
          style={{ 
            flex: 1, 
            backfaceVisibility: 'hidden', 
            backgroundColor: themeMode === 'dark' ? 'black' : 'white' 
          }}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
              {/* Tabs */}
              <Stack.Screen 
                name="index"
                options={{ 
                  title: '홈',
                  headerShown: false 
                }}
              />
              {/* 상세 페이지 */}
              <Stack.Screen
                name="details/[id]"  
                options={{ 
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: themeMode === 'dark' ? 'black' : 'white'
                  },
                  headerTitleStyle: {
                    color: themeMode === 'dark' ? 'white' : 'black'
                  },
                  headerTintColor: themeMode === 'dark' ? 'white' : 'black',
                  title: '' 
                }}
              />
              <Stack.Screen
                name="maps"  
                options={{ 
                  headerShown: false,
                  title: '맵' 
                }}
              />
              <Stack.Screen
                name="search"  
                options={{ 
                  headerShown: false,
                  title: '검색' 
                }}
              />
              <Stack.Screen
                name="viewAll/[kdcd]"  
                options={{ 
                  title: '전체보기',
                  headerShown: false,
                }}
              />
            </Stack> 
          </GestureHandlerRootView>
        </SafeAreaView>
      </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default Layout;
