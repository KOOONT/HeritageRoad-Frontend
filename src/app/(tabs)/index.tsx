//home
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, GestureResponderEvent, FlatList, TouchableHighlight } from 'react-native';
import { useTheme } from '@rneui/themed';
import TitleContainer from '../../components/common/TitleContainer';

const Index = () => {
  const { theme } = useTheme();


  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TitleContainer 
        title='오늘의 로드' 
        titleSize={20}
        sideButton='전체보기 >'
      />
     
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
 
});

export default Index;