import React, { useState } from 'react'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  TouchableHighlight,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '../types/navigation'
import { useNotes } from '../hooks/useNote'
import GradientBackground from '../components/GradientBackground'
import { Button } from 'react-native-paper'
import { useCategories } from '../hooks/useCategories'
import { randomUUID } from 'expo-crypto'

export default function NewNoteScreen() {
  const navigation = useNavigation<NavigationProp>()
  const [category, setCategory] = useState('')
  const [noteContent, setNoteContent] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const categories = useCategories()

  const { addNote } = useNotes() // Use the hook

  // Function to count words and ensure it's within the limit
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).length
  }

  // Function to save a new note
  const saveNote = async () => {
    if (!category || !noteContent) {
      Alert.alert('Error', 'Please provide both category and content.')
      return
    }

    // Limit the note content to 200 words
    const wordCount = countWords(noteContent)
    if (wordCount > 200) {
      Alert.alert('Error', 'Note content cannot exceed 200 words.')
      return
    }
    console.log('Generated UUID:', randomUUID())

    const newNote = {
      id: randomUUID(),
      category,
      noteContent,
      createdAt: new Date().toISOString(),
    }

    // Call the mutation to add the note
    addNote(newNote)
    setCategory('')
    setNoteContent('')
    setModalVisible(false)

    Alert.alert('Success', 'Note saved successfully!', [
      {
        text: 'OK',
        onPress: () => {
          navigation.goBack()
        }, // Navigate back to the previous screen
      },
    ])
  }

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={
                category ? styles.selectedCategoryText : styles.placeholderText
              }
            >
              {category || 'Choose a category'}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Please input note content"
            placeholderTextColor="#cccccc"
            multiline
            value={noteContent}
            onChangeText={setNoteContent}
            maxLength={200}
          />
        </View>
        <Button
          mode="contained"
          onPress={saveNote}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Save
        </Button>
        {/* Modal for category selection */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={categories}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    style={styles.modalItem}
                    onPress={() => {
                      setCategory(item)
                      setModalVisible(false)
                    }}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableHighlight>
                )}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: '#ffffff',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#cccccc',
  },
  selectedCategoryText: {
    color: '#ffffff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  closeModalButton: {
    backgroundColor: '#ff007a',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
})
