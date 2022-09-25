import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <main>
        <h1>Vote for the best prompt</h1>
        <h3>Image Goes Here</h3>
        <div>
            <button>
                Player 1 Prompt
            </button>
        </div>
        <div>
            <button>Player 2 Prompt</button>
        </div>
        <div>
            <button>Player 3 Prompt</button>
        </div>
        <div>
            <button>etc</button>
        </div>
        <button>Submit</button>
    </main>
    
  )
}

export default Home
