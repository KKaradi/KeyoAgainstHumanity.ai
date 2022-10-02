import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Routes, Route, useNavigate} from 'react-router-dom';
import Router from 'next/router';
import { SetStateAction, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set} from "firebase/database";

const firebaseConfig = {
  databaseURL: "https://keyo-against-humanity-d9a9d-default-rtdb.firebaseio.com/",
 };

const app = initializeApp(firebaseConfig);

const database = getDatabase();

function createRoomData(roomId:any) {
  const db = getDatabase();
  roomId = (55555)
  set(
    ref(db, 'Rooms/' + roomId), {
      room_Id : roomId 
    }
  );
}

function writeUserData(name:any, email:any, entryRoom:any) {
  const db = getDatabase();
  set(
    ref(db, 'Rooms/' + entryRoom + '/' + 'Userlist/' + 'User:' + name), {
      username: name,
      email: email
    }
  );
} 

const Home: NextPage = () => {

  // let roomId = (undefined);
  //       const createRoom = () => {
        
  //         roomId = "55555"
  //         //create listener for started = "aspect"
         
  //         createRoomData(roomId);
  //       }
         

          

          
            
  //         let username = (undefined)
  //         let email = (undefined)
  //         let userEntryRoom = (undefined)
  //       const joinRoom = () => {
  //       //check if the room exists
  //       //adds itself to the list of users

  //         username = "john"
  //         email = "random@gmail.com"
  //         userEntryRoom = 55555
         
  //         writeUserData(username, email,userEntryRoom)

  //         username = "jack"
  //         email = "mega@gmail.com"
  //         userEntryRoom = 55555

  //         writeUserData(username, email,userEntryRoom)

  //         username = "Sean"
  //         email = "sweet@gmail.com"
  //         userEntryRoom = 55555

  //         writeUserData(username, email,userEntryRoom) 
  //       } 

  function createRoom() {
    console.log("null")
  }

  const [userName, setUserName] = useState('');
        
  const inputUserName = (event: { target: { value: SetStateAction<string>; }; }) => {
    setUserName(event.target.value);
  }; 
  
  const [roomID, setRoomID] = useState('');
        
  const inputRoomID = (event: { target: { value: SetStateAction<string>; }; }) => {
    setRoomID(event.target.value);
  };

  function navToLobby() {
    Router.push({
      pathname: '/mvp/lobby',
      query: {
        userName,
        roomID
      }
    })
  }

  return (
    <main>
        <h1>Keyo Against Humanity</h1>
        <div>
          <p>Username</p>
          <input
          type="text"
          id="message"
          name="message"
          onChange={inputUserName}
          value={userName}
          />
        </div>
        <div>
          <p>Room Code</p>
          <input
          type="text"
          id="message"
          name="message"
          onChange={inputRoomID}
          value={roomID}
          />
        </div>
        <div>
          <button onClick = {()=> createRoom()}>Create Room</button>
        </div>
        <div>
          <button onClick={() => navToLobby()}>Join Room</button>
        </div>
    </main>
    
  )
}

export default Home
