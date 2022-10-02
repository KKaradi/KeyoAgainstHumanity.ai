import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Routes, Route, useNavigate} from 'react-router-dom';
import Router from 'next/router';
import { SetStateAction, useState } from 'react';

const Home: NextPage = () => {

  const roomID = 5555;

  const [userName, setMessage] = useState('');
        
  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMessage(event.target.value);
    console.log('value is:', event.target.value)
  };   

  function navToLobby() {
    Router.push({
      pathname: '/mvp/lobby',
      query: {
        userName,
        roomID
      }
    })
  }

  return (
    <main>
        <h1>Keyo Against Humanity</h1>
        <div>
          <input
          type="text"
          id="message"
          name="message"
          onChange={handleChange}
          value={userName}
          />
        </div>
        <div>{userName}</div>
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
