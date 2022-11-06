import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import useRouter from "next/router";
import { SetStateAction, useState, useEffect } from "react";
import { generateImage } from "../../utils/image-utils/image-util";
import { everyoneGeneratedAnImageListener } from "../../utils/firebase-utils/firebase-util";
import { uploadPrompt } from "../../utils/firebase-utils/firebase-util";
import { uploadImageURL } from "../../utils/firebase-utils/firebase-util";
import { getApplerForRound } from "../../utils/firebase-utils/firebase-util";

const uploadURLUploadPrompt = (
  URL: string,
  userName: string,
  roomID: number,
  prompt: string
) => {
  if (URL != null && prompt != null) {
    uploadImageURL(URL, String(userName), Number(roomID));
    uploadPrompt(Number(roomID), String(userName), prompt);
  }
};

async function navToCaptionCreate(
  applerUsername: string,
  userName: string,
  roomID: number,
  URL: string
) {
  if (applerUsername === userName && applerUsername != undefined) {
    await Router.push({
      pathname: "/mvp/appler-wait",
      query: {
        userName,
        roomID,
        URL,
      },
    });
  } else if (applerUsername != userName && applerUsername != undefined) {
    await Router.push({
      pathname: "/mvp/caption-creation",
      query: {
        userName,
        roomID,
        URL,
      },
    });
  }
}

const GenerateImages: NextPage = () => {
  const router = useRouter;
  const {
    query: { userName, roomID, roomCode },
  } = router;

  const [prompt, setPrompt] = useState("");

  const inputPrompt = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPrompt(event.target.value);
  };

  const [URL, setURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
  );

  const generateImageWrapper = async (prompt: string) => {
    if (prompt != null) {
      const newURL = await generateImage(prompt);
      setURL(newURL);
    }
  };

  useEffect(() => {
    const attachListener = async () => {
      const appler = await getApplerForRound(Number(roomID));
      await everyoneGeneratedAnImageListener(Number(roomID), () =>
        navToCaptionCreate(
          String(appler),
          String(userName),
          Number(roomID),
          String(URL)
        )
      );
    };
    attachListener();
  }, [URL, roomID, userName]);

  return (
    <main>
      <h1>Generate Image</h1>
      <h3>
        Room {roomID} {roomCode}
      </h3>
      <h4>Generate your image</h4>
      <div>
        <Image src={URL} width={100} height={100} alt="Pretty Picture"></Image>
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
        <button onClick={() => generateImageWrapper(prompt)}>Generate</button>
      </div>
      <div>
        <button
          onClick={() =>
            uploadURLUploadPrompt(
              String(URL),
              String(userName),
              Number(roomID),
              String(prompt)
            )
          }
        >
          Submit
        </button>
      </div>
    </main>
  );
};

export default GenerateImages;
