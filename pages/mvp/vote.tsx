import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router from 'next/router'

const playerPrompts = ["Purple monkey holding balloon", "Banana riding a unicycle", "Glue stick with eyes"]
const displayPrompts = playerPrompts.map(
    (prompt) => <div><button>{prompt}</button></div>
)

const Home: NextPage = () => {

  function navToResults() {
    Router.push({
      pathname: '/mvp/results'
    })
  }

  return (
    <main>
        <h1>Vote for the best prompt</h1>
        <img src = 'favicon.ico'/>
        <div>{ displayPrompts }</div>
        <button onClick={() => navToResults()}>Submit</button>
    </main>
    
  )
}

export default Home
