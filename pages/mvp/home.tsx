import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import { Routes, Route, useNavigate } from "react-router-dom";
import Router from 'next/router'
import { SetStateAction, useState } from 'react'
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  onChildAdded,
} from 'firebase/database'
const db = getDatabase()

const Home: NextPage = () => {
  const [userName, setUserName] = useState('')

  const inputUserName = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setUserName(event.target.value)
  }

  let [roomID, setRoomID] = useState('')

  const inputRoomID = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setRoomID(event.target.value)
  }

  function createRoom() {
    //make this random
    let roomCode = 6720
    Router.push({
      pathname: '/mvp/lobby',
      query: {
        userName,
        roomCode,
      },
    })
  }

  function navToLobby() {
    Router.push({
      pathname: '/mvp/lobby',
      query: {
        userName,
        roomID,
      },
    })
  }
  const roomCode = 10000
  async function test() {
    const snapshot = await get(
      child(ref(db), 'Rooms/' + roomCode + '/Userlist/'),
    )

    console.log(snapshot.val())
  }

  return (
    <main>
      <h1>Keyo Against Humanity</h1>
      <div>
        <p>Username</p>
        <input
          type="text"
          id="message"
          name="message"
          onChange={inputUserName}
          value={userName}
        />
      </div>
      <div>
        <p>Room Code</p>
        <input
          type="text"
          id="message"
          name="message"
          onChange={inputRoomID}
          value={roomID}
        />
      </div>
      <div>
        <button onClick={() => createRoom()}>Create Room</button>
        <button onClick={() => test()}>Create Room</button>
      </div>
      <div>
        <button onClick={() => createRoom()}>Create Room</button>
      </div>
    </main>
  )
}

export default Home
