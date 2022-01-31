import * as configs from './configs.js';
import * as imgKeys from './imgKeys.js';
import * as events from './events.js';

/**
 * Academy
 * 
 */
export const ACADEMY_LUDOVIC = 'ludovic';
export const ACADEMY_LIST = [ACADEMY_LUDOVIC];

export const ACADEMY_INFO = new Map([
  [ACADEMY_LUDOVIC, new Map([
    ['motto', new Map([
      [configs.LANG_KR, ['이 학생수첩은 데이터를 저장하지 않습니다. 이 사이트를 벗어나거나 (새로고침 포함), 브라우저를 닫을 경우 기입했던 내용은 전부 없어집니다. 사용에 유의해주세요.']],
      [configs.LANG_JP, ['この生徒手帳はデータを保存しません。このサイトから離れたり （ページの更新も含む）、ブラウザーを閉じたりすると記入した内容は全部なくなります。ご利用に参考して下さい。']],
      [configs.LANG_EN, ['This Handbook never save any data. If you leave this page, include refresh, or close it, you could lose all data that you inserted. Please note that.']],
    ])],
  ])]
]);

export const SELECTION_BACKGROUND_KEYS = new Map([ // TODO: fix import issue, then move this to the imgKeys.js file.
  [ACADEMY_LUDOVIC, 'background_img_ludovic']
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
      ['todo-place-holder', '할 일을 적고 엔터키를 입력하자.'],
    ])
  ],
  [
    configs.LANG_EN, new Map([
      ['main-info', 'select language, then press [START] button.'],
      ['todo-alert', '(I think the text is too long.. How about shortening it?)'],
      ['todo-place-holder', 'Let\'s input To-do things. Then press Enter.'],
    ])
  ],
  [
    configs.LANG_JP, new Map([
      ['main-info', '言語を選択した後、[START] ボタンを押してください。'],
      ['todo-alert', '(ちょっと長いかな。短くした方がいいかも。)'],
      ['todo-place-holder', 'やることを書いた後、エンターキーを押そう。'],
    ])
  ],
]);


/**
 * Character
 * 
 */

// introduction
const INTRODUCTION_RAIMU = new Map([
  [configs.LANG_KR, '사립 루도비코 여학원의 1학년생. 소속 레기온은 \'아이언 사이드\'. 언니의 의지를 이어 릴리가 되었다. 마리아 언덕에 자주 가는 듯 하다.'],
  [configs.LANG_EN, 'A new first-year student at the private Ludovic Girls Academy. She became a lily to inherit her sister\'s will. Apparently she often go to the Hill Of Maria.'],
  [configs.LANG_JP, '私立ルドビコ女学院の1年生。所属レギオンは「アイアンサイド」。姉の意思を継いでリリィになった。戦死したリリィたちが眠っているマリアの丘によく行くらしい。'],
]);


// random texts
const RANDOM_TEXTS_RAIMU = new Map([
  [configs.LANG_KR, [
    `(마리아 언덕... 난 여기가 좋아.)`,
    `(미라이 언니... 보고 싶다...)`,
    `(사치에 언니는 지금 어디 계실까?)`,
    `(사치에 언니랑 크레이프 먹으러 가는 거 기대된다! 헤헷.)`,
    `(졸려...)`,
    `(후아암...)`,
    `(더 강해지지 않으면...!)`,
    `(클라라쨩 아까 세렌쨩을 찾던데... 찾았으려나?)`,
    `(매미는 어떻게 생겼을까?)`,
  ]],
  [configs.LANG_EN, [
    `(The hill of Maria... I like this place.)`,
    `(My sister, Mirai... I miss you a lot.)`,
    `(I wonder where Sachie-Sama is now.)`,
    `(I look forward to eat crepes with Sachie-Sama!)`,
    `(I'm so sleepy...)`,
    `(YAWN...)`,
    `(I want to be stronger...!)`,
    `(Clara-chan was looking for Seren-chan a minute ago. I wonder whether she met Seren-chan or not.)`,
    `(I wonder what does a cicada look like.`,
  ]],
  [configs.LANG_JP, [
    `(マリアの丘…。ここ好きなの。)`,
    `(未来お姉ちゃん…。会いたいな…。)`,
    `(幸恵お姉さま、今どこにいらっしゃるんだろう。)`,
    `(幸恵お姉さまとクレープ食べに行くの楽しみ！\nへへっ。)`,
    `(眠いな…。)`,
    `(ふぁーぁ…。)`,
    `(もっと強くならなきゃ…!)`,
    `(クララちゃん、さっき聖恋ちゃん探してたよね。\n会えたのかな。)`,
    `(セミってどんな形をしているんだろう。)`,
  ]]
]);


// character data
export const CHARACTER_DATA = new Map([
  [
    imgKeys.CHARACTER_RAIMU_ID, new Map([
      ['scene', configs.SCENE_THE_HILL_OF_MARIA],
      ['intro', INTRODUCTION_RAIMU],
      ['academy', ACADEMY_LUDOVIC],
      ['events', events.EVENT_LIST_RAIMU],
      ['random_texts', RANDOM_TEXTS_RAIMU],
    ])
  ],
]);