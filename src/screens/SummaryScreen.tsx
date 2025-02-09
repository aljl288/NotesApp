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
import { Ionicons } from '@expo/vector-icons'
import SummaryCardView from '../components/SummaryCardView'
import { Button } from 'react-native-paper'

export default function SummaryScreen() {
  const { notesCountByCategory, isLoading, isError, refetch } = useNotes() // Using the custom hook
  const categories = useCategories() // Get all categories
  const categoriesWithCounts = categories.reduce<{ [key: string]: number }>(
    (acc, category) => {
      // For each category, check if it exists in notesCountByCategory, otherwise set it to 0
      acc[category] = notesCountByCategory[category] || 0
      return acc
    },
    {}
  )

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
      <FlatList
        data={categories} // Get all categories
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <View style={styles.titleContainer}>
              <View style={styles.titleContent}>
                {getCategoryIcon(item)}
                <Text style={styles.categoryTitle}>{item}</Text>
              </View>
              <Button
                mode="contained"
                onPress={() =>
                  console.log(
                    `Note pressed: ${categoriesWithCounts[item].toString()}`
                  )
                }
                style={styles.button}
                labelStyle={styles.buttonText}
              >
                Details
              </Button>
            </View>
            <View>
              <SummaryCardView
                noteContent={categoriesWithCounts[item].toString()}
                onPress={() =>
                  console.log(
                    `Note pressed: ${categoriesWithCounts[item].toString()}`
                  )
                }
              />
            </View>
          </View>
        )}
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
  titleContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  titleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },

  categoryTitle: {
    marginStart: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF',
  },
  numberText: {
    marginStart: 10,
    fontSize: 14,
    color: '#FFF',
  },
  errorText: {
    color: '#ff007a',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#ff007a',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    minWidth: 100, // Minimum width of the button
    alignSelf: 'center', // Centers the button
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
})
