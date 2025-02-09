import React, { useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import GradientBackground from '../components/GradientBackground'
import { useNotes } from '../hooks/useNote'
import { useCategories } from '../hooks/useCategories'
import NotesCardView from '../components/NotesCardView'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '../types/navigation'

export default function HomeScreen() {
  const { groupedNotes, isLoading, isError, refetch } = useNotes() // Using the custom hook
  const categories = useCategories() // Get all categories
  const navigation = useNavigation<NavigationProp>()

  useEffect(() => {
    refetch() // Refetch the notes on mount or when the query is invalidated
  }, [refetch])

  if (isLoading) {
    return (
      <GradientBackground>
        <ActivityIndicator size="large" color="#ff007a" />
      </GradientBackground>
    )
  }

  if (isError) {
    return (
      <GradientBackground>
        <Text style={styles.errorText}>
          Failed to load notes. Please try again later.
        </Text>
      </GradientBackground>
    )
  }

  // Function to render icons based on category
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'work and study':
        return <Ionicons name="briefcase-outline" size={24} color="#FFF" />
      case 'life':
        return <Ionicons name="home-outline" size={24} color="#FFF" />
      case 'health and well-being':
        return <Ionicons name="heart-outline" size={24} color="#FFF" />
      default:
        return <Ionicons name="folder-outline" size={24} color="#FFF" />
    }
  }

  return (
    <GradientBackground>
      <View style={styles.titleContent}>
        <Ionicons
          style={{ marginEnd: 10 }}
          name="time-outline"
          size={24}
          color="#FFF"
        />
        <Text style={styles.Title}>Recently Created Notes</Text>
      </View>
      <FlatList
        data={categories} // All categories from useCategories
        renderItem={({ item }) => {
          const categoryNotes = groupedNotes[item] || [] // Ensure there are notes for each category

          return (
            <View style={styles.categoryContainer}>
              <View style={styles.titleContent}>
                {getCategoryIcon(item)}
                <Text style={styles.categoryTitle}>{item}</Text>
              </View>

              {/* If there are notes, render them, else show "No notes available" */}
              {categoryNotes.length > 0 ? (
                <FlatList
                  data={categoryNotes} // Notes within the selected category
                  renderItem={({ item }) => (
                    <NotesCardView
                      noteContent={item.noteContent}
                      onPress={() =>
                        navigation.navigate('Details', { noteId: item.id })
                      }
                    />
                  )}
                  keyExtractor={(note, index) => index.toString()}
                />
              ) : (
                <Text style={styles.noNotesText}>No notes available</Text>
              )}
            </View>
          )
        }}
        keyExtractor={(item) => item} // Use category name as key for outer FlatList
      />
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 20,
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },
  titleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  Title: {
    fontSize: 18,
    color: '#FFF',
  },
  categoryTitle: {
    marginStart: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF',
  },
  noteContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 5,
    borderRadius: 8,
  },
  noteContent: {
    fontSize: 14,
    color: '#666',
  },
  noNotesText: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
  },
  errorText: {
    color: '#ff007a',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
})
