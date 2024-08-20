import React from 'react';
import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <>
      <Stack.Screen
          options={{
            title: '홈',
          }}
        />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hello, world!</Text>
        <Link href={'/details/map/paju'}>click map</Link>
      </View>
    </>
  );
}