import type { NextPage } from "next";
<<<<<<< HEAD
import Router from "next/router";
import { SetStateAction, useState } from "react";
import { createRoom } from "../../utils/firebase-utils/firebase-util";
import { joinRoom } from "../../utils/firebase-utils/firebase-util";
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
=======
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// import { Routes, Route, useNavigate } from "react-router-dom";
import Router from "next/router";
import { SetStateAction, useState } from "react";
>>>>>>> 083a8ff4bbc6f790b972322f8244d8ca2e3abdf0

const Home: NextPage = () => {
  const [userName, setUserName] = useState("");

  const inputUserName = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUserName(event.target.value);
  };

<<<<<<< HEAD
  const [roomID, setRoomID] = useState("");
=======
  let [roomID, setRoomID] = useState("");
>>>>>>> 083a8ff4bbc6f790b972322f8244d8ca2e3abdf0

  const inputRoomID = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setRoomID(event.target.value);
  };

<<<<<<< HEAD
=======
  function createRoom() {
    //make this random
    let roomCode = 6720;
    Router.push({
      pathname: "/mvp/lobby",
      query: {
        userName,
        roomCode,
      },
    });
  }

>>>>>>> 083a8ff4bbc6f790b972322f8244d8ca2e3abdf0
  function navToLobby() {
    Router.push({
      pathname: "/mvp/lobby",
      query: {
        userName,
        roomID,
      },
<<<<<<< HEAD
    })
  }

  function joinRoomNavToLobby() {
    joinRoom(userName, Number(roomID));
    navToLobby();
  }
  
  function createRoomNavToLobby() {
    createRoom(0);
    navToLobby();
=======
    });
>>>>>>> 083a8ff4bbc6f790b972322f8244d8ca2e3abdf0
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
<<<<<<< HEAD
        <button onClick={() => joinRoomNavToLobby()}>Join Room</button>
=======
        <button onClick={() => navToLobby()}>Join Room</button>
>>>>>>> 083a8ff4bbc6f790b972322f8244d8ca2e3abdf0
      </div>
      <div>
        <button onClick={() => createRoomNavToLobby()}>Create Room</button>
      </div>
    </main>
  );
};

export default Home;
