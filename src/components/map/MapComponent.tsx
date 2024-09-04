import React, { useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, GestureResponderEvent } from 'react-native';
import { useSelector } from 'react-redux';
import { Image } from 'expo-image';
import { RootState } from '../../store';
import { MapProps } from '../../types';
import { LATITUDE_DELTA, LONGITUDE_DELTA } from '../../constants/options';
import { PIN_COLORS } from '../../constants/ui';
import BottomModal from '../common/BottomModal';
import { getDetails } from '../../api/api';
import { useTheme } from '@rneui/themed';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

/* 마커 전달받아서 띄우기 */
const MapComponent = ({lat, lng}: MapProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [imgList, setImgList] = useState<string[]>([]);
  const [region, setRegion] = useState({
    latitude: lat,
    longitude: lng,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });
  const { theme } = useTheme();
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
    setImgList([item.imageUrl1, item.imageUrl2, item.imageUrl3]);
  }

  return (
    <View style={styles.container}>
      <MapView
        region={region}
        style={styles.map}
      >
        {markers?.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(marker.latitude) || lat,
              longitude: parseFloat(marker.longitude) || lng
            }}
            pinColor={PIN_COLORS.default} // 기본 핀 색상
            opacity={0.8}
            anchor={{ x: 0.5, y: 0.5 }} // 앵커 포인트를 중앙으로 설정
            calloutAnchor={{ x: 0.5, y: -0.05 }}
            onPress={() => handleMarker(marker.ccbaKdcd, marker.ccbaAsno, marker.ccbaCtcd)}
          >
            <Callout tooltip>
              <View>
                <Text style={styles.callText}>{marker.ccbaMnm1}</Text>
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
          <View style={styles.imageContainer}>
            {imgList.map((item, index) => 
              <Image
                key={index}
                style={[styles.image, {marginRight: index < imgList.length - 1 ? 12 : 0}]}
                source={item}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
            )}
          </View>
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
  callText: {
    width: "auto",
    padding: 4,
    fontWeight: 'bold',
    backgroundColor: '#191919',
    color: '#fff',
    borderRadius: 20,
  },
  detailTitle: {
    fontWeight: 'bold'
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    width: '30%',
    height: '40%',
    backgroundColor: '#0553',
  }
});

export default MapComponent;
