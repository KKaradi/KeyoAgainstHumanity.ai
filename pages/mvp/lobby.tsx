import type { NextPage } from "next";
import React from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  detachUserListListener,
  userListChangedListener,
} from "../../utils/firebase-utils/firebase-util";
import { startGame } from "../../utils/firebase-utils/firebase-util";
import { startedGameListener } from "../../utils/firebase-utils/firebase-util";

async function navToGenerate(userName: string, roomID: string) {
  detachUserListListener(Number(roomID));
  await Router.push({
    pathname: "/mvp/generate-images",
    query: {
      userName,
      roomID,
    },
  });
}

const Lobby: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID },
  } = router;

  async function navToHome() {
    await Router.push({
      pathname: "/mvp/home",
    });
  }

  const [userList, setUserList] = useState([""]);
  console.log(userList)
  useEffect(() => {
    userListChangedListener(Number(roomID), (userList: string[]) => {
      setUserList(userList);
    });
  }, [roomID]);

  useEffect(() => {
    startedGameListener(Number(roomID), () => {
      navToGenerate(userName as string, roomID as string);
    });
  }, [roomID, userName]);

  return (
    <main>
      <h1>Lobby</h1>
      <h3>Room {roomID}</h3>
      <h4>Users:</h4>
      <div>
        {
          <ul>
            {userList.map((user) => (
              <li key={user}>{user}</li>
            ))}
          </ul>
        }
      </div>
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
