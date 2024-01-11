"use client"
import { ThemeProvider } from "next-themes"

const CustomThemeProvider = ({children}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</ThemeProvider>
  )
}

export default CustomThemeProvider