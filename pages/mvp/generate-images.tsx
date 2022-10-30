import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import { useRouter } from "next/router";
import { SetStateAction, useState, useEffect } from "react";
import { generateImage } from "../../utils/image-utils/image-util";
import { getApplerForRound, uploadImageURL, uploadPrompt } from "../../utils/firebase-utils/firebase-util";
import { everyoneGeneratedAnImageListener } from "../../utils/firebase-utils/firebase-util";

const GenerateImages: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode },
  } = router;
  const props = {
    userName,
    roomID,
  };

  const top = "/top.png";
  const waves = "/waveboi.png";

  const [prompt, setPrompt] = useState("");

  const inputPrompt = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPrompt(event.target.value);
  };

  const [URL, setURL] = useState("https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921");

  const generateImageWrapper = async(prompt: string) => {
    const newURL = await generateImage(prompt);
    setURL(newURL)
  }

  const uploadURLUploadPrompt = () => {
    uploadImageURL(URL, String(userName), Number(roomID));
    uploadPrompt(Number(roomID), String(userName), prompt);
  }

  const [applerUsername, setApplerUsername] = useState("")

  useEffect(() => {
    getApplerForRound(Number(roomID)).then(applerUsername =>
      setApplerUsername(applerUsername))
      return() => {applerUsername}
  })

  function navToCaptionCreate() {
    if(applerUsername == userName){
    Router.push({
      pathname: "/mvp/appler-wait",
      query: {
        userName,
        roomID,
        roomCode,
        URL
      },
    });
  }else{
    Router.push({
      pathname: "/mvp/caption-creation",
      query: {
        userName,
        roomID,
        roomCode,
        URL
      },
    });
  }
  }

  useEffect(() => {
    everyoneGeneratedAnImageListener(Number(roomID), navToCaptionCreate);
  })

  return (
    
    <main>
      
     
     


      <Image src={top}  width={10000} height={600} alt ="shapes top header" className="top"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <ul className="flex-container">
        <li className="lobby-flex">
        <h1>GENERATE IMAGE</h1>
      <div className="generatedimg">
        <Image src={URL} width={400} height={400} alt="Pretty Picture"></Image>
      </div>
          
                    
        </li>
        <li className="lobby-flex">
          <h1>INSERT PROMPT HERE:</h1>
      <ul>
      
        
      </ul>
      <div>
        <input className="textbox"
          type="text"
          id="message"
          name="message"
          onChange={inputPrompt}
          value={prompt}
        />
      </div>
      
      <div className="changebuttons">
      <div>
        <button className="genbtn" onClick={() =>  generateImageWrapper(prompt)}>Generate</button>
      
        <button className="genbtn" onClick={() => uploadURLUploadPrompt()}>Submit</button>
      </div>
      </div>
        </li>
      </ul>
      <Image src={waves}  width={2400} height={400} alt ="waves at the bottom of the screen" className="waveslobby"/>


    </main>




  );
};

export default GenerateImages;