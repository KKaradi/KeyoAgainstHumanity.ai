import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";

const GenerateImages: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID },
  } = router;
  const props = {
    userName,
    roomID,
  };

  let img = "/pretty-picture.jpg";

  function navToPromptCreate() {
    Router.push({
      pathname: "/mvp/prompt-creation",
      query: {
        userName,
        roomID,
      },
    });
  }

  const [prompt, setPrompt] = useState("");

  const inputPrompt = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPrompt(event.target.value);
  };

  const generateImage = () => {
    console.log("generate image");
  };

  const reroll = () => {
    console.log("reroll");
  };

  const finalize = () => {
    console.log("finalize");
  };

  return (
    <main>
      <h1>Generate Image</h1>
      <h3>Room {props.roomID}</h3>
      <h4>Appler: {props.userName}</h4>
      <div>
        <Image src={img} width={100} height={100} alt="Pretty Picture"></Image>
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
        <button onClick={() => generateImage()}>Generate Image</button>
      </div>
      <div>
        <button onClick={() => reroll()}>Reroll</button>
        <button onClick={() => finalize()}>Finalize</button>
      </div>
      <div>
        <button onClick={() => navToPromptCreate()}>Submit</button>
      </div>
    </main>
  );
};

export default GenerateImages;
