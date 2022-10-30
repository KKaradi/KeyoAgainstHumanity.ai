import type { NextPage } from "next";
import React from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import Image from "next/image";
import { SetStateAction, useState, useEffect } from "react";
import { getUserList } from "../../utils/firebase-utils/firebase-util";
import { startGame } from "../../utils/firebase-utils/firebase-util";
import { startedGameListener } from "../../utils/firebase-utils/firebase-util";
import { userListChangedListener } from "../../utils/firebase-utils/firebase-util";
import { get, ref, getDatabase, child } from "firebase/database";

import { initializeApp } from "firebase/app";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_AUTH_DOMAIN;
const databaseURL = process.env.NEXT_PUBLIC_DATABASE_URL;
const projectID = process.env.NEXT_PUBLIC_PROJECT_ID;
const storagebucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: projectID,
  storageBucket: storagebucket,
  messagingSenderId: messagingSenderId,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const waves = "/waveboi.png";
const top = "/top.png";

const Lobby: NextPage = () => {
  
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode },
  } = router;
  const props = {
    userName,
    roomID,
  };

  function navToHome() {
    Router.push({
      pathname: "/mvp/home",
    });
  }
  
  async function navToGenerate() {
    Router.push({
      pathname: "/mvp/generate-images",
      query: {
        userName,
        roomID,
        roomCode
      },
    });
  }

  const [userList, setUserList] = useState([""])

  function displayUserList() {
      getUserList(Number(roomID)).then(
        (userList) => {
          setUserList(userList)
        }
      )
    return (
      <ul>{ userList.map(
        (user) => <li key = { user }>{ user }</li>
      ) }</ul>
    )
  }

  useEffect(() => {
    userListChangedListener(Number(roomID), displayUserList);
  })

  useEffect(() => {
    startedGameListener(Number(roomID), navToGenerate);
  })

  return (
<main className="lobby">
      <Image src={top}  width={10000} height={600} alt ="shapes top header" className="top"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <ul className="flex-container">
        <li className="lobby-flex">
          <h1 >ROOM CODE:  </h1>
          <div className="roomcode">
          {roomID}{roomCode}
          </div>
          <h1> YOU:</h1> 
          <div className="roomcode">
          {userName}
          </div>
            <button className="changebuttons">CHANGE NAME</button>
            <button className="changebuttons">CHANGE ARTIST</button>
            <h2 className = "currentplayers"> CURRENT PLAYERS:</h2>
          <div className="button">
            <button  className="startgame" onClick={() => startGame(Number(roomID))}>Start Round</button>
          </div>          
        </li>
        <li className="lobby-flex">
          <h1>PLAYERS:</h1>
      <ul>
      <div className="players">{displayUserList()}</div>
      </ul>
      <div className="button">
            <button className= "homebutton" onClick={() => navToHome()}>Exit Room</button>
          </div>
        </li>
      </ul>
      <Image src={waves}  width={2400} height={400} alt ="waves at the bottom of the screen" className="waveslobby"/>
    </main>
  );
};


export default Lobby;