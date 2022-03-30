import { LANG_KR, LANG_EN, LANG_JP, ACADEMY_LUDOVIC, ACADEMY_YURIGAOKA } from '../../consts/keys.js';

export const HAND_BOOK_MENUS = new Map([
  ['open_handbook', new Map([
    [LANG_KR, '학생수첩'],
    [LANG_EN, 'Hand Book'],
    [LANG_JP, '生徒手帳'],
  ])],
  ['character_selection_scene', new Map([
    [LANG_KR, '캐릭터 화면'],
    [LANG_EN, 'Character Menu'],
    [LANG_JP, 'キャラクター画面'],
  ])],
  ['main_scene', new Map([
    [LANG_KR, '시작화면'],
    [LANG_EN, 'Main'],
    [LANG_JP, 'タイトルへ'],
  ])],
  ['close_menu', new Map([
    [LANG_KR, '닫기'],
    [LANG_EN, 'Close'],
    [LANG_JP, '閉じる'],
  ])],
]);


// TODO: mottos should be changed to a academy motto.
export const ACADEMY_INFO = new Map([
  [ACADEMY_LUDOVIC, new Map([
    ['motto', new Map([
      [LANG_KR, ['이 학생수첩은 데이터를 저장하지 않습니다. 이 사이트를 벗어나거나 (새로고침 포함), 브라우저를 닫을 경우 기입했던 내용은 전부 없어집니다. 사용에 유의해주세요.']],
      [LANG_JP, ['この生徒手帳はデータを保存しません。このサイトから離れたり （ページの更新も含む）、ブラウザーを閉じたりすると記入した内容は全部なくなります。ご利用に参考して下さい。']],
      [LANG_EN, ['This Handbook never save any data. If you leave this page, include refresh, or close it, you could lose all data that you inserted. Please note that.']],
    ])],
  ])],
  [ACADEMY_YURIGAOKA, new Map([
    ['motto', new Map([
      [LANG_KR, ['이 학생수첩은 데이터를 저장하지 않습니다. 이 사이트를 벗어나거나 (새로고침 포함), 브라우저를 닫을 경우 기입했던 내용은 전부 없어집니다. 사용에 유의해주세요.']],
      [LANG_JP, ['この生徒手帳はデータを保存しません。このサイトから離れたり （ページの更新も含む）、ブラウザーを閉じたりすると記入した内容は全部なくなります。ご利用に参考して下さい。']],
      [LANG_EN, ['This Handbook never save any data. If you leave this page, include refresh, or close it, you could lose all data that you inserted. Please note that.']],
    ])],
  ])]
]);

export const INFORMATION = new Map([
  [
    LANG_KR, new Map([
      ['main_info', '언어를 선택한 후 [START] 버튼을 눌러주세요.'],
      ['todo_alert', '(내용이 너무 긴 것 같아. 좀 줄일까..?)'],
      ['todo_line_prefix', '이따 뭘해야 했더라...?\n'],
      ['cat_line', '야옹~'],
    ])
  ],
  [
    LANG_EN, new Map([
      ['main_info', 'select language, then press [START] button.'],
      ['todo_alert', '(I think the text is too long.. How about shortening it?)'],
      ['todo_line_prefix', 'Let\'s check my to-do list.\n'], 
      ['cat_line', 'meow~'],
    ])
  ],
  [
    LANG_JP, new Map([
      ['main_info', '言語を選択した後、[START] ボタンを押してください。'],
      ['todo_alert', '(ちょっと長いかな。短くした方がいいかも。)'],
      ['todo_line_prefix', '後で何しようとしたっけ…？\n'],
      ['cat_line', 'ニャー'],
    ])
  ],
]);

export const TEXT_MAX_LENGTH = new Map([
  [LANG_KR, 27],
  [LANG_EN, 42],
  [LANG_JP, 27],
]);
