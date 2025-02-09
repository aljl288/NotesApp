// components/GradientBackground.tsx
import React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface GradientBackgroundProps {
  children: React.ReactNode
  style?: ViewStyle
}

export default function GradientBackground({
  children,
  style,
}: GradientBackgroundProps) {
  return (
    <LinearGradient
      colors={['#300048', '#6a0572']}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
