import { Mansalva } from 'next/font/google'
import React from 'react'
import styles from './footer.module.css' 

const mansalva = Mansalva({ subsets: ['latin'], weight: '400' })

export default function Footer() {
  return (
    <footer className={`${mansalva.className} ${styles.footer}`}>
      <p>
        Designed and developed with ❤️ by Lise, a heartfelt tribute to Annapurna
        🐈‍⬛
      </p>
    </footer>
  )
}
