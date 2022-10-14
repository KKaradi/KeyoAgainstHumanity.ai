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
  onChildChanged,
  onValue,
} from "firebase/database";


import { initializeApp } from "firebase/app";

const firebaseConfig = {
  //PUT FIREBASE CONFIG HERE
  apiKey: "AIzaSyBC8r_HKc8SqQcyPTZ6eaiLk7eqG8HUm7o",
  authDomain: "keyo-against-humanity-d9a9d.firebaseapp.com",
   databaseURL: "https://keyo-against-humanity-d9a9d-default-rtdb.firebaseio.com",
   projectId: "keyo-against-humanity-d9a9d",
   storageBucket: "keyo-against-humanity-d9a9d.appspot.com",
   messagingSenderId: "1021364487504",
   appId: "1:1021364487504:web:4adf75a7c6c43c766cd855",
 };

    const app = initializeApp(firebaseConfig)
    const database = getDatabase(app);


export async function createRoom(roomCode: number): Promise<void> {
  //write this method
  //add a room object, set started to false
  set(ref(database, "Rooms/" + roomCode), {
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
  roundNum: number
): Promise<string> {
  const snapshot = await get(
    child(
      ref(database),
      "Rooms/" + roomCode + "/Round/" + roundNum + "/" + prompt
    )
  );
  console.log(snapshot.val().imageUrl);
  return snapshot.val().imageUrl;
}

export async function uploadCaption(
  caption: string,
  yourUserName: string,
  roomCode: number,
  roundNum: number
): Promise<void> {
  set(
    ref(
      database,
      "Rooms/" +
        roomCode +
        "/Round/" +
        roundNum +
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
  roomCode: number,
  roundNum: number
): Promise<{ caption: string; authorUserName: string }[]> {
  const snapshot = await get(
    child(ref(database), "Rooms/" + roomCode + "/" + roundNum + "/Userlist")
  );
  return [snapshot.val()];
}

export async function vote(
  captionAuthor: string,
  roomCode: number
): Promise<void> {
  const snapshot = await get(
    child(
      ref(database),
      "Rooms/" +
        roomCode +
        "/Userlist/" +
        captionAuthor +
        "/" 
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
        "/Userlist/" +
        captionAuthor
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
      ref(database),
      "Rooms/" +
        roomCode +
        "/Round/" +
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
): Promise<void> { 
  const snapshot = await get(
    child(
      ref(database),
      "Rooms/" +
        roomCode
    )
  );
      console.log(snapshot.val())
      if ( snapshot.val() == true) (
       callBack
      )
}

// Calls a call back with a list of users everytime a new user enters the lobby
// Checks if the userlist changes
export async function userListChangedListener(
  roomCode: number,
  //callBack: () => void
): Promise<void> { 
  const userListRef = ref(database, 'Rooms/' + roomCode);
    onValue(userListRef, (snapshot) => {
      const data = snapshot.val().started;
      /*const snapshot = await get(
        child(
          ref(database),
          "Rooms/" +
            "Userlist"
       )
      );*/
      console.log(data, "this is under 8")
      let lobbyMax = 8
      if ( data == lobbyMax) (
       //callBack
       console.log(data, "this is at 8")
      )   
   }
)}
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
