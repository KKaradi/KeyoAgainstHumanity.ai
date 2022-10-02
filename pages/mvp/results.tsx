import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import * as React from "react";
import * as ReactDOM from "react-dom";
import Router from 'next/router';
import { useRouter } from 'next/router'

const Results: NextPage = () => {

  const playerVotes = [
    {player: "John", votes: 2, id: 1}, 
    {player: "Tom", votes: 1, id: 2}, 
    {player: "Rob", votes: 0, id: 3},
    {player: "Randy", votes: 0, id: 4}
  ];
  
  function displayVotes() {
    return (
      playerVotes.map(
        ({ player, votes, id }) => (
          <li key = {id}>{player} got {votes} votes.</li>
        )
      )
    )
  }

  function navToHome() {
    Router.push({
      pathname: '/mvp/home'
    })
  }

  function navToLobby() {
    Router.push({
      pathname: '/mvp/lobby'
    })
  }

  const router = useRouter()
  const {
    query: {userName, roomID}
  } = router
  const props = {
    userName,
    roomID
  }

  const img = "/pretty-picture"

  return (
    <main>
        <h1>Game Over</h1>
        <h3>Appler: {props.userName}</h3>
        <div>
          <Image src = {img} width = {100} height = {100} alt = "Pretty Picture"></Image>
        </div>
        <h3>Results:</h3>
        <ol>{displayVotes()}</ol>
        {/* <h3>Winning Caption: { props.caption }</h3> */}
        <button onClick={() => navToLobby()}>New Game</button>
        <div>
            <button onClick={() => navToHome()}>End Session</button>
        </div>
    </main>
    
  )
}

export default Results
