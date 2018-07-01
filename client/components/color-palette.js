import { StyleSheet } from 'react-native'

export const colors = {
  white: '#FFFFFF',
  light: '#ECFCF8',
  midLight: '#8EA8C3',
  main: '#406E8E',
  midDark: '#23395B',
  dark: '#161925',
}

export const ColorPalette = StyleSheet.create({
  background: {
    backgroundColor: colors.light
  },
  highlightBackground: {
    backgroundColor: colors.white
  },
  mainButton: {
    backgroundColor: colors.midLight
  },
  secondaryButton: {
    backgroundColor: colors.midLight
  },
  cardBackground: {
    backgroundColor: colors.white
  },
  header: {
    backgroundColor: colors.main
  },
  lightText: {
    color: colors.light
  },
  darkText: {
    color: colors.dark
  },
})

/* 
COLOR PALLETE OPTIONS:
opt 1 - https://coolors.co/161925-23395b-406e8e-8ea8c3-cbf7ed
  - blues, blue grays, blue black
opt 2 - https://coolors.co/50514f-cbd4c2-fffcff-247ba0-c3b299
  - blue, khaki, white, greeny grays
opt 3 - https://coolors.co/fffbfe-7a7d7d-d0cfcf-565254-ffffff
  - grays
opt 4 - https://coolors.co/686868-262626-255c99-7ea3cc-ccad8f
  - blue, black, gray, khaki
opt 5 - https://coolors.co/f7f9f9-bed8d4-78d5d7-63d2ff-2081c3
  - bright blues
*/