import React from 'react'
import { useSelector } from 'react-redux'
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { selectSearchData } from '../../redux/selectors/searchSelectors'
import { useTheme } from '@rneui/themed';
import { RootState } from '../../redux/store';
import ResultItem from './ResultItem';
import Loading from '../common/Loading';

const SearchResultList = () => {
  const { searchResult } = useSelector(selectSearchData);
  const { theme } = useTheme();
  const loading = useSelector((state: RootState) => state.search.loading);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading margin={30} />
      ) : (
        <>
          {searchResult.length > 0 ? (
            <FlatList
              data={searchResult}
              renderItem={({ item }) => (
                <ResultItem
                  key={item.no.toString()} // 키가 숫자일 경우 문자열로 변환
                  item={item}
                />
              )}
              keyExtractor={(item) => item.no.toString()} // 키가 숫자일 경우 문자열로 변환
            />
          ) : (
            <View style={styles.noitemContainer}>
              <Text style={{color: theme.colors.black}}>검색된 결과가 없습니다.</Text>
            </View>
          )}
        </>
      )}
    </View>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  noitemContainer: {
    height: '100%',
    justifyContent: 'flex-start',
    marginTop: 30
  }
})
export default SearchResultList