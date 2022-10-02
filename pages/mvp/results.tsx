import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import * as React from "react";
import * as ReactDOM from "react-dom";
import Router from 'next/router';
import { useRouter } from 'next/router'

const playerVotes = [
  {player: "John", votes: 2}, 
  {player: "Tom", votes: 1}, 
  {player: "Rob", votes: 0},
  {player: "Randy", votes: 0}
];

function displayVotes() {
  return (
    playerVotes.map(
      ({ player, votes }) => (
        <li>{player} got {votes} votes.</li>
      )
    )
  );
}

const Home: NextPage = () => {

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
    query: {userName, roomID, imgURL, caption}
  } = router
  const props = {
    imgURL,
    userName,
    roomID,
    caption
  }

  return (
    <main>
        <h1>Game Over</h1>
        <h3>Appler: {props.userName}</h3>
        <div>
          {/* <img src = {props.imgURL}></img> */}
        </div>
        <h3>Results:</h3>
        <ol>{displayVotes()}</ol>
        <h3>Winning Caption: { props.caption }</h3>
        <button onClick={() => navToLobby()}>New Game</button>
        <div>
            <button onClick={() => navToHome()}>End Session</button>
        </div>
    </main>
    
  )
}

export default Home
