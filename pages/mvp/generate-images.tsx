import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router from 'next/router'

const Home: NextPage = () => {

  function navToPromptCreate() {
    Router.push({
      pathname: '/mvp/prompt-creation'
    })
  }

  return (
    <main>
        <h1>Image Generation Page</h1>
        <div>
          <img src = "favicon.ico"></img>
        </div>
        <div>
          <textarea>Input prompt</textarea>
        </div>
        <div>
            <button>Generate Image</button>
        </div>
        <div>
            <button>Reroll</button>
            <button onClick={() => navToPromptCreate()}>Finalize</button>
        </div>
    </main>
  )
}

export default Home
