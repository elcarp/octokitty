import { Mansalva } from 'next/font/google'
import React from 'react'

const mansalva = Mansalva({
  subsets: ['latin'],
  weight: '400',
})

export default function Footer() {
  return (
    <>
      <footer className={mansalva.className}>
        <div
          className='footer'
          style={{ textAlign: 'center', display: 'flex', alignItems: 'end' }}>
          Designed and developed with love by Lise, a heartfelt tribute to
          Annapurna 🐈‍⬛
        </div>
      </footer>
    </>
  )
}
