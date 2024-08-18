import React from 'react';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { AppRegistry } from 'react-native'
import AppComponent from '../../App';
import appConfig from '../../app.config';

const appName = appConfig.expo.name;

async function enableMocking() {
  if (!__DEV__) {
    return
  }
 
  await import('../../msw.polyfills');
  const { server } = await import('../../mocks/server');
  server.listen();
}
 
enableMocking().then(() => {
  AppRegistry.registerComponent(appName, () => AppComponent)
})

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello, world!</Text>
      <Link href={'/details/map/paju'}>click map</Link>
    </View>
  );
}
