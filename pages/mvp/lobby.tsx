import type { NextPage } from "next";
import React from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { SetStateAction, useState, useEffect } from "react";
import { getUserList } from "../../utils/firebase-utils/firebase-util";
import { startRound } from "../../utils/firebase-utils/firebase-util";
import { startedRoundListener } from "../../utils/firebase-utils/firebase-util";
import { userListChangedListener } from "../../utils/firebase-utils/firebase-util";

const Lobby: NextPage = () => {
  
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode },
  } = router;
  const props = {
    userName,
    roomID,
  };

  const [userList, setUserList] = useState([""])

  function displayUserList() {
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

  let userListCallback = async(userList: string[]) => {
    setUserList(userList);
  }

  useEffect(() => {
    userListChangedListener(Number(roomID), userListCallback);
  }, [])

  useEffect(() => {
    startedRoundListener(Number(roomID), navToGenerate);
  }, [])

  return (
    <main>
      <h1>Lobby</h1>
      <h3>Room {roomID} {roomCode}</h3>
      <h4>Users:</h4>
      <div>{ displayUserList() }</div>
      <div>
        <button onClick={() => startRound(Number(roomID))}>Start Round</button>
      </div>
      <div>
        <button onClick={() => navToHome()}>Exit Room</button>
      </div>
    </main>
  );
};

export default Lobby;
