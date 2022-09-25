import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <main>
        <h1>Image Generation Page</h1>
        <h4>Image Goes Here</h4>
        <textarea>Input prompt</textarea>
        <div>
            <button>Generate Image</button>
        </div>
        <div>
            <button>Reroll</button>
            <button>Finalize</button>
        </div>
    </main>
    
  )
}

export default Home
