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
    age: 48,
    level: 'Diamond',
    totalSpending: 52000000, // Updated based on millions in records
    lastActive: '2026-04-08',
    personalityTraits: ['支配型', '高期望', '策略性', '直言不諱', '宣洩型'],
    conversationSnippets: [
      "因為我付了錢，懂？",
      "錢我多的是，妳算什麼咖？",
      "妳不自以為，就覺得全世界都要聽你的",
      "我討厭妳還幫妳？不主動找我這樣對嗎？",
      "這筆一對一的約定是 3/9 達成的，至今已經過了 12 天都沒有履行... 我已經請客服介入處理退還點數",
      "內內不太理我了，有點難解的誤會",
      "我撐起她業績，而且遙遙領先榜二，所以我不太懂為什麼她封鎖我"
    ],
    favoriteStreamers: [
      { name: 'neinei_chen', spending: 23715334, status: '鬧翻/封鎖中' },
      { name: '_xiaokui.', spending: 7562167 },
      { name: 'milk_xoxo', spending: 6052028 },
      { name: 'lovekikii', spending: 5193846 },
      { name: 'stellajs', spending: 4286795 },
      { name: 'quinniee', spending: 523010, status: '互動頻繁' }
    ],
    birthday: '1978-05-12',
    zodiac: '金牛座',
    bloodType: 'O型',
    bio: "48歲頂級大戶。極度重視「契約精神」與「對等尊重」。近期因高額消費（30萬鑽1對1）未被履行而與頭號主播 neinei_chen 爆發嚴重衝突並遭封鎖。目前處於情感空窗與焦慮轉移期，頻繁向其他主播（如 stellajs, chinchin1010）訴苦，尋求心理平衡。",
    personalityScores: {
      loyalty: 45, // 因鬧翻大幅下降
      spending: 99,
      engagement: 85,
      emotionality: 70, // 近期情緒波動大
      strategic: 80
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
