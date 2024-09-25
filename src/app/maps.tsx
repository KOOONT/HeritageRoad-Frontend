import React, { useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Linking, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

import { RootState } from '../redux/store';
import { LATITUDE_DELTA, LONGITUDE_DELTA } from '../constants/options';
import { PIN_COLORS } from '../constants/ui';
import BottomModal from '../components/common/BottomModal';
import { HeritageImage } from '../types';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Maps = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [imgList, setImgList] = useState<HeritageImage[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedData = useSelector((state: RootState) => state.map.selectedData);
  const relatedMarkers = useSelector((state: RootState) => state.map.relatedMarkers);

  const onModalClose = () => {
    setIsModalVisible(false);
  };
  const handleHeritage = async(
    ccmaName: string, 
    ccbaMnm1: string, 
    ccbaCtcdNm: string, 
    ccsiName: string,
    images: HeritageImage[]
  ) => {
    try {
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
  const openKakaoMap = () => {
    const url = `https://map.kakao.com/link/to/${selectedData?.ccbaMnm1},${selectedData?.latitude},${selectedData?.longitude}`;
    
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
          latitude: parseFloat(selectedData?.latitude || '0'),
          longitude: parseFloat(selectedData?.longitude || '0'),
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
            <Callout tooltip>
              <View>
                <Text style={styles.callText}>{selectedData.ccbaMnm1}</Text>
              </View>
            </Callout>
          </Marker>
        }

        {relatedMarkers?.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(marker.latitude),
              longitude: parseFloat(marker.longitude)
            }}
            pinColor={PIN_COLORS.default} // 기본 핀 색상
            opacity={0.8}
            anchor={{ x: 0.5, y: 0.5 }} // 앵커 포인트를 중앙으로 설정
            calloutAnchor={{ x: 0.5, y: -0.05 }}
          >
            <Callout tooltip>
              <View>
                <Text style={styles.callText}>{marker.name}</Text>
              </View>
            </Callout>
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
          {imgList.slice(0, 3).map((item, index) => 
            <Image
              key={index}
              style={styles.image}
              source={item.imageUrl}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          )}
        </View>
        <View>
          <Button
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ["#0AAAB8", "#0B609D"],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            onPress={openKakaoMap}
          >
            길찾기
          </Button>
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
