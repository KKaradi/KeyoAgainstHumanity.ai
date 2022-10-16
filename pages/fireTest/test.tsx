import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import { Routes, Route, useNavigate } from "react-router-dom";
import Router from 'next/router'
import { SetStateAction, useState } from 'react'
import {
  createRoom,
  getApplerUsername,
  joinRoom,
  startedGameListener,
  startRound,
  uploadImageURL,
  uploadPrompt,
  vote,
  userListChangedListener,
  tempGameUserList,
  tempReset,
  tempIncreaseUsers,
} from '../../utils/firebase-utils/firebase-util'

const Home: NextPage = () => {
  const callBack1 = () => {
    createRoom(100)
    console.log('rooms created')
  }
  const callBack2 = () => {
    tempGameUserList(100, 'Bob')
    tempGameUserList(100, 'Jack')
    tempGameUserList(100, 'James')
    tempGameUserList(100, 'Mary')
    tempGameUserList(100, 'Macy')
    tempGameUserList(100, 'Ryan')
    tempGameUserList(100, 'Taran')
    tempGameUserList(100, 'Barron')
    console.log('Temp users Added')
  }
  const callBack3 = () => {
    tempIncreaseUsers(100)
    console.log('temp User Number has increased by one')
  }
  const callBack4 = () => {
    userListChangedListener(100)
    console.log('The userlist has been logged and analyzed.')
  }
  const callBack5 = () => {}
  const callBack6 = () => {
    tempReset(100)
    console.log('The Firebase Database has been nuked.')
  }

  return (
    <main>
      <button onClick={() => callBack1()}>Button 1</button>
      <button onClick={() => callBack2()}>Button 2</button>
      <button onClick={() => callBack3()}>Button 3</button>
      <button onClick={() => callBack4()}>Button 4</button>
      <button onClick={() => callBack5()}>Button 5</button>
      <button onClick={() => callBack6()}>Button 6</button>
    </main>
  )
}

export default Home
