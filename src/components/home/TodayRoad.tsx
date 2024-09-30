import React from 'react'
import { ImageBackground, TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { FlashList } from '@shopify/flash-list'
import { Skeleton, useTheme } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { HeritageItem } from '../../types'

const TodayRoad = () => {
  const { theme } = useTheme();

  const router = useRouter();
  const apiBaseUrl = process.env.API_BASE_URL;

  const { isPending, isSuccess, error, data } = useQuery({
    queryKey: ['todayRoad'],
    queryFn: async (): Promise<HeritageItem[]> => {
      const response = await fetch(`${apiBaseUrl}/api/heritage-tourist-popular-heritage`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  })

  const getDetail = (id: string, name: string, kdcd: string, ctcd: string, cityName: string, guName: string) => {
    //push to detail page
    router.push(`/details/${id}?name=${name}&kdcd=${kdcd}&ctcd=${ctcd}&cityName=${cityName}&guName=${guName}`);
  }

  if(isPending) return (
    <View style={styles.skeleton}>
      <Skeleton
        animation="pulse"
        width={250}
        height={320}
        style={{marginLeft: 20, marginRight: 10}}
      />
      <Skeleton
        animation="pulse"
        width={250}
        height={320}
        style={{marginRight: 10}}
      />
      <Skeleton
        animation="pulse"
        width={250}
        height={320}
      />
    </View>
  )

  const renderItem = ({ item }: { item: HeritageItem }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      activeOpacity={0.8}
      onPress={() => getDetail(item.ccbaAsno, item.ccbaMnm1, item.ccbaKdcd, item.ccbaCtcd, item.ccbaCtcdNm, item.ccsiName)}
    >
      <ImageBackground source={{ uri: item.imageUrl }} style={styles.image}>
        {/* 이미지 위에 반투명 오버레이 추가 */}
        <View style={styles.overlay} />
        <View style={styles.textView}>
          <Text style={styles.ccbaMnm1} numberOfLines={1} ellipsizeMode="tail">{item.ccbaMnm1}</Text>
          <Text style={styles.ccbaCtcdNm}>{`${item.ccbaCtcdNm} ${item.ccsiName}·${item.ccmaName}`}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
  
  return (
    isSuccess && (
      <View style={styles.flashContainer}>
        <FlashList
          data={data}
          extraData={theme} // 테마를 의존성으로 전달
          horizontal
          keyExtractor={(item) => item.ccbaAsno}
          estimatedItemSize={200}
          renderItem={renderItem}
          pagingEnabled
          snapToInterval={260}
          snapToAlignment='start'
          decelerationRate="fast" // 빠른 스크롤 속도 설정
          showsHorizontalScrollIndicator={false} // 가로 스크롤바 숨김  
          contentContainerStyle={styles.listContainer} // 내부 컨테이너 스타일 설정
        /> 
      </View>
    )
  )
}

const styles = StyleSheet.create({
  flashContainer: {
    flex: 1,
    width: '100%',
    minWidth: 250,
    height: 320
  },
  listContainer: {
    paddingHorizontal: 20
  },
  skeleton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: { 
    width: 250, 
    height: 320,
    marginRight: 10,
  },
  image: {
    width: 250,
    height: 320
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // 이미지 전체를 덮는 오버레이
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  textView: {
    color: 'white',
    position: 'absolute',
    bottom: 10, // 하단에서 10px 위로 배치
    padding: 10,
  },
  ccbaCtcdNm: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8
  },
  ccbaMnm1: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flexWrap: 'wrap'
  },
});

export default TodayRoad