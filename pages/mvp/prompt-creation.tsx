import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {



  return (
    <main>
        <h1>Guess The Prompt</h1>
        <img src = "favicon.ico"></img>
        <div>
          <textarea>Input Prompt</textarea>
        </div>
        <div>
            <button>submit</button>
        </div>
    </main>
  )
}

export default Home
