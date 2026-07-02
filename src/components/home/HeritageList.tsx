import React, { useEffect } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { FlashList } from '@shopify/flash-list'
import { Skeleton, useTheme } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { HeritageItem } from '../../types'
import NetworkImage from '../common/NetworkImage'
import { prefetchImageUrls } from '../../utils/imagePrefetch'

const HeritageList = ({queryKey, url}: {queryKey: string, url: string}) => {
  const { theme } = useTheme();
  const router = useRouter();
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

  const { isPending, isSuccess, data } = useQuery({
    queryKey: [{queryKey}],
    queryFn: async (): Promise<HeritageItem[]> => {
      const response = await fetch(`${apiBaseUrl}/${url}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  })

  useEffect(() => {
    if (isSuccess) {
      prefetchImageUrls(data?.map((item) => item.imageUrl) ?? [], 8);
    }
  }, [isSuccess, data]);

  const getDetail = (id: string, name: string, kdcd: string, ctcd: string, cityName: string, guName: string) => {
    //push to detail page
    router.push(`/details/${id}?name=${name}&kdcd=${kdcd}&ctcd=${ctcd}&cityName=${cityName}&guName=${guName}`);
  }

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
      <Skeleton
        animation="pulse"
        width={160}
        height={160}
      />
    </View>
  )

  const renderItem = ({ item }: { item: HeritageItem }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      activeOpacity={0.8}
      onPress={() => getDetail(item.ccbaAsno, item.ccbaMnm1, item.ccbaKdcd, item.ccbaCtcd, item.ccbaCtcdNm, item.ccsiName)}
    >
      <NetworkImage uri={item.imageUrl} style={styles.image} proxyWidth={360} />
      <Text 
        numberOfLines={1} ellipsizeMode="tail"
        style={[styles.ccbaMnm1, {color: theme.colors.black}]}
      >
        {item.ccbaMnm1}
      </Text>
      <Text style={[styles.ccbaCtcdNm, {color: theme.colors.grey0}]}>
        {`${item.ccbaCtcdNm} ${item.ccsiName}`}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    isSuccess && (
      <FlashList
        data={data}
        extraData={theme} // 테마를 의존성으로 전달
        horizontal
        keyExtractor={(item) => item.ccbaAsno}
        estimatedItemSize={200}
        renderItem={renderItem}
        pagingEnabled
        snapToInterval={170}
        snapToAlignment='start' //스크롤뷰의 가운데 정렬
        decelerationRate="fast" // 빠른 스크롤 속도 설정
        showsHorizontalScrollIndicator={false} // 가로 스크롤바 숨김  
        contentContainerStyle={styles.listContainer} // 내부 컨테이너 스타일 설정
      /> 
    )
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20
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

export default HeritageList
