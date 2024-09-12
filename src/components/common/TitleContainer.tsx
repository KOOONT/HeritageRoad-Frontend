import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { useTheme } from '@rneui/themed'

interface TitleContainerProps {
  title: string;
  titleSize: number,
  sideButton?: string;
  buttonPress?: () => void;
}

const TitleContainer = ({title, titleSize, sideButton, buttonPress}: TitleContainerProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: theme.colors.black, fontSize: titleSize}]}>{title}</Text>
      {sideButton && (
        <TouchableOpacity 
          onPress={buttonPress}
          activeOpacity={0.7}
        >
          <Text style={[styles.clearText, { color: theme.colors.grey3 }]}>
            {sideButton}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  title: {
    fontWeight: 'bold',
  },
  clearText: {
    fontSize: 14,
  },
})
export default TitleContainer