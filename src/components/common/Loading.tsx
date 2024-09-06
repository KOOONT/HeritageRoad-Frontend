import React from 'react'
import { useTheme } from '@rneui/themed'
import { ActivityIndicator } from 'react-native'

const Loading = ({ margin }: { margin: number }) => {
  const { theme } = useTheme();

  return (
    <ActivityIndicator color={theme.colors.primary} style={{marginTop: margin}}/>
  )
}

export default Loading