import type { NextPage } from "next";
import React from "react";
import Router from "next/router";
import useRouter from "next/router";
import { useState, useEffect } from "react";
import {
  detachUserListListener,
  userListChangedListener,
} from "../../utils/firebase-utils/firebase-util";
import { startGame } from "../../utils/firebase-utils/firebase-util";
import { startedGameListener } from "../../utils/firebase-utils/firebase-util";
import Image from "next/image";
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
  const router = useRouter;
  const {
    query: { userName, roomID },
  } = router;

  async function navToHome() {
    await Router.push({
      pathname: "/mvp/home",
    });
  }
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
          <button className="changebuttons">CHANGE NAME</button>
          <button className="changebuttons">CHANGE ARTIST</button>
          <h2 className="currentplayers"> CURRENT PLAYERS:</h2>
          <div className="button">
            <button
              className="startgame"
              onClick={() => startGame(Number(roomID))}
            >
              Start Round
            </button>
          </div>
        </li>
        <li className="lobby-flex">
          <h1>PLAYERS:</h1>
          <div className="players">
            {
              <ul>
                {userList.map((user) => (
                  <li key={user}>{user}</li>
                ))}
              </ul>
            }
          </div>
        </li>
      </ul>
      <div>
        <button onClick={() => startGame(Number(roomID))}>Start Game</button>
      </div>
      <div className="button">
        <button className="homebutton" onClick={() => navToHome()}>
          Exit Room
        </button>
      </div>
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
