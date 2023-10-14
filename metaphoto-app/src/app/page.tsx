import Image from 'next/image'
import styles from './page.module.css'
import Metaphoto from '@/components/Metaphoto'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Metaphoto</h1>
      <Metaphoto />
    </main>
  )
}
