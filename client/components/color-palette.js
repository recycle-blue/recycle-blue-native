import { StyleSheet, Platform, StatusBar } from 'react-native'

// // Palette 1
// export const colors = {
//   white: '#FFFFFF',
//   light: '#ECFCF8',
//   midLight: '#8EA8C3',
//   main: '#406E8E',
//   midDark: '#23395B',
//   dark: '#161925',
// }

// // Palette 2
// export const colors = {
//   white: '#FFFFFF',
//   light: '#CBD4C2',
//   midLight: '#C3B299',
//   main: '#247BA0',
//   midDark: '#50514F',
//   dark: '#08090A',
// }

// // Palette 3
// export const colors = {
//   white: '#FFFFFF',
//   light: '#7EA3CC',
//   midLight: '#CCAD8F',
//   main: '#255C99',
//   midDark: '#686868',
//   dark: '#262626',
// }

// // Palette 4
// export const colors = {
//   white: '#F7F9F9',
//   light: '#E1EDEB',
//   midLight: '#78D5D7',
//   main: '#63D2FF',
//   midDark: '#2081C3',
//   dark: '#2B303A',
// }

// Mashup Palette
export const colors = {
  white: '#FFFFFF',
  light: '#E1EDEB',
  midLight: '#DBAA18',
  main: '#253E63',
  midDark: '#55A7CA',
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

export const StatusBarHeight = () => {
  return Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
}

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