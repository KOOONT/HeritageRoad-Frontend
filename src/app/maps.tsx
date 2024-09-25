import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Linking, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Button, useTheme } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

import { RootState } from '../redux/store';
import { LATITUDE_DELTA, LONGITUDE_DELTA } from '../constants/options';
import { PIN_COLORS } from '../constants/ui';
import BottomModal from '../components/common/BottomModal';
import { HeritageImage } from '../types';
import MemoizedMarker from '../components/details/MemoizedMarker';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const typeNames: { [key: string]: string } = {
  '12': '관광지', 
  '32': '숙박',
  '39': '음식점'
};

const Maps = () => {
  const {theme} = useTheme();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [imgList, setImgList] = useState<HeritageImage[]>([]);
  const [otherImg, setOtherImg] = useState<string>('');
  const [otherX, setOtherX] = useState<string>('');
  const [otherY, setOtherY] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [heritage, setHeritage] = useState(true);
  
  const selectedData = useSelector((state: RootState) => state.map.selectedData);
  const relatedMarkers = useSelector((state: RootState) => state.map.relatedMarkers);

  const onModalClose = () => {
    setIsModalVisible(false);
  };
  const handleHeritage = async( //국가유산 마커 클릭
    ccmaName: string, 
    ccbaMnm1: string, 
    ccbaCtcdNm: string, 
    ccsiName: string,
    images: HeritageImage[]
  ) => {
    try {
      setHeritage(true);
      setIsModalVisible(true);      
      setTitle(ccbaMnm1);
      setSubTitle(`${ccbaCtcdNm} ${ccsiName}·${ccmaName}`);
      setImgList(images);
    } catch(error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }
  const handleOthers = async( //기타 마커 클릭
    title: string, 
    typeName: string, 
    location: string, 
    image: string,
    x: string,
    y: string
  ) => {
    try {
      setHeritage(false);
      setIsModalVisible(true);      
      setTitle(title);
      setSubTitle(`${location}·${typeName}`);
      setOtherImg(image);
      setOtherX(x);
      setOtherY(y);
    } catch(error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }
  const openKakaoMap = (title: string | undefined, latitude: string, longitude: string) => {
    const url = title 
      ? `https://map.kakao.com/link/to/${title},${latitude},${longitude}` 
      : `https://map.kakao.com/link/to/${latitude},${longitude}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', '카카오맵을 열 수 없습니다.');
        }
      })
      .catch((err) => Alert.alert('Error', 'Something went wrong: ' + err));
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
        region={{
          latitude: parseFloat(selectedData?.latitude || relatedMarkers[0].mapY),
          longitude: parseFloat(selectedData?.longitude || relatedMarkers[0].mapY),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}
        style={styles.map}
      >
        {selectedData &&
          <Marker
            key={selectedData?.ccbaAsno}
            coordinate={{
              latitude: parseFloat(selectedData.latitude),
              longitude: parseFloat(selectedData.longitude)
            }}
            pinColor={PIN_COLORS.default} // 기본 핀 색상
            opacity={0.8}
            anchor={{ x: 0.5, y: 0.5 }} // 앵커 포인트를 중앙으로 설정
            calloutAnchor={{ x: 0.5, y: -0.05 }}
            onPress={() => 
              handleHeritage(
                selectedData.ccmaName, 
                selectedData.ccbaMnm1, 
                selectedData.ccbaCtcdNm,
                selectedData.ccsiName,
                selectedData.images, 
              )
            }
          >
            {/** 실제 마커 */}
            <View style={styles.markerContainer}>
              <Text style={styles.markerTitle}>{selectedData.ccbaMnm1}</Text>
              <FontAwesome5
                name="map-marker-alt"
                size={40}
                color={theme.colors.primary}
              />
            </View>
          </Marker>
        }

        {relatedMarkers?.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(marker.mapY),
              longitude: parseFloat(marker.mapX)
            }}
            pinColor={PIN_COLORS.default} // 기본 핀 색상
            opacity={0.8}
            anchor={{ x: 0.5, y: 0.5 }} // 앵커 포인트를 중앙으로 설정
            calloutAnchor={{ x: 0.5, y: -0.05 }}
            onPress={() => 
              handleOthers(
                marker.title,
                typeNames[marker.contentTypeId],
                marker.addr3,
                marker.firstImage,
                marker.mapX,
                marker.mapY
              )
            }
          >
            {/** 실제 마커 */}
            <MemoizedMarker marker={marker} />
          </Marker>
        ))}
      </MapView>

      <BottomModal 
        title={title}
        subTitle ={subTitle}
        isVisible={isModalVisible} 
        onClose={onModalClose}
        loading={loading}
      >
        <View style={styles.imageContainer}>
          {heritage && imgList.slice(0, 3).map((item, index) => 
            <Image
              key={index}
              style={styles.image}
              source={item.imageUrl}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          )}
          {!heritage && otherImg && (
            <Image
              style={styles.image}
              source={otherImg}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          )}
        </View>
        <View>
          {heritage && selectedData?.latitude && selectedData.longitude && (
            <Button
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ["#0AAAB8", "#0B609D"],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              onPress={() => openKakaoMap(selectedData.ccbaMnm1, selectedData.latitude, selectedData.longitude)}
            >
              길찾기
            </Button>
          )}
          {!heritage && (
            <Button
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ["#0AAAB8", "#0B609D"],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              onPress={() => openKakaoMap(title, otherY, otherX)}
            >
              길찾기
            </Button>
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
  backIcon: {
    flex: 1,
    position: 'absolute',
    top: 15,
    left: 10,
    zIndex: 1
  },
  markerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 5,
  },
  markerTitle: {
    width: 'auto',
    backgroundColor: '#191919',
    padding: 4,
    fontWeight: '600',
    color: '#fff',
    borderRadius: 20,
    textAlign: 'center',
    marginBottom: 5,
  },
  detailTitle: {
    fontWeight: 'bold'
  },
  imageContainer: {
    width: '100%',
    height: 120,
    marginTop: 10,
    marginBottom: 15,
    flexDirection: 'row',
    columnGap: 10,
  },
  image: {
    flex: 1,
    width: 300,
    height: 120,
    backgroundColor: '#0553',
  }
});

export default Maps;
