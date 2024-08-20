import React, { useEffect } from 'react';
import { Stack } from 'expo-router/stack';
import { Provider } from 'react-redux';
import { store } from '../store';

async function enableMocking() {
  if (!__DEV__) {
    return
  }
  await import('../../msw.polyfills');
  const { server } = await import('../mocks/server');
  server.listen();
}

export default function Layout() {
useEffect(() => {
    enableMocking();
    }, []);

  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}
