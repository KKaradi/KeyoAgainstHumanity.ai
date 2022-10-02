import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router from 'next/router'
import { useRouter } from 'next/router'
import { SetStateAction, useState } from 'react';

const Home: NextPage = () => {

  const router = useRouter()
  const {
    query: {userName, roomID}
  } = router
  const props = {
    userName,
    roomID
  }

  let imgURL = "favicon.ico"

  function navToPromptCreate() {
    Router.push({
      pathname: '/mvp/prompt-creation',
      query: {
        imgURL,
        userName,
        roomID
      }
    })
  }

  const [prompt, setMessage] = useState('');
        
  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMessage(event.target.value);
    console.log('value is:', event.target.value)
  }; 

  return (
    <main>
        <h1>Generate Image</h1>
        <h3>Room { props.roomID }</h3>
        <h4>Appler: { props.userName }</h4>
        <div>
          <img src = {imgURL}></img>
        </div>
        <div>
          <p>Input prompt</p>
          <input
          type="text"
          id="message"
          name="message"
          onChange={handleChange}
          value={prompt}
          />
        </div>
        <div>
            <button>Generate Image</button>
        </div>
        <div>
            <button onClick={() => navToPromptCreate()}>Submit</button>
        </div>
    </main>
  )
}

export default Home
