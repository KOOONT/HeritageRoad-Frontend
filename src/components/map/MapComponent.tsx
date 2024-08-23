import React, { useEffect, useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import { RootState } from '../../store'

/* default value */
const LATITUDE_DEFAULT = 37.55;
const LONGITUDE_DEFAULT = 126.97;
const LATITUDE_DELTA = 0.06;
const LONGITUDE_DELTA = 0.06;

/* 마커 전달받아서 띄우기 */
const MapComponent = () => {
  const [region, setRegion] = useState({
    latitude: LATITUDE_DEFAULT,
    longitude: LONGITUDE_DEFAULT,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });
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
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        region={region}
        style={styles.map}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(marker.latitude) || LATITUDE_DEFAULT,
              longitude: parseFloat(marker.longitude) || LONGITUDE_DEFAULT
            }}
            pinColor="#02CBDD" // 기본 핀 색상
            opacity={0.8}
            anchor={{ x: 0.5, y: 0.5 }} // 앵커 포인트를 중앙으로 설정
            calloutAnchor={{ x: 0.5, y: 0 }}
          >
            <Callout style={styles.callout}
            >
              <View>
                <Text>{marker.ccbaMnm1}</Text>
              </View>
            </Callout>
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
  callout: {
    minWidth: "auto"
  },
});

export default MapComponent;
