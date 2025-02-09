import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/elements'
import { Ionicons } from '@expo/vector-icons'
import { NavigationProp } from '../types/navigation'

const Navbar = ({ title }: { title: string }) => {
  const navigation = useNavigation<NavigationProp>()

  const goBack = () => {
    navigation.goBack()
  }

  const openSettings = () => {
    navigation.navigate('Settings')
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {/* Conditionally render the back button */}
        {navigation.canGoBack() && title !== 'Summary' && (
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Ionicons name="chevron-back-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rightContainer}>
        {title == 'Home' && (
          <TouchableOpacity onPress={openSettings} style={styles.button}>
            <Ionicons name="settings" size={24} color="#c724e1" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 100,
    backgroundColor: '#301934',
    elevation: 4, // Adds shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Take available space on the left side
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 8, // Add some space between the back button and title
  },
  button: {
    padding: 8,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
})

export default Navbar
