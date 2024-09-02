import React, { useEffect } from 'react';
import { Stack } from 'expo-router/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '../store';

const enableMocking = async () => {
  if (!__DEV__) {
    return;
  }
  await import('../../msw.polyfills');
  const { server } = await import('../mocks/server');
  server.listen();
};

const Layout = () => {
  useEffect(() => {
    enableMocking();
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default Layout;
