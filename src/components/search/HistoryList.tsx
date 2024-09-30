/* 최근검색어 리스트 */
import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList } from "@shopify/flash-list";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTheme } from '@rneui/themed';

import TitleContainer from '../common/TitleContainer';
import useSearchHistory from '../../hooks/search/useSearchHistory';
import { selectSearchData } from '../../redux/selectors/searchSelectors';

const HistoryList = ({requerySearch}: {requerySearch: (query: string) => void}) => {
  const { theme } = useTheme();
  const { clearHistory, removeItemFromHistory } = useSearchHistory();
  const { searchHistory } = useSelector(selectSearchData); //memoization

  const removeItem = (e: React.SyntheticEvent, id: string) => {
    e.stopPropagation();
    removeItemFromHistory(id);
  }

  return (
    <View style={styles.container}>
      <TitleContainer 
        title='최근검색어' 
        titleSize={18}
        sideButton='모두지우기' 
        buttonPress={clearHistory}
      />
      {/* 최근 검색어 리스트 */}
      <FlashList
        data={searchHistory}
        extraData={theme} // 테마를 의존성으로 전달
        contentContainerStyle={styles.listContainer}
        horizontal
        showsHorizontalScrollIndicator={false} // 가로 스크롤바 숨김 
        keyExtractor={(item) => item.id}
        estimatedItemSize={50}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.searchItem, { backgroundColor: theme.colors.grey4 }]} 
            onPress={() => requerySearch(item.value)}
            activeOpacity={0.7}
          >
            <Text style={[styles.searchItemText, {color: theme.colors.black}]}>
              {item.value} 
            </Text>
            <FontAwesome6 
              name="xmark" 
              size={16} 
              color={theme.colors.black}
              onPress={(e: React.SyntheticEvent) => removeItem(e, item.id)}
              style={styles.xIcon}
            ></FontAwesome6>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  searchItem: {
    height: 40, // 버튼 높이 설정
    minWidth: 100,
    justifyContent: 'center', // 텍스트를 수직 가운데 정렬
    alignItems: 'center', // 텍스트를 수평 가운데 정렬
    flexDirection: 'row',
    verticalAlign: 'middle',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  searchItemText: {
    fontSize: 15,
    lineHeight: 20,
    marginRight: 15
  },
  xIcon: {
    position: 'absolute',
    right: 6,
    padding: 4,
  }
});

export default HistoryList