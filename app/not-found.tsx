'use client'
import { useRouter } from 'next/navigation'
import styles from './not-found.module.css'
import { useLanguage } from '~context/LanguageContext'
import Image from 'next/image'
import octocat from '~public/images/octocat-nobg.png' // Adjust based on your assets
import { Mansalva } from 'next/font/google'

const mansalva = Mansalva({ subsets: ['latin'], weight: '400' })

export default function NotFoundPage() {
  const router = useRouter()
  const { language } = useLanguage() as { language: 'en' | 'cat' }

  const getText = (key: 'notFound' | 'goHome') => {
    const translations = {
      notFound: {
        en: 'Oops! This page doesn’t exist. Maybe a cat knocked it off the table?',
        cat: 'Oopsie! Dis page go poof. Pawsibly knocked off by a sneaky kitty.',
      },
      goHome: { en: 'Go back home', cat: 'Go home, hooman!' },
    }
    return translations[key][language] || ''
  }

  return (
    <div className={styles.container}>
      <h1 className={`${mansalva.className} ${styles.bounce}`}>404</h1>
      <p className={mansalva.className}>{getText('notFound')}</p>
      <Image
        src={octocat}
        alt='Octocat not found'
        width={250}
        height={250}
        className={styles.shake}
      />
      <button
        className={`${styles.button} brutalButton`}
        onClick={() => router.push('/')}>
        {getText('goHome')}
      </button>
    </div>
  )
}
