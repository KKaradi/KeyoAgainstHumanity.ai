import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import * as React from "react";
import * as ReactDOM from "react-dom";
import Router from 'next/router';

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

  return (
    <main>
        <h1>Game Over</h1>
        <h3>Image Goes Here</h3>
        <h3>Results:</h3>
        <ol>{displayVotes(playerVotes)}</ol>
        <button onClick={() => navToLobby()}>New Game</button>
        <div>
            <button onClick={() => navToHome()}>End Session</button>
        </div>
    </main>
    
  )
}

export default Home
