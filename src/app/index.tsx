//home
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import TodayRoad from '../components/home/TodayRoad';
import TitleContainer from '../components/common/TitleContainer';
import HeritageList from '../components/home/HeritageList';

const Index = () => {
  const router = useRouter();
  const { theme } = useTheme();

  const openSearchPage = () => {
    router.push('/search');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.grey5 }]}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, {color: theme.colors.black, fontSize: 20}]}>오늘의 로드</Text>
          <TouchableOpacity 
              onPress={openSearchPage}
              activeOpacity={0.7}
            >
              <Icon name="search" size={23} color={theme.colors.black}/>
            </TouchableOpacity>
        </View>
        <TodayRoad />
        <TitleContainer 
          title='국보 여행 추천' 
          titleSize={18} 
          sideButton='전체보기' 
          buttonPress={() => router.push('/viewAll/11?title=국보 여행 전체보기')}
        />
        <HeritageList queryKey='national' url='api/home-random-heritage-list' />

        <TitleContainer 
          title='보물 여행 추천' 
          titleSize={18} 
          sideButton='전체보기' 
          buttonPress={() => router.push('/viewAll/12?title=보물 여행 전체보기')}
        />
        <HeritageList queryKey='treasure' url='api/home-random-treasure-list' />

        <TitleContainer 
          title='사적 여행 추천' 
          titleSize={18} 
          sideButton='전체보기' 
          buttonPress={() => router.push('/viewAll/13?title=사적 여행 전체보기')}
        />
        <HeritageList queryKey='historic' url='api/home-random-historic-list' />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  scrollContainer: {
    flex: 1,
    minWidth: 160, 
    minHeight: 210
  },
  titleContainer: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  title: {
    fontWeight: 'bold',
  },
});

export default Index;