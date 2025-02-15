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
          Lovingly designed and developed by Lise and dedicated to Annapurna 🐈‍⬛
        </div>
      </footer>
    </>
  )
}
