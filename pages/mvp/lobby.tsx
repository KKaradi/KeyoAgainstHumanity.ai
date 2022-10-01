import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import Router from 'next/router'

const users = ["John", "Tom", "Rob"];
const listUsers = users.map((user) =>
  <li>{user}</li>
);

const Home: NextPage = () => {
  
  function navToGenerate() {
    Router.push({
      pathname: '/mvp/generate-images'
    })
  }

  function navToHome() {
    Router.push({
      pathname: '/mvp/home'
    })
  }

  return (
    <main>
        <h1>Lobby</h1>
        <h2>Your Room</h2>
        <ul>{ listUsers }</ul>
        <button onClick={() => navToGenerate()}>Start Game!</button>
        <button onClick={() => navToHome()}>Home</button>
    </main>
    
  )
}

export default Home
