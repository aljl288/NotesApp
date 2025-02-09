import React from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
  FlatList,
} from 'react-native'
import GradientBackground from '../components/GradientBackground'
import { useNotes } from '../hooks/useNote'
import NotesCardView from '../components/NotesCardView'
import { Button } from 'react-native-paper'
import SettingsCardView from '../components/SettingsCardView'

export default function SettingsScreen() {
  const { deleteAllNotes } = useNotes() // Get deleteAllNotes from the custom hook

  const options = [
    { id: '1', label: 'Online Customer', icon: 'people' }, // 'people' icon for Online Customer
    { id: '2', label: 'User Agreement', icon: 'document-text' }, // 'document-text' icon for User Agreement
    { id: '3', label: 'Privacy Policy', icon: 'shield-checkmark' }, // 'shield-checkmark' icon for Privacy Policy
    { id: '4', label: 'About Us', icon: 'information-circle' }, // 'information-circle' icon for About Us
  ]

  // Function to handle deleting all notes
  const handleDeleteAllNotes = async () => {
    // Confirm before deleting all notes
    Alert.alert(
      'Delete All Notes',
      'Are you sure you want to delete all notes?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Call deleteAllNotes from the useNotes hook
              await deleteAllNotes()
              Alert.alert('Success', 'All notes have been deleted.')
            } catch (error) {
              Alert.alert('Error', 'Failed to delete notes.')
              console.error('Error deleting notes:', error)
            }
          },
        },
      ],
      { cancelable: true }
    )
  }

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <SettingsCardView
                iconContent={item.icon}
                noteContent={item.label}
                onPress={() => console.log(`Note pressed: ${item.label}`)}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Button to delete all notes */}
        <Button
          mode="contained"
          onPress={handleDeleteAllNotes}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Delete All Notes
        </Button>
      </View>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 20,
  },
  optionItem: {
    margin: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  optionText: {
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#ff007a',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    minWidth: 200, // Minimum width of the button
    alignSelf: 'center', // Centers the button
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
})
