import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Card, Text, TouchableRipple } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

type SummaryCardViewProps = {
  noteContent: string
  onPress: () => void
}

export default function SummaryCardView({
  noteContent,
  onPress,
}: SummaryCardViewProps) {
  return (
    <Card style={styles.cardContainer}>
      <TouchableRipple onPress={onPress} rippleColor="rgba(0, 0, 0, .2)">
        <Card.Content style={styles.cardContent}>
          <Text style={styles.noteContent}>
            This Topic has a total of {noteContent} records.
          </Text>
        </Card.Content>
      </TouchableRipple>
    </Card>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#482454', // Light purple background
    padding: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  noteContent: {
    fontSize: 14,
    color: '#FFF',
    flex: 1,
    marginRight: 8,
  },
  iconContainer: {
    paddingHorizontal: 8,
  },
})
