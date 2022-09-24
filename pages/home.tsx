import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <main>
        <h1>Keyo Against Humanity</h1>
        <textarea>Username</textarea>
        <div>
            <button>Create Room</button>
            <button>Join Room</button>
        </div>
        <div>
            <button>Rules</button>
            <button>Settings</button>
        </div>
    </main>
    
  )
}

export default Home
