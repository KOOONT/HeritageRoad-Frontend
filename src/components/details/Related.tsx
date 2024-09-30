import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { FlashList } from '@shopify/flash-list'
import { Skeleton, useTheme } from '@rneui/themed'
import { useRouter } from 'expo-router'

import { RelatedItem, RelatedList } from '../../types'
import { setRelatedMarkers } from '../../redux/slices/mapSlice'
import { TYPES_NAME } from '../../constants/options';

const Related = ({isPending, isSuccess, data}: {isPending: boolean, isSuccess: boolean, data: RelatedList | undefined}) => {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  // isSuccess 시에 데이터 설정
  useEffect(() => {
    if (isSuccess && data) {
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
    },
    noItem: {
      padding: 10
    }
  })
  if(isPending) return (
    <View style={localStyles.container}>
      <Text style={localStyles.text}>주변 관광지 추천</Text>
      <View style={styles.skeleton}>
        <Skeleton
          animation="pulse"
          width={160}
          height={160}
          style={{marginLeft: 10, marginRight: 10}}
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
    </View>
  )

  const renderItem = ({ item }: { item: RelatedItem }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push(`/maps/${item.mapY}?lngP=${item.mapX}&idP=${item.contentId}&titleP=${item.title}&subTitleP=${TYPES_NAME[item.contentTypeId]}&imageP=${item.firstImage}`)}
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
    <>
    {(isSuccess && data) && (
      <>
        {renderFlashList(data.relatedAttractions, '주변 관광지 추천')}
        {renderFlashList(data.restaurants, '주변 음식점 추천')}
        {renderFlashList(data.accommodations, '주변 숙박 추천')}
      </>
    )}
    {!data && (
      <View style={localStyles.container}>
        <Text style={[localStyles.noItem, {color: theme.colors.black}]}>조회된 주변 관광지가 없습니다.</Text>
      </View>
    )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 160,
    minHeight: 210
  },
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