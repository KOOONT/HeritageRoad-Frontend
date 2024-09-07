import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { useTheme } from '@rneui/themed'

interface titleProps {
  title: string;
  sideButton?: string;
  buttonPress?: () => void;
}

const TitleContainer = ({title, sideButton, buttonPress}: titleProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
        {sideButton ?
        <TouchableOpacity onPress={buttonPress}>
          <Text style={[styles.clearText, { color: theme.colors.grey3 }]}>{sideButton}</Text>
        </TouchableOpacity> :''
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearText: {
    fontSize: 14,
  },
})
export default TitleContainer