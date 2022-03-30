import {
  LANG_KR, LANG_EN, LANG_JP, ACADEMY_LUDOVIC, ACADEMY_YURIGAOKA,
  CHARACTER_ID_RAIMU, CHARACTER_ID_MAI, CHARACTER_ID_SACHIE
} from '../../consts/keys.js';

const INTRODUCTION_RAIMU = new Map([
  [LANG_KR, '사립 루도비코 여학원의 1학년생. 소속 레기온은 \'아이언 사이드\'. 언니의 의지를 이어 릴리가 되었다. 전사한 릴리들이 잠들어 있는 마리아 언덕에 자주 가는 듯 하다.'],
  [LANG_EN, 'A new first-year student at the private Ludovic Girls Academy. She became a lily to inherit her sister\'s will. Apparently she often go to the Hill Of Maria where Lilyes killed in action rest in peace.'],
  [LANG_JP, '私立ルドビコ女学院の1年生。所属レギオンは「アイアンサイド」。姉の意思を継いでリリィになった。戦死したリリィたちが眠っているマリアの丘によく行くらしい。'],
]);

const INTRODUCTION_MAI = new Map([
  [LANG_KR, '사립 유리가오카 여학원의 2학년생. 소속 레기온은 \'라드그리드(통칭 히토츠야나기대)\'. 낙천적인 성격의 분위기 메이커. 학교 뒷산에서 고양이들과 낮잠 자는 것을 즐긴다.'],
  [LANG_EN, 'A second-year student at the private Yurigaoka Girls Academy. Mai is a natural mood-maker and prefers laid-back approach. She likes to take a nap with cats at a glade of the academy\'s hill.'],
  [LANG_JP, '私立百合ヶ丘女学院の2年生。所属レギオンは「ラーズグリーズ（通称、一柳隊）」。楽天的な性格のムードメーカー。学校の裏山でよく猫たちとお昼寝をしている。'],
]);

export const CHARACTER_INFO = new Map([
  [
    CHARACTER_ID_RAIMU, new Map([
      ['name', new Map([ [LANG_KR, '키시모토 루치아 라이무'], [LANG_EN, 'Raimu Lucia Kishimoto'], [LANG_JP, '岸本・ルチア・来夢'] ])],
      ['stage', 'TheHillOfMariaScene'],
      ['intro', INTRODUCTION_RAIMU],
      ['academy', ACADEMY_LUDOVIC],
    ])
  ],
  [
    CHARACTER_ID_MAI, new Map([
      ['name', new Map([ [LANG_KR, '요시무라 Thi 마이'], [LANG_EN, 'Mai Thi Yoshimura'], [LANG_JP, '吉村・Thi・梅'] ])],
      ['stage', 'YurigaokaGladeScene'],
      ['intro', INTRODUCTION_MAI],
      ['academy', ACADEMY_YURIGAOKA],
    ])
  ],
  [
    CHARACTER_ID_SACHIE, new Map([
      ['name', new Map([ [LANG_KR, '후쿠야마 잔느 사치에'], [LANG_EN, 'Sachie Jeanne Fukuyama'], [LANG_JP, '福山・ジャンヌ・幸恵'] ])],
      ['stage', ''],
      ['intro', ''],
      ['academy', ACADEMY_LUDOVIC],
    ])
  ],
]);
