import { useState, useEffect } from 'react';
import { PunchBoxModal } from './punch-box-modal';

interface Mission {
  title: string;
  emoji: string;
  description: string;
  type: 'R' | 'F' | 'C'; // Romance, Fun, Challenge
}

interface DailyTasks {
  day: number;
  location: string;
  emoji: string;
  tasks: {
    romance: Mission;
    fun: Mission;
    challenge: Mission;
  };
}

interface MapNode {
  id: string;
  day: number;
  x: number;
  y: number;
  location: string;
  emoji: string;
}

// Daily tasks with three options each day
const dailyTasks: DailyTasks[] = [
  {
    day: 1, location: '記憶森林入口', emoji: '🌸',
    tasks: {
      romance: { title: '浪漫回憶', emoji: '💕', description: '分享一個過去一年中最喜歡的共同回憶，並說出為什麼這個回憶對你很特別。', type: 'R' },
      fun: { title: '回憶拼圖', emoji: '🧩', description: '一起完成一個小拼圖，邊拼邊聊天分享最近的趣事。', type: 'F' },
      challenge: { title: '冥想時光', emoji: '🧘', description: '一起做 10 分鐘的伸展操或瑜伽，感受彼此的呼吸節奏。', type: 'C' }
    }
  },
  {
    day: 2, location: '甜蜜咖啡屋', emoji: '☕',
    tasks: {
      romance: { title: '情話咖啡', emoji: '💌', description: '各自沖一杯茶或咖啡，並用三句最甜蜜的話分享今天的亮點。', type: 'R' },
      fun: { title: '猜猜遊戲', emoji: '🎯', description: '玩 20 個問題猜物遊戲，從房間選一個東西開始，輸的人要被親一下。', type: 'F' },
      challenge: { title: '深度對話', emoji: '💭', description: '聊聊各自最近學到的一件新事物，分享內心的想法。', type: 'C' }
    }
  },
  {
    day: 3, location: '智慧圖書館', emoji: '📖',
    tasks: {
      romance: { title: '愛的故事', emoji: '📚', description: '各自選一篇有趣的文章或 podcast，摘要給對方聽，並說說為什麼想分享。', type: 'R' },
      fun: { title: '文字遊戲', emoji: '🎲', description: '玩一個簡單的紙筆遊戲，如井字遊戲或文字接龍，增加點小賭注。', type: 'F' },
      challenge: { title: '知識分享', emoji: '🧠', description: '各自分享一個最近讀到的有趣知識或事實，教會對方一個新東西。', type: 'C' }
    }
  },
  {
    day: 4, location: '溫馨小廚房', emoji: '🍳',
    tasks: {
      romance: { title: '愛心料理', emoji: '💝', description: '一起想三個週末晚餐的點子並挑一個，為愛人準備特別的料理。', type: 'R' },
      fun: { title: '料理大賽', emoji: '👨‍🍳', description: '來場迷你料理PK，看誰能做出更有創意的點心或飲品。', type: 'F' },
      challenge: { title: '整理時光', emoji: '📦', description: '一起花 15 分鐘整理一個抽屜或桌面區域，創造更美好的生活空間。', type: 'C' }
    }
  },
  {
    day: 5, location: '未來規劃台', emoji: '🎯',
    tasks: {
      romance: { title: '愛的承諾', emoji: '💍', description: '寫下一個自己未來一年想完成的目標，然後向對方承諾會努力實現。', type: 'R' },
      fun: { title: '夢想清單', emoji: '⭐', description: '各自列出三個今年想完成的搞笑或有趣願望並分享。', type: 'F' },
      challenge: { title: '實際規劃', emoji: '📅', description: '一起規劃下週的一個實際活動或任務，做好詳細安排。', type: 'C' }
    }
  },
  // Continue with more days...
  {
    day: 6, location: '音樂花園', emoji: '🎵',
    tasks: {
      romance: { title: '情歌時光', emoji: '🎶', description: '一起聽一首新歌，分享各自的感受，並說說這首歌讓你想到什麼。', type: 'R' },
      fun: { title: '音樂遊戲', emoji: '🎤', description: '來場卡拉OK或哼歌比賽，看誰先讓對方笑出來。', type: 'F' },
      challenge: { title: '音樂冥想', emoji: '🧘‍♀️', description: '閉上眼睛一起聽 10 分鐘純音樂，感受彼此的存在。', type: 'C' }
    }
  },
  {
    day: 7, location: '遊戲角落', emoji: '🎲',
    tasks: {
      romance: { title: '愛的問答', emoji: '💝', description: '輪流問對方一個從來沒問過的問題，誠實回答。', type: 'R' },
      fun: { title: '趣味競賽', emoji: '🏆', description: '玩一個簡單的紙筆遊戲，輸的人要完成一個搞笑任務。', type: 'F' },
      challenge: { title: '默契測試', emoji: '🤝', description: '玩默契遊戲：同時指向房間裡的某個物品，看看你們的默契。', type: 'C' }
    }
  },
  {
    day: 8, location: '計劃工作室', emoji: '📅',
    tasks: {
      romance: { title: '浪漫計畫', emoji: '💍', description: '一起規劃一個特別的約會，可以是未來的小旅行。', type: 'R' },
      fun: { title: '瘋狂清單', emoji: '📝', description: '列出三個搞笑或瘋狂的願望清單並分享。', type: 'F' },
      challenge: { title: '實用規劃', emoji: '🗓️', description: '一起規劃下週的實際活動或任務，做好詳細安排。', type: 'C' }
    }
  },
  {
    day: 9, location: '回憶相簿', emoji: '📷',
    tasks: {
      romance: { title: '甜蜜回憶', emoji: '💕', description: '翻看舊照片，各自說一個最甜蜜的回憶片段。', type: 'R' },
      fun: { title: '搞笑照片', emoji: '📸', description: '找出最搞笑的合照，重現當時的表情和動作。', type: 'F' },
      challenge: { title: '回憶分享', emoji: '🗣️', description: '認真聊聊過去一年的成長和變化。', type: 'C' }
    }
  },
  {
    day: 10, location: '禪意角落', emoji: '🕯️',
    tasks: {
      romance: { title: '浪漫燭光', emoji: '🕯️', description: '點一根蠟燭，在燭光下靜靜享受彼此的陪伴。', type: 'R' },
      fun: { title: '放鬆遊戲', emoji: '😌', description: '比賽誰能保持最放鬆的姿勢最久，輸的人按摩獲勝者。', type: 'F' },
      challenge: { title: '冥想時光', emoji: '🧘', description: '一起做 5 分鐘的呼吸冥想或靜坐。', type: 'C' }
    }
  },
  {
    day: 11, location: '學習中心', emoji: '📚',
    tasks: {
      romance: { title: '愛的課堂', emoji: '💌', description: '教對方一個你會的技能，並給予鼓勵和讚美。', type: 'R' },
      fun: { title: '知識競賽', emoji: '🧠', description: '互相出題考對方，答錯要接受小懲罰。', type: 'F' },
      challenge: { title: '知識分享', emoji: '📖', description: '各自分享一個最近讀到的有趣知識或事實。', type: 'C' }
    }
  },
  {
    day: 12, location: '感恩樹下', emoji: '🙏',
    tasks: {
      romance: { title: '愛的感謝', emoji: '💖', description: '寫一張小紙條，列出三件最感謝對方的事情。', type: 'R' },
      fun: { title: '感謝表演', emoji: '🎭', description: '用誇張的方式表達感謝，越戲劇化越好。', type: 'F' },
      challenge: { title: '感謝時刻', emoji: '🙏', description: '各自說三件今天值得感謝的小事。', type: 'C' }
    }
  },
  {
    day: 13, location: '創意工坊', emoji: '🎨',
    tasks: {
      romance: { title: '愛的藝術', emoji: '💝', description: '為對方畫一幅簡單的畫或寫幾句詩。', type: 'R' },
      fun: { title: '搞笑創作', emoji: '🤹', description: '一起創作搞笑的故事或畫出對方的Q版形象。', type: 'F' },
      challenge: { title: '創意時間', emoji: '✨', description: '一起畫個簡單的塗鴉或做個小手工。', type: 'C' }
    }
  },
  {
    day: 14, location: '舒適按摩椅', emoji: '🤲',
    tasks: {
      romance: { title: '愛的按摩', emoji: '💆‍♀️', description: '給對方做溫柔的肩膀按摩，並說些甜蜜的話。', type: 'R' },
      fun: { title: '按摩競賽', emoji: '🏅', description: '比賽誰的按摩技術更好，由被按摩者評分。', type: 'F' },
      challenge: { title: '舒適按摩', emoji: '🤗', description: '輪流給對方做 5 分鐘的手部或肩膀按摩。', type: 'C' }
    }
  },
  {
    day: 15, location: '願望許願池', emoji: '⭐',
    tasks: {
      romance: { title: '愛的願望', emoji: '💫', description: '向許願池許下關於你們關係的美好願望。', type: 'R' },
      fun: { title: '搞怪願望', emoji: '🌠', description: '各自許一個搞笑或奇怪的願望並分享。', type: 'F' },
      challenge: { title: '願望清單', emoji: '📝', description: '各自列出三個今年想完成的實際目標並分享。', type: 'C' }
    }
  },
  {
    day: 16, location: '料理實驗室', emoji: '🧪',
    tasks: {
      romance: { title: '愛心料理', emoji: '👨‍🍳', description: '一起準備一個特別的點心，餵對方吃第一口。', type: 'R' },
      fun: { title: '瘋狂實驗', emoji: '🥼', description: '嘗試做一個奇怪的食物組合，看誰敢吃。', type: 'F' },
      challenge: { title: '料理時光', emoji: '🍳', description: '一起準備一個簡單的點心或飲品。', type: 'C' }
    }
  },
  {
    day: 17, location: '觀察望台', emoji: '👀',
    tasks: {
      romance: { title: '深情凝視', emoji: '😍', description: '看著對方的眼睛 30 秒，不說話只用眼神表達愛意。', type: 'R' },
      fun: { title: '觀察遊戲', emoji: '🔍', description: '比賽誰能觀察到更多房間裡的細節，輪流分享發現。', type: 'F' },
      challenge: { title: '觀察練習', emoji: '🧐', description: '花 5 分鐘安靜地觀察窗外，然後分享各自看到的細節。', type: 'C' }
    }
  },
  {
    day: 18, location: '溫柔休息室', emoji: '🤗',
    tasks: {
      romance: { title: '溫柔擁抱', emoji: '💕', description: '給對方一個長長的擁抱，感受彼此的溫暖。', type: 'R' },
      fun: { title: '擁抱競賽', emoji: '🏆', description: '比賽各種創意擁抱姿勢，看誰更有創意。', type: 'F' },
      challenge: { title: '溫柔時光', emoji: '☁️', description: '簡單的擁抱和安靜的陪伴，不需要說話。', type: 'C' }
    }
  },
  {
    day: 19, location: '驚喜準備區', emoji: '🎁',
    tasks: {
      romance: { title: '愛的驚喜', emoji: '💝', description: '為明天準備一個浪漫的小驚喜或紀念品。', type: 'R' },
      fun: { title: '搞笑驚喜', emoji: '🎪', description: '準備一個搞笑的小道具或表演給對方驚喜。', type: 'F' },
      challenge: { title: '準備驚喜', emoji: '🎀', description: '為明天的最終日準備一個實用的小驚喜或紀念品。', type: 'C' }
    }
  },
  {
    day: 20, location: '一週年紀念台', emoji: '🌟',
    tasks: {
      romance: { title: '愛的宣言', emoji: '💍', description: '交換手寫的愛情宣言，慶祝我們的第一個週年紀念！', type: 'R' },
      fun: { title: '週年慶典', emoji: '🎉', description: '舉辦小型慶祝派對，用搞笑方式重現過去一年的回憶。', type: 'F' },
      challenge: { title: '週年總結', emoji: '📋', description: '一起總結這一年的成長，並規劃下一年的目標。', type: 'C' }
    }
  }
];

// Map nodes for visual layout (days 1-21)
const mapNodes: MapNode[] = [
  { id: 'day-1', day: 1, x: 15, y: 80, location: '記憶森林入口', emoji: '🌸' },
  { id: 'day-2', day: 2, x: 25, y: 65, location: '甜蜜咖啡屋', emoji: '☕' },
  { id: 'day-3', day: 3, x: 40, y: 55, location: '智慧圖書館', emoji: '📖' },
  { id: 'day-4', day: 4, x: 55, y: 45, location: '溫馨小廚房', emoji: '🍳' },
  { id: 'day-5', day: 5, x: 70, y: 35, location: '未來規劃台', emoji: '🎯' },
  { id: 'day-6', day: 6, x: 88, y: 35, location: '音樂花園', emoji: '🎵' },
  { id: 'day-7', day: 7, x: 85, y: 50, location: '遊戲角落', emoji: '🎲' },
  { id: 'day-8', day: 8, x: 80, y: 65, location: '計劃工作室', emoji: '📅' },
  { id: 'day-9', day: 9, x: 75, y: 75, location: '回憶相簿', emoji: '📷' },
  { id: 'day-10', day: 10, x: 65, y: 80, location: '禪意角落', emoji: '🕯️' },
  { id: 'day-11', day: 11, x: 55, y: 85, location: '學習中心', emoji: '📚' },
  { id: 'day-12', day: 12, x: 45, y: 88, location: '感恩樹下', emoji: '🙏' },
  { id: 'day-13', day: 13, x: 35, y: 85, location: '創意工坊', emoji: '🎨' },
  { id: 'day-14', day: 14, x: 25, y: 80, location: '舒適按摩椅', emoji: '🤲' },
  { id: 'day-15', day: 15, x: 20, y: 70, location: '願望許願池', emoji: '⭐' },
  { id: 'day-16', day: 16, x: 18, y: 55, location: '料理實驗室', emoji: '🧪' },
  { id: 'day-17', day: 17, x: 20, y: 40, location: '觀察望台', emoji: '👀' },
  { id: 'day-18', day: 18, x: 25, y: 30, location: '溫柔休息室', emoji: '🤗' },
  { id: 'day-19', day: 19, x: 35, y: 25, location: '驚喜準備區', emoji: '🎁' },
  { id: 'day-20', day: 20, x: 50, y: 20, location: '一週年紀念台', emoji: '🌟' }
];

export function InteractiveMap() {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<{[day: number]: 'romance' | 'fun' | 'challenge'}>({});
  const [showTaskSelector, setShowTaskSelector] = useState<number | null>(null);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [showMessage, setShowMessage] = useState<string | null>(null);
  const [gamePhase, setGamePhase] = useState<'prologue' | 'adventure'>('prologue');
  
  const startDate = new Date('2025-07-26');

  useEffect(() => {
    const stored = localStorage.getItem('treasureHuntProgress');
    if (stored) {
      const progress = JSON.parse(stored);
      setCompletedDays(progress.completedDays || []);
      setSelectedTasks(progress.selectedTasks || {});
      setGamePhase(progress.gamePhase || 'prologue');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('treasureHuntProgress', JSON.stringify({
      completedDays,
      selectedTasks,
      gamePhase
    }));
  }, [completedDays, selectedTasks, gamePhase]);

  const getNodeDate = (dayNumber: number): Date => {
    const nodeDate = new Date(startDate);
    nodeDate.setDate(startDate.getDate() + dayNumber - 1);
    return nodeDate;
  };

  const isDayUnlocked = (dayNumber: number): boolean => {
    const currentDate = new Date();
    const nodeDate = getNodeDate(dayNumber);
    return currentDate >= nodeDate;
  };

  const handleNodeClick = (node: MapNode) => {
    if (!isDayUnlocked(node.day)) {
      const nodeDate = getNodeDate(node.day);
      setShowMessage(`🔒 這個地點還沒開放！請在 ${nodeDate.toLocaleDateString('zh-TW', { month: 'long', day: 'numeric' })} 再來探索！💫`);
      setTimeout(() => setShowMessage(null), 3000);
      return;
    }

    if (completedDays.includes(node.day)) {
      // Show completed task
      const taskType = selectedTasks[node.day];
      const dayTasks = dailyTasks.find(d => d.day === node.day);
      if (dayTasks && taskType) {
        setSelectedMission(dayTasks.tasks[taskType]);
        setShowMissionModal(true);
      }
    } else {
      // Show task selector
      setShowTaskSelector(node.day);
    }
  };

  const handleTaskSelection = (day: number, taskType: 'romance' | 'fun' | 'challenge') => {
    const dayTasks = dailyTasks.find(d => d.day === day);
    if (dayTasks) {
      setSelectedTasks(prev => ({ ...prev, [day]: taskType }));
      setCompletedDays(prev => [...prev, day]);
      setShowTaskSelector(null);
      setSelectedMission(dayTasks.tasks[taskType]);
      setShowMissionModal(true);
    }
  };

  const handlePrologueComplete = () => {
    setGamePhase('adventure');
  };

  if (gamePhase === 'prologue') {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-black rounded-3xl p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">🌟 序章：尋寶之旅開始</h2>
            <div className="text-6xl mb-6 animate-pulse">🗺️</div>
            <p className="text-xl mb-8 leading-relaxed">
              歡迎來到I💗C一週年尋寶之旅！<br/>
              接下來21天，每天都有驚喜等著你！
            </p>
            <div className="bg-white/10 rounded-2xl p-6 mb-8">
              <h3 className="text-2xl font-semibold mb-4">🎮 遊戲規則</h3>
              <div className="text-left space-y-2">
                <p>✓ 每天解鎖一個新地點</p>
                <p>✓ 三選一：選擇你想完成的任務類型</p>
                <p>✓ 甜蜜型💕、搞笑型😄、陪伴型🤗</p>
                <p>✓ 完成所有任務獲得週年驚喜🎁</p>
              </div>
            </div>
            <button
              onClick={handlePrologueComplete}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              開始尋寶之旅！🐶🐰
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Map Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold love-purple mb-2">
          🗺️ I💗C 一週年尋寶地圖
        </h2>
        <p className="text-gray-600">每天三選一，完成你最喜歡的任務類型！</p>
      </div>

      {/* Interactive Map */}
      <div className="relative bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 rounded-3xl p-8 h-96 md:h-[600px] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-4xl">🏔️</div>
          <div className="absolute top-20 right-20 text-3xl">☁️</div>
          <div className="absolute bottom-20 left-20 text-3xl">🌊</div>
          <div className="absolute bottom-10 right-10 text-4xl">🏰</div>
        </div>

        {/* Path connecting all nodes */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <path
            d={mapNodes.reduce((path, node, index) => {
              if (index === 0) return `M ${node.x}% ${node.y}%`;
              const prev = mapNodes[index - 1];
              return path + ` Q ${(prev.x + node.x) / 2}% ${(prev.y + node.y - 3) / 2}% ${node.x}% ${node.y}%`;
            }, '')}
            stroke="#FF69B4"
            strokeWidth="3"
            fill="none"
            strokeDasharray="8,4"
            opacity="0.5"
          />
        </svg>

        {/* Nodes */}
        {mapNodes.map((node) => {
          const isUnlocked = isDayUnlocked(node.day);
          const isCompleted = completedDays.includes(node.day);
          
          return (
            <div
              key={node.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                isUnlocked ? 'hover:scale-110' : 'cursor-not-allowed'
              }`}
              style={{ 
                left: `${node.x}%`, 
                top: `${node.y}%`,
                zIndex: 10
              }}
              onClick={() => handleNodeClick(node)}
            >
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center text-xl border-3 shadow-lg
                ${isCompleted 
                  ? 'bg-purple-500 border-purple-600 text-white' 
                  : isUnlocked 
                    ? 'bg-white border-pink-400 text-gray-800 hover:bg-pink-50' 
                    : 'bg-gray-300 border-gray-400 text-gray-500'
                }
              `}>
                {isCompleted ? '✨' : isUnlocked ? node.emoji : '🔒'}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium text-center">
                <div>Day {node.day}</div>
                <div className="text-gray-500">{node.location}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="bg-white rounded-full p-1 shadow-lg">
          <div 
            className="bg-gradient-to-r from-pink-400 to-purple-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${(completedDays.length / 20) * 100}%` }}
          />
        </div>
        <p className="text-center mt-2 text-gray-600 font-medium">
          尋寶進度：{completedDays.length} / 20 個任務已完成
        </p>
      </div>

      {/* Task Selector Modal */}
      {showTaskSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold love-purple text-center mb-6">
              Day {showTaskSelector} - {mapNodes.find(n => n.day === showTaskSelector)?.location}
            </h3>
            <p className="text-center text-gray-600 mb-6">選擇你想完成的任務類型：</p>
            
            <div className="space-y-4">
              {dailyTasks.find(d => d.day === showTaskSelector) && (
                <>
                  <button
                    onClick={() => handleTaskSelection(showTaskSelector, 'romance')}
                    className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white p-4 rounded-2xl hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">💕</span>
                      <div className="text-left">
                        <div className="font-semibold">甜蜜型</div>
                        <div className="text-sm opacity-90">讓人臉紅的浪漫任務</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleTaskSelection(showTaskSelector, 'fun')}
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white p-4 rounded-2xl hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">😄</span>
                      <div className="text-left">
                        <div className="font-semibold">搞笑型</div>
                        <div className="text-sm opacity-90">輕鬆有趣的小挑戰</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleTaskSelection(showTaskSelector, 'challenge')}
                    className="w-full bg-gradient-to-r from-purple-400 to-purple-500 text-white p-4 rounded-2xl hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🤗</span>
                      <div className="text-left">
                        <div className="font-semibold">陪伴型</div>
                        <div className="text-sm opacity-90">安靜相處的溫馨時光</div>
                      </div>
                    </div>
                  </button>
                </>
              )}
            </div>
            
            <button
              onClick={() => setShowTaskSelector(null)}
              className="w-full mt-4 bg-gray-500 text-white py-3 rounded-full hover:bg-gray-600 transition-all"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* Message */}
      {showMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white border-2 border-pink-400 rounded-2xl px-6 py-4 shadow-lg animate-bounce-gentle text-center max-w-sm mx-4">
          <p className="love-purple font-medium">{showMessage}</p>
        </div>
      )}

      {/* Mission Modal */}
      {selectedMission && showMissionModal && (
        <PunchBoxModal
          isOpen={showMissionModal}
          onClose={() => {
            setShowMissionModal(false);
            setSelectedMission(null);
          }}
          dayNumber={showTaskSelector || completedDays.find(d => selectedTasks[d]) || 1}
          mission={selectedMission}
        />
      )}
    </div>
  );
}