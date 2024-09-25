import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme, SearchBar } from '@rneui/themed';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

import { selectSearchData } from '../redux/selectors/searchSelectors';
import { HeritageAll } from '../types';

import HistoryList from '../components/search/HistoryList';
import Recommend from '../components/search/Recommend';
import SearchResultList from '../components/search/SearchResultList';
import useSearchHistory from '../hooks/search/useSearchHistory';
import useDebounce from '../hooks/search/useDebounce';

const Search = () => {
  const { theme } = useTheme();
  const router = useRouter();
  
  const queryClient = useQueryClient(); // queryClient에 접근
  
  const { addSearchTerm } = useSearchHistory();
  const { searchHistory } = useSelector(selectSearchData);            

  const pageUnit = 10;
  const apiBaseUrl = process.env.API_BASE_URL;

  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
  const debouncedQuery = useDebounce(searchQuery, 500); // 디바운스 적용

  const { isLoading, isError, isSuccess, data, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: ['heritageAll', debouncedQuery],
    queryFn: async ({ pageParam = 1 }): Promise<HeritageAll> => {
      if (!debouncedQuery) return { totalCnt: 0, heritageItems: [] }; // 검색어가 없으면 빈 결과를 반환
      
      const response = await fetch(`${apiBaseUrl}/api/heritage-search/${pageParam}/${pageUnit}/${debouncedQuery}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: !!debouncedQuery, // 검색어가 있을 때만 요청을 활성화
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
  const handleBack = () => {
    if(debouncedQuery){
      setSearchQuery('');
    }else{
      router.back(); //뒤로가기
    }
  }
  // debouncedQuery가 변경될 때마다 refetch 호출
  useEffect(() => {
    if (debouncedQuery) {
      addSearchTerm(debouncedQuery);
      refetch();
    }
  }, [debouncedQuery, refetch]);

  // 에러 발생 시 모든 요청 중지
  useEffect(() => {
    if (isError) {
      queryClient.cancelQueries(); // 모든 쿼리 중지
    }
  }, [isError]);

  // onChangeText 함수
  const handleChangeText = (query: string) => {
    setSearchQuery(query); // 입력된 텍스트를 searchQuery로 설정
  };
  const handleSubmitEditing = () => {
    setSearchQuery(searchQuery);
  };
  const requerySearch = (query: string) => {
    setSearchQuery(query);
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/** 검색창 */}
      <View style={styles.barContainer}>
        {/* 화살표 아이콘과 SearchBar를 함께 배치 */}
        <TouchableOpacity onPress={handleBack}>
          <Icon name="chevron-back" size={24} color={theme.colors.black}/>
        </TouchableOpacity>
        
        <SearchBar
          placeholder="지역, 국가유산을 검색해주세요."
          onChangeText={handleChangeText}
          value={searchQuery}
          lightTheme={theme.mode === "light"}
          showLoading={false}
          searchIcon={{color: theme.colors.black, size: 20}}
          inputStyle={{color: theme.colors.black, fontSize: 15}}
          inputContainerStyle={{backgroundColor: theme.colors.searchBg, marginHorizontal: 10, paddingLeft: 5}}
          containerStyle={{flex: 1, backgroundColor: theme.colors.background, borderColor: theme.colors.background}}
          onSubmitEditing={handleSubmitEditing}
        />
      </View>
      {searchQuery? (
        <SearchResultList 
          isLoading={isLoading} 
          isError={isError} 
          isSuccess={isSuccess} 
          data={data?.pages.flatMap(page => page.heritageItems) || []}
          handleLoadMore={handleLoadMore}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : (
        <>
          {searchHistory.length > 0 && <HistoryList requerySearch={requerySearch}/>}
          <Recommend requerySearch={requerySearch}/>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  barContainer: {
    flexDirection: 'row', // 아이콘과 검색창이 나란히 배치되도록 설정
    alignItems: 'center',
    marginLeft: 10
  },
});

export default Search;