import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert, TextInput } from 'react-native'
import { useNotes } from '../hooks/useNote'
import GradientBackground from '../components/GradientBackground'

export default function NotesDetailScreen({ route }: { route: any }) {
  const { fetchNoteById } = useNotes() // Get the function from the hook
  const [note, setNote] = useState<any>(null) // State to store the fetched note
  const noteId = route.params?.noteId // Assume the ID is passed via route params

  const fetchNote = async () => {
    if (!noteId) {
      Alert.alert('Error', 'No note ID provided.')
      return
    }

    try {
      const fetchedNote = await fetchNoteById(noteId) // Call the function with the ID

      if (fetchedNote) {
        console.log('Fetched Note:', fetchedNote)
        setNote(fetchedNote) // Update state with the fetched note
      } else {
        Alert.alert('Error', 'Note not found.')
      }
    } catch (error) {
      console.error('Failed to fetch note:', error)
      Alert.alert('Error', 'An error occurred while fetching the note.')
    }
  }

  useEffect(() => {
    fetchNote() // Fetch the note when the component mounts
  }, [noteId])

  return (
    <GradientBackground>
      <View style={styles.container}>
        {note ? (
          <>
            <Text style={[styles.label]}>Category: {note.category}</Text>
            <Text style={[styles.label]}>
              Created At: {new Date(note.createdAt).toLocaleString()}
            </Text>
            <Text style={[styles.content, styles.textArea]}>
              {note.noteContent}{' '}
            </Text>
          </>
        ) : (
          <Text style={styles.text}>Loading note...</Text>
        )}
      </View>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 16,
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  label: {
    padding: 10,
    marginBottom: 10,
    color: '#ffffff',
    justifyContent: 'center',
    width: '100%',
  },
  content: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: '#ffffff',
    justifyContent: 'center',
    width: '100%',
  },
  textArea: {
    textAlignVertical: 'top',
  },
})
