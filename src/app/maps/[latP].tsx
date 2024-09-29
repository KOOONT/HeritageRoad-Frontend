import React, { useEffect, useRef, useState } from 'react';
import MapView, { Callout, MapMarker, Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootState } from '../../redux/store';
import { LATITUDE_DELTA, LONGITUDE_DELTA } from '../../constants/options';
import { MapProps } from '../../types';
import BottomModal from '../../components/common/BottomModal';
import RelatedMarker from '../../components/details/RelatedMarker';

const Maps = () => {
  const markerRefs = useRef<{ [key: string]: MapMarker | null }>({}); // Set default type to MapMarker | null
  const [mapLoaded, setMapLoaded] = useState(false); // Track if the map is loaded

  //좌표, 모달 데이터
  const { latP, lngP, idP, titleP, subTitleP, imageP } = useLocalSearchParams<{
    latP: string,
    lngP: string,
    idP: string,
    titleP: string,
    subTitleP: string,
    imageP: string,
  }>();

  const {theme} = useTheme();

  const [modalData, setModalData] = useState<MapProps>({
    lat: '0',
    lng: '0',
    title: '',
    subTitle: '',
    image: ''
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const selectedData = useSelector((state: RootState) => state.map.selectedData); //상세화면의 유산 데이터
  const relatedMarkers = useSelector((state: RootState) => state.map.relatedMarkers, shallowEqual); // 불필요한 리렌더링을 방지

  // 모달에 보여지는 마커의 callout 보여주기
  useEffect(() => {
    if (selectedData && relatedMarkers && mapLoaded) {
      const markerRef = markerRefs.current[idP];
      markerRef?.showCallout();
    }
  }, [selectedData, relatedMarkers, mapLoaded]);

  useEffect(() => {
    setModalData({
      lat: latP,
      lng: lngP,
      title: titleP,
      subTitle: subTitleP,
      image: imageP,
    });
  }, []);

  useEffect(() => {
    if(modalData.lat){
      //데이터 세팅되면 모달 오픈
      setIsModalVisible(true);
    }
  }, [modalData]);

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Icon
        name="arrow-back-circle"
        size={40}
        style={styles.backIcon}
        color='grey'
        onPress={() => router.dismiss()}
      />
      <MapView
        loadingEnabled
        loadingIndicatorColor={theme.colors.primary}
        loadingBackgroundColor={theme.colors.background}
        region={{
          latitude: parseFloat(latP),
          longitude: parseFloat(lngP),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}
        style={styles.map}
        onMapReady={() => setMapLoaded(true)} // Set mapLoaded to true when map is ready
      >
        {selectedData &&
          <Marker
            ref={ref => { markerRefs.current[selectedData.ccbaAsno] = ref; }} // Store ref in markerRefs
            key={selectedData?.ccbaAsno}
            coordinate={{
              latitude: parseFloat(selectedData.latitude),
              longitude: parseFloat(selectedData.longitude)
            }}
            icon={require('../../../assets/Location.png')}
            opacity={0.9}
            calloutAnchor={{x: 0.5, y:-0.2}}
            onPress={() => 
              setModalData({
                lat: selectedData.latitude,
                lng: selectedData.longitude,
                title: selectedData.ccbaMnm1, 
                subTitle: selectedData.ccmaName,
                image: selectedData.images[0].imageUrl
              })
            }
          >
            {/** 실제 마커 */}
            <Callout tooltip>
              <Text style={styles.markerTitle}>{selectedData.ccbaMnm1}</Text>
            </Callout>
          </Marker>
        }

        {/** 실제 마커 */}
        <RelatedMarker relatedMarkers={relatedMarkers} setModalData={setModalData} markerRefs={markerRefs}/>
      </MapView>
      <BottomModal 
        lat={modalData.lat}
        lng={modalData.lng}
        title={modalData.title}
        subTitle ={modalData.subTitle}
        image={modalData.image}
        isVisible={isModalVisible} 
        onClose={onModalClose}
      />
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
  backIcon: {
    flex: 1,
    position: 'absolute',
    top: 15,
    left: 10,
    zIndex: 1
  },
  markerTitle: {
    width: 'auto',
    backgroundColor: '#191919',
    paddingVertical: 2,
    paddingHorizontal: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    borderRadius: 20,
    textAlign: 'center',
    marginBottom: 5,
  },
  detailTitle: {
    fontWeight: 'bold'
  },
});

export default Maps;
