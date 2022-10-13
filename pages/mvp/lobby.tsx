import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";
import Router from "next/router";
import { useRouter } from "next/router";

const Lobby: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode },
  } = router;
  const props = {
    userName,
    roomID,
  };

  function navToGenerate() {
    Router.push({
      pathname: "/mvp/generate-images",
      query: {
        userName,
        roomID,
        roomCode
      },
    });
  }

  function navToHome() {
    Router.push({
      pathname: "/mvp/home",
    });
  }

  return (
    <main>
      <h1>Lobby</h1>
      <h3>Room {roomID} {roomCode}</h3>
      <h4>Users:</h4>
      <ul>
        <li>{userName}</li>
      </ul>
      <div>
        <button onClick={() => navToGenerate()}>Start Game</button>
      </div>
      <div>
        <button onClick={() => navToHome()}>Home</button>
      </div>
    </main>
  );
};

export default Lobby;
