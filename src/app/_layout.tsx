import React, { useEffect } from 'react';
import { Stack } from 'expo-router/stack';
import { Provider } from 'react-redux';
import { store } from '../store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default Layout;
