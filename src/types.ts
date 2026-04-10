export interface VIPUser {
  id: string;
  name: string;
  age: number;
  level: 'Diamond' | 'Platinum' | 'Gold';
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
    totalSpending: 3800000,
    lastActive: '2026-04-07',
    personalityTraits: ['導師型', '分析型', '支持型', '保護型'],
    conversationSnippets: [
      "你今天的努力沒有白費，每次要求自己的業績都有到，我其實很高興。",
      "你是我的軍師，不管結果如何，我都會去面對。",
      "我看不得妳票賣不好。",
      "新的自媒體方案你有打算要怎麼做嗎？"
    ],
    bio: "52歲資深大叔。Level 100 資深玩家。性格溫暖且具備分析頭腦，常扮演主播的「軍師」角色，協助規劃業績與應對策略。非常看重主播的成長與努力。",
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
    age: 35,
    level: 'Platinum',
    totalSpending: 1200000,
    lastActive: '2026-04-06',
    personalityTraits: ['情感豐富', '投入', '脆弱', '強烈'],
    conversationSnippets: [
      "我可以放棄一切，就是不能失去你。",
      "我真的沒有你...",
      "我承認我幼稚我白目，但我一直以來都很珍惜。",
      "希望大家理解金金，不要因為我的事而對金金有所偏見。"
    ],
    bio: "35歲深情大哥哥。情感極度投入的客戶。將平台互動視為真實情感關係，容易受情緒波動影響。需要大量的關注與情感確認，對主播有極高的忠誠度與依賴感。",
    birthday: '1991-02-14',
    zodiac: '水瓶座',
    bloodType: 'B型',
    personalityScores: {
      loyalty: 95,
      spending: 60,
      engagement: 88,
      emotionality: 98,
      strategic: 15
    }
  },
  {
    id: 'sky537',
    name: 'sky537',
    age: 42,
    level: 'Platinum',
    totalSpending: 950000,
    lastActive: '2026-04-07',
    personalityTraits: ['活動導向', '熱情', '慷慨', '計畫型'],
    conversationSnippets: [
      "也要感謝🍬🍬能陪我一起參加官方活動。",
      "嘿嘿帶主播去同樂會免刷💎福利還有嗎？",
      "剩下30等的名牌囉，四月要休息一下卡已經刷爆了。",
      "真的平台線下活動第一次看到參加人數破百越來越熱鬧了。"
    ],
    bio: "42歲熱血大叔。線下活動愛好者。熱衷於參加官方同樂會，對平台社群活動有極高參與度。消費力穩定，喜歡與主播在現實活動中互動。",
    birthday: '1984-08-05',
    zodiac: '獅子座',
    bloodType: 'AB型',
    personalityScores: {
      loyalty: 80,
      spending: 55,
      engagement: 92,
      emotionality: 45,
      strategic: 60
    }
  },
  {
    id: 'q888888qq',
    name: 'q888888qq',
    age: 38,
    level: 'Gold',
    totalSpending: 650000,
    lastActive: '2026-04-05',
    personalityTraits: ['隨興', '社交型', '美食家', '直率'],
    conversationSnippets: [
      "約個時間吃飯啊，下禮拜二三四你挑一天。",
      "妳想吃哪家？橘色一館 4/8 19:00。",
      "火鍋是邪教，不吃。",
      "我剛上線而已，你變態喔。"
    ],
    bio: "38歲隨興大哥哥。社交目的明確的客戶。喜歡約主播線下聚餐，溝通風格幽默且隨興。對特定食物有強烈偏好（如：不吃火鍋），重視線下的真實社交體驗。",
    birthday: '1988-12-25',
    zodiac: '摩羯座',
    bloodType: 'O型',
    personalityScores: {
      loyalty: 50,
      spending: 45,
      engagement: 70,
      emotionality: 30,
      strategic: 40
    }
  }
];
