import React, { useState } from 'react'
import { SearchBar, useTheme } from '@rneui/themed'
import { NativeSyntheticEvent, StyleSheet, TextInputSubmitEditingEventData, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootState } from '../../redux/store';
import { setSearchQuery } from '../../redux/slices/searchSlice';
import useSearchHistory from '../../hooks/search/useSearchHistory';

const Input = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  
  const { fetchSearchResults } = useSearchHistory();
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  
  const router = useRouter();

  const handleBack = () => {
    //검색어 입력되어 있을 경우, 초기 검색화면으로 이동
    if(searchQuery){
      dispatch(setSearchQuery(''));
    }else{
      router.back(); //뒤로가기
    }
  }
  const handleSubmitEditing = async (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const query = e.nativeEvent.text;
    await fetchSearchResults(query);
  };

  return (
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
  )
}

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: 'row', // 아이콘과 검색창이 나란히 배치되도록 설정
    alignItems: 'center',
    marginLeft: 10
  },

});

export default Input