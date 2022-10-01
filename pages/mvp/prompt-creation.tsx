import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router from 'next/router'

const Home: NextPage = () => {

  function navToVote() {
    Router.push({
      pathname: '/mvp/vote'
    })
  }

  return (
    <main>
        <h1>Guess The Prompt</h1>
        <img src = "favicon.ico"></img>
        <div>
          <textarea>Input Prompt</textarea>
        </div>
        <div>
            <button onClick={() => navToVote()}>submit</button>
        </div>
    </main>
  )
}

export default Home
