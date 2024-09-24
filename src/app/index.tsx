//home
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import TodayRoad from '../components/home/TodayRoad';

const Index = () => {
  const router = useRouter();
  const { theme } = useTheme();

  const openSearchPage = () => {
    router.push('/search');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.grey5 }]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, {color: theme.colors.black, fontSize: 20}]}>오늘의 로드</Text>
        <TouchableOpacity 
            onPress={openSearchPage}
            activeOpacity={0.7}
          >
            <Icon name="search" size={22} color={theme.colors.black}/>
          </TouchableOpacity>
      </View>
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
  titleContainer: {
    width: '100%',
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