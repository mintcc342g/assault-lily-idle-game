import {
  LANG_KR, LANG_EN, LANG_JP,
  CHARACTER_RAIMU_ID, CHARACTER_MAI_ID, CHARACTER_SACHIE_ID
} from './ids.js';

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
      [CHARACTER_SACHIE_ID, '라이무 여기 있었구나.'],
      [CHARACTER_RAIMU_ID, '사치에 언니! 조금 쉬고 있었어요 헤헷.'],
      [CHARACTER_SACHIE_ID, '후후 그렇니. 나도 조금만 쉴까?'],
      [CHARACTER_RAIMU_ID, '여기 앉으세요!'],
      [CHARACTER_SACHIE_ID, '고마워.'],
    ]
  ],
  [
    LANG_JP, [
      [CHARACTER_SACHIE_ID, '来夢！ここにいたのね。'],
      [CHARACTER_RAIMU_ID, '幸恵お姉さま！ちょっと休んでました。へへっ。'],
      [CHARACTER_SACHIE_ID, 'ふふ、そう。私もちょっとだけ休憩しようかな。'],
      [CHARACTER_RAIMU_ID, 'ここにどうぞ！'],
      [CHARACTER_SACHIE_ID, 'ありがとう。'],
    ]
  ],
  [
    LANG_EN, [
      [CHARACTER_SACHIE_ID, 'Raimu, you are here!'],
      [CHARACTER_RAIMU_ID, 'Sachie-oneesama! I\'ve been taking a break.'],
      [CHARACTER_SACHIE_ID, 'Are you? I decided to take a break too with you.'],
      [CHARACTER_RAIMU_ID, 'Oh, really? Please sit here!'],
      [CHARACTER_SACHIE_ID, 'Thank you.'],
    ]
  ],
]);

const ENDING_DIALOGUE_WITH_SACHIE = new Map([
  [
    LANG_KR, [
      [CHARACTER_SACHIE_ID, '라이무, 난 수업이 있어서 이만 가봐야 할 것 같아.'],
      [CHARACTER_RAIMU_ID, '네, 언니! 전 조금만 더 있다가 갈 것 같아요!'],
      [CHARACTER_SACHIE_ID, '후후 그래. 그럼 이따 또 보자.'],
      [CHARACTER_RAIMU_ID, '네!'],
    ]
  ],
  [
    LANG_JP, [
      [CHARACTER_SACHIE_ID, '来夢、私授業あるからもう行かなきゃ。'],
      [CHARACTER_RAIMU_ID, 'はい、お姉さま！私はもうちょっとここにいようと思います！'],
      [CHARACTER_SACHIE_ID, 'ふふ、そう。それじゃ、また後で。'],
      [CHARACTER_RAIMU_ID, 'はい！'],
    ]
  ],
  [
    LANG_EN, [
      [CHARACTER_SACHIE_ID, 'Raimu, I\'ve gotta bounce to class.'],
      [CHARACTER_RAIMU_ID, 'OK, Sachie-oneesama. I think I would stay here a little bit.'],
      [CHARACTER_SACHIE_ID, 'I see. See you latter.'],
      [CHARACTER_RAIMU_ID, 'See you, Oneesama!'],
    ]
  ],
]);

const RAIMU_SACHIE_DIALOGUE = new Map([
  [
    LANG_KR, [
      [
        [CHARACTER_SACHIE_ID, '라이무는 매미를 본 적이 있니?'],
        [CHARACTER_RAIMU_ID, '(도리도리)'],
        [CHARACTER_SACHIE_ID, '미라이 언니는 본 적이 있으시대.'],
        [CHARACTER_RAIMU_ID, '언니가...'],
        [CHARACTER_SACHIE_ID, '이렇게 작은데, 엄청 큰 소리로 운대.'],
        [CHARACTER_RAIMU_ID, '헤에..'],
      ],
      [
        [CHARACTER_RAIMU_ID, '미라이 언니의 꿈, 이룰 수 있을까..'],
        [CHARACTER_SACHIE_ID, '함께라면 문제없어!'],
        [CHARACTER_RAIMU_ID, '네...!'],
      ],
      [
        [CHARACTER_RAIMU_ID, '저번에 갔던 크레이프 가게, 정말 좋았아요!'],
        [CHARACTER_SACHIE_ID, '후후, 그렇지? 다음에 또 같이 가자.'],
        [CHARACTER_RAIMU_ID, '네!'],
      ],
      [
        [CHARACTER_RAIMU_ID, '세렌쨩, 요즘 더 열심인 것 같아요. 저도 더욱 열심히 하지 않으면..!'],
        [CHARACTER_SACHIE_ID, '너무 무리는 하지 마렴.'],
        [CHARACTER_RAIMU_ID, '네!'],
      ],
      [
        [CHARACTER_SACHIE_ID, '섬세한 작업은 왜이렇게 어려운걸까..'],
        [CHARACTER_RAIMU_ID, '사치에 언니도 못 하시는 게 있으시네요 히힛'],
        [CHARACTER_SACHIE_ID, '우웅.. 나도 평범한 사람인걸?'],
      ],
      [
        [CHARACTER_RAIMU_ID, '가끔 제 힘이 무서워질 때가 있어요..'],
        [CHARACTER_SACHIE_ID, '라이무...'],
      ],
    ]
  ],
  [
    LANG_JP, [
      [
        [CHARACTER_SACHIE_ID, '来夢はセミを見たことある？'],
        [CHARACTER_RAIMU_ID, '（ふるふる）'],
        [CHARACTER_SACHIE_ID, '未来お姉さまは見たことあるんだって。'],
        [CHARACTER_RAIMU_ID, 'お姉ちゃんが…。'],
        [CHARACTER_SACHIE_ID, 'こんなに小さいのに、物凄く大きな声で鳴くんだって。'],
        [CHARACTER_RAIMU_ID, 'へえ…。'],
      ],
      [
        [CHARACTER_RAIMU_ID, 'お姉ちゃんの夢叶えられるかな…。'],
        [CHARACTER_SACHIE_ID, '一緒なら問題ない！'],
        [CHARACTER_RAIMU_ID, 'はい…！'],
      ],
      [
        [CHARACTER_RAIMU_ID, 'この前行ったクレープ屋さん、凄く美味しかったです！'],
        [CHARACTER_SACHIE_ID, 'ふふ、でしょう？また次、一緒に行こうね。'],
        [CHARACTER_RAIMU_ID, 'はい！'],
      ],
      [
        [CHARACTER_RAIMU_ID, '聖恋ちゃん、最近もっと頑張ってるみたい。私ももっと頑張らないと…！'],
        [CHARACTER_SACHIE_ID, 'あまり無理はしないでね。'],
        [CHARACTER_SACHIE_ID, 'はい…！'],
      ],
      [
        [CHARACTER_SACHIE_ID, '細かい作業はなんでこんなに難しいんだろう…。'],
        [CHARACTER_RAIMU_ID, '幸恵お姉さまでも出来ない事があるんですね、へへっ。'],
        [CHARACTER_SACHIE_ID, 'ん…。私も普通の人だもん。'],
      ],
      [
        [CHARACTER_RAIMU_ID, '時々私の力が怖くなるんです…。'],
        [CHARACTER_SACHIE_ID, '来夢…。'],
      ],
    ]
  ],
  [
    LANG_EN, [
      [
        [CHARACTER_SACHIE_ID, 'Raimu, have you ever seen a cicada?'],
        [CHARACTER_RAIMU_ID, '(shaking her head)'],
        [CHARACTER_SACHIE_ID, 'Mirai-oneesama said she had seen it before.'],
        [CHARACTER_RAIMU_ID, 'She was...'],
        [CHARACTER_SACHIE_ID, 'It is very small, but buzz loudly.'],
        [CHARACTER_RAIMU_ID, 'Wow...'],
      ],
      [
        [CHARACTER_RAIMU_ID, 'I wonder I could make my sister\'s dream come true...'],
        [CHARACTER_SACHIE_ID, 'There is no problem if we do together.'],
        [CHARACTER_RAIMU_ID, 'Thank you, oneesama...!'],
      ],
      [
        [CHARACTER_RAIMU_ID, 'The crepe shop where we went, there crepes were so good!'],
        [CHARACTER_SACHIE_ID, 'Haha, right? Let\'s go there together again.'],
        [CHARACTER_RAIMU_ID, 'Why not!'],
      ],
      [
        [CHARACTER_RAIMU_ID, ' Recently, Seren-chan is doing her best more and more. I\'ve got to try harder too...!'],
        [CHARACTER_SACHIE_ID, 'Please don\'t strain yourself too much.'],
        [CHARACTER_SACHIE_ID, 'I will.'],
      ],
      [
        [CHARACTER_SACHIE_ID, 'It is so hard to pay close attention to all of the small things...'],
        [CHARACTER_RAIMU_ID, 'I thought you are a perfect person! But you are not detail-oriented, haha.'],
        [CHARACTER_SACHIE_ID, 'hey... I\'m a normal person.'],
      ],
      [
        [CHARACTER_RAIMU_ID, 'I often feel so scared my power from Huge...'],
        [CHARACTER_SACHIE_ID, 'Raimu...'],
      ],
    ]
  ],
]);


/**
 * Export Scripts
 * 
 */

export const RANDOM_TEXTS = new Map([
  [CHARACTER_RAIMU_ID, RANDOM_THINKING_RAIMU],
  [CHARACTER_MAI_ID, RANDOM_THINKING_MAI],
]);

export const RANDOM_CONVERSATION = new Map([
  [
    CHARACTER_RAIMU_ID, new Map([
      [
        CHARACTER_SACHIE_ID, new Map([
          ['start', STARTING_DIALOGUE_WITH_SACHIE],
          ['random', RAIMU_SACHIE_DIALOGUE],
          ['end', ENDING_DIALOGUE_WITH_SACHIE],
        ])
      ],
    ])
  ],
]);
