import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";

const PromptCreation: NextPage = () => {
  const img = "/pretty-picture.jpg";

  const router = useRouter();
  const {
    query: { userName, roomID, roomCode, imgURL },
  } = router;
  const props = {
    userName,
    roomID,
    roomCode,
    imgURL
  };

  function navToVote() {
    Router.push({
      pathname: "/mvp/vote",
      query: {
        userName,
        roomID,
        roomCode,
        caption,
        imgURL
      },
    });
  }

  const [caption, setCaption] = useState("");

  const inputCaption = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCaption(event.target.value);
  };

  const displayPicture = () => {
    return (
      <Image src={img} width={100} height={100} alt="Pretty Picture" />
    )
  }

  return (
    <main>
      <h1>Caption the image</h1>
      <h3>Room {roomID} {roomCode}</h3>
      <h3>Appler: {userName}</h3>
      <h4>This is the picture {userName} generated</h4>
      <div>
        {displayPicture()}
      </div>
      <h4>Caption this picture</h4>
      <div>
        <input
          type="text"
          id="message"
          name="message"
          onChange={inputCaption}
          value={caption}
        />
      </div>
      <div>
        <button onClick={() => navToVote()}>submit</button>
      </div>
    </main>
  );
};

export default PromptCreation;
