import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router from 'next/router'
import { useRouter } from 'next/router'

const Vote: NextPage = () => {

  const router = useRouter()
  const {
    query: {userName, roomID}
  } = router
  const props = {
    userName,
    roomID
  }

  const img = "/pretty-picture.jpg"

  //firebase returns to user 
  const playerCaptions = [
    {caption: "Purple monkey holding balloon", author: "Kai"}, 
    {caption: "Banana riding a unicycle", author: "Zander"}, 
    {caption: "Glue stick with eyes", author: "Emma"}
  ]

  function displayCaptions() {
    return (
      playerCaptions.map(
        ({caption, author}) => (
          <div key = {author}>
            <button onClick={() => onButtonClick(author)}>{caption}</button>
          </div>
        )
      )
    )
  }

  function onButtonClick(personVotedFor: string) {
    //supply user (playing) and who they voted for
    //user: props.userName
    console.log(props.userName);
    console.log(personVotedFor)

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
        </div>
        <div>
          <button onClick={() => navToResults()}>Results</button>
        </div>
    </main>
    
  )
}

export default Vote
