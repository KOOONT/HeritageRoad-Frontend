import React, { useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, GestureResponderEvent } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { MapProps } from '../../types';
import { LATITUDE_DELTA, LONGITUDE_DELTA } from '../../constants/options';
import { PIN_COLORS } from '../../constants/ui';
import BottomModal from '../common/BottomModal';
import { getDetails } from '../../api/api';

/* 마커 전달받아서 띄우기 */
const MapComponent = ({lat, lng}: MapProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [region, setRegion] = useState({
    latitude: lat,
    longitude: lng,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });
  const markers = useSelector((state: RootState) => state.map.markers);
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  const handleMarker = async(ccbaKdcd: string, ccbaAsno: string, ccbaCtcd: string) => {
    //TODO: Loading UI

    const details = await getDetails({ccbaKdcd, ccbaAsno, ccbaCtcd});
    const item = details.item;
    setIsModalVisible(true);
    setTitle(`${item.ccbaMnm1}`);
    setSubTitle(`${item.ccmaName} 제 ${item.crltsnoNm}호`);
  }

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
              latitude: parseFloat(marker.latitude) || lat,
              longitude: parseFloat(marker.longitude) || lng
            }}
            pinColor={PIN_COLORS.default} // 기본 핀 색상
            opacity={0.8}
            anchor={{ x: 0.5, y: 0.5 }} // 앵커 포인트를 중앙으로 설정
            calloutAnchor={{ x: 0.5, y: 0 }}
            onPress={() => handleMarker(marker.ccbaKdcd, marker.ccbaAsno, marker.ccbaCtcd)}
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
      <BottomModal 
          title={title}
          subTitle ={subTitle}
          isVisible={isModalVisible} 
          customHeight='50%'
          onClose={onModalClose}
        >
          <Text>이용 가능 시간: </Text>
      </BottomModal>
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
  detailTitle: {
    fontWeight: 'bold'
  }
});

export default MapComponent;
