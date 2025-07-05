// Custom hooks
import userDataClient from '../clients/userDataClient.js';


// Local constants
const client = userDataClient;
const endpoint = 'characterPossessions';

const characterPossessionsService = {
  createCharacterPossession: (characterPossession, signal) => client.post(endpoint, characterPossession, {signal})
}

export default characterPossessionsService;