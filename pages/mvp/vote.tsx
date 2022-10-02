import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router from 'next/router'
import { useRouter } from 'next/router'

const playerPrompts = ["Purple monkey holding balloon", "Banana riding a unicycle", "Glue stick with eyes"]
const displayPrompts = playerPrompts.map(
    (prompt) => <div><button>{prompt}</button></div>
)

const Home: NextPage = () => {

  const router = useRouter()
  const {
    query: {userName, roomID, imgURL, caption}
  } = router
  const props = {
    imgURL,
    userName,
    roomID,
    caption
  }

  function navToResults() {
    Router.push({
      pathname: '/mvp/results',
      query: {
        imgURL,
        userName,
        roomID,
        caption
      }
    })
  }

  return (
    <main>
        <h1>Vote for the best prompt</h1>
        <h3>Appler: {props.userName}</h3>
        <img src = 'favicon.ico'/>
        <div>
          { displayPrompts }
          <button>{ props.caption }</button>
        </div>
        <button onClick={() => navToResults()}>Submit</button>
    </main>
    
  )
}

export default Home
