'use client'

import { useLanguage } from '~context/language-context'
import React from 'react'
import styles from './language-switcher.module.css'

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()
  const isEnglish = language === 'en'

  const toggleLanguage = () => setLanguage(isEnglish ? 'cat' : 'en')

  return (
    <nav className={styles.nav}>
      <div className={styles.switchContainer}>
        <span>🐈</span>
        <label className={styles.switchWrapper}>
          <input
            type='checkbox'
            checked={isEnglish}
            onChange={toggleLanguage}
            className={styles.switchInput}
            aria-label='Toggle Language'
          />
          <span className={styles.switchTrack}>
            <span
              className={styles.switchThumb}
              style={{ left: isEnglish ? '28px' : '4px' }}></span>
          </span>
        </label>
        <span>🇬🇧</span>
      </div>
    </nav>
  )
}

export default LanguageSwitcher
