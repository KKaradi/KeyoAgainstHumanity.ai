import {
  getDatabase,
  ref,
  set,
  update,
  get,
  child,
  push,
  onValue,
  remove,
  off,
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

export async function getApplerForRound(roomCode: number): Promise<string> {
  const gameData = await get(
    child(ref(database), "Rooms/" + roomCode + "/Game/")
  );
  const roundNumData: number = (await gameData.val()).roundCounter;

  const userListData = await get(
    child(ref(database), "Rooms/" + roomCode + "/Userlist/")
  );

  const applerList: string[] = [];
  let applerName: string;

  userListData.forEach((childSnapshot) => {
    if (childSnapshot.val() != null) {
      applerList.push(childSnapshot.val().username);
    }
  });

  applerName = applerList[roundNumData];
  return applerName;
}

export async function createRoom(roomCode: number): Promise<void> {
  await set(ref(database, "Rooms/" + roomCode), {
    roomCode: roomCode,
    started: false,
    everyoneWent: false
  });

  await set(ref(database, "Rooms/" + roomCode + "/Game"), {
    roundCounter: 0,
  });
}
export async function joinRoom(
  yourUserName: string,
  roomCode: number
): Promise<void> {
  const userListRef = push(ref(database, "Rooms/" + roomCode + "/Userlist/"));
  await set(userListRef, {
    username: yourUserName,
  });

  const dataToFirebase = {
    username: yourUserName,
  };

  return update(
    ref(database, "Rooms/" + roomCode + "/Game/" + yourUserName),
    dataToFirebase
  );
}

//Return userlist called whenever userlist in changed; to be displayed in lobby page
export async function getUserList(roomCode: number): Promise<string[]> {
  const userList: string[] = [];
  const userListData = await get(
    child(ref(database), "Rooms/" + roomCode + "/Userlist/")
  );
  userListData.forEach((childSnapshot) => {
    userList.push(childSnapshot.val().username);
  });
  return userList;
}

//Uploads the prompt under your username when the submit button is clicked in generate image
export async function uploadPrompt(
  roomCode: number,
  yourUserName: string,
  prompt: string
): Promise<void> {
  const dataToFirebase = {
    prompt: prompt,
  };

  return update(
    ref(database, "Rooms/" + roomCode + "/Game/" + yourUserName),
    dataToFirebase
  );
}

//Uploads image Url under your username whenever the image is generated
export async function uploadImageURL(
  imageURL: string,
  yourUserName: string,
  roomCode: number
): Promise<void> {
  const dataToFirebase = {
    imageUrl: imageURL,
  };

  return update(
    ref(database, "Rooms/" + roomCode + "/Game/" + yourUserName),
    dataToFirebase
  );
}

//Returns an image URL every time the appler is changed, during the caption creation, and during voting
export async function fetchApplerImageURL(roomCode: number): Promise<string> {
  const applerUsername = await getApplerForRound(roomCode);

  const applerData = await get(
    child(ref(database), "Rooms/" + roomCode + "/Game/" + applerUsername)
  );

  const imageURL = (await applerData.val()).imageUrl
  return imageURL;
}

export async function fetchUserImageURL(roomCode: number, username: string): Promise<string | undefined> {

  const userData = await get(
    child(ref(database), "Rooms/" + roomCode + "/Game/" + username)
  );

  const imageURL = (await userData.val())?.imageUrl ?? undefined
  return imageURL;
}

export async function fetchListOfImageURL(roomCode: number): Promise<string[]> {
  const gameData = await get(
    child(ref(database), "Rooms/" + roomCode + "/Game/")
  );

  const imageUrlList: string[] = [];
  gameData.forEach((childSnapshot) => {
    if (childSnapshot.val().imageUrl != null) {
      imageUrlList.push(childSnapshot.val().imageUrl);
    }
  });
  return imageUrlList;
}
//Under the caption object, add your user name and caption. Called in caption creation when button is pressed
export async function uploadCaption(
  caption: string,
  yourUserName: string,
  roomCode: number
): Promise<void> {
  const applerUsername = await getApplerForRound(roomCode);

  const dataToFirebase = {
    votes: 0,
    username: yourUserName,
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
        caption
    ),
    dataToFirebase
  );
}

//returns list of captions for one prompt under appler username called when going to vote page
//RETURNS A LIST OF CAPTIONS. NOT AN OBJECT WITH CAPTION_AUTHOR:CAPTION PAIRS
export async function fetchListOfCaptions(roomCode: number): Promise<string[]> {
  const applerUsername = await getApplerForRound(roomCode);
  const captionData = await get(
    child(
      ref(database),
      "Rooms/" + roomCode + "/Game/" + applerUsername + "/" + "Captions"
    )
  );

  const captionList: string[] = [];

  captionData.forEach((childSnapshot) => {
    if(typeof childSnapshot.key === "string"){
    captionList.push(childSnapshot.key);
    }
  });

  return captionList;
}

//Add 1 to Num Votes under a caption. Called every time someone clicks a vote button
export async function vote(
  caption: string,
  roomCode: number
): Promise<void> {
  const applerUsername = await getApplerForRound(roomCode);
  const captionData = await get(
    child(
      ref(database),
      "Rooms/" +
        roomCode +
        "/Game/" +
        applerUsername +
        "/" +
        "Captions/" +
        caption
    )
  );

  const votesForCaption = await captionData.val().votes;
  let newVotesForCaption = 0;

  if (votesForCaption === null) {
    newVotesForCaption = 1;
  } else {
    newVotesForCaption = votesForCaption + 1;
  }

  const dataToFirebase = {
    votes: newVotesForCaption,
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
        caption
    ),
    dataToFirebase
  );
}

export async function fetchCaptionVoteObject(
  roomCode: number
): Promise<{ [index: string]: number }> {
  const applerUsername = await getApplerForRound(roomCode);
  const captionData = await get(
    child(
      ref(database),
      "Rooms/" + roomCode + "/Game/" + applerUsername + "/" + "Captions"
    )
  );
  const captionVoteObject: { [index: string]: number } = {};
  captionData.forEach((childSnapshot) => {
    let caption: unknown;
    caption = childSnapshot.key;
    if (typeof caption === "string") {
      captionVoteObject[caption] = childSnapshot.val().votes;
    }
  });
  return captionVoteObject;
}

export async function fetchCaptionVoteUsernameObject(
  roomCode: number
): Promise<{ [index: string]: {[index: string]: number} }> {
  const applerUsername = await getApplerForRound(roomCode);
  const captionData = await get(
    child(
      ref(database),
      "Rooms/" + roomCode + "/Game/" + applerUsername + "/" + "Captions"
    )
  );
  let captionVoteObject: { [index: string]: {[index: string]: number} } = {};
  captionData.forEach((childSnapshot) => {
    let caption: unknown;
    caption = childSnapshot.key;
    if (typeof caption === "string") {
      captionVoteObject[caption] = {[childSnapshot.val().username]: childSnapshot.val().votes};
    }
  });
  return captionVoteObject;
}

export async function updateLeaderboard(
  roomCode: number,
  caption: string
): Promise<void> {
  const username = await fetchUsernameFromCaption(roomCode, caption)
  const captionVoteObject = await fetchCaptionVoteObject(roomCode)
  const totalVoteUsernameObj = await fetchLeaderboard(roomCode)
  const roundVotes = captionVoteObject.caption ?? 0
  const leaderboardVotes = totalVoteUsernameObj.username ?? 0
  const userVotes = roundVotes + leaderboardVotes

  const dataToFirebase = {
    points: userVotes
  };

if(typeof userVotes === "number"){
  return update(ref(database, "Rooms/" + roomCode + "/Leaderboard/" + username), dataToFirebase);
}
}

export async function fetchLeaderboard(roomCode: number): Promise<{ [index: string]: number }> {
  const leaderboardData = await get(
    child(
      ref(database),
      "Rooms/" + roomCode + "/Leaderboard/"
    )
  );
  let leaderboardObj: { [index: string]: number } = {};

  leaderboardData.forEach((childSnapshot) => {
    let username: unknown;
    username = childSnapshot.key;
    if (typeof username === "string") {
    leaderboardObj[username] = childSnapshot.val().points
    }
  });

  return leaderboardObj
}

export async function fetchTotalVotes(roomCode: number): Promise<number> {
  const applerUsername = await getApplerForRound(roomCode);
  const captionData = await get(
    child(
      ref(database),
      "Rooms/" + roomCode + "/Game/" + applerUsername + "/" + "Captions"
    )
  );
  let totalVotes = 0;
  captionData.forEach((childSnapshot) => {
    if(typeof childSnapshot === undefined){
    }else{
    totalVotes = totalVotes + childSnapshot.val().votes;
    }
  });
  return totalVotes;
}

export async function nextRound(roomCode: number): Promise<void> {
  const roundNumData = await get(
    child(ref(database), "Rooms/" + roomCode + "/Game" + "/roundCounter")
  );

  const newRoundNum = (await roundNumData.val()) + 1;

  const dataToFirebase = {
    roundCounter: newRoundNum,
  };

  return update(ref(database, "Rooms/" + roomCode + "/Game"), dataToFirebase);
}

// A function that anyone in the room can call to start the game for all people in the lobby.
// Sets the started value in the round to true
export async function startGame(roomCode: number): Promise<void> {
  const dataToFirebase = {
    started: true,
  };

  return update(ref(database, "Rooms/" + roomCode), dataToFirebase);
}

export async function startedGameListener(
  roomCode: number,
  callBack: () => void
): Promise<void> {
  onValue(ref(database, "Rooms/" + roomCode), async (snapshot) => {
    const startedData = await snapshot.val().started;
    if (startedData === true) {
      console.log('callback')
      callBack();
      off(ref(database, "Rooms/" + roomCode), "value", undefined);
    }
  });
}

// Calls a call back with a list of users everytime a new user enters the lobby
// Checks if the userlist changes
export async function userListChangedListener(
  roomCode: number,
  callBack: ([]: string[]) => void
): Promise<void> {
  onValue(ref(database, "Rooms/" + roomCode + "/Userlist"), async () => {
    const userList = await getUserList(roomCode);
    callBack(userList);
  });
}

// Calls a call back function when everyone in the lobby has generated an image
// Evertime the round object is changed, checks if the number of people who gnerated an image = the number of people in the lobby
export async function everyoneGeneratedAnImageListener(
  roomCode: number,
  callBack: () => void
): Promise<void> {
  onValue(ref(database, "Rooms/" + roomCode + "/Game/"), async () => {
    const userListLength = (await getUserList(roomCode)).length;
    const imageUrlListLength = (await fetchListOfImageURL(roomCode)).length;

    if (userListLength === imageUrlListLength && userListLength != undefined && imageUrlListLength != undefined) {
      callBack();
      off(ref(database, "Rooms/" + roomCode + "/Game/"), "value", undefined);
    }
  });
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export async function resetRoom(roomCode: number): Promise<void> {
  remove(ref(database, "Rooms/" + roomCode));
}

// Calls a call back function when everyone in the lobby has generated an caption for a specfic appler.
// Evertime the round object is changed, Checks if the number of people that filled a caption for a given appler = the number of people in the lobby -1
export async function everyoneCreatedACaptionListener(
  roomCode: number,
  callBack: () => void
): Promise<void> {
  onValue(ref(database, "Rooms/" + roomCode + "/Game/"), async () => {
    const userListLength = (await getUserList(roomCode)).length;

    const captionListLength = (await fetchListOfCaptions(roomCode)).length;

    if (userListLength - 1 === captionListLength) {
      // -1 because the appler doesn't caption
      callBack();
    }
  });
}

// Calls a call back function when everyone in the lobby has cast a vote for a specific caption.
// Evertime the round object is changed, Checks if the number of people that filled a voted for all captions under a given appler = the number of people in the lobby
export async function everyoneCastAVoteListener(
  roomCode: number,
  callBack: () => void
): Promise<void> {
  onValue(ref(database, "Rooms/" + roomCode + "/Game/"), async () => {
    const userListLength = (await getUserList(roomCode)).length;
    const totalVotes = await fetchTotalVotes(roomCode);

    if (userListLength === totalVotes) {
      callBack();
      off(ref(database, "Rooms/" + roomCode + "/Game/"), "value", undefined)
    }
  });
}

//checks if the next round number was increased by 1
export async function nextRoundHasBeenClicked(
  roomCode: number,
  callBack: (roundNum: Number, UserListLength: Number) => void
) {

  const roundCounterRef = await get(ref(database, "Rooms/" + roomCode + "/Game" + "/roundCounter"))
  let roundNum = (await roundCounterRef.val())

  onValue(
    ref(database, "Rooms/" + roomCode + "/Game" + "/roundCounter"),
    async (snapshot) => {

      let userListLength = (await getUserList(roomCode))?.length ?? undefined;

      if(snapshot.val() === roundNum + 1 && snapshot.val() != undefined && userListLength != undefined){
        roundNum = snapshot.val()
        callBack(roundNum, userListLength);
        off(ref(database, "Rooms/" + roomCode + "/Game" + "/roundCounter"), "value", undefined);
      }
    }
  );
}

export async function returnUserListAndRoundNum(
  roomCode: number
): Promise<string> {
  const roundCounterRef = await get(ref(database, "Rooms/" + roomCode + "/Game" + "/roundCounter"))
  let roundNum = roundCounterRef.val()

  let userListLength = (await getUserList(roomCode))?.length ?? undefined;

  if(roundNum + 1 >= userListLength && roundNum != undefined && userListLength != undefined){
    return('reset')
  }else{
    return('no reset')
  }
}

export async function everyoneWentListener(
  roomCode: number,
  callBack: () => void
): Promise<void> {
  onValue(ref(database, "Rooms/" + roomCode), async (snapshot) => {
    const everyoneWentData:boolean = (await snapshot.val()).everyoneWent;
    console.log(everyoneWentData)
    if (everyoneWentData === true) {
      callBack()
      off(ref(database, "Rooms/" + roomCode), "value", undefined)
    }
  });
}

export async function endSessionClicked(roomCode: number): Promise<void> {
  const dataToFirebase = {
    everyoneWent: true
  };

  return update(ref(database, "Rooms/" + roomCode), dataToFirebase);
}

export async function fetchUsernameFromCaption(roomCode: number, caption: string): Promise<string> {
  const applerUsername = await getApplerForRound(roomCode);
  const captionData = await get(ref(database, "Rooms/" + roomCode + "/Game/" + applerUsername + "/Captions/" + caption))
  const username = (await captionData.val())?.username ?? undefined

  return (username);
}