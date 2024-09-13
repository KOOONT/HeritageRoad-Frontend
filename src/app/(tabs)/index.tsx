//home
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';
import TitleContainer from '../../components/common/TitleContainer';
import { getHeritages } from '../../api/api';
import TodayRoad from '../../components/home/TodayRoad';

const Index = () => {
  const { theme } = useTheme();

  useEffect(() => {
    getHeritages();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TitleContainer 
        title='오늘의 로드' 
        titleSize={20}
        sideButton='전체보기 >'
      />
     <TodayRoad />
     
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