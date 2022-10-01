import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'

const users = ["John", "Tom", "Rob"];
const listUsers = users.map((user) =>
  <li>{user}</li>
);

const Home: NextPage = () => {
  return (
    <main>
        <h1>Lobby</h1>
        <h2>Your Room</h2>
        <ul>{ listUsers }</ul>
        <button>Start Game!</button>
        <button>Home</button>
    </main>
    
  )
}

export default Home
