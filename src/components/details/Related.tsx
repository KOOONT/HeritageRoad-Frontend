import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { FlashList } from '@shopify/flash-list'
import { Skeleton, useTheme } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { RelatedItem, RelatedList } from '../../types'
import { setRelatedMarkers } from '../../redux/slices/mapSlice'
import { useDispatch } from 'react-redux'

const Related = ({longitude, latitude}: {longitude: string, latitude: string}) => {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const apiBaseUrl = process.env.API_BASE_URL;

  const { isPending, isSuccess, data } = useQuery({
    queryKey: [longitude, latitude],
    queryFn: async (): Promise<RelatedList> => {
      const response = await fetch(`${apiBaseUrl}/api/heritage-detail-related-attractions/${longitude}/${latitude}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  })
  // isSuccess 시에 데이터 설정
  useEffect(() => {
    if (isSuccess) {
      dispatch(setRelatedMarkers([...data.accommodations, ...data.relatedAttractions, ...data.restaurants]));
    }
  }, [isSuccess, data]); // isSuccess와 data가 변경될 때마다 실행

  const localStyles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 10,
      backgroundColor: theme.colors.background
    },
    text: {
      padding: 10,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.black
    }
  })
  if(isPending) return (
    <View style={styles.skeleton}>
      <Skeleton
        animation="pulse"
        width={160}
        height={160}
        style={{marginLeft: 20, marginRight: 10}}
      />
      <Skeleton
        animation="pulse"
        width={160}
        height={160}
        style={{marginRight: 10}}
      />
      <Skeleton
        animation="pulse"
        width={160}
        height={160}
      />
    </View>
  )

  const renderItem = ({ item }: { item: RelatedItem }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push('/maps')}
    >
      <View 
        style={styles.itemContainer}
      >
        {item.firstImage ? (
          <Image source={{ uri: item.firstImage }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder} />
        )}
        <Text 
          numberOfLines={1} ellipsizeMode="tail"
          style={[styles.ccbaMnm1, {color: theme.colors.black}]}
        >
          {item.title}
        </Text>
        <Text style={[styles.ccbaCtcdNm, {color: theme.colors.grey0}]}>
          {`${item.addr3}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
  
  const renderFlashList = (arr: RelatedItem[], title: string) => (
    arr.length > 0 && (
      <View style={localStyles.container}>
        <Text style={localStyles.text}>{title}</Text>
          <FlashList
            data={arr}
            horizontal
            keyExtractor={(item) => item.contentId}
            estimatedItemSize={200}
            renderItem={renderItem}
            pagingEnabled
            snapToInterval={170}
            snapToAlignment='start' // 스크롤뷰의 가운데 정렬
            decelerationRate="fast" // 빠른 스크롤 속도 설정
            showsHorizontalScrollIndicator={false} // 가로 스크롤바 숨김  
            contentContainerStyle={styles.listContainer} // 내부 컨테이너 스타일 설정
          />
      </View>
    )
  );
  
  return (
    isSuccess && (
      <>
        {renderFlashList(data.relatedAttractions, '주변 관광지 추천')}
        {renderFlashList(data.restaurants, '주변 음식점 추천')}
        {renderFlashList(data.accommodations, '주변 숙박 추천')}
      </>
    )
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10
  },
  skeleton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: { 
    width: 160, 
    height: 210,
    marginRight: 10,
  },
  image: {
    width: 160,
    height: 160
  },
  placeholder: {
    width: 160,
    height: 160,
    backgroundColor: '#d3d3d3', // 회색 배경색
  },
  ccbaMnm1: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
    flexWrap: 'wrap'
  },
  ccbaCtcdNm: {
    fontSize: 12,
    marginTop: 2
  },
});

export default Related