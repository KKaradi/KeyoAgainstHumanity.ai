import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import { useRouter } from "next/router";
import { SetStateAction, useState, useEffect } from "react";
import { fetchApplerImageURL } from "../../utils/firebase-utils/firebase-util";
import { uploadCaption } from "../../utils/firebase-utils/firebase-util";
import { getApplerForRound } from "../../utils/firebase-utils/firebase-util";
import { everyoneCreatedACaptionListener } from "../../utils/firebase-utils/firebase-util";

const CaptionCreation: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode, URL },
  } = router;
  const props = {
    userName,
    roomID,
    roomCode,
    URL
  };

  function navToVote() {
    Router.push({
      pathname: "/mvp/vote",
      query: {
        userName,
        roomID,
        roomCode,
        caption,
        URL
      },
    });
  }

  const [caption, setCaption] = useState("");

  const inputCaption = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCaption(event.target.value);
  };

  const [imgURL, setImgURL] = useState("")

  useEffect(() => {
    fetchApplerImageURL(Number(roomID)).then(imgURL => {
      setImgURL(imgURL)
    })
      return() => {imgURL}
  })

  function uploadCaptionNavToVote () {
    uploadCaption(caption, String(userName), Number(roomID));
    navToVote();
  }

  const [applerUsername, setApplerUsername] = useState("")

  useEffect(() => {
    getApplerForRound(Number(roomID)).then(applerUsername =>
      setApplerUsername(applerUsername))
      return() => {applerUsername}
  })

  useEffect(() => {
    everyoneCreatedACaptionListener(Number(roomID), navToVote);
  })
  const waves = "/waveboi.png";
  const top = "/top.png";
  return (
    <main>
<Image src={top}  width={10000} height={600} alt ="shapes top header" className="top"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <ul className="flex-container">
        <li className="lobby-flex">
        <h1>CAPTION {applerUsername}&#39;S PAINTING!</h1>
        <div>
        <Image src={imgURL} width={400} height={400} alt="Pretty Picture"></Image>
      </div>   
        </li>
        </ul>
          <div className="title">
        <p>CAPTION THIS PICTURE!</p>
        </div>
      <div className="cap">
        <input className="captiontxt"
          type="text"
          id="message"
          name="message"
          onChange={inputCaption}
          value={caption}
        />
        <button className="genbtn" onClick={() => uploadCaptionNavToVote()}>SUBMIT</button>
     
        </div>
      
      <Image src={waves}  width={2400} height={400} alt ="waves at the bottom of the screen" className="waveslobby"/>







      
      
    </main>
  );
};

export default CaptionCreation;
