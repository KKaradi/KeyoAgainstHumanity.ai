import { getDatabase, ref, set, update, get, child, Database } from "firebase/database"

import { initializeApp } from "firebase/app";


  const apiKey = process.env.NEXT_PUBLIC_API_KEY
  const authDomain = process.env.AUTH_DOMAIN
  const databaseURL = process.env.DATABASE_URL
  const projectID = process.env.PROJECT_ID 
  const storagebucket = process.env.STORAGE_BUCKET
  const messagingSenderId = process.env.MESSAGING_SENDER_ID 
  const appId = process.env.APP_ID

const firebaseConfig = {
//PUT FIREBASE CONFIG HERE
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: projectID,
  storageBucket: storagebucket,
  messagingSenderId: messagingSenderId,
  appId: appId
};

console.log(firebaseConfig);

initializeApp(firebaseConfig);

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
    becameAppler: false
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
  caption: string,
  appleryourUserName: string,
  roomCode: number,
  prompt: string
) : Promise<void> {
  set(
    ref(
      db,
      "Rooms/" +
        roomCode +
        "/Round/" +
        appleryourUserName +
        '/' +
        prompt +
        "/captionList/" +
        caption
    ),
    {
      votes: 0
    }
  );
}


export async function fetchListOfCaptions(
  appleryourUserName: string,
  roomCode: number,
  prompt: string
): Promise<{ caption: string; authorUserName: string }[]> { 
  const snapshot = await get(
    child(
      ref(db), 
      "Rooms/" +
        roomCode +
        "/Round/" +
        appleryourUserName +
        prompt +
        "/captionList"
      ) 
    ); 
      return [snapshot.val().key];
}

export async function vote(
  appleryourUserName: string,
  roomCode: number,
  caption: string,
  prompt: string
): Promise<void> {
  get(
    child(
      ref(db),
      "Rooms/" +
        roomCode +
        "/Round/" +
        appleryourUserName +
        "/" +
        prompt +
        "/captionList/" +
        caption
    )
  ).then((snapshot) => {
    let captionVotesObject = snapshot.val();
    let newVoteCount = captionVotesObject.votes + 1;
    set(
      ref(
        db,
        "Rooms/" +
          roomCode +
          "/Round/" +
          appleryourUserName +
          "/" +
          prompt +
          "/captionList/" +
          caption
      ),
      {
        votes: newVoteCount,
      }
    );
  });
}

export async function fetchVoteList(
  roomCode: number,
  applerUserName: string,
  prompt: string
): Promise<
  { playerUserName: string; caption: string; numVotes: number }[]
> { 
  const snapshot = await get(
    child(
      ref(db), 
      "Rooms/" +
        roomCode +
        "/Round/" +
        applerUserName +
        '/' +
        prompt +
        "/captionList"
      )
    ); 
      console.log(snapshot.val())
      return [snapshot.val()];  //Needs adjustment
}
