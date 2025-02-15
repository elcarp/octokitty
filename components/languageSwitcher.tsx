'use client'
import { useLanguage } from '~context/LanguageContext'
import React from 'react'

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()
  const isEnglish = language === 'en'

  const toggleLanguage = () => setLanguage(isEnglish ? 'cat' : 'en')

  const navStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'end',
    marginRight: '3rem',
    marginTop: '1rem',
    fontSize: '1.5rem',
  }

  const switchContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }

  const switchWrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    width: '50px',
    height: '25px',
  }

  const switchInputStyle: React.CSSProperties = {
    opacity: 0,
    width: 0,
    height: 0,
  }

  const switchTrackStyle: React.CSSProperties = {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isEnglish ? '#2196F3' : '#ccc',
    borderRadius: '25px',
    transition: '0.4s',
  }

  const switchThumbStyle: React.CSSProperties = {
    position: 'absolute',
    height: '18px',
    width: '18px',
    borderRadius: '50%',
    backgroundColor: 'white',
    left: isEnglish ? '28px' : '4px',
    top: '3.5px',
    transition: '0.4s',
  }

  return (
    <nav style={navStyle}>
      <div style={switchContainerStyle}>
        <span>🐈</span>
        <label style={switchWrapperStyle}>
          <input
            type='checkbox'
            checked={isEnglish}
            onChange={toggleLanguage}
            style={switchInputStyle}
            aria-label='Toggle Language'
          />
          <span style={switchTrackStyle}>
            <span style={switchThumbStyle}></span>
          </span>
        </label>
        <span>🇬🇧</span>
      </div>
    </nav>
  )
}

export default LanguageSwitcher
