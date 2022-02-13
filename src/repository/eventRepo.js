import { PROBABILITIES, CHARACTER_EVENT_LIST } from './data/events.js';

export default class EventRepository {

  probabilites() {
    return PROBABILITIES
  }

  characterEvents(characterID) {
    return CHARACTER_EVENT_LIST.get(characterID)
  }
}
