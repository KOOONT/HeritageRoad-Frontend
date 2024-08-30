import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setMarkers } from '../../../slices/mapSlice';
import MapComponent from '../../../components/map/MapComponent';

const Maps = () => {
  const data = useLocalSearchParams();
  const lat = Number(data.data1);
  const lng = Number(data.data2);
  
  const mapData = useSelector((state: RootState) => state.map.markers);
  const dispatch = useDispatch();
  
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
    <MapComponent lat={lat} lng={lng}/>
  );
}

const styles = StyleSheet.create({

});

export default Maps;