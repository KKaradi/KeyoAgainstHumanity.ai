import { getDatabase, ref, set, update, get, child, Database } from "firebase/database"

import { initializeApp } from "firebase/app";

const firebaseConfig = {
//PUT FIREBASE CONFIG HERE
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();

export async function createRoom(roomCode: number): Promise<void> {
  //write this method
  //add a room object, set started to false

  set(ref(db, "Rooms/" + roomCode), {
    roomCode: roomCode,
    started: false,
  });
}

export async function joinRoom(
  yourUserName: string,
  roomCode: number
): Promise<void> {
  //join the room, add the user name

  const postData = {
    username: yourUserName,
  };

  return update(
    ref(db, "/Rooms/" + roomCode + "/Userlist/" + yourUserName),
    postData
  );
}

export async function getUserList(roomCode: number): Promise<string[]> {
  const snapshot = await get(
    child(ref(db), "Rooms/" + roomCode + "/Userlist/")
  );
  console.log(snapshot.val())
  return [snapshot.val()]; //Needs adjustment
}

export async function uploadImageURL(
  imageURL: string,
  yourUserName: string, //This is also the appler username
  roomCode: number,
  prompt: string
): Promise<void> {
  set(ref(db, "Rooms/" + roomCode + "/Round/" + yourUserName + "/" + prompt), {
    imageUrl: imageURL,
})
}

export async function fetchImageURL(
  yourUserName: string, //Also the appler username
  roomCode: number,
  prompt: string
): Promise<string> {

  const snapshot = await get(
    child(ref(db), "Rooms/" + roomCode + "/Round/" + yourUserName + '/' + prompt)
  );
  console.log(snapshot.val().imageUrl)
  return snapshot.val().imageUrl;
}

export async function uploadCaption(
  applerUserName: string,
  caption: string,
  yourUserName: string,
  roomCode: number
) : Promise<void> {
  set(
    ref(
      database,
      "Rooms/" +
        roomCode +
        "/" +
        applerUserName + 
        "/Userlist/" +
        yourUserName +
        "/" +
        caption
    ),
    {
      votes: 0,
    }
  );
}


export async function fetchListOfCaptions(
  applerUserName: string,
  roomCode: number
): Promise<{ caption: string; authorUserName: string }[]> { 
  const snapshot = await get(
    child(
      ref(database), 
      "Rooms/" + 
        roomCode +
        "/" +
        applerUserName + 
        "/Userlist"
      ) 
    ); 
      return [snapshot.val().key];
}

export async function vote(
  applerUserName: string,
  captionAuthor: string,
  roomCode: number,
  caption: string
): Promise<void> {
  set(
    ref(
      database,
      "Rooms/" +
        roomCode +
        "/" +
        applerUserName +
        "/Userlist/" +
        captionAuthor +
        "/" +
        caption
    ),
    {
      votes: 1,
    }
  );
}

export async function fetchVoteList(
  roomCode: number,
  applerUserName: string
): Promise<
  { playerUserName: string; caption: string; numVotes: number }[]
> { 
  const snapshot = await get(
    child(
      ref(database), 
      "Rooms/" + 
        roomCode +
        "/" +
        applerUserName + 
        "/Userlist"
      ) 
    ); 
      return [snapshot.val()];
}
