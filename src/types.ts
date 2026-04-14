export interface VIPUser {
  id: string;
  name: string;
  age: number;
  level: 'Diamond' | 'Platinum' | 'Gold';
  numericLevel?: number;
  totalSpending: number;
  lastActive: string;
  personalityTraits: string[];
  conversationSnippets: string[];
  favoriteStreamers?: { name: string; spending: number; status?: string }[];
  birthday?: string;
  zodiac?: string;
  bloodType?: string;
  personalityScores?: {
    loyalty: number;
    spending: number;
    engagement: number;
    emotionality: number;
    strategic: number;
  };
  bio?: string;
}

export const MOCK_VIPS: VIPUser[] = [
  {
    id: 'jmarx5168',
    name: 'jmarx5168',
    age: 42,
    level: 'Diamond',
    numericLevel: 100,
    totalSpending: 52000000, // Updated based on millions in records
    lastActive: '2026-04-10',
    personalityTraits: ['極致美學', '契約精神', '支配型', '高期望', '溫柔導師'],
    conversationSnippets: [
      "採用半開放式的超跑儀表板輪廓，指針停留在轉速紅線區（Redline）邊緣，象徵即使身為過客，也擁有極致。",
      "我對平台的支持已經到了傾家蕩產的地步了，你們有沒有工作可以讓我去打工？我好窮。",
      "一百等的帳號需要大量資金來撐，希望福利可以與時並進。",
      "這筆一對一的約定是 3/9 達成的，至今已經過了 12 天都沒有履行... 我已經請客服介入處理退還點數",
      "妳說過了啊，我收到了，謝謝啦！我就喜歡看美美的妳，哪怕是一生只有短暫幾次的機會，吾願足矣。",
      "我投入了大量的資金和心血，沒有要求任何回報，卻遭致冷暴力和鄙視言詞，我無法接受。"
    ],
    favoriteStreamers: [
      { name: 'neinei_chen', spending: 23715334, status: '鬧翻/申訴中' },
      { name: 'starry417', spending: 1250000, status: '極度欣賞/守護中' },
      { name: '凱希Cathy', spending: 954440, status: '誠信糾紛/投訴中' },
      { name: '_xiaokui.', spending: 7562167, status: '穩定支持' },
      { name: 'quinniee', spending: 523010, status: '互動頻繁' }
    ],
    birthday: '1983-12-22',
    zodiac: '摩羯座',
    bloodType: 'O型',
    bio: "42歲極致型大戶。崇尚「紅線區」美學，追求極限與存在感。極度重視契約精神與對等尊重，對不誠信的主播（如 neinei, Cathy）會展現冷酷的審判者姿態；但對真誠的主播（如 starry417）則展現溫柔導師的一面，願意傾力守護。近期因車禍與100等福利延遲，情緒處於高度敏感期。",
    personalityScores: {
      loyalty: 65,
      spending: 99,
      engagement: 90,
      emotionality: 75,
      strategic: 85
    }
  },
  {
    id: 'aa6655891',
    name: 'aa6655891',
    age: 52,
    level: 'Diamond',
    numericLevel: 52,
    totalSpending: 12580000, // Updated based on detailed gift records
    lastActive: '2026-04-14',
    personalityTraits: ['導師型', '分析型', '支持型', '廣泛播種'],
    conversationSnippets: [
      "你今天的努力沒有白費，每次要求自己的業績都有到，我其實很高興。",
      "你是我的軍師，不管結果如何，我都會去面對。",
      "我看不得妳票賣不好。",
      "新的自媒體方案你有打算要怎麼做嗎？"
    ],
    favoriteStreamers: [
      { name: 'yuansi9551429', spending: 8400751, status: '核心守護' },
      { name: 'athena_77', spending: 604032, status: '重點支持' },
      { name: 'pufferfish0307', spending: 393419, status: '穩定互動' },
      { name: 'yang_you', spending: 352341, status: '穩定互動' },
      { name: 'yu_uuuuu', spending: 229265, status: '穩定互動' },
      { name: '_xiaokui.', spending: 77791, status: '一般支持' }
    ],
    bio: "52歲資深大叔。自 2019-10-18 加入平台的資深玩家。性格溫暖且具備分析頭腦，常扮演主播的「軍師」角色。消費模式呈現「一主多從」，對核心主播 yuansi9551429 投入超過 800 萬鑽石，同時也廣泛支持數百位主播，是平台極具影響力的意見領袖。",
    birthday: '1974-11-20',
    zodiac: '天蠍座',
    bloodType: 'A型',
    personalityScores: {
      loyalty: 90,
      spending: 85,
      engagement: 75,
      emotionality: 50,
      strategic: 92
    }
  },
  {
    id: 'hpwwph21',
    name: 'hpwwph21 (21)',
    age: 28,
    level: 'Platinum',
    numericLevel: 39,
    totalSpending: 52000000, // Estimated total based on records
    lastActive: '2026-04-14',
    personalityTraits: ['落魄公子哥', 'CEO午餐成員', '深情', '脆弱'],
    conversationSnippets: [
      "我可以放棄一切，就是不能失去你。",
      "我真的沒有你...",
      "我承認我幼稚我白目，但我一直以來都很珍惜。",
      "希望大家理解金金，不要因為我的事而對金金有所偏見。"
    ],
    favoriteStreamers: [
      { name: 'chinchin1010', spending: 13655111, status: '現任/私下關係' },
      { name: 'nitavsvs', spending: 15157846, status: '前任/已斷聯' },
      { name: 'stellajs', spending: 5336058, status: '穩定支持' },
      { name: 'honeyhot', spending: 3379276, status: '穩定支持' },
      { name: 'belene.', spending: 1092804, status: '近期聯絡' }
    ],
    bio: "28歲落魄公子哥。1997-07-10生，曾是家境優渥的工廠小開，參加過CEO午餐。因家裡欠債現需工作還債，等級從全盛期掉到LV.39。情感經歷坎坷，曾與nitavsvs有過一段深刻但以爭吵收場的關係，目前與chinchin1010維持私下關係，近期亦與belene.頻繁聯絡。",
    birthday: '1997-07-10',
    zodiac: '巨蟹座',
    bloodType: 'B型',
    personalityScores: {
      loyalty: 85,
      spending: 50, // 因家境變故下降
      engagement: 95,
      emotionality: 98,
      strategic: 20
    }
  },
  {
    id: 'sky537',
    name: 'sky537',
    age: 42,
    level: 'Platinum',
    numericLevel: 40,
    totalSpending: 8500000, // Updated based on detailed gift and chat records
    lastActive: '2026-04-14',
    personalityTraits: ['和善大叔', '線下暖男', '慷慨', '好說話'],
    conversationSnippets: [
      "也要感謝🍬🍬能陪我一起參加官方活動。",
      "嘿嘿帶主播去同樂會免刷💎福利還有嗎？",
      "剩下30等的名牌囉，四月要休息一下卡已經刷爆了。",
      "真的平台線下活動第一次看到參加人數破百越來越熱鬧了。"
    ],
    favoriteStreamers: [
      { name: 'sexylisaw', spending: 2248344, status: '重點守護' },
      { name: 'suunny950', spending: 1191044, status: '重點支持' },
      { name: 'belene.', spending: 1025901, status: '重點支持' },
      { name: 'sexyvanessa', spending: 610731, status: '穩定互動' },
      { name: 'sugercathy', spending: 533008, status: '穩定互動' },
      { name: 'mollyflower', spending: 416753, status: '穩定互動' }
    ],
    bio: "42歲和善大叔。線下活動的靈魂人物，每次參加活動都會貼心地準備大量小禮物送給主播與工作人員。性格極其溫和且非常好溝通。消費模式呈現「多點開花」，對核心主播 sexylisaw 投入超過 200 萬鑽石，是官方與主播公認的暖男型 VIP。",
    birthday: '1984-08-05',
    zodiac: '獅子座',
    bloodType: 'AB型',
    personalityScores: {
      loyalty: 85,
      spending: 55,
      engagement: 98,
      emotionality: 60,
      strategic: 40
    }
  },
  {
    id: 'q888888qq',
    name: 'q888888qq',
    age: 38,
    level: 'Gold',
    numericLevel: 80,
    totalSpending: 23500000, // Updated based on detailed gift and chat records
    lastActive: '2026-04-14',
    personalityTraits: ['隨興', '社交型', '美食家', '直率'],
    conversationSnippets: [
      "約個時間吃飯啊，下禮拜二三四你挑一天。",
      "妳想吃哪家？橘色一館 4/8 19:00。",
      "火鍋是邪教，不吃。",
      "我剛上線而已，你變態喔。"
    ],
    favoriteStreamers: [
      { name: 'mochi_chi', spending: 19910593, status: '絕對守護' },
      { name: 'sun_chu', spending: 932784, status: '重點支持' },
      { name: 'chinchin1010', spending: 944632, status: '重點支持' },
      { name: 'flower_bb', spending: 585603, status: '穩定互動' },
      { name: 'colavsvs', spending: 245469, status: '穩定互動' },
      { name: 'nesu_cute', spending: 220768, status: '穩定互動' }
    ],
    bio: "38歲隨興大哥哥。自 2022-03-12 加入平台的社交型 VIP。性格直率且幽默，對特定美食（如橘色火鍋）有強烈偏好。消費模式極度集中，對核心主播 mochi_chi 投入近 2000 萬鑽石，展現出驚人的單點忠誠度。目前等級為 LV.80。",
    birthday: '1988-12-25',
    zodiac: '摩羯座',
    bloodType: 'O型',
    personalityScores: {
      loyalty: 95, // 因對單一主播極度集中而上調
      spending: 85, // 根據千萬級消費上調
      engagement: 75,
      emotionality: 40,
      strategic: 50
    }
  }
];
