'use client'
import { useLanguage } from '~context/LanguageContext'

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()

  if (language === 'loading') return null // Prevent rendering until language loads

  const isEnglish = language === 'en'

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'end',
        marginRight: '3rem',
        marginTop: '1rem',
        fontSize: '1.5rem',
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>🐈</span>
        <label
          style={{
            position: 'relative',
            display: 'inline-block',
            width: '50px',
            height: '25px',
          }}>
          <input
            type='checkbox'
            checked={isEnglish}
            onChange={() => setLanguage(isEnglish ? 'cat' : 'en')}
            style={{ opacity: 0, width: 0, height: 0 }}
          />
          <span
            style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: isEnglish ? '#2196F3' : '#ccc',
              borderRadius: '25px',
              transition: '0.4s',
            }}>
            <span
              style={{
                position: 'absolute',
                height: '18px',
                width: '18px',
                borderRadius: '50%',
                backgroundColor: 'white',
                left: isEnglish ? '28px' : '4px',
                top: '3.5px',
                transition: '0.4s',
              }}></span>
          </span>
        </label>
        <span>🇬🇧</span>
      </div>
    </nav>
  )
}

export default LanguageSwitcher
