import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, SearchBar } from '@rneui/themed';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

import HistoryList from '../../components/search/HistoryList';
import Recommend from '../../components/search/Recommend';
import SearchResultList from '../../components/search/SearchResultList';
import { selectSearchData } from '../../redux/selectors/searchSelectors';
import { RootState } from '../../redux/store';
import { setSearchQuery, setShowResult } from '../../redux/slices/searchSlice';
import { HeritageItem } from '../../types';
import useSearchHistory from '../../hooks/search/useSearchHistory';

const apiBaseUrl = process.env.API_BASE_URL;

const Search = () => {
  const { theme } = useTheme();
  const router = useRouter();
  
  const dispatch = useDispatch();
  const { addSearchTerm } = useSearchHistory();
  const { searchHistory } = useSelector(selectSearchData);            
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  const showResult = useSelector((state: RootState) => state.search.showResult);

  // TODO: Replace with the final API once it's completed.
  const { isPending, isSuccess, data, refetch } = useQuery({
    queryKey: ['searchList', searchQuery],
    queryFn: async (): Promise<HeritageItem[]> => {
      const response = await fetch(`${apiBaseUrl}/api/home-random-heritage-list`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result =  response.json();      
      return result;
    },
    enabled: false //렌더링될때 자동으로 실행되지 않도록
  })

  useEffect(() => {
    if (searchQuery && showResult) {
      addSearchTerm(searchQuery);
      refetch();
    }
  }, [searchQuery, showResult]); // searchQuery와 showResult가 변경될 때 refetch 호출
  
  const handleBack = () => {
    if(searchQuery != ''){
      dispatch(setShowResult(false));
      dispatch(setSearchQuery(''));
    }else{
      router.back(); //뒤로가기
    }
  }
  const handleSubmitEditing = () => {
    dispatch(setSearchQuery(searchQuery));
    dispatch(setShowResult(true));
  };
  const requerySearch = (query: string) => {
    dispatch(setSearchQuery(query));
    dispatch(setShowResult(true));
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
          onChangeText={(query) => dispatch(setSearchQuery(query))}
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
      {/** 빈 검색어도 검색되도록 */}
      {showResult? (
        <SearchResultList isPending={isPending} isSuccess={isSuccess} data={data || []}/>
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