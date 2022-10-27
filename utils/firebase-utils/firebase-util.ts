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

export async function uploadCaption(
  caption: string,
  yourUserName: string,
  roomCode: number
): Promise<void> {}

export async function fetchListOfCaptions(
  appleryourUserName: string,
  roomCode: number
): Promise<{ caption: string; authoryourUserName: string }[]> {
  return [];
}

export async function vote(
  appleryourUserName: string,
  captionAuthor: string,
  roomCode: number
): Promise<void> {}

export async function fetchVoteList(
  roomCode: number,
  appleryourUserName: string
): Promise<
  { playeryourUserName: string; caption: string; numVotes: number }[]
> {
  return [];
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
  callBack: (userList: string[]) => void
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
