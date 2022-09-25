import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <main>
        <h1>Game Over</h1>
        <h3>Image Goes Here</h3>
        <h3>Results:</h3>
        <ol>
            <li>1st Place user: x votes</li>
            <li>2nd Place user: y votes</li>
            <li>3rd Place user: z votes</li>
            <li>etc</li>
        </ol>
        <button>New Game</button>
        <div>
            <button>End Session</button>
        </div>
    </main>
    
  )
}

export default Home
