import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import MapComponent from '../../../components/map/MapComponent';

const Maps = () => {
  const data = useLocalSearchParams();
  const lat = Number(data.data1);
  const lng = Number(data.data2);
  const id = Array.isArray(data.id) ? data.id[0] : data.id;
  
  return (
    <MapComponent />
  );
}

const styles = StyleSheet.create({

});

export default Maps;