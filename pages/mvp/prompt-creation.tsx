import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router from 'next/router'
import { useRouter } from 'next/router'
import {SetStateAction, useState} from 'react';

const Home: NextPage = () => {

  const router = useRouter()
  const {
    query: {userName, roomID, imgURL}
  } = router
  const props = {
    imgURL,
    userName,
    roomID
  }

  function navToVote() {
    Router.push({
      pathname: '/mvp/vote',
      query: {
        userName, roomID, imgURL, caption
      }
    })
  }

  const [caption, setMessage] = useState('');
        
  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMessage(event.target.value);
    console.log('value is:', event.target.value)
  };

  return (
    <main>
        <h1>Guess The Prompt</h1>
        <div>
          {/* <img src = {imgURL}></img> */}
        </div>
        <div>
          <input
          type="text"
          id="message"
          name="message"
          onChange={handleChange}
          value={caption}
          />
        </div>
        <div>
            <button onClick={() => navToVote()}>submit</button>
        </div>
    </main>
  )
}

export default Home
