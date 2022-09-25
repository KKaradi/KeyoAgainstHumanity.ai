import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {


  const generateRoomInFirebase = ()=>{

  }

  return (
    <main>
        <h1>Keyo Against Humanity</h1>
        <textarea>Username</textarea>
        <div>
            <button>Create Room</button>
            <button>Join Room</button>
        </div>
    </main>
    
  )
}

export default Home
