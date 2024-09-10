import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View , Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTheme } from '@rneui/themed'
import { RECOMMEND } from '../../constants/options'
import { setSearchQuery } from '../../redux/slices/searchSlice'
import TitleContainer from '../common/TitleContainer'
import useSearchHistory from '../../hooks/search/useSearchHistory'

const Recommend = () => {
  const { theme } = useTheme();
  const { fetchSearchResults } = useSearchHistory();

  const dispatch = useDispatch();

  const requerySearch = async (query: string) => {
    dispatch(setSearchQuery(query));
    await fetchSearchResults(query);
  }
  
  return (
    <View style={styles.container}>
      <TitleContainer title='추천검색어' />
      <FlatList
        data={RECOMMEND}
        horizontal
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.searchItem, { backgroundColor: theme.colors.grey4 }]} 
            onPress={() => requerySearch(item)}
            activeOpacity={0.7}
          >
            <Text style={[styles.searchItemText, {color: theme.colors.black}]}>
              {item} 
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.searchList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    paddingHorizontal: 20,
  },
  searchList: {
    flexDirection: 'row',
  },
  searchItem: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    verticalAlign: 'middle',
    borderRadius: 20,
    marginRight: 8,
    paddingHorizontal: 16
  },
  searchItemText: {
    fontSize: 16,
    lineHeight: 20,
  },
});

export default Recommend