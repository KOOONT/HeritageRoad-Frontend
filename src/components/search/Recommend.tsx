import React from 'react'
import { StyleSheet, TouchableOpacity, View , Text } from 'react-native'
import { FlashList } from "@shopify/flash-list";
import { useTheme } from '@rneui/themed'

import { RECOMMEND } from '../../constants/options'
import TitleContainer from '../common/TitleContainer'

const Recommend = ({requerySearch}: {requerySearch: (query: string) => void}) => {
  const { theme } = useTheme();
  
  return (
    <View style={styles.container}>
      <TitleContainer title='추천검색어' titleSize={18} />
      <FlashList
        data={RECOMMEND}
        extraData={theme} // 테마를 의존성으로 전달
        contentContainerStyle={styles.listContainer}
        horizontal
        showsHorizontalScrollIndicator={false} // 가로 스크롤바 숨김 
        keyExtractor={(item, index) => item + index}
        estimatedItemSize={50}
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
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minWidth: 10,
    height: 100,
  },
  listContainer: {
    paddingHorizontal: 20
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
    fontSize: 15,
    lineHeight: 20,
  },
});

export default Recommend