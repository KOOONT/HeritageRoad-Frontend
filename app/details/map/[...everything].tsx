import React from 'react';
import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { server } from '../../../mocks/server';
import MapComponent from '../../../components/map/MapComponent';

server.listen();

export default function Route() {
  const { everything } = useLocalSearchParams<{
    everything: string[];
    query?: string;
    query2?: string;
  }>();
  const keyword = everything[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/search/heritage')
        const result = await response.json()
        console.log('fetch result', result[0].result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Text>keyword: {keyword}</Text>
      <MapComponent />
    </>
  );
}