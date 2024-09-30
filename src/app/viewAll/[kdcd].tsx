import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@rneui/themed';
import { FlashList } from "@shopify/flash-list";
import Icon from 'react-native-vector-icons/Ionicons';

import ResultItem from '../../components/search/ResultItem'
import Loading from '../../components/common/Loading';
import { HeritageAll } from '../../types';

const ViewAll = () => {
  const { kdcd, title } = useLocalSearchParams<{kdcd: string, title: string}>(); 
  const { theme } = useTheme();
  
  const pageUnit = 10;
  const apiBaseUrl = process.env.API_BASE_URL;

  const { isLoading, isSuccess, data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['heritageAll', kdcd],
    queryFn: async ({ pageParam = 1 }): Promise<HeritageAll> => {
      const response = await fetch(`${apiBaseUrl}/api/home-all-heritage-list/${pageParam}/${pageUnit}/${kdcd}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < Math.ceil(lastPage.totalCnt / pageUnit)) {
        return allPages.length + 1; // 다음 페이지 번호
      } else {
        return undefined; // 더 이상 페이지가 없으면 undefined 반환
      }
    },
    initialPageParam: 1
  });
  
  // 스크롤이 끝에 도달했을 때 호출되는 함수
  const handleLoadMore = () => {
    if (isSuccess && data) {
      // 다음 페이지를 요청하는 로직
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    return isFetchingNextPage ? (
      <Loading margin={0} />
    ) : null;
  };
  
  return (
    <>
    <View style={[styles.textContainer, {backgroundColor: theme.colors.background}]}>
      <Icon name="arrow-back" size={24} color={theme.colors.black} onPress={() => router.back()}/>
      <Text style={[styles.text, {color: theme.colors.black}]}>{title}</Text>
    </View>
  
    {isLoading && (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <Loading margin={30} />
      </View>
    )}

    {isSuccess && (
      <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
        {data?.pages.length > 0 && (
          <FlashList
            data={data.pages.flatMap(page => page.heritageItems)}
            renderItem={({ item }) => (
              <ResultItem
                key={item.ccbaAsno}
                item={item}
                showCode={false}
              />
            )}
            keyExtractor={(item) => item.ccbaAsno} 
            estimatedItemSize={100}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5} // 리스트 끝에 50% 가까이 도달할 때 로드
            ListFooterComponent={renderFooter} // 로딩 스피너 표시
          />
        )}
      </View>  
    )}
    </>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row', // 아이콘과 텍스트를 가로로 나열
  },
  text: {
    marginLeft: 24, // 아이콘과 텍스트 사이의 여백
    fontSize: 18,
    fontWeight: '600'
  },
  container: {
    flex: 1, 
    width: '100%',
    minWidth: 80,
    minHeight: 80,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
})
export default ViewAll