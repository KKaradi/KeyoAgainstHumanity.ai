import React from "react";
import "../../styles/Home.module.css";
import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import { SetStateAction, useState } from "react";
import { createRoom } from "../../utils/firebase-utils/firebase-util";
import { joinRoom } from "../../utils/firebase-utils/firebase-util";

async function navToLobby(userName: string, roomID: number) {
  await Router.push({
    pathname: "/mvp/lobby",
    query: {
      userName,
      roomID,
    },
  });
}

const Home: NextPage = () => {
  const [userName, setUserName] = useState("");
  const inputUserName = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUserName(event.target.value);
  };

  const top = "/top.png";
  const shapes = "/logo top boi.png";
  const waves = "/waveboi.png";
  const [roomID, setRoomID] = useState("");

  const inputRoomID = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setRoomID(event.target.value);
  };

  function joinRoomNavToLobby() {
    joinRoom(userName, Number(roomID), () => navToLobby(String(userName), Number(roomID)));
  }

  function createRoomNavToLobby() {
    createRoom(String(userName), (roomCode) => navToLobby(String(userName), Number(roomCode)))
  };

  return (
    <main>
      <Image
        src={top}
        width={10000}
        height={600}
        alt="shapes top header"
        className="top"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <div className="shapes">
        <Image
          src={shapes}
          width={10000}
          height={2000}
          alt="shapes and logo"
          className="shapes"
        />
      </div>
      <ul className="flex-container">
        <li className="flex-item">
          <h2> CREATE ROOM</h2>
          <div className="button">
            <button
              className="createRoom"
              onClick={() => createRoomNavToLobby()}
            >
              Create Room
            </button>
          </div>
        </li>
        <li className="flex-item">
          <div>
            <h2> CHOOSE A NAME</h2>
            <h4>Username</h4>
            <div className="textBoxHome">
            <input 
              type="text"
              id="message"
              name="message"
              onChange={inputUserName}
              value={userName}
            />
            </div>
          </div>
        </li>
        <li className="flex-item">
          <h2> JOIN ROOM</h2>
          <div>
            <h4>Enter Room Code</h4>
            <div className="textBoxHome">
            <input  
              type="text"
              id="message"
              name="message"
              onChange={inputRoomID}
              value={roomID}
            />
            </div>
          </div>
          <div className="homebuttos"></div>
          <div className="button">
            <button className="joinRoom" onClick={() => joinRoomNavToLobby()}>
              Join Room
            </button>
          </div>
        </li>
      </ul>
      <div className="waves">
        <Image
          src={waves}
          width={2400}
          height={400}
          alt="waves at the bottom of the screen"
          className="waves"
        />
      </div>
    </main>
  );
};

export default Home;
