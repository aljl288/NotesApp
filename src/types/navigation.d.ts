// src/types/navigation.d.ts
export type RootStackParamList = {
  Home: undefined
  NewNote: undefined
  Summary: undefined
  Settings: undefined
  Details: undefined
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>
