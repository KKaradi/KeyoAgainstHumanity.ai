//Initializing Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set, get, child} from "firebase/database"

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
// ...
// The value of `databaseURL` depends on the location of the database
databaseURL: "YourFirebaseAPI",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase();
const db = getDatabase();



export async function createRoom(roomCode: number): Promise<void> {
  //write this method
  //add a room object, set started to false
}

export async function joinRoom(
  yourUserName: string,
  roomCode: number
): Promise<void> {
  //join the room, add the user name
}

export async function getUserList(roomCode: number): Promise<string[]> {
  return [];
}

export async function uploadImageURL(
  imageURL: string,
  yourUserName: string,
  roomCode: number
): Promise<void> {}

export async function fetchImageURL(
  yourUserName: string,
  roomCode: number
): Promise<string> {
  return "";
}

//I do past this remove at commit

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
  roomCode: number
): Promise<void> {
  get(
    ref(
      database,
      "Rooms/" +
        roomCode +
        "/" +
        applerUserName +
        "/Userlist/" +
        captionAuthor
    ),
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
