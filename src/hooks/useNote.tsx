import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Note } from '../data/schema/noteSchema'

export const noteListKey = 'noteList'

// Fetch notes from AsyncStorage
const fetchNotes = async () => {
  const existingNotes = await AsyncStorage.getItem('notes')
  return existingNotes ? JSON.parse(existingNotes) : []
}

const fetchNoteById = async (id: string) => {
  // Retrieve all notes from AsyncStorage
  const existingNotes = await AsyncStorage.getItem('notes')
  const notes = existingNotes ? JSON.parse(existingNotes) : []

  // Find and return the note with the matching ID
  return notes.find((note: { id: string }) => note.id === id) || null
}

// Function to add a note
const addNote = async (newNote: Note) => {
  const existingNotes = await AsyncStorage.getItem('notes')
  const notes = existingNotes ? JSON.parse(existingNotes) : []
  notes.push(newNote)
  await AsyncStorage.setItem('notes', JSON.stringify(notes))
  return newNote
}

// Function to delete all notes
const deleteAllNotes = async () => {
  await AsyncStorage.removeItem('notes')
}

// Group notes by category and limit to the latest 3 items
const groupNotes = (notes: Note[]) => {
  return notes.reduce((acc: { [key: string]: Note[] }, note: Note) => {
    const { category, createdAt } = note

    // Initialize the category group if it doesn't exist
    if (!acc[category]) {
      acc[category] = []
    }

    // Add the note to the category
    acc[category].push(note)

    // Sort the category by creation time (newest first) and limit to 3 items
    acc[category] = acc[category]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 3)

    return acc
  }, {})
}

// Count the total number of notes by category
const countNotesByCategory = (notes: Note[]) => {
  return notes.reduce((acc: { [key: string]: number }, note: Note) => {
    const { category } = note

    // Initialize the category count if it doesn't exist
    if (!acc[category]) {
      acc[category] = 0
    }

    // Increment the count for the category
    acc[category] += 1

    return acc
  }, {})
}

export const useNotes = () => {
  const queryClient = useQueryClient()

  // Fetch notes using React Query
  const {
    data: notes,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [noteListKey],
    queryFn: fetchNotes, // Using the fetchNotes function to get validated data
  })

  // Mutation for adding a new note
  const mutationAddNote = useMutation({
    mutationFn: addNote, // Function to mutate the data (add note)
    onSuccess: () => {
      // Invalidate the query after adding a note to refetch the list
      queryClient.invalidateQueries({
        queryKey: [noteListKey],
      })
    },
  })

  // Mutation for deleting all notes
  const mutationDeleteNotes = useMutation({
    mutationFn: deleteAllNotes, // Function to delete all notes
    onSuccess: () => {
      // Invalidate the query after deleting to refetch and return an empty list
      queryClient.invalidateQueries({
        queryKey: [noteListKey],
      })
    },
  })

  const groupedNotes = groupNotes(notes || [])
  const notesCountByCategory = countNotesByCategory(notes || [])

  return {
    notes,
    isLoading,
    isError,
    refetch,
    groupedNotes,
    notesCountByCategory, // This will return the count of notes per category
    fetchNoteById,
    addNote: mutationAddNote.mutate,
    deleteAllNotes: mutationDeleteNotes.mutate,
  }
}
