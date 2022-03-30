import {
  LANG_KR, LANG_EN, LANG_JP,
  CHARACTER_ID_RAIMU, CHARACTER_ID_MAI, CHARACTER_ID_SACHIE
} from '../../consts/keys.js';

/**
 * Random Texts
 * 
 */

const RANDOM_THINKING_RAIMU = new Map([
  [
    LANG_KR, [
      '(마리아 언덕... 난 여기가 좋아.)',
      '(미라이 언니... 보고 싶다...)',
      '(사치에 언니는 지금 어디 계실까?)',
      '(사치에 언니랑 크레이프 먹으러 가는 거 기대된다! 헤헷.)',
      '(졸려...)',
      '(후아암...)',
      '(더 강해지지 않으면...!)',
      '(클라라쨩 아까 세렌쨩을 찾던데... 찾았으려나?)',
      '(매미는 어떻게 생겼을까?)',
    ]
  ],
  [
    LANG_EN, [
      '(The hill of Maria... I like this place.)',
      '(My sister, Mirai... I miss you a lot.)',
      '(I wonder where Sachie-Sama is now.)',
      '(I look forward to eat crepes with Sachie-Sama!)',
      '(I\'m so sleepy...)',
      '(YAWN...)',
      '(I want to be stronger...!)',
      '(Clara-chan was looking for Seren-chan a minute ago. I wonder whether she met Seren-chan or not.)',
      '(I wonder what does a cicada look like.',
    ]
  ],
  [
    LANG_JP, [
      '(マリアの丘…。ここ好きなの。)',
      '(未来お姉ちゃん…。会いたいな…。)',
      '(幸恵お姉さま、今どこにいらっしゃるんだろう。)',
      '(幸恵お姉さまとクレープ食べに行くの楽しみ！\nへへっ。)',
      '(眠いな…。)',
      '(ふぁーぁ…。)',
      '(もっと強くならなきゃ…!)',
      '(クララちゃん、さっき聖恋ちゃん探してたよね。\n会えたのかな。)',
      '(セミってどんな形をしているんだろう。)',
    ]
  ]
]);
  
const RANDOM_THINKING_MAI = new Map([
  [
    LANG_KR, [
      '더 이상은...못 먹는..다구...음냐음냐...',
      '마이는..모두를..좋아..한다구...쿨쿨...',
      '분짜....음냐...',
      '마이의...속도를...따라올...음냐...',
      '리리...유유를..부탁한다...쿨쿨...',
      '후배는 다들...귀엽구만...쿨쿨...',
    ]
  ],
  [
    LANG_EN, [
      'I cannot eat....any..more.....zzzz',
      'I...love...you guys.....zzz',
      'Bún Chả.....zzzzzz',
      'Can you guys...follow....Mai\'s speed....zzzzzz',
      'Riri...I...leave...Yuyu.....with you......zzz',
      'What a...lovely...Kouhai....zzz',
    ]
  ],
  [
    LANG_JP, [
      'もうこれ以上……食べられ……ないゾ……すやすや……。',
      '梅は…みんなが……好き…なんだゾ……むにゃ……。',
      'ブンチャー……むにゃむにゃ……。',
      '梅のスピードに……ついて……来れる…………むにゃ……。',
      '梨璃……夢結は……頼んだゾ………すやすや……。',
      '後輩たちは皆………可愛いな……すやすや……。',
    ]
  ]
]);
  

/**
 * Random Dialogue
 * 
 */

const STARTING_DIALOGUE_WITH_SACHIE = new Map([
  [
    LANG_KR, [
      [CHARACTER_ID_SACHIE, '라이무 여기 있었구나.'],
      [CHARACTER_ID_RAIMU, '사치에 언니! 조금 쉬고 있었어요 헤헷.'],
      [CHARACTER_ID_SACHIE, '후후 그렇니. 나도 조금만 쉴까?'],
      [CHARACTER_ID_RAIMU, '여기 앉으세요!'],
      [CHARACTER_ID_SACHIE, '고마워.'],
    ]
  ],
  [
    LANG_JP, [
      [CHARACTER_ID_SACHIE, '来夢！ここにいたのね。'],
      [CHARACTER_ID_RAIMU, '幸恵お姉さま！ちょっと休んでました。へへっ。'],
      [CHARACTER_ID_SACHIE, 'ふふ、そう。私もちょっとだけ休憩しようかしら。'],
      [CHARACTER_ID_RAIMU, 'ここにどうぞ！'],
      [CHARACTER_ID_SACHIE, 'ありがとう。'],
    ]
  ],
  [
    LANG_EN, [
      [CHARACTER_ID_SACHIE, 'Raimu, you are here!'],
      [CHARACTER_ID_RAIMU, 'Sachie-oneesama! I\'ve been taking a break.'],
      [CHARACTER_ID_SACHIE, 'Are you? I decided to take a break too with you.'],
      [CHARACTER_ID_RAIMU, 'Oh, really? Please sit here!'],
      [CHARACTER_ID_SACHIE, 'Thank you.'],
    ]
  ],
]);

const ENDING_DIALOGUE_WITH_SACHIE = new Map([
  [
    LANG_KR, [
      [CHARACTER_ID_SACHIE, '라이무, 난 수업이 있어서 이만 가봐야 할 것 같아.'],
      [CHARACTER_ID_RAIMU, '네, 언니! 전 조금만 더 있다가 갈 것 같아요!'],
      [CHARACTER_ID_SACHIE, '후후 그래. 그럼 이따 또 보자.'],
      [CHARACTER_ID_RAIMU, '네!'],
    ]
  ],
  [
    LANG_JP, [
      [CHARACTER_ID_SACHIE, '来夢、私授業あるからもう行かなきゃ。'],
      [CHARACTER_ID_RAIMU, 'はい、お姉さま！私はもうちょっとここにいようと思います！'],
      [CHARACTER_ID_SACHIE, 'ふふ、そう。それじゃ、また後で。'],
      [CHARACTER_ID_RAIMU, 'はい！'],
    ]
  ],
  [
    LANG_EN, [
      [CHARACTER_ID_SACHIE, 'Raimu, I\'ve gotta bounce to class.'],
      [CHARACTER_ID_RAIMU, 'OK, Sachie-oneesama. I think I would stay here a little bit.'],
      [CHARACTER_ID_SACHIE, 'I see. See you latter.'],
      [CHARACTER_ID_RAIMU, 'See you, Oneesama!'],
    ]
  ],
]);

const RAIMU_SACHIE_DIALOGUE = new Map([
  [
    LANG_KR, [
      [
        [CHARACTER_ID_SACHIE, '라이무는 매미를 본 적이 있니?'],
        [CHARACTER_ID_RAIMU, '(도리도리)'],
        [CHARACTER_ID_SACHIE, '미라이 언니는 본 적이 있으시대.'],
        [CHARACTER_ID_RAIMU, '언니가...'],
        [CHARACTER_ID_SACHIE, '이렇게 작은데, 엄청 큰 소리로 운대.'],
        [CHARACTER_ID_RAIMU, '헤에..'],
      ],
      [
        [CHARACTER_ID_RAIMU, '미라이 언니의 꿈, 이룰 수 있을까..'],
        [CHARACTER_ID_SACHIE, '함께라면 문제없어!'],
        [CHARACTER_ID_RAIMU, '네...!'],
      ],
      [
        [CHARACTER_ID_RAIMU, '저번에 갔던 크레이프 가게, 정말 좋았아요!'],
        [CHARACTER_ID_SACHIE, '후후, 그렇지? 다음에 또 같이 가자.'],
        [CHARACTER_ID_RAIMU, '네!'],
      ],
      [
        [CHARACTER_ID_RAIMU, '세렌쨩, 요즘 더 열심인 것 같아요. 저도 더욱 열심히 하지 않으면..!'],
        [CHARACTER_ID_SACHIE, '너무 무리는 하지 마렴.'],
        [CHARACTER_ID_RAIMU, '네!'],
      ],
      [
        [CHARACTER_ID_SACHIE, '섬세한 작업은 왜이렇게 어려운걸까..'],
        [CHARACTER_ID_RAIMU, '사치에 언니도 못 하시는 게 있으시네요 히힛'],
        [CHARACTER_ID_SACHIE, '우웅.. 나도 평범한 사람인걸?'],
      ],
      [
        [CHARACTER_ID_RAIMU, '가끔 제 힘이 무서워질 때가 있어요..'],
        [CHARACTER_ID_SACHIE, '라이무...'],
      ],
    ]
  ],
  [
    LANG_JP, [
      [
        [CHARACTER_ID_SACHIE, '来夢はセミを見たことある？'],
        [CHARACTER_ID_RAIMU, '（ふるふる）'],
        [CHARACTER_ID_SACHIE, '未来お姉さまは見たことあるんだって。'],
        [CHARACTER_ID_RAIMU, 'お姉ちゃんが…。'],
        [CHARACTER_ID_SACHIE, 'こんなに小さいのに、物凄く大きな声で鳴くんだって。'],
        [CHARACTER_ID_RAIMU, 'へえ…。'],
      ],
      [
        [CHARACTER_ID_RAIMU, 'お姉ちゃんの夢叶えられるかな…。'],
        [CHARACTER_ID_SACHIE, '一緒なら問題ない！'],
        [CHARACTER_ID_RAIMU, 'はい…！'],
      ],
      [
        [CHARACTER_ID_RAIMU, 'この前行ったクレープ屋さん、凄く美味しかったです！'],
        [CHARACTER_ID_SACHIE, 'ふふ、でしょう？また次、一緒に行こうね。'],
        [CHARACTER_ID_RAIMU, 'はい！'],
      ],
      [
        [CHARACTER_ID_RAIMU, '聖恋ちゃん、最近もっと頑張ってるみたい。私ももっと頑張らないと…！'],
        [CHARACTER_ID_SACHIE, 'あまり無理はしないでね。'],
        [CHARACTER_ID_SACHIE, 'はい…！'],
      ],
      [
        [CHARACTER_ID_SACHIE, '細かい作業はなんでこんなに難しいんだろう…。'],
        [CHARACTER_ID_RAIMU, '幸恵お姉さまでも出来ない事があるんですね、へへっ。'],
        [CHARACTER_ID_SACHIE, 'ん…。私も普通の人だもん。'],
      ],
      [
        [CHARACTER_ID_RAIMU, '時々私の力が怖くなるんです…。'],
        [CHARACTER_ID_SACHIE, '来夢…。'],
      ],
    ]
  ],
  [
    LANG_EN, [
      [
        [CHARACTER_ID_SACHIE, 'Raimu, have you ever seen a cicada?'],
        [CHARACTER_ID_RAIMU, '(shaking her head)'],
        [CHARACTER_ID_SACHIE, 'Mirai-oneesama said she had seen it before.'],
        [CHARACTER_ID_RAIMU, 'She was...'],
        [CHARACTER_ID_SACHIE, 'It is very small, but buzz loudly.'],
        [CHARACTER_ID_RAIMU, 'Wow...'],
      ],
      [
        [CHARACTER_ID_RAIMU, 'I wonder I could make my sister\'s dream come true...'],
        [CHARACTER_ID_SACHIE, 'There is no problem if we do together.'],
        [CHARACTER_ID_RAIMU, 'Thank you, oneesama...!'],
      ],
      [
        [CHARACTER_ID_RAIMU, 'The crepe shop where we went, there crepes were so good!'],
        [CHARACTER_ID_SACHIE, 'Haha, right? Let\'s go there together again.'],
        [CHARACTER_ID_RAIMU, 'Why not!'],
      ],
      [
        [CHARACTER_ID_RAIMU, 'Recently, Seren-chan is doing her best more and more. I\'ve got to try harder too...!'],
        [CHARACTER_ID_SACHIE, 'Please don\'t strain yourself too much.'],
        [CHARACTER_ID_SACHIE, 'I will.'],
      ],
      [
        [CHARACTER_ID_SACHIE, 'It is so hard to pay close attention to all of the small things...'],
        [CHARACTER_ID_RAIMU, 'I thought you are a perfect person! But you are not detail-oriented, haha.'],
        [CHARACTER_ID_SACHIE, 'hey... I\'m a normal person.'],
      ],
      [
        [CHARACTER_ID_RAIMU, 'I often feel so scared my power from Huge...'],
        [CHARACTER_ID_SACHIE, 'Raimu...'],
      ],
    ]
  ],
]);


/**
 * Export Scripts
 * 
 */

export const RANDOM_TEXTS = new Map([
  [CHARACTER_ID_RAIMU, RANDOM_THINKING_RAIMU],
  [CHARACTER_ID_MAI, RANDOM_THINKING_MAI],
]);

export const RANDOM_CONVERSATION = new Map([
  [
    CHARACTER_ID_RAIMU, new Map([
      [
        CHARACTER_ID_SACHIE, new Map([
          ['start', STARTING_DIALOGUE_WITH_SACHIE],
          ['random', RAIMU_SACHIE_DIALOGUE],
          ['end', ENDING_DIALOGUE_WITH_SACHIE],
        ])
      ],
    ])
  ],
]);
