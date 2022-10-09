import {
  uploadCaption,
  fetchListOfCaptions,
  vote,
  fetchVoteList,
  createRoom,
  resetRoom,
  tempStartGame,
} from '../../utils/firebase-utils/firebase-util'

//createRoom(11111)
uploadCaption('Bobby', 'Monke runs around', 'Rancore', 11111)
uploadCaption('Bobby', 'Monke dies', 'Jackson', 11111)
console.log(fetchListOfCaptions('Bobby', 11111))
vote('Bobby', 'Jackson', 11111, 'Monke dies')
fetchVoteList(11111, 'Bobby')
//tempStartGame(11111)
//resetRoom(11111)
