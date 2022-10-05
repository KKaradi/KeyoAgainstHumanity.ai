import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";
import { generateImage } from "../../utils/image-utils/image-util";

const GenerateImages: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode },
  } = router;
  const props = {
    userName,
    roomID,
  };

  // const generateImage = () => {
  //   return "/pretty-picture.jpg";
  // };

  // let imgURL = generateImage();
  let imgURL = "/pretty-picture.jpg"

  function navToPromptCreate() {
    Router.push({
      pathname: "/mvp/prompt-creation",
      query: {
        userName,
        roomID,
        roomCode,
        imgURL
      },
    });
  }

  const [prompt, setPrompt] = useState("");

  const inputPrompt = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPrompt(event.target.value);
  };

  // const reroll = () => {
  //   console.log("reroll");
  // };

  // const finalize = () => {
  //   console.log("finalize");
  // };

  return (
    <main>
      <h1>Generate Image</h1>
      <h3>Room {roomID} {roomCode}</h3>
      <h3>Appler: {userName}</h3>
      <h4>Generate your image</h4>
      <div>
        <Image src={imgURL} width={100} height={100} alt="Pretty Picture"></Image>
      </div>
      <div>
        <p>Input prompt</p>
        <input
          type="text"
          id="message"
          name="message"
          onChange={inputPrompt}
          value={prompt}
        />
      </div>
      <div>
        <button onClick={() => generateImage(prompt)}>Generate</button>
      </div>
      {/* <div>
        <button onClick={() => reroll()}>Reroll</button>
        <button onClick={() => finalize()}>Finalize</button>
      </div> */}
      <div>
        <button onClick={() => navToPromptCreate()}>Submit</button>
      </div>
    </main>
  );
};

export default GenerateImages;