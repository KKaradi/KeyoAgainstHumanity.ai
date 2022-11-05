import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import { useRouter } from "next/router";
import {
  endSessionClicked,
  everyoneWentListener,
  getApplerForRound,
  resetRoom,
  gameResets,
} from "../../utils/firebase-utils/firebase-util";
import { useState, useEffect } from "react";
import {
  fetchApplerImageURL,
  fetchCaptionVoteObject,
  nextRound,
  nextRoundHasBeenClicked,
} from "../../utils/firebase-utils/firebase-util";

async function navToHome(roomID: number) {
  await Router.push({
    pathname: "/mvp/home",
  });
  setTimeout(() => resetRoom(Number(roomID)), 10000);
}

async function navToLobby(userName: string, roomID: number) {
  await Router.push({
    pathname: "/mvp/lobby",
    query: {
      userName,
      roomID,
    },
  });
}

const Results: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID, caption, URL, votes },
  } = router;

  const [captionVotes, setCaptionVotes] = useState({});

  useEffect(() => {
    fetchCaptionVoteObject(Number(roomID)).then((captionVotes) => {
      setCaptionVotes(captionVotes);
    });
  }, [roomID]);

  const [applerUsername, setApplerUsername] = useState("");

  useEffect(() => {
    getApplerForRound(Number(roomID)).then((applerUsername) => {
      setApplerUsername(applerUsername);
    });
  }, [roomID]);

  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    fetchApplerImageURL(Number(roomID)).then((imgURL) => {
      setImgURL(imgURL);
    });
  }, [roomID]);

  const [newGame, setNewGame] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      const result = await gameResets(Number(roomID));
      setNewGame(result);
    };
    fetch();
  }, [roomID]);

  useEffect(() => {
    nextRoundHasBeenClicked(Number(roomID), () =>
      navToLobby(String(userName), Number(roomID))
    );
  }, [roomID, userName]);

  useEffect(() => {
    everyoneWentListener(Number(roomID), () => navToHome(Number(roomID)));
  }, [roomID]);

  const waves = "/waveboi.png";

  return (
    <main>
      <h1>Game Over</h1>
      <h3>Room {roomID}</h3>
      <h3>Appler: {applerUsername}</h3>
      <div>
        <Image
          src={imgURL}
          width={100}
          height={100}
          alt="Pretty Picture"
        ></Image>
      </div>
      <h3>Leaderboard:</h3>
      <div>
        <ul>
          {Object.keys(captionVotes).map((caption, index) => {
            return (
              <li key={index}>
                {caption} got{" "}
                {captionVotes[caption as keyof typeof captionVotes]} votes.
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        {newGame ? (
          <button onClick={() => endSessionClicked(Number(roomID))}>
            End Session
          </button>
        ) : (
          <button onClick={() => nextRound(Number(roomID))}>Next Round</button>
        )}
      </div>
      <button className="genbtn" onClick={() => nextRound(Number(roomID))}>
        Next Round
      </button>
      <button className="genbtn" onClick={() => navToHome(Number(roomID))}>
        End Session
      </button>
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

export default Results;
