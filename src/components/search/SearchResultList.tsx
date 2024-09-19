import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@rneui/themed';
import { FlashList } from "@shopify/flash-list";
import ResultItem from './ResultItem';
import Loading from '../common/Loading';
import { HeritageItem } from '../../types';

const SearchResultList = ({ isPending, isSuccess, data }: { isPending: boolean, isSuccess: boolean, data: HeritageItem[] }) => {
  const { theme } = useTheme();
  
  if(isPending) return (
    <Loading margin={30} />
  )
  
  return (
    isSuccess && (
      <View style={styles.container}>
        {data.length > 0 ? (
          <FlashList
            data={data}
            renderItem={({ item }) => (
              <ResultItem
                key={item.ccbaAsno} // 키가 숫자일 경우 문자열로 변환
                item={item}
              />
            )}
            keyExtractor={(item) => item.ccbaAsno} // 키가 숫자일 경우 문자열로 변환
            estimatedItemSize={100}
          />
        ) : (
          <View style={styles.noitemContainer}>
            <Text style={{color: theme.colors.black}} numberOfLines={1} ellipsizeMode='tail'>검색된 결과가 없습니다.</Text>
          </View>
        )}
      </View>  
    )
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    paddingHorizontal: 10,
    marginVertical: 10
  },
  noitemContainer: {
    height: '100%',
    justifyContent: 'flex-start',
    marginTop: 30
  }
})
export default SearchResultList