import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {



  return (
    <main>
        <h1>Guess The Prompt</h1>
        <h4>Image Goes Here</h4>
        <textarea>Input Prompt</textarea>
        <div>
            <button>submit</button>
        </div>
    </main>
  )
}

export default Home
