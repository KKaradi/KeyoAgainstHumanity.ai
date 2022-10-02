import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Routes, Route, useNavigate} from 'react-router-dom';
import Router from 'next/router';

const Home: NextPage = () => {

  const generateRoomInFirebase = ()=>{

  }

  function navToLobby() {
    Router.push({
      pathname: '/mvp/lobby'
    })
  }

  return (
    <main>
        <h1>Keyo Against Humanity</h1>
        <div>
          <textarea>Username</textarea>
        </div>
        <div>
          <textarea>Room Code</textarea>
        </div>
        <div>
            <button onClick={() => navToLobby()}>Join Room</button>
        </div>
    </main>
    
  )
}

export default Home
