import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <main>
        <h1>Lobby</h1>
        <h2>Your Room</h2>
        <ul>
            <li>Player 1</li>
            <li>Player 2</li>
            <li>Player 3</li>
            <li>etc</li>
        </ul>
        <button>Start Game!</button>
        <button>Home</button>
    </main>
    
  )
}

export default Home
