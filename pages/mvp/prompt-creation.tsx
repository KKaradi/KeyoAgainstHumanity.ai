import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router from 'next/router'
import { useRouter } from 'next/router'
import {SetStateAction, useState} from 'react';

const PromptCreation: NextPage = () => {

  const img = "/public/pretty-picture"

  const router = useRouter()
  const {
    query: {userName, roomID}
  } = router
  const props = {
    userName,
    roomID
  }

  function navToVote() {
    Router.push({
      pathname: '/mvp/vote',
      query: {
        userName, roomID
      }
    })
  }

  const [caption, setCaption] = useState('');
        
  const inputCaption = (event: { target: { value: SetStateAction<string>; }; }) => {
    setCaption(event.target.value);
  };

  return (
    <main>
        <h1>Caption the image</h1>
        <div>
          <Image src = {img} width = {100} height = {100} alt = "Pretty Picture"/>
        </div>
        <div>
          <input
          type="text"
          id="message"
          name="message"
          onChange={inputCaption}
          value={caption}
          />
        </div>
        <div>
            <button onClick={() => navToVote()}>submit</button>
        </div>
    </main>
  )
}

export default PromptCreation
