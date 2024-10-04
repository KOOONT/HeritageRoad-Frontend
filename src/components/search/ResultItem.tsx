import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { HeritageItem } from '../../types';
import { useTheme } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

const ResultItem = ({ item, showCode } : { item: HeritageItem, showCode: boolean }) => {
  const { theme } = useTheme();
  const router = useRouter();

  const getDetail = (id: string, name: string, kdcd: string, ctcd: string, cityName: string, guName: string) => {
    //push to detail page
    router.push(`/details/${id}?name=${name}&kdcd=${kdcd}&ctcd=${ctcd}&cityName=${cityName}&guName=${guName}`);
  }

  return (
    <TouchableOpacity 
      onPress={() => getDetail(item.ccbaAsno, item.ccbaMnm1, item.ccbaKdcd, item.ccbaCtcd, item.ccbaCtcdNm, item.ccsiName)}
      activeOpacity={0.7}
    >
      <View style={styles.container}>
        {item.imageUrl ? (
          <FastImage
            style={styles.image}
            source={{
              uri: item.imageUrl,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <View style={styles.image} />
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.title, {color: theme.colors.black}]}>{item.ccbaMnm1}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.grey0 }]}>
            {`${item.ccbaCtcdNm}${item.ccsiName ? ` ${item.ccsiName}` : ''}${showCode ? `, ${item.ccmaName}` : ''}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 가로 정렬
    alignItems: 'center', // 세로 중앙 정렬
    marginBottom: 20,
    marginRight: 10
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10, // 이미지와 텍스트 사이 간격
  },
  textContainer: {
    flex: 1, // 텍스트 영역이 남은 공간을 차지하게 함
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 5,
  },
});
  
  export default ResultItem