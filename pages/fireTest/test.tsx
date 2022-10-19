import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import { Routes, Route, useNavigate } from "react-router-dom";
import Router from 'next/router'
import { SetStateAction, useState } from 'react'
import {
  createRoom,
  everyoneCreatedACaptionListener,
  fetchListOfCaptions,
  fetchListOfImageURL,
  fetchVoteList,
  getApplerForRound,
  getUserList,
  joinRoom,
  nextRound,
  resetRoom,
  startedGameListener,
  startGame,
  uploadCaption,
  uploadImageURL,
  uploadPrompt,
  vote,
  userListChangedListener,
  everyoneCastAVoteListener,
  everyoneGeneratedAnImageListener,
  tempMoveRoomPlaceholder,
} from '../../utils/firebase-utils/firebase-util'

const tempMoveRoomPlaceholderVar = () => tempMoveRoomPlaceholder()

const testFunc = async function test(): Promise<void> {
  console.log('callback')
}

const Home: NextPage = () => {
  const callBack1 = () => {
    createRoom(100)
    console.log('rooms created')
  }
  const callBack2 = () => {
    userListChangedListener(100, testFunc)
  }
  const callBack3 = () => {
    joinRoom('Bob', 100)
    console.log('joined')
  }
  const callBack4 = () => {
    uploadImageURL('123.jpg', 'John', 100)
    console.log('url uploaded')
  }
  const callBack5 = () => {
    uploadPrompt(100, 'John', 'banana')
    console.log('prompt uploaded')
  }
  const callBack6 = () => {
    uploadCaption('caption2', 'CaptionAuthor2', 100)
  }
  const callBack7 = () => {
    vote('CaptionAuthor2', 100)
  }
  const callBack8 = () => {
    startGame(100)
  }
  const callBack9 = () => {
    everyoneCastAVoteListener(100, tempMoveRoomPlaceholder)
    console.log('Button 9 has been clicked')
  }

  return (
    <main>
      <button onClick={() => callBack1()}>Button 1</button>
      <button onClick={() => callBack2()}>Button 2</button>
      <button onClick={() => callBack3()}>Button 3</button>
      <button onClick={() => callBack4()}>Button 4</button>
      <button onClick={() => callBack5()}>Button 5</button>
      <button onClick={() => callBack6()}>Button 6</button>
      <button onClick={() => callBack7()}>Button 7</button>
      <button onClick={() => callBack8()}>Button 8</button>
      <button onClick={() => callBack9()}>Button 9</button>
    </main>
  )
}

export default Home
