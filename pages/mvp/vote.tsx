import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const playerPrompts = ["Purple monkey holding balloon", "Banana riding a unicycle", "Glue stick with eyes"]
const displayPrompts = playerPrompts.map(
    (prompt) => <div><button>{prompt}</button></div>
)

const Home: NextPage = () => {
  return (
    <main>
        <h1>Vote for the best prompt</h1>
        <img src = 'favicon.ico'/>
        <div>{ displayPrompts }</div>
        <button>Submit</button>
    </main>
    
  )
}

export default Home
