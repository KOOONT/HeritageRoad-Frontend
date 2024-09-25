import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native';
import { HeritageItem } from '../../types';
import { useTheme } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ResultItem = ({ item, showCode } : { item: HeritageItem, showCode: boolean }) => {
  const { theme } = useTheme();
  const router = useRouter();

  const getDetail = (id: string, name: string, kdcd: string, ctcd: string) => {
    //push to detail page
    router.push(`/details/${id}?name=${name}&kdcd=${kdcd}&ctcd=${ctcd}`);
  }

  return (
    <TouchableOpacity 
      onPress={() => getDetail(item.ccbaAsno, item.ccbaMnm1, item.ccbaKdcd, item.ccbaCtcd)}
      activeOpacity={0.7}
    >
      <View style={styles.container}>
        <Image
          source={{ uri:  item.imageUrl }} // 이미지 URL
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.title, {color: theme.colors.black}]}>{item.ccbaMnm1}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.grey0 }]}>
            {`${item.ccbaCtcdNm} ${item.ccsiName}${showCode ? `, ${item.ccmaName}` : ''}`}
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
    color: 'gray',
  },
});
  
  export default ResultItem