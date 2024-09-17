import React, { useEffect } from 'react';
import { Stack } from 'expo-router/stack';
import { ThemeProvider } from '@rneui/themed';
import { Provider } from 'react-redux';
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store } from '../redux/store';
import { customTheme } from '../constants/ui';

// Create a client
const queryClient = new QueryClient();

const enableMocking = async () => {
  if (!__DEV__) {
    return;
  }
  await import('../../msw.polyfills');
  const { server } = await import('../mocks/server');
  server.listen();
};

const Layout = () => {
  //Set theme mode based on system settings
  customTheme.mode = useColorScheme() === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    enableMocking();
  }, []);

  return (
    <Provider store={store}>
      {/* Provide the client to your App */}
      <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={customTheme}>
        <Stack>
          {/* Tabs */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
          {/* 상세 페이지 */}
          <Stack.Screen
            name="details/[id]"            
            options={{ 
              headerShown: true,
              title: '' 
            }}
          />
        </Stack> 
      </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default Layout;
