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
