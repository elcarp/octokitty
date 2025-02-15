'use client'
import React, { createContext, useState, useEffect, useContext } from 'react'

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [language, setLanguage] = useState<string>('loading') // Start with "loading"

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || 'en'
    setLanguage(storedLanguage)
  }, [])

  useEffect(() => {
    if (language !== 'loading') {
      localStorage.setItem('language', language)
    }
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {language !== 'loading' && children}{' '}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
