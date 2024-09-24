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
        style={styles.listContainer}
        horizontal
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
    fontSize: 16,
    lineHeight: 20,
  },
});

export default Recommend