import {
  getDatabase,
  ref,
  set,
  update,
  get,
  child,
  query,
  orderByChild,
  Database,
} from "firebase/database";

import { initializeApp } from "firebase/app";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_AUTH_DOMAIN;
const databaseURL = process.env.NEXT_PUBLIC_DATABASE_URL;
const projectID = process.env.NEXT_PUBLIC_PROJECT_ID;
const storagebucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_APP_ID;

const firebaseConfig = {
  //PUT FIREBASE CONFIG HERE
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: projectID,
  storageBucket: storagebucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCv_iUUZHASCZ1fE5Xn2lU8BnxOSrLgBPY",
//   authDomain: "week-5-mvp-4768a.firebaseapp.com",
//   databaseURL: "https://week-5-mvp-4768a-default-rtdb.firebaseio.com",
//   projectId: "week-5-mvp-4768a",
//   storageBucket: "week-5-mvp-4768a.appspot.com",
//   messagingSenderId: "517741937666",
//   appId: "1:517741937666:web:c49ba3c0aee11b5fba131b"
// };

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const db = getDatabase(app);

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
  totalUsersInRoom(roomCode);
  addToApplerOrder(roomCode, yourUserName);
  const snapshot = await get(
    child(ref(database), "Rooms/" + roomCode + "/Userlist" + "/totalUsers")
  );
  let userIndex = snapshot.val() + 1;

  const postData = {
    username: yourUserName,
    userIndex: userIndex,
  };

  return update(
    ref(database, "/Rooms/" + roomCode + "/Userlist/" + yourUserName),
    postData
  );
}

export async function totalUsersInRoom(roomCode: number): Promise<void> {
  let newTotalUsers;

  const snapshot = await get(
    child(ref(database), "Rooms/" + roomCode + "/Userlist" + "/totalUsers")
  );
  if (snapshot.val() == null) {
    newTotalUsers = 1;
  } else {
    newTotalUsers = snapshot.val() + 1;
  }
  const postData = {
    totalUsers: newTotalUsers,
  };

  return update(ref(database, "Rooms/" + roomCode + "/Userlist/"), postData);
}

export async function addToApplerOrder(
  roomCode: number,
  yourUserName: string
): Promise<void> {
  let newTotalUsers;

  const snapshot = await get(
    child(ref(database), "Rooms/" + roomCode + "/Userlist" + "/totalUsers")
  );
  if (snapshot.val() == null) {
    newTotalUsers = 1;
  } else {
    newTotalUsers = snapshot.val() + 1;
  }
  const postData = {
    yourUserName: newTotalUsers,
  };

  return update(
    ref(database, "Rooms/" + roomCode + "/Userlist/" + "ApplerOrder"),
    postData
  );
}

export async function getUserList(roomCode: number): Promise<string[]> {
  const snapshot = await get(
    child(ref(database), "Rooms/" + roomCode + "/Userlist/")
  );
  console.log(snapshot.val());
  return [snapshot.val()]; //Needs adjustment
}

export async function uploadPrompt(
  roomCode: number,
  yourUserName: string,
  prompt: string
): Promise<void> {
  set(
    ref(
      database,
      "Rooms/" + roomCode + "/Userlist/" + yourUserName + "/" + prompt
    ),
    {
      x: "x",
    }
  );
}

export async function uploadImageURL(
  imageURL: string,
  yourUserName: string, //This is also the appler username
  roomCode: number,
  prompt: string
): Promise<void> {
  set(
    ref(
      database,
      "Rooms/" + roomCode + "/Userlist/" + yourUserName + "/" + prompt
    ),
    {
      imageUrl: imageURL,
      x: null,
    }
  );
}

export async function fetchApplerImageURL(
  roomCode: number,
  prompt: string
): Promise<string> {
  const snapshot = await get(
    child(
      ref(db),
      "Rooms/" + roomCode + "/Userlist/" + yourUserName + "/" + prompt
    )
  );
  console.log(snapshot.val().imageUrl);
  return snapshot.val().imageUrl;
}

export async function uploadCaption(
  caption: string,
  yourUserName: string,
  roomCode: number
): Promise<void> {
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
  roomCode: number
): Promise<{ caption: string; authorUserName: string }[]> {
  const snapshot = await get(
    child(ref(db), "Rooms/" + roomCode + "/" + applerUserName + "/Userlist")
  );
  return [snapshot.val()];
}

export async function vote(
  captionAuthor: string,
  roomCode: number
): Promise<void> {
  const snapshot = await get(
    child(
      ref(db),
      "Rooms/" +
        roomCode +
        "/" +
        applerUserName +
        "/Userlist/" +
        captionAuthor +
        "/" +
        caption
    )
  );
  let numVotes = snapshot.val().votes;
  let newNumVotes = 0;
  if (numVotes == null) {
    newNumVotes = 1;
  } else {
    newNumVotes = numVotes + 1;
  }
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
      votes: newNumVotes,
    }
  );
}

export async function fetchVoteList(
  roomCode: number
): Promise<{ playerUserName: string; caption: string; numVotes: number }[]> {
  const snapshot = await get(
    child(
      ref(db),
      "Rooms/" +
        roomCode +
        "/Round/" +
        applerUserName +
        "/" +
        prompt +
        "/captionList"
    )
  );
  console.log(snapshot.val());
  return [snapshot.val()]; //Needs adjustment
}

export async function nextRound(roomCode: number): Promise<void> {}

// A function that anyone in the room can call to start the game for all people in the lobby.
// Sets the started value in the round to true
export async function startRound(roomCode: number): Promise<void> {}

// Started round listener calls the callback function when a user in the game chooses to start the game in the Lobby.
// Checks if the started boolean is true
export async function startedRoundListener(
  roomCode: number,
  callBack: () => void
): Promise<void> {}

// Calls a call back with a list of users everytime a new user enters the lobby
// Checks if the userlist changes
export async function userListChangedListener(
  roomCode: number,
  callBack: () => void
): Promise<void> {}

// Calls a call back function when everyone in the lobby has generated an image
// Evertime the round object is changed, checks if the number of people who gnerated an image = the number of people in the lobby
export async function everyoneGeneratedAnImageListener(
  roomCode: number,
  callBack: () => void
): Promise<void> {
  // onValue(round reference is changed,(the state of the database)=>{
  //   if(our coditions are met){
  //     callBack();
  //   }
  // })
}

export async function tempStartGame(roomCode: number): Promise<void> {
  set(ref(database, "Rooms/" + roomCode), {
    started: true,
  });
}

export async function resetRoom(roomCode: number): Promise<void> {
  set(ref(database, "Rooms/" + roomCode), {
    started: false,
  });
}
// Calls a call back function when everyone in the lobby has generated an caption for a specfic appler.
// Evertime the round object is changed, Checks if the number of people that filled a caption for a given appler = the number of people in the lobby -1
export async function everyoneCreatedACaptionListener(
  roomCode: number,
  applerUsername: string,
  callBack: () => void
): Promise<void> {}

// Calls a call back function when everyone in the lobby has cast a vote for a specific caption.
// Evertime the round object is changed, Checks if the number of people that filled a voted for all captions under a given appler = the number of people in the lobby
export async function everyoneCastAVoteListener(
  roomCode: number,
  applerUsername: string,
  callBack: () => void
): Promise<void> {}

//Go through Userlist and assign index # by time stamp of users

//checks if the next round number was increased by 1
export async function nextRoundHasBeenClicked(
  roomCode: number,
  callBack: () => void
) {}
