import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@rneui/themed';
import { FlashList } from "@shopify/flash-list";

import { ResultListProps } from '../../types';
import ResultItem from './ResultItem';
import Loading from '../common/Loading';

const SearchResultList = ({ isLoading, isError, isSuccess, data, handleLoadMore, isFetchingNextPage }: ResultListProps) => {
  const { theme } = useTheme();
  
  const renderFooter = () => {
    return isFetchingNextPage ? (
      <Loading margin={0} />
    ) : null;
  };

  if(isLoading) return (
    <Loading margin={30} />
  )
  
  if(isError) return (
    <Text style={{marginTop: 30}}>죄송합니다. 다시 검색해주세요.</Text>
  )

  return (
    isSuccess && (
      <View style={styles.container}>
        {data.length > 0 ? (
          <FlashList
            data={data}
            extraData={theme} // 테마를 의존성으로 전달
            renderItem={({ item }) => (
              <ResultItem
                key={item.ccbaAsno}
                item={item}
                showCode={true}
              />
            )}
            keyExtractor={(item) => `${item.ccbaAsno}${item.ccbaMnm1}`}
            estimatedItemSize={100}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5} // 리스트 끝에 50% 가까이 도달할 때 로드
            ListFooterComponent={renderFooter} // 로딩 스피너 표시
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
    minWidth: 80,
    minHeight: 80,
    paddingHorizontal: 10,
    marginVertical: 10
  },
  noitemContainer: {
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50
  }
})
export default SearchResultList