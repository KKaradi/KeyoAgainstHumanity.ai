import {
  getDatabase,
  ref,
  set,
  update,
  get,
  child,
  onChildChanged,
  push,
  onValue,
} from "firebase/database";


import { initializeApp } from "firebase/app";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_AUTH_DOMAIN;
const databaseURL = process.env.NEXT_PUBLIC_DATABASE_URL;
const projectID = process.env.NEXT_PUBLIC_PROJECT_ID;
const storagebucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
   databaseURL: databaseURL,
   projectId: projectID,
   storageBucket: storagebucket,
   messagingSenderId: messagingSenderId,
 };

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const db = getDatabase(app);

export async function getApplerUsername(roomCode: number): Promise<any> {
  const snapshot1 = await get(
    child(ref(database), "Rooms/" + roomCode + "/Game/")
  );
  const roundNum = snapshot1.val().roundCounter;
  console.log(roundNum);

  const snapshot2 = await get(
    child(ref(database), "Rooms/" + roomCode + "/Userlist/")
  );

  let applerList: any[] = [];
  let applerName;

  snapshot2.forEach((childSnapshot) => {
    console.log(childSnapshot.val());
    if (childSnapshot.val() != null) {
      applerList.push(childSnapshot.val().username);
    }
  });

  applerName = applerList[roundNum];
  console.log(applerName);
  return applerName;
}

export async function createRoom(roomCode: number): Promise<void> {
  //write this method
  //add a room object, set started to false
  set(ref(database, "Rooms/" + roomCode), {
    roomCode: roomCode,
    started: false,
  });
  const snapshot = await get(
    child(
      ref(database),
      "Rooms/" +
        roomCode
    )
  );

  set(ref(db, "Rooms/" + roomCode + "/Game"), {
    roundCounter: 0,
  });
}
export async function joinRoom(
  yourUserName: string,
  roomCode: number
): Promise<void> {
  userListWithPush(roomCode, yourUserName);
  addToRoundOrder(roomCode, yourUserName);
}

export async function userListWithPush(
  roomCode: number,
  yourUserName: string
): Promise<void> {
  const ref2 = push(ref(database, "Rooms/" + roomCode + "/Userlist/"));
  set(ref2, {
    username: yourUserName,
  });
}

export async function addToRoundOrder(
  roomCode: number,
  yourUserName: string
): Promise<void> {
  const postData = {
    x: "x",
  };

  return update(
    ref(database, "Rooms/" + roomCode + "/Game/" + yourUserName),
    postData
  );
}

//Return userlist called whenever userlist in changed (onValue) to be displayed in lobby page
export async function getUserList(roomCode: number): Promise<string[]> {
  let UserList: string[] = [];
  const snapshot = await get(
    child(ref(database), "Rooms/" + roomCode + "/GameUserlist")
  );
  snapshot.forEach((childSnapshot) => {
    UserList.push(childSnapshot.val().GameUserList);
  });
  console.log(UserList);
  return UserList; //Needs adjustment
}

//Uploads the prompt under your username when the submit button is clicked in generate image
export async function uploadPrompt(
  roomCode: number,
  yourUserName: string,
  prompt: string,
): Promise<void> {
  const postData = {
    prompt: prompt,
  };

  return update(
    ref(database, "Rooms/" + roomCode + "/Game/" + yourUserName),
    postData
  );
}

//Uploads image Url under your username whenever the image is generated
export async function uploadImageURL(
  imageURL: string,
  yourUserName: string, //This is also the appler username
  roomCode: number,
): Promise<void> {
  const postData = {
    imageUrl: imageURL,
    x: null,
  };

  return update(
    ref(database, "Rooms/" + roomCode + "/Game/" + yourUserName),
    postData
  );
}

//Returns an image URL every time the appler is changed, during the caption creation, and during voting
export async function fetchApplerImageURL(roomCode: number): Promise<string> {
  const applerUsername = await getApplerUsername(roomCode);
  const snapshot = await get(
    child(ref(database), "Rooms/" + roomCode + "/Round/" + "ApplerNameOrRoundNum" + "/" + prompt)
  );
  console.log(snapshot.val().imageUrl);
  return snapshot.val().imageUrl;
}

//Under the caption object, add your user name and caption. Called in caption creation when button is pressed
export async function uploadCaption(
  caption: string,
  yourUserName: string,
  roomCode: number,
  applerUsername:string
): Promise<void> {
  //const applerUsername = await getApplerUsername(roomCode);

  const postData = {
    votes: 0,
    caption: caption,
  };

  return update(
    ref(
      database,
      "Rooms/" +
        roomCode +
        "/" +
        "Game/" +
        applerUsername +
        "/" +
        "Captions" +
        "/" +
        yourUserName
    ),
    postData
  );
}

//returns list of captions for one prompt under appler username called when going to vote page
//RETURNS A LIST OF CAPTIONS. NOT AN OBJECT WITH CAPTION_AUTHOR:CAPTION PAIRS
export async function fetchListOfCaptions(
  roomCode: number,
  roundNum: number
  //): Promise<{ caption: string; authorUserName: string }[]> {
): Promise<any[]> {
  const applerUsername = await getApplerUsername(roomCode);
  const snapshot = await get(
    child(
      ref(db),
      "Rooms/" + roomCode + "/Game/" + applerUsername + "/" + "Captions"
    )
  );

  let captionList: string[] = [];
  snapshot.forEach((childSnapshot) => {
    captionList.push(childSnapshot.val().caption);
  });
  console.log(captionList);
  return [captionList];
}

//Add 1 to Num Votes under a caption. Called every time someone clicks a vote button
export async function vote(
  captionAuthor: string,
  roomCode: number
): Promise<void> {
  const applerUsername = await getApplerUsername(roomCode);
  const snapshot = await get(
    child(
      ref(database),
      "Rooms/" +
        roomCode +
        "/Game/" +
        applerUsername +
        "/" +
        "Captions/" +
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

  const postData = {
    votes: newNumVotes,
  };

  return update(
    ref(
      database,
      "Rooms/" +
        roomCode +
        "/Game/" +
        applerUsername +
        "/" +
        "Captions/" +
        captionAuthor
    ),
    postData
  );
}

//
export async function fetchVoteList(
  roomCode: number
): Promise<{ caption: string; numVotes: number }[]> {
  const applerUsername = await getApplerUsername(roomCode);
  const snapshot = await get(
    child(
      ref(db),
      "Rooms/" + roomCode + "/Game/" + applerUsername + "/" + "Captions"
    )
  );
  let voteList: any = {};
  snapshot.forEach((childSnapshot) => {
    let caption = childSnapshot.val().caption;
    voteList[caption] = childSnapshot.val().votes;
  });
  console.log(voteList);
  return [voteList]; //Needs adjustment
}

export async function nextRound(roomCode: number): Promise<void> {
  const snapshot = await get(
    child(ref(db), "Rooms/" + roomCode + "/Game" + "/roundCounter")
  );

  console.log(snapshot.val() + 1);
  let newRoundNum = snapshot.val() + 1;

  const postData = {
    roundCounter: newRoundNum,
  };

  return update(ref(database, "Rooms/" + roomCode + "/Game"), postData);
}

// A function that anyone in the room can call to start the game for all people in the lobby.
// Sets the started value in the round to true
export async function startRound(roomCode: number): Promise<void> {
  const postData = {
    started: true,
  };

  return update(ref(database, "Rooms/" + roomCode), postData);
}

export async function startedGameListener(
  roomCode: number
  //callBack: () => void
): Promise<void> {
  const userListRef = ref(database, "Rooms/" + roomCode);
  onValue(userListRef, (snapshot) => {
    const data = snapshot.val().started;
    console.log(data);
  });
}

// Calls a call back with a list of users everytime a new user enters the lobby
// Checks if the userlist changes
export async function userListChangedListener(
  roomCode: number,
  callBack: () => void): 
  Promise<void> { 
    const userListRef = ref(database, 'Rooms/' + roomCode);
      onValue(userListRef, async (snapshot) => {
        
        const UserListAmount=getUserList(roomCode)
        let listLength = 8 //(await UserListAmount).length
  
        const data = snapshot.val().GameUserlist;

        let lobbyMax = 8
        if ( listLength != lobbyMax) 
          (console.log(data, listLength, "there are (is) "+ listLength +" user(s), less then the lobby max of "+ lobbyMax +". Staying.")
        )
        if (listLength == lobbyMax) {
        callBack()
        console.log("There is the Lobby Max amount of users. Moving");
        }
     }
  );  
  }
    
  
 

export async function tempGameUserList(roomCode: number, yourUserName: string,): Promise<void> {

  const userListRef = push(ref(database, "Rooms/" + roomCode + "/GameUserlist"))
  update(userListRef, {
    username: yourUserName
  })
}

export async function tempReset(roomCode:number) {
  set(ref(database, "Rooms/" + roomCode), {
    started: false
  })
}

// Calls a call back function when everyone in the lobby has generated an image
// Evertime the round object is changed, checks if the number of people who gnerated an image = the number of people in the lobby
export async function everyoneGeneratedAnImageListener(
  roomCode: number,
  applerUserName: string,
  callBack: () => {}
): Promise<{userList:string}[]> { 
  const userListRef = ref(database, 'Rooms/' + roomCode + "Game/");
    onValue(userListRef, async (snapshot) => {
      
      const imageListAmount = tempGetUserImageList(roomCode, applerUserName)
      let listLength = (await imageListAmount).length - 1 //subtract 1 because of roundCounter

      const data = snapshot.val();
      let lobbyMax = 8
      if ( listLength != lobbyMax) 
        (console.log(data, listLength, "there are (is) "+ listLength +" image(s), less then the lobby max of "+ lobbyMax +". Staying.")
      )

      if ( listLength == lobbyMax) {
       callBack()
       console.log(data, listLength, "there is "+ listLength + " images, the lobby Max (temp, testing to ensure lobbyMax = the lobby max "+ lobbyMax +"). Moving past stage.") 
      } 
   }
); return[]
}

export async function tempGetUserImageList(roomCode: number, applerUserName: string): Promise<string[]> {
  let ImageList: string[] = [];
  //const applerUserName = getApplerUsername(roomCode)
  const snapshot = await get(
    child(ref(database), "Rooms/" + roomCode + "/Game/")
  );
  snapshot.forEach((childSnapshot) => {
    ImageList.push(childSnapshot.val().GameUserList);
  });
  console.log(ImageList);
  return ImageList; //Needs adjustment
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
  callBack: () => void): 
  Promise<void> { 
  const userListRef = ref(database, 'Rooms/' + roomCode + "/Game/" + applerUsername + "/Captions");
    onValue(userListRef, async (snapshot) => {
      
      const UserListAmount=getUserList(roomCode)
      let listLength = (await UserListAmount).length

      const data = snapshot.val();
      let lobbyMax = 8
      if ( listLength != lobbyMax) 
        (console.log(data, listLength, "there are (is) "+ listLength +" vote(s), less then the lobby max of " + lobbyMax + ". Staying.")
      )

      if ( listLength == lobbyMax) (
       callBack
      )
    }
  );
}


export async function blah(
  roomCode: number,
  callBack: () => void): 
  Promise<void> { 
    const userListRef = ref(database, 'Rooms/' + roomCode);
      onValue(userListRef, async (snapshot) => {
        
        const UserListAmount=getUserList(roomCode)
        let listLength = 8 //(await UserListAmount).length
  
        const data = snapshot.val().GameUserlist;

        let lobbyMax = 8
        if ( listLength != lobbyMax) 
          (console.log(data, listLength, "there are (is) "+ listLength +" user(s), less then the lobby max of "+ lobbyMax +". Staying.")
        )
        if (listLength == lobbyMax) {
        callBack;
        console.log("There is the Lobby Max amount of users. Moving");
        }
     }
  );  
  }

//Go through Userlist and assign index # by time stamp of users

//checks if the next round number was increased by 1
export async function nextRoundHasBeenClicked(
  roomCode: number,
  callBack: () => void
) {}

export async function tempMoveRoomPlaceholder():Promise<any> {
 console.log('The userlist has been logged and analyzed.'); 
}