/* 최근검색어 리스트 */
import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text, FlatList } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTheme } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import TitleContainer from '../common/TitleContainer';
import useSearchHistory from '../../hooks/search/useSearchHistory';
import { setSearchQuery } from '../../redux/slices/searchSlice';
import { selectSearchData } from '../../redux/selectors/searchSelectors';

const HistoryList = () => {
  const { theme } = useTheme();
  const { clearHistory, removeItemFromHistory, fetchSearchResults } = useSearchHistory();

  const dispatch = useDispatch();
  const { searchHistory, searchResult } = useSelector(selectSearchData); //memoization

  const removeItem = (e: React.SyntheticEvent, id: string) => {
    e.stopPropagation();
    removeItemFromHistory(id);
  }
  const requerySearch = (query: string) => {
    dispatch(setSearchQuery(query));
    fetchSearchResults(query);
  }

  return (
    <View style={styles.container}>
      <TitleContainer title='최근검색어' sideButton='모두지우기' buttonPress={clearHistory}/>
      {/* 최근 검색어 리스트 */}
      <FlatList
        data={searchHistory}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.searchItem, { backgroundColor: theme.colors.grey4 }]} 
            onPress={() => requerySearch(item.value)}
            activeOpacity={1}
          >
            <Text style={styles.searchItemText}>
              {item.value} 
            </Text>
            <FontAwesome6 name="xmark" size={20} onPress={(e: React.SyntheticEvent) => removeItem(e, item.id)}></FontAwesome6>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.searchList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  searchList: {
    flexDirection: 'row',
  },
  searchItem: {
    height: 40, // 버튼 높이 설정
    justifyContent: 'center', // 텍스트를 수직 가운데 정렬
    alignItems: 'center', // 텍스트를 수평 가운데 정렬
    flexDirection: 'row',
    verticalAlign: 'middle',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  searchItemText: {
    fontSize: 16,
    lineHeight: 20,
    marginRight: 10,
  },
});

export default HistoryList