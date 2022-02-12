import { RANDOM_TEXTS, RANDOM_CONVERSATION } from './data/scripts.js';

export default class ScriptRepository {

  characterThinking(characterID, lang) {
    return RANDOM_TEXTS.get(characterID).get(lang)
  }

  dialogues(mainCharacterID, subCharacterID, type, lang) {
    return RANDOM_CONVERSATION.get(mainCharacterID).get(subCharacterID).get(type).get(lang)
  }
}
