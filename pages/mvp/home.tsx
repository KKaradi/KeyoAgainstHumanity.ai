import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Routes, Route, useNavigate} from 'react-router-dom';
import Router from 'next/router';
import { SetStateAction, useState } from 'react';

const Home: NextPage = () => {

  // const roomID = 5555;

  const [userName, setMessage1] = useState('');
        
  const handleChange1 = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMessage1(event.target.value);
    console.log('value is:', event.target.value)
  }; 
  
  const [roomID, setMessage2] = useState('');
        
  const handleChange2 = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMessage2(event.target.value);
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
          <p>Username</p>
          <input
          type="text"
          id="message"
          name="message"
          onChange={handleChange1}
          value={userName}
          />
        </div>
        <div>
          <p>Room Code</p>
          <input
          type="text"
          id="message"
          name="message"
          onChange={handleChange2}
          value={roomID}
          />
        </div>
        <div>
            <button onClick={() => navToLobby()}>Join Room</button>
        </div>
    </main>
    
  )
}

export default Home
