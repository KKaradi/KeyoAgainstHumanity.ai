import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import { Routes, Route, useNavigate } from "react-router-dom";
import Router from 'next/router'
import { SetStateAction, useState } from 'react'
import {
  createRoom,
  everyoneCastAVoteListener,
  everyoneCreatedACaptionListener,
  everyoneGeneratedAnImageListener,
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
  userListChangedListener,
  vote,
  userListChangedListener,
  tempGameUserList,
  tempReset,
  everyoneCastAVoteListener,
  everyoneGeneratedAnImageListener,
  tempMoveRoomPlaceholder,
} from '../../utils/firebase-utils/firebase-util'

const tempMoveRoomPlaceholderVar = () => tempMoveRoomPlaceholder()

const testFunc = async function test(): Promise<void> {
  console.log("callback");
};

const Home: NextPage = () => {
  const callBack1 = () => {
    createRoom(100)
    console.log('rooms created')
  }
  const callBack2 = () => {
<<<<<<< HEAD
    // tempGameUserList(100, 'Bob')
    // tempGameUserList(100, 'Jack')
    // tempGameUserList(100, 'James')
    // tempGameUserList(100, 'Mary')
    // tempGameUserList(100, 'Macy')

    // uploadCaption('Monke Flies', 'Jackson', 100, 'Jamy')
    // uploadImageURL('Haha.com/haha-image', 'Jamy', 100)
    // uploadImageURL('Monke.com/haha-image', 'Jacky', 100)
    // uploadImageURL('Lala.com/haha-image', 'Race', 100)
    // uploadImageURL('Blah.com/haha-image', 'Marvin', 100)
    // uploadImageURL('a.com/haha-image', 'Recker', 100)
    // uploadImageURL('b.com/haha-image', 'MK', 100)
    // uploadImageURL('c.com/haha-image', 'JUg', 100)
    // uploadImageURL('d.com/haha-image', 'Harven', 100)
    console.log('Temp items Added')
  }
  const callBack3 = () => {
    vote('Jackson', 100)
  }
  const callBack4 = async () => {
    userListChangedListener(100, await tempMoveRoomPlaceholderVar())
    tempGameUserList(100, 'Barron')
  }
  const callBack5 = async () => {
    everyoneGeneratedAnImageListener(
      100,
      'Jamy',
      await tempMoveRoomPlaceholderVar(),
    )
    console.log('The images have been logged and analyzed.')
  }
  const callBack6 = async () => {
    everyoneCastAVoteListener(100, 'Jamy', await tempMoveRoomPlaceholderVar())
    console.log('The votes have been logged and analyzed.')
  }
  const callBack7 = () => {
    tempReset(100)
    console.log('The Firebase Database has been nuked.')
  }
=======
    userListChangedListener(100, testFunc)
  };
  const callBack3 = () => {
    joinRoom("Bob", 100);
    console.log("joined");
  };
  const callBack4 = () => {
    uploadImageURL("123.jpg", "John", 100);
    console.log("url uploaded");
  };
  const callBack5 = () => {
    uploadPrompt(100, "John", "banana");
    console.log("prompt uploaded");
  };
  const callBack6 = () => {
    uploadCaption("caption2", "CaptionAuthor2", 100);
  };
  const callBack7 = () => {
    vote("CaptionAuthor2", 100);
  };
  const callBack8 = () => {
    startGame(100)
  };
  const callBack9 = () => {
    fetchVoteList(100)
  };
>>>>>>> 45521f43f099cf6dc49ef2803ea5dca4eb8b8cde

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
