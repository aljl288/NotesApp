import NewNoteScreen from '../screens/NewNotesScreen'
import NotesDetailScreen from '../screens/NotesDetailScreen'
import SettingsScreen from '../screens/SettingScreen'
import TabNavigator from '../screens/TabNavigator'

const ROUTES = [
  {
    name: 'Tabs',
    component: TabNavigator,
    title: 'Tabs',
  },
  {
    name: 'NewNote',
    component: NewNoteScreen,
    title: 'New Note',
  },
  {
    name: 'Settings',
    component: SettingsScreen,
    title: 'Settings',
  },
  {
    name: 'Details',
    component: NotesDetailScreen,
    title: 'Details',
  },
]

export default ROUTES
