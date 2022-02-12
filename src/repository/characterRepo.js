import { CHARACTER_INFO } from './data/characters.js';

export default class CharacterRepository {

  characters() {
    return CHARACTER_INFO.get()
  }
  
  character(characterID) {
    return CHARACTER_INFO.get(characterID)
  }

  name(characterID, lang) {
    return CHARACTER_INFO.get(characterID).get('name').get(lang)
  }

  stage(characterID) {
    return CHARACTER_INFO.get(characterID).get('stage')
  }

  introduction(characterID, lang) {
    return CHARACTER_INFO.get(characterID).get('intro').get(lang)
  }

  academy(characterID) {
    return CHARACTER_INFO.get(characterID).get('academy')
  }
}
