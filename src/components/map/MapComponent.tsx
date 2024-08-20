import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import { RootState } from '../../store'

const initialRegion = { //종로
  latitude: 37.5563,
  longitude: 126.9727,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const placeholderCoordinate = {
  latitude: 0.0,  // Placeholder latitude (e.g., equator)
  longitude: 0.0  // Placeholder longitude (e.g., prime meridian)
};

/* 마커 전달받아서 띄우기 */
const MapComponent = () => {
  const [region, setRegion] = useState(initialRegion);
  const [location, setLocation] = useState<Location.LocationObject|null>(null);
  const [errorMsg, setErrorMsg] = useState<null|string>(null);
  const markers = useSelector((state: RootState) => state.map.markers);

  useEffect(() => {
    //내 위치로 region 세팅
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        region={region}
        style={styles.map}
        onRegionChange={(e) => setRegion({
          latitude: e.latitude,
          longitude: e.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        })}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(marker.latitude) || placeholderCoordinate.latitude,
              longitude: parseFloat(marker.longitude) || placeholderCoordinate.longitude
            }}
            title={marker.ccbaMnm1}
            titleVisibility='visible'
          >
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapComponent;
