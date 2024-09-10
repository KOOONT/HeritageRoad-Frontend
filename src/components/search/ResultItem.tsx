import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native';
import { HeritageItem } from '../../types';
import { useTheme } from '@rneui/themed';

const tempImg = "https://www.cha.go.kr/unisearch/images/national_treasure/2685609.jpg";

const ResultItem = ({ item } : { item: HeritageItem }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri:  tempImg }} // 이미지 URL
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.title, {color: theme.colors.black}]}>{item.ccbaMnm1}</Text>
        <Text style={[styles.subtitle, {color: theme.colors.grey3}]}>{`${item.ccbaCtcdNm} ${item.ccsiName}, ${item.ccmaName}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 가로 정렬
    alignItems: 'center', // 세로 중앙 정렬
    marginBottom: 20,
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