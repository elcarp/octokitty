import Image from 'next/image'
import styles from './page.module.css'
import octocat from '~public/images/octocat-nobg.png'

export default function Home() {
  return (
    <div className={styles.page}>
      <div style={{ textAlign: 'center' }}>
        <h1>
          Henlo Frien. <br />
          Can I fetch a profile for you?
        </h1>
        <Image
          className={styles.slideUp}
          style={{ display: 'block', margin: 'auto' }}
          src={octocat}
          width={400}
          height={400}
          alt='octokitty'
        />
        <input className={styles.slideUp}
          style={{
            padding: '1rem',
            width: '100%',
            borderRadius: '1rem',
            fontSize: '1rem',
          }}
          type='text'
          placeholder='Enter a github username'
        />
      </div>
    </div>
  )
}
