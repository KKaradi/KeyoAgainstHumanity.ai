import type { NextPage } from "next";
import React from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { getUserList } from "../../utils/firebase-utils/firebase-util";
import { SetStateAction, useState, useEffect } from "react";

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

  function displayUserList() {
    const [userList, setUserList] = useState([""])
    useEffect(() => {
      getUserList(Number(roomID)).then(
        (userList) => {
          setUserList(userList)
        }
      )
    })
    return (
      <ul>{ userList.map(
        (user) => <li>{ user }</li>
      ) }</ul>
    )
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
      <div>{ displayUserList() }</div>
      <div>
        <button onClick={() => navToGenerate()}>Start Game</button>
      </div>
      <div>
        <button onClick={() => navToHome()}>Exit Room</button>
      </div>
    </main>
  );
};

export default Lobby;
