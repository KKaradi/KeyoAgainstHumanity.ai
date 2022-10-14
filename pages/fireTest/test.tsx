import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import { Routes, Route, useNavigate } from "react-router-dom";
import Router from 'next/router'
import { SetStateAction, useState } from 'react'
import { createRoom, fetchImageURL, getUserList, orderApplers,userListWithPush, uploadCaption, uploadImageURL, uploadPrompt, vote } from '../../utils/firebase-utils/firebase-util'


const Home: NextPage = () => {
  const callBack1 = () => {
    createRoom(100)
    console.log('rooms created')
  }
  const callBack2 = () => {
    userListWithPush(100, "Bob")
    console.log('joined')
  }
  const callBack3 = () => {
    uploadPrompt(100, 'Bob', 'banana')
    console.log('prompt uploaded')
  }
  const callBack4 = () => {
    uploadImageURL('banana.jpg', 'Bob', 100, 'banana')
    console.log('url uploaded')
  }
  const callBack5 = () => {
    uploadCaption('Bob', "i think that's a banana (this is a caption)", 'User3', 100, 'banana')
    console.log('caption uploaded')
  }
  const callBack6 = () => {
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
