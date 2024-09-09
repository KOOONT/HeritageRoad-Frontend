import React, { useEffect } from 'react';
import { Stack } from 'expo-router/stack';
import { ThemeProvider } from '@rneui/themed';
import { Provider } from 'react-redux';
import { useColorScheme } from 'react-native';
import { store } from '../redux/store';
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
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        </Stack> 
      </ThemeProvider>
    </Provider>
  );
};

export default Layout;
