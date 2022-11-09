import type { NextPage } from "next";
import React from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  detachUserListListener,
  getUserList,
  leaveRoom,
  userListChangedListener,
} from "../utils/firebase-utils/firebase-util";
import { startGame } from "../utils/firebase-utils/firebase-util";
import { startedGameListener } from "../utils/firebase-utils/firebase-util";
import Image from "next/image";
async function navToGenerate(userName: string, roomID: string) {
  detachUserListListener(Number(roomID));
  await Router.push({
    pathname: "/generate-images",
    query: {
      userName,
      roomID,
    },
  });
}

async function navToHome() {
  await Router.push({
    pathname: "/",
  });
}

async function navToHomeAndLeaveRoom(roomCode: number, userName: string) {
  navToHome();
  leaveRoom(roomCode, userName);
}

const Lobby: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID },
  } = router;

  const waves = "/waveboi.png";
  const top = "/top.png";
  const [userList, setUserList] = useState([""]);
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
    <main className="lobby">
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
      <ul className="flex-container">
        <li className="lobby-flex">
          <h1>ROOM CODE: </h1>
          <div className="roomcode">{roomID}</div>
          <h1> YOU:</h1>
          <div className="roomcode">{userName}</div>
          <h2 className="currentplayers"> CURRENT PLAYERS:</h2>
          <div className="changebuttons">
            <div>
              <button
                className="genbtn"
                onClick={() => startGame(Number(roomID))}
              >
                Start Round
              </button>
              <button
                className="genbtn"
                onClick={() =>
                  navToHomeAndLeaveRoom(Number(roomID), String(userName))
                }
              >
                Exit Room
              </button>
            </div>
          </div>
        </li>
        <li className="lobby-flex">
          <h1>PLAYERS:</h1>
          <div className="players">
            {
              <ul>
                {userList.map((user) => (
                  <div key={user}>{user}</div>
                ))}
              </ul>
            }
          </div>
        </li>
      </ul>
      <Image
        src={waves}
        width={2400}
        height={400}
        alt="waves at the bottom of the screen"
        className="waveslobby"
      />
    </main>
  );
};

export default Lobby;
