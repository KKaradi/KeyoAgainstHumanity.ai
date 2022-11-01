import type { NextPage } from "next";
import React from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getUserList } from "../../utils/firebase-utils/firebase-util";
import { startGame } from "../../utils/firebase-utils/firebase-util";
import { startedGameListener } from "../../utils/firebase-utils/firebase-util";
import { userListChangedListener } from "../../utils/firebase-utils/firebase-util";

const Lobby: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode },
  } = router;

  async function navToHome() {
    await Router.push({
      pathname: "/mvp/home",
    });
  }

  async function navToGenerate() {
    await Router.push({
      pathname: "/mvp/generate-images",
      query: {
        userName,
        roomID,
        roomCode,
      },
    });
  }

  const [userList, setUserList] = useState([""]);

  const displayUserList = () => {
    getUserList(Number(roomID)).then((userList) => {
      setUserList(userList);
    });
    return (
      <ul>
        {userList.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    userListChangedListener(Number(roomID), displayUserList);
  });

  useEffect(() => {
    startedGameListener(Number(roomID), navToGenerate);
  });

  return (
    <main>
      <h1>Lobby</h1>
      <h3>
        Room {roomID} {roomCode}
      </h3>
      <h4>Users:</h4>
      <div>{displayUserList()}</div>
      <div>
        <button onClick={() => startGame(Number(roomID))}>Start Round</button>
      </div>
      <div>
        <button onClick={() => navToHome()}>Exit Room</button>
      </div>
    </main>
  );
};

export default Lobby;
