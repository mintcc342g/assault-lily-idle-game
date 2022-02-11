import * as configs from './configs.js';
import * as imgKeys from './imgKeys.js';
import * as events from './events.js';

/**
 * User
 * 
 */

export const USER_DATA = new Map([
  ['to_do_list', [/* textObject array*/]]
]);


/**
 * Academy
 * 
 */
export const ACADEMY_LUDOVIC = 'ludovic';
export const ACADEMY_YURIGAOKA = 'yurigaoka';

export const ACADEMY_INFO = new Map([
  [ACADEMY_LUDOVIC, new Map([
    ['motto', new Map([
      // these would be changed to a academy motto.
      [configs.LANG_KR, ['이 학생수첩은 데이터를 저장하지 않습니다. 이 사이트를 벗어나거나 (새로고침 포함), 브라우저를 닫을 경우 기입했던 내용은 전부 없어집니다. 사용에 유의해주세요.']],
      [configs.LANG_JP, ['この生徒手帳はデータを保存しません。このサイトから離れたり （ページの更新も含む）、ブラウザーを閉じたりすると記入した内容は全部なくなります。ご利用に参考して下さい。']],
      [configs.LANG_EN, ['This Handbook never save any data. If you leave this page, include refresh, or close it, you could lose all data that you inserted. Please note that.']],
    ])],
  ])],
  [ACADEMY_YURIGAOKA, new Map([
    ['motto', new Map([
      [configs.LANG_KR, ['이 학생수첩은 데이터를 저장하지 않습니다. 이 사이트를 벗어나거나 (새로고침 포함), 브라우저를 닫을 경우 기입했던 내용은 전부 없어집니다. 사용에 유의해주세요.']],
      [configs.LANG_JP, ['この生徒手帳はデータを保存しません。このサイトから離れたり （ページの更新も含む）、ブラウザーを閉じたりすると記入した内容は全部なくなります。ご利用に参考して下さい。']],
      [configs.LANG_EN, ['This Handbook never save any data. If you leave this page, include refresh, or close it, you could lose all data that you inserted. Please note that.']],
    ])],
  ])]
]);

export const SELECTION_BACKGROUND_KEYS = new Map([ // TODO: fix import issue, then move this to the imgKeys.js file.
  [ACADEMY_LUDOVIC, 'background_img_ludovic'],
  [ACADEMY_YURIGAOKA, 'background_img_yurigaoka'],
]);


/**
 * Notice
 * 
 */
export const NOTICE = new Map([
  [
    configs.LANG_KR, new Map([
      ['main-info', '언어를 선택한 후 [START] 버튼을 눌러주세요.'],
      ['todo-alert', '(내용이 너무 긴 것 같아. 좀 줄일까..?)'],
      ['todo-list-prefix', '이따 뭘해야 했더라...?\n'],
      ['cat', '야옹~'],
    ])
  ],
  [
    configs.LANG_EN, new Map([
      ['main-info', 'select language, then press [START] button.'],
      ['todo-alert', '(I think the text is too long.. How about shortening it?)'],
      ['todo-list-prefix', 'Let\'s check my to-do list.\n'], 
      ['cat', 'meow~'],
    ])
  ],
  [
    configs.LANG_JP, new Map([
      ['main-info', '言語を選択した後、[START] ボタンを押してください。'],
      ['todo-alert', '(ちょっと長いかな。短くした方がいいかも。)'],
      ['todo-list-prefix', '後で何しようとしたっけ…？\n'],
      ['cat', 'ニャー'],
    ])
  ],
]);


/**
 * Character
 * 
 */

// introduction
const INTRODUCTION_RAIMU = new Map([
  [configs.LANG_KR, '사립 루도비코 여학원의 1학년생. 소속 레기온은 \'아이언 사이드\'. 언니의 의지를 이어 릴리가 되었다. 전사한 릴리들이 잠들어 있는 마리아 언덕에 자주 가는 듯 하다.'],
  [configs.LANG_EN, 'A new first-year student at the private Ludovic Girls Academy. She became a lily to inherit her sister\'s will. Apparently she often go to the Hill Of Maria where Lilyes killed in action rest in peace.'],
  [configs.LANG_JP, '私立ルドビコ女学院の1年生。所属レギオンは「アイアンサイド」。姉の意思を継いでリリィになった。戦死したリリィたちが眠っているマリアの丘によく行くらしい。'],
]);

const INTRODUCTION_MAI = new Map([
  [configs.LANG_KR, '사립 유리가오카 여학원의 2학년생. 소속 레기온은 \'라드그리드(통칭 히토츠야나기대)\'. 낙천적인 성격의 분위기 메이커. 학교 뒷산에서 고양이들과 낮잠 자는 것을 즐긴다.'],
  [configs.LANG_EN, 'A second-year student at the private Yurigaoka Girls Academy. Mai is a natural mood-maker and prefers laid-back approach. She likes to take a nap with cats at a glade of the academy\'s hill.'],
  [configs.LANG_JP, '私立百合ヶ丘女学院の2年生。所属レギオンは「ラーズグリーズ（通称、一柳隊）」。楽天的な性格のムードメーカー。学校の裏山でよく猫たちとお昼寝をしている。'],
]);


// character data
export const CHARACTER_DATA = new Map([
  [
    imgKeys.CHARACTER_RAIMU_ID, new Map([
      ['id', imgKeys.CHARACTER_RAIMU_ID],
      ['name', new Map([ [configs.LANG_KR, '키시모토 루치아 라이무'], [configs.LANG_EN, 'Raimu Lucia Kishimoto'], [configs.LANG_JP, '岸本・ルチア・来夢'] ])],
      ['scene', configs.SCENE_THE_HILL_OF_MARIA],
      ['intro', INTRODUCTION_RAIMU],
      ['academy', ACADEMY_LUDOVIC],
      ['events', events.EVENT_LIST_RAIMU],
    ])
  ],
  [
    imgKeys.CHARACTER_MAI_ID, new Map([
      ['id', imgKeys.CHARACTER_MAI_ID],
      ['name', new Map([ [configs.LANG_KR, '요시무라 Thi 마이'], [configs.LANG_EN, 'Mai Thi Yoshimura'], [configs.LANG_JP, '吉村・Thi・梅'] ])],
      ['scene', configs.SCENE_YURIGAOKA_GLADE],
      ['intro', INTRODUCTION_MAI],
      ['academy', ACADEMY_YURIGAOKA],
      ['events', events.EVENT_LIST_MAI],
    ])
  ],
]);
