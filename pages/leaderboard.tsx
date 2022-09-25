import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <main>
        <h1>Leaderboard</h1>
        <p>1st: 1st place user; x games won</p>
        <p>2nd: 2nd place user; y games won</p>
        <p>3rd: 3rd place user; x games won</p>
        <p>etc</p>
        <button>New Game</button>
    </main>
  )
}

export default Home
