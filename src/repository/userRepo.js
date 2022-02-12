import { USER_DATA } from './data/user.js';

export default class UserRepository {

  /**
   * Menu
   * 
   */
  toDoContents() {
    return USER_DATA.get('to_do_list')
  }

	toDoContent(idx) {
    return USER_DATA.get('to_do_list')?.[idx]
  }

  saveToDoContent(idx, content) {
    return USER_DATA.set(idx, content)
  }
}
