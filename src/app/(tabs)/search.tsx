import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from '../../components/search/Input';
import { useTheme } from '@rneui/themed';

const Search = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Input />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default Search;