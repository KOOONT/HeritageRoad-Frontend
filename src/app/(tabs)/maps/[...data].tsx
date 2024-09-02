import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import MapComponent from '../../../components/map/MapComponent';
import { getHeritages } from '../../../api/api';
import { setMarkers } from '../../../slices/mapSlice';

const Maps = () => {
  const data = useLocalSearchParams();
  const lat = Number(data.data1);
  const lng = Number(data.data2);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHeritages = async () => {
      const data = await getHeritages();
      dispatch(setMarkers(data));
    };
    fetchHeritages();
  }, []);
  
  return (
    <MapComponent lat={lat} lng={lng}/>
  );
}

const styles = StyleSheet.create({

});

export default Maps;