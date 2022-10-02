import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router from 'next/router'
import { useRouter } from 'next/router'

const Vote: NextPage = () => {

  const img = "/pretty-picture"

  const playerCaptions = [
    {caption: "Purple monkey holding balloon", player: "Kai"}, 
    {caption: "Banana riding a unicycle", player: "Zander"}, 
    {caption: "Glue stick with eyes", player: "Emma"}
  ]

  function displayCaptions() {
    return (
      playerCaptions.map(
        ({caption, player}) => (
          <div><button key = {player} onClick={() => navToResults()}>{caption}</button></div>
        )
      )
    )
  }

  const router = useRouter()
  const {
    query: {userName, roomID}
  } = router
  const props = {
    userName,
    roomID
  }

  function navToResults() {
    Router.push({
      pathname: '/mvp/results',
      query: {
        userName,
        roomID
      }
    })
  }

  return (
    <main>
        <h1>Vote for the best prompt</h1>
        <h3>Appler: {props.userName}</h3>
        <Image src = {img} width = {100} height = {100} alt = "Pretty Picture"/>
        <div>
          { displayCaptions() }
          {/* <button onClick={() => navToResults()}>{ props.caption }</button> */}
        </div>
    </main>
    
  )
}

export default Vote
