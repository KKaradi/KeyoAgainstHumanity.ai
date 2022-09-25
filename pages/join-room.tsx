import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <main>
        <h1>Join A Game</h1>
        <h3>Input Room Code</h3>
        <textarea>x-x-x-x-x-x</textarea>
        <div>
          <button>Join</button>
        </div>
    </main>
    
  )
}

export default Home
