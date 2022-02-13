import * as ids from './data/ids.js';

export default class KeyRepository {

  /**
   * Languages
   * 
   */
  kr() {
    return ids.LANG_KR
  }

  en() {
    return ids.LANG_EN
  }

  jp() {
    return ids.LANG_JP
  }

  /**
   * Academies
   * 
   */

  yurigaoka() {
    return ids.ACADEMY_YURIGAOKA
  }

  ludovic() {
    return ids.ACADEMY_LUDOVIC
  }


  /**
   * Character IDs
   * 
   */
  mainCharacterIDs() {
    return ids.MAIN_CHARACTER_IDS
  }

  raimuID() {
    return ids.CHARACTER_RAIMU_ID
  }

  maiID() {
    return ids.CHARACTER_MAI_ID
  }

  sachieID() {
    return ids.CHARACTER_SACHIE_ID
  }
}
