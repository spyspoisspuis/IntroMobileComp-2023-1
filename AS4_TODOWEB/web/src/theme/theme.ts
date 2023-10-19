import { extendTheme } from '@chakra-ui/react'
import '@fontsource/kanit/600-italic.css';
const theme = extendTheme({
  fonts: {
    heading: `'Kanit', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
})

export default theme