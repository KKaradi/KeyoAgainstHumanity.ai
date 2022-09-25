import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div>
        Home Page
      </div>
      <button>Join Room</button>
    </div>
  )
}

export default Home
