import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { useLocalSearchParams, Stack } from 'expo-router';
import MapComponent from '../../../components/map/MapComponent';
import { server } from '../../../mocks/server';
import { setMarkers } from '../../../slices/mapSlice';
import { RootState } from '../../../store';

server.listen();

export default function Route() {
  const mapData = useSelector((state: RootState) => state.map.markers);
  const dispatch = useDispatch();
  
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
        dispatch(setMarkers(result[0].result.items));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: keyword,
        }}
      />
      <Text>keyword: {keyword}</Text>
      <MapComponent />
    </>
  );
}