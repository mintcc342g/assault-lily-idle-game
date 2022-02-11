import * as imgKeys from './imgKeys.js';
import * as configs from './configs.js';

/**
 * Character Random Text Data
 * 
 */

const RANDOM_TEXTS_RAIMU = new Map([
  [configs.LANG_KR, [
    '(마리아 언덕... 난 여기가 좋아.)',
    '(미라이 언니... 보고 싶다...)',
    '(사치에 언니는 지금 어디 계실까?)',
    '(사치에 언니랑 크레이프 먹으러 가는 거 기대된다! 헤헷.)',
    '(졸려...)',
    '(후아암...)',
    '(더 강해지지 않으면...!)',
    '(클라라쨩 아까 세렌쨩을 찾던데... 찾았으려나?)',
    '(매미는 어떻게 생겼을까?)',
  ]],
  [configs.LANG_EN, [
    '(The hill of Maria... I like this place.)',
    '(My sister, Mirai... I miss you a lot.)',
    '(I wonder where Sachie-Sama is now.)',
    '(I look forward to eat crepes with Sachie-Sama!)',
    '(I\'m so sleepy...)',
    '(YAWN...)',
    '(I want to be stronger...!)',
    '(Clara-chan was looking for Seren-chan a minute ago. I wonder whether she met Seren-chan or not.)',
    '(I wonder what does a cicada look like.',
  ]],
  [configs.LANG_JP, [
    '(マリアの丘…。ここ好きなの。)',
    '(未来お姉ちゃん…。会いたいな…。)',
    '(幸恵お姉さま、今どこにいらっしゃるんだろう。)',
    '(幸恵お姉さまとクレープ食べに行くの楽しみ！\nへへっ。)',
    '(眠いな…。)',
    '(ふぁーぁ…。)',
    '(もっと強くならなきゃ…!)',
    '(クララちゃん、さっき聖恋ちゃん探してたよね。\n会えたのかな。)',
    '(セミってどんな形をしているんだろう。)',
  ]]
]);
  
const RANDOM_TEXTS_MAI = new Map([
  [configs.LANG_KR, [
    '더 이상은...못 먹는..다구...음냐음냐...',
    '마이는..모두를..좋아..한다구...쿨쿨...',
    '분짜....음냐...',
    '마이의...속도를...따라올...음냐...',
    '리리...유유를..부탁한다...쿨쿨...',
    '후배는 다들...귀엽구만...쿨쿨...',
  ]],
  [configs.LANG_EN, [
    'I cannot eat....any..more.....zzzz',
    'I...love...you guys.....zzz',
    'Bún Chả.....zzzzzz',
    'Can you guys...follow....Mai\'s speed....zzzzzz',
    'Riri...I...leave...Yuyu.....with you......zzz',
    'What a...lovely...Kouhai....zzz',
  ]],
  [configs.LANG_JP, [
    'もうこれ以上……食べられ……ないゾ……すやすや……。',
    '梅は…みんなが……好き…なんだゾ……むにゃ……。',
    'ブンチャー……むにゃむにゃ……。',
    '梅のスピードに……ついて……来れる…………むにゃ……。',
    '梨璃……夢結は……頼んだゾ………すやすや……。',
    '後輩たちは皆………可愛いな……すやすや……。',
  ]]
]);
  

/**
 * Character Random Conversation Data
 * 
 */

const START_CONVERSATION_WITH_SACHIE = new Map([
  [
    configs.LANG_KR, [
      ['사치에', '라이무 여기 있었구나.'],
      ['라이무', '사치에 오네사마! 조금 쉬고 있었어요 헤헷.'],
      ['사치에', '후후 그렇니. 나도 조금만 쉴까?'],
      ['라이무', '여기 앉으세요!'],
      ['사치에', '고마워.'],
    ]
  ],
  [
    configs.LANG_JP, [
      [
        ['幸恵', '来夢！ここにいたのね。'],
        ['来夢', '幸恵お姉さま！ちょっと休んでました。へへっ。'],
        ['幸恵', 'ふふ、そう。私もちょっとだけ休憩しようかな。'],
        ['来夢', 'ここにどうぞ！'],
        ['幸恵', 'ありがとう。'],
      ]
    ]
  ],
  [
    configs.LANG_EN, [
      [
        ['Sachie', 'Raimu, you are here!'],
        ['Raimu', 'Sachie-oneesama! I\'ve been taking a break. :)'],
        ['Sachie', 'Are you? I think I will take a break too.'],
        ['Raimu', 'Please sit here!'],
        ['Sachie', 'Thank you. :)'],
      ]
    ]
  ],
]);

const END_CONVERSATION_WITH_SACHIE = new Map([
  [
    configs.LANG_KR, [
      ['사치에', '라이무, 난 수업이 있어서 이만 가봐야 할 것 같아.'],
      ['라이무', '네, 오네사마! 전 조금만 더 있다가 갈 것 같아요!'],
      ['사치에', '후후 그래. 그럼 이따 또 보자.'],
      ['라이무', '네!'],
    ]
  ],
  [
    configs.LANG_JP, [
      [
        ['幸恵', '来夢、私授業あるからもう行かなきゃ。'],
        ['来夢', 'はい、お姉さま！私はもうちょっとここにいようと思います！'],
        ['幸恵', 'ふふ、そう。それじゃ、また後で。'],
        ['来夢', 'はい！'],
      ]
    ]
  ],
  [
    configs.LANG_EN, [
      [
        ['Sachie', 'Raimu, I\'ve gotta bounce to class.'],
        ['Raimu', 'Yeap, Sachie-oneesama! I think I would stay here a little bit.'],
        ['Sachie', 'Are you. Then, see you latter.'],
        ['Raimu', 'See you, Oneesama!'],
      ]
    ]
  ],
]);

const CONVERSATION_SACHIE_AND_RAIMU = new Map([
  [
    configs.LANG_KR, [
      [
        ['사치에', '라이무는 매미를 본 적이 있니?'],
        ['라이무', '(도리도리)'],
        ['사치에', '미라이 오네사마는 본 적이 있으시대.'],
        ['라이무', '언니가...'],
        ['사치에', '이렇게 작은데, 엄청 큰 소리로 운대.'],
        ['라이무', '헤에..'],
      ],
      [
        ['라이무', '언니의 꿈, 이룰 수 있을까..'],
        ['사치에', '함께라면 문제없어!'],
        ['라이무', '네...!'],
      ],
      [
        ['라이무', '저번에 갔던 크레이프 가게, 정말 좋았아요!'],
        ['사치에', '후후, 그렇지? 다음에 또 같이 가자.'],
        ['라이무', '네!'],
      ],
      [
        ['라이무', '세렌쨩, 요즘 더 열심인 것 같아요. 저도 더욱 열심히 하지 않으면..!'],
        ['사치에', '너무 무리는 하지 마렴.'],
      ],
      [
        ['사치에', '섬세한 작업은 왜이렇게 어려운걸까..'],
        ['라이무', '사치에 오네사마도 못 하시는 게 있으시네요 히힛'],
        ['사치에', '우웅.. 나도 평범한 사람인걸?'],
      ],
      [
        ['라이무', '가끔 제 힘이 무서워질 때가 있어요..'],
        ['사치에', '라이무...'],
      ],
    ]
  ],
  [
    configs.LANG_JP, [
      [
        ['幸恵', '来夢はセミを見たことある？'],
        ['来夢', '（ふるふる）'],
        ['幸恵', '未来お姉さまは見たことあるんだって。'],
        ['来夢', 'お姉ちゃんが…。'],
        ['幸恵', 'こんなに小さいのに、物凄く大きな声で鳴くんだって。'],
        ['来夢', 'へえ…。'],
      ],
      [
        ['来夢', 'お姉ちゃんの夢叶えられるかな…。'],
        ['幸恵', '一緒なら問題ない！'],
        ['来夢', 'はい…！'],
      ],
      [
        ['来夢', 'この前行ったクレープ屋さん、凄く美味しかったです！'],
        ['幸恵', 'ふふ、でしょう？また次、一緒に行こうね。'],
        ['来夢', 'はい！'],
      ],
      [
        ['来夢', '聖恋ちゃん、最近もっと頑張ってるみたい。私ももっと頑張らないと…！'],
        ['幸恵', 'あまり無理はしないでね。'],
      ],
      [
        ['幸恵', '細かい作業はなんでこんなに難しいんだろう…。'],
        ['来夢', '幸恵お姉さまでも出来ない事があるんですね、へへっ。'],
        ['幸恵', 'ん…。私も普通の人だもん。'],
      ],
      [
        ['来夢', '時々私の力が怖くなるんです…。'],
        ['幸恵', '来夢…。'],
      ],
    ]
  ],
  [
    configs.LANG_EN, [
      [
        ['Sachie', 'Raimu, have you ever seen a cicada?'],
        ['Raimu', '(shaking her head)'],
        ['Sachie', 'Mirai-oneesama said she had seen it before.'],
        ['Raimu', 'She was...'],
        ['Sachie', 'It is very small, but buzz loudly.'],
        ['Raimu', 'Wow...'],
      ],
      [
        ['Raimu', 'I wonder I could make my sister\'s dream come true...'],
        ['Sachie', 'There is no problem if we do together.'],
        ['Raimu', 'Thank you, oneesama...!'],
      ],
      [
        ['Raimu', 'The crepe shop where we went, there crepes were so good!'],
        ['Sachie', 'Haha, right? Let\'s go there together again.'],
        ['Raimu', 'Why not!'],
      ],
      [
        ['Raimu', ' Recently, Seren-chan is doing her best more and more. I\'ve got to try harder too...!'],
        ['Sachie', 'Please don\'t strain yourself too much.'],
      ],
      [
        ['Sachie', 'It is so hard to pay close attention to all of the small things...'],
        ['Raimu', 'I thought you are a perfect person! But you are not detail-oriented, haha.'],
        ['Sachie', 'hey... I\'m a normal person.'],
      ],
      [
        ['Raimu', 'I often feel so scared my power from Huge...'],
        ['Sachie', 'Raimu...'],
      ],
    ]
  ],
]);


/**
 * Scripts
 * 
 */

export const RANDOM_TEXTS = new Map([
  [imgKeys.CHARACTER_RAIMU_ID, RANDOM_TEXTS_RAIMU],
  [imgKeys.CHARACTER_MAI_ID, RANDOM_TEXTS_MAI],
]);

export const RANDOM_CONVERSATION = new Map([
  [
    imgKeys.CHARACTER_RAIMU_ID, new Map([
      [
        imgKeys.CHARACTER_SACHIE_ID, new Map([
          ['start', START_CONVERSATION_WITH_SACHIE],
          ['random', CONVERSATION_SACHIE_AND_RAIMU],
          ['end', END_CONVERSATION_WITH_SACHIE],
        ])
      ],
    ])
  ],
]);
