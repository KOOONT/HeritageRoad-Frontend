import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TouchableWithoutFeedback, Linking, Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Button, useTheme } from '@rneui/themed';
import { Image } from 'expo-image';

import { BottomModalProps } from '../../types';
import { LinearGradient } from 'expo-linear-gradient';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const BottomModal = ({ lat, lng, title, subTitle, image, isVisible, onClose }: BottomModalProps) => {
  const { theme } = useTheme();

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
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      {/* overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}></View>
      </TouchableWithoutFeedback>
      {/* content */}
      <View style={[styles.modalContent, {height: 'auto', backgroundColor: theme.colors.grey5}]}>
        <>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.colors.black }]}>
              {title}
              </Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color={theme.colors.black} size={22} />
            </Pressable>
          </View>
          <Text style={[styles.subTitle, { color: theme.colors.black }]}>
            {subTitle}
          </Text>
          {/* 이미지와 길찾기 버튼 */}
          <View style={styles.imageContainer}>
            {image && ( 
              <Image
                style={styles.image}
                source={image}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
            )}
          </View>
          <View>
            {lat && lng && (
              <Button
                ViewComponent={LinearGradient}
                linearGradientProps={{
                  colors: ["#0AAAB8", "#0B609D"],
                  start: { x: 0, y: 0.5 },
                  end: { x: 1, y: 0.5 },
                }}
                onPress={() => openKakaoMap(title, lat, lng)}
              >
                길찾기
              </Button>
            )}
          </View>
        </>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darkened background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 12,
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

export default BottomModal