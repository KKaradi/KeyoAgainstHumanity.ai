import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import { useRouter } from "next/router";
import { SetStateAction, useState, useEffect } from "react";
import { generateImage, loadingURL } from "../utils/image-utils/image-util";
import {
  getApplerForRound,
  uploadImageURL,
  uploadPrompt,
} from "../utils/firebase-utils/firebase-util";
import { everyoneGeneratedAnImageListener } from "../utils/firebase-utils/firebase-util";

const uploadURLUploadPrompt = (
  URL: string,
  userName: string,
  roomID: number,
  prompt: string
) => {
  if (URL != loadingURL && prompt != "") {
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
      pathname: "/appler-wait",
      query: {
        userName,
        roomID,
        URL,
      },
    });
  } else if (applerUsername != userName && applerUsername != undefined) {
    await Router.push({
      pathname: "/caption-creation",
      query: {
        userName,
        roomID,
        URL,
      },
    });
  }
}

const GenerateImages: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode },
  } = router;

  const [prompt, setPrompt] = useState("");

  const inputPrompt = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPrompt(event.target.value);
  };

  const [URL, setURL] = useState(loadingURL);
  const [submitted, setSubmitted] = useState(false);

  function userClicksSubmit(
    URL: string,
    userName: string,
    roomID: number,
    prompt: string
  ) {
    uploadURLUploadPrompt(
      String(URL),
      String(userName),
      Number(roomID),
      String(prompt)
    );
    if (URL != loadingURL && prompt != "") {
      setSubmitted(true);
    }
  }

  const generateImageWrapper = async (prompt: string) => {
    if (prompt != "") {
      setURL("/generating.gif");
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
  const waves = "/waveboi.png";
  const top = "/top.png";

  return (
    <main>
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
          <h1>GENERATE IMAGE</h1>
          <div className="generatedimg">
            <Image
              src={URL}
              width={400}
              height={400}
              alt="Pretty Picture"
            ></Image>
          </div>
        </li>
        <li className="lobby-flex">
          <h1>INSERT PROMPT HERE:</h1>
          <ul></ul>
          <div>
            <input
              type="text"
              id="message"
              name="message"
              onChange={inputPrompt}
              value={prompt}
            />
          </div>

          <div className="changebuttons">
            <div>
              {submitted ? (
                <h3></h3>
              ) : (
                <button
                  className="genbtn"
                  onClick={() => generateImageWrapper(prompt)}
                >
                  Generate
                </button>
              )}
              {submitted ? (
                <h3>Image Submitted!</h3>
              ) : (
                <button
                  className="genbtn"
                  onClick={() =>
                    userClicksSubmit(
                      String(URL),
                      String(userName),
                      Number(roomID),
                      String(prompt)
                    )
                  }
                >
                  Submit
                </button>
              )}
            </div>
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

export default GenerateImages;
