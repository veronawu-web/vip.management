export interface VIPUser {
  id: string;
  name: string;
  age: number;
  level: 'Diamond' | 'Platinum' | 'Gold';
  totalSpending: number;
  lastActive: string;
  personalityTraits: string[];
  conversationSnippets: string[];
  avatarUrl?: string;
  avatarDescription?: string;
  bio?: string;
}

export const MOCK_VIPS: VIPUser[] = [
  {
    id: 'jmarx5168',
    name: 'jmarx5168',
    age: 48,
    level: 'Diamond',
    totalSpending: 5200000,
    lastActive: '2026-04-07',
    personalityTraits: ['Dominant', 'High Expectations', 'Strategic', 'Direct'],
    conversationSnippets: [
      "因為我付了錢，懂？",
      "錢我多的是，妳算什麼咖？",
      "妳不自以為，就覺得全世界都要聽你的",
      "妳的努力，我看得出來，是我少數會解鎖的限動"
    ],
    bio: "48歲成熟大叔。Level 95 頂級大戶。極度重視效率與個人權益，溝通風格直接且帶有強烈主導權。對認可的主播會給予極高額度的支持，但對服務品質要求極其嚴苛。",
  },
  {
    id: 'aa6655891',
    name: 'aa6655891',
    age: 52,
    level: 'Diamond',
    totalSpending: 3800000,
    lastActive: '2026-04-07',
    personalityTraits: ['Mentor-like', 'Analytical', 'Supportive', 'Protective'],
    conversationSnippets: [
      "你今天的努力沒有白費，每次要求自己的業績都有到，我其實很高興。",
      "你是我的軍師，不管結果如何，我都會去面對。",
      "我看不得妳票賣不好。",
      "新的自媒體方案你有打算要怎麼做嗎？"
    ],
    bio: "52歲資深大叔。Level 100 資深玩家。性格溫暖且具備分析頭腦，常扮演主播的「軍師」角色，協助規劃業績與應對策略。非常看重主播的成長與努力。",
  },
  {
    id: 'hpwwph21',
    name: 'hpwwph21 (21)',
    age: 35,
    level: 'Platinum',
    totalSpending: 1200000,
    lastActive: '2026-04-06',
    personalityTraits: ['Emotional', 'Devoted', 'Vulnerable', 'Intense'],
    conversationSnippets: [
      "我可以放棄一切，就是不能失去你。",
      "我真的不能沒有你...",
      "我承認我幼稚我白目，但我一直以來都很珍惜。",
      "希望大家理解金金，不要因為我的事而對金金有所偏見。"
    ],
    bio: "35歲深情大哥哥。情感極度投入的客戶。將平台互動視為真實情感關係，容易受情緒波動影響。需要大量的關注與情感確認，對主播有極高的忠誠度與依賴感。",
  },
  {
    id: 'sky537',
    name: 'sky537',
    age: 42,
    level: 'Platinum',
    totalSpending: 950000,
    lastActive: '2026-04-07',
    personalityTraits: ['Event-focused', 'Enthusiastic', 'Generous', 'Planning'],
    conversationSnippets: [
      "也要感謝🍬🍬能陪我一起參加官方活動。",
      "嘿嘿帶主播去同樂會免刷💎福利還有嗎？",
      "剩下30等的名牌囉，四月要休息一下卡已經刷爆了。",
      "真的平台線下活動第一次看到參加人數破百越來越熱鬧了。"
    ],
    bio: "42歲熱血大叔。線下活動愛好者。熱衷於參加官方同樂會，對平台社群活動有極高參與度。消費力穩定，喜歡與主播在現實活動中互動。",
  },
  {
    id: 'q888888qq',
    name: 'q888888qq',
    age: 38,
    level: 'Gold',
    totalSpending: 650000,
    lastActive: '2026-04-05',
    personalityTraits: ['Casual', 'Social', 'Foodie', 'Straightforward'],
    conversationSnippets: [
      "約個時間吃飯啊，下禮拜二三四你挑一天。",
      "妳想吃哪家？橘色一館 4/8 19:00。",
      "火鍋是邪教，不吃。",
      "我剛上線而已，你變態喔。"
    ],
    bio: "38歲隨興大哥哥。社交目的明確的客戶。喜歡約主播線下聚餐，溝通風格幽默且隨興。對特定食物有強烈偏好（如：不吃火鍋），重視線下的真實社交體驗。",
  }
];
