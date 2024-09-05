import React, { useEffect } from 'react';
import { Stack } from 'expo-router/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import { Provider } from 'react-redux';
import { useColorScheme } from 'react-native';
import { store } from '../store';
import { customTheme } from '../constants/ui';

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
      <ThemeProvider theme={customTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
};

export default Layout;
