import { HAND_BOOK_MENUS, ACADEMY_INFO, INFORMATION, TEXT_MAX_LENGTH } from './data/multilingual.js';

export default class TranslaterRepository {

  /**
   * Menu
   * 
   */
  menus() {
    return HAND_BOOK_MENUS
  }

  translatedMenu(id, lang) {
    return HAND_BOOK_MENUS.get(id).get(lang)
  }

  /**
   * Academy
   * 
   */
  motto(academyID, lang) {
    return ACADEMY_INFO.get(academyID).get('motto').get(lang)
  }


  /**
   * Informations
   * 
   */
  mainInfo(lang) {
    return INFORMATION.get(lang).get('main_info')
  }

  toDoAlert(lang) {
    return INFORMATION.get(lang).get('todo_alert')
  }

  toDoLine(lang) {
    return INFORMATION.get(lang).get('todo_line_prefix')
  }

  catLine(lang) {
    return INFORMATION.get(lang).get('cat_line')
  }

  maxLength(lang) {
    return TEXT_MAX_LENGTH.get(lang)
  }
}
