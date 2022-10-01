import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import * as React from "react";
import * as ReactDOM from "react-dom";

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
  return (
    <main>
        <h1>Game Over</h1>
        <h3>Image Goes Here</h3>
        <h3>Results:</h3>
        <ol>{displayVotes(playerVotes)}</ol>
        <button>New Game</button>
        <div>
            <button>End Session</button>
        </div>
    </main>
    
  )
}

export default Home
