import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import { useRouter } from "next/router";
import { SetStateAction, useState, useEffect } from "react";
import { fetchListOfCaptions, getApplerForRound, vote, hasVoted, fetchVoted } from "../../utils/firebase-utils/firebase-util";
import { fetchApplerImageURL } from "../../utils/firebase-utils/firebase-util";
import { everyoneCastAVoteListener } from "../../utils/firebase-utils/firebase-util";

const Vote: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode, caption, URL },
  } = router;
  const props = {
    userName,
    roomID,
    roomCode,
    caption,
    URL
  };

  function navToResults() {
    Router.push({
      pathname: "/mvp/results",
      query: {
        userName,
        roomID,
        roomCode,
        URL,
        caption
      },
    });
  }

  const [applerUsername, setApplerUsername] = useState("")

  async function getAppler(){
    const applerName = await getApplerForRound(Number(roomID)) ?? undefined
    if(applerName === undefined){
    }else{
      setApplerUsername(applerName)
      return() => {applerUsername}
    }
    }

  useEffect(() => {
    getAppler()
  })

  const [imgURL, setImgURL] = useState("")

  useEffect(() => {
    fetchApplerImageURL(Number(roomID)).then(imgURL => {
      setImgURL(imgURL)
    })
      return() => {imgURL}
  })

  const [captionList, setCaptionList] = useState([""])

  const displayCaptions = () => {
    fetchListOfCaptions(Number(roomID)).then(
      (captionList) => {
        setCaptionList(captionList)
      }
    )
    return(
      <div>
        {
          captionList.map(
            (caption) => <button key = { caption } onClick = {() => vote(caption, Number(roomID))}>{ caption }</button>
          )
        }
      </div>
    )
  }

  useEffect(() => {
    everyoneCastAVoteListener(Number(roomID), navToResults);
  })

  return (
    <main>
      <h1>Voting</h1>
      <h3>Room {roomID}</h3>
      <h3>Appler: {applerUsername}</h3>
      <h4>This is the picture {applerUsername} generated</h4>
      <Image src={imgURL} width={100} height={100} alt="Pretty Picture" />
      <h4>These are the captions the players came up with</h4>
      <h4>Vote for your favorite caption!</h4>
      <div>
        { displayCaptions() }
      </div>
    </main>
  );
};

export default Vote;