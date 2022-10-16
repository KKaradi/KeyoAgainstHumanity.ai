import { getDatabase, ref, set, update, get, child, Database } from "firebase/database"

import { initializeApp } from "firebase/app";

const firebaseConfig = {
};

// Initialize Firebase
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
  callBack: () => {}
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
