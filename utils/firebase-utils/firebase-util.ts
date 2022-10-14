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
  push,
  onValue
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

export async function getApplerUsername(roomCode:number): Promise<string[]> {
  const snapshot1 = await get(
    child(ref(database), "Rooms/" + roomCode + "/Game/")
  );
  console.log(snapshot1.val().roundCounter);
  const roundNum = snapshot1.val().roundCounter
  const snapshot2 = await get(
    child(ref(database), "Rooms/" + roomCode + "/Userlist/")
  );
  let counter = 0
  let applerName;
  snapshot2.forEach((childSnapshot) => {
    if(counter == roundNum){
      applerName = childSnapshot.val()
    }else{
    counter = counter + 1
    }
  })
  console.log(applerName);
  return [snapshot1.val().roundCounter]; //Needs adjustment
}


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
  userListWithPush(roomCode, yourUserName);
  addToRoundOrder(roomCode, yourUserName);
  const snapshot = await get(
    child(ref(database), "Rooms/" + roomCode + "/Userlist" + "/totalUsers")
  );
  let userIndex = snapshot.val() + 1;
  }
export async function userListWithPush(roomCode: number, yourUserName: string,): Promise<void> {
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
    username: yourUserName
  };
  const ref2 = push(ref(database, "Rooms/" + roomCode + "/Userlist/"))
  set(ref2, {
    username: yourUserName
  })
}

export async function addToRoundOrder(
  roomCode: number,
  yourUserName: string
): Promise<void> {
  // let newTotalUsers;

  // const snapshot = await get(
  //   child(ref(database), "Rooms/" + roomCode + "/Userlist" + "/totalUsers")
  // );
  // if (snapshot.val() == null) {
  //   newTotalUsers = 1;
  // } else {
  //   newTotalUsers = snapshot.val() + 1;
  // }
  const postData = {
  x:'x'
 };

 return update(
  ref(database, "Rooms/" + roomCode + "/Game/" + yourUserName),
   postData
);
  }

//Return userlist called whenever userlist in changed (onValue) to be displayed in lobby page
export async function getUserList(roomCode: number): Promise<string[]> {
  const snapshot = await get(
    child(ref(database), "Rooms/" + roomCode + "/Userlist/")
  );
  console.log(snapshot.val());
  return [snapshot.val()]; //Needs adjustment
}

//Uploads the prompt under your username when the submit button is clicked in generate image
export async function uploadPrompt(
  roomCode: number,
  yourUserName: string,
  prompt: string
): Promise<void> {
  const postData = {
    x: "x"
  };

  return update(ref(database,"Rooms/" + roomCode + "/Game/" + yourUserName + "/" + prompt), postData);
}

//Uploads image Url under your username whenever the image is generated
export async function uploadImageURL(
  imageURL: string,
  yourUserName: string, //This is also the appler username
  roomCode: number,
  prompt: string
): Promise<void> {
  const postData = {
    imageUrl: imageURL,
      x: null,
  };

  return update(ref(database,"Rooms/" + roomCode + "/Userlist/" + yourUserName + "/" + prompt), postData)
}

//Returns an image URL every time the appler is changed, during the caption creation, and during voting
export async function fetchApplerImageURL(
  roomCode: number,
  prompt: string
): Promise<string> {
  const applerUsername = await getApplerUsername(roomCode)
  const snapshot = await get(
    child(
      ref(db),
      "Rooms/" + roomCode + "/Game/" + applerUsername
    )
  );
  console.log(snapshot.val().imageUrl);
  return snapshot.val().imageUrl;
}

//Under the caption object, add your user name and caption. Called in caption creation when button is pressed
export async function uploadCaption(
  caption: string,
  yourUserName: string,
  roomCode: number,
  prompt: string
): Promise<void> {

  const applerUsername = await getApplerUsername(roomCode)
  
  const postData = {
    votes: 0,
  };

  return update(ref(
    database,
    "Rooms/" +
      roomCode +
      "/" +
      "Game/" +
      applerUsername +
      '/' +
      prompt +
      '/' +
      yourUserName +
      "/" +
      caption
  ), postData)
}

//returns list of captions for one prompt under appler username called when going to vote page
export async function fetchListOfCaptions(
  roomCode: number
): Promise<{ caption: string; authorUserName: string }[]> {
  const applerUsername = await getApplerUsername(roomCode)
  const snapshot = await get(
    child(ref(db), "Rooms/" +
    roomCode +
    "/Game/" +
    applerUsername +
    "/" + 
    "captions")
  );
  return [snapshot.val()];
}

//Add 1 to Num Votes under a caption. Called every time someone clicks a vote button
export async function vote(
  captionAuthor: string,
  roomCode: number
): Promise<void> {
  const applerUsername = await getApplerUsername(roomCode)
  const snapshot = await get(
    child(
      ref(db),
      "Rooms/" +
        roomCode +
        "/Game/" +
        applerUsername +
        "/" + 
        "captions/" +
        captionAuthor
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
        "/Game/" +
        applerUsername +
        "/" + 
        "captions/" +
        captionAuthor
    ),
    {
      votes: newNumVotes,
    }
  );
}

//
export async function fetchVoteList(
  roomCode: number
): Promise<{ playerUserName: string; caption: string; numVotes: number }[]> {
  const applerUsername = await getApplerUsername(roomCode)
  const snapshot = await get(
    child(
      ref(db),
      "Rooms/" +
        roomCode +
        "/Game/" +
        applerUsername +
        "/" + 
        "captions"
    )
  );
  console.log(snapshot.val());
  return [snapshot.val()]; //Needs adjustment
}

export async function nextRound(roomCode: number): Promise<void> {}

// A function that anyone in the room can call to start the game for all people in the lobby.
// Sets the started value in the round to true
export async function startRound(
  roomCode: number
  ): Promise<void> {
      const postData = {
        roomCode: roomCode,
        started: true, 
       };
      
       return update(
        ref(database, "Rooms/" + roomCode),
        postData
      );
    }


    export async function startedGameListener(
      roomCode: number,
      //callBack: () => void
    ): Promise<void> { 
      const userListRef = ref(database, 'Rooms/' + roomCode);
        onValue(userListRef, (snapshot) => {
          const data = snapshot.val().started;
          console.log(data)
       }
    )}

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
