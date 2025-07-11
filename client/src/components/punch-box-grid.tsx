import { useState, useEffect } from 'react';
import { PunchBoxModal } from './punch-box-modal';

interface Mission {
  title: string;
  emoji: string;
  description: string;
}

const missions: Mission[] = [
  { title: "回憶花園", emoji: "🌸", description: "寫下我們在一起最美好的回憶，偷偷藏在我今天會發現的地方！💖" },
  { title: "情書山丘", emoji: "💌", description: "在我最愛的書裡留張小紙條，寫下你愛我的理由！📚💕" },
  { title: "未來之塔", emoji: "🏰", description: "告訴我一個你想和我一起去的地方，為什麼對我們很特別？✈️💝" },
  { title: "溫柔山谷", emoji: "🤗", description: "準備一場溫馨的電影之夜，帶上我最愛的零食和你最溫暖的擁抱！🍿❤️" },
  { title: "冒險之峰", emoji: "⛰️", description: "建議一個我們從未一起做過的有趣活動！讓我們勇敢冒險！🎯💫" },
  { title: "晨曦咖啡館", emoji: "☕", description: "用我最愛的晨間飲品和溫柔的吻把我叫醒！早安陽光！☀️💋" },
  { title: "音樂橋", emoji: "🎵", description: "創建一個5首歌的播放清單，都是讓你想起我們的歌，晚餐時播放！🎶💕" },
  { title: "星光港灣", emoji: "⭐", description: "今晚和我一起看星星，為我們的未來許個願！🌟💫" },
  { title: "歡笑泉", emoji: "😂", description: "告訴我你最搞笑的笑話，讓我笑到臉頰痛！🤭💖" },
  { title: "夢境城堡", emoji: "🏯", description: "分享一個你做過關於我們的夢──無論搞笑、甜蜜或超級奇怪！😴💭" },
  { title: "感恩林", emoji: "🙏", description: "列出3件你現在對我們關係感到感謝的事情！📝💚" },
  { title: "舞池", emoji: "💃", description: "在廚房裡和我一起跳舞，邊做晚餐邊跳──不需要音樂！🕺❤️" },
  { title: "拍照亭", emoji: "📸", description: "和我拍一張搞怪自拍，做你最好笑的表情！我們一起耍寶！🤪📱" },
  { title: "秘密花園", emoji: "🌺", description: "在我耳邊悄悄說一個你從未告訴過任何人的秘密！🤫💗" },
  { title: "時光機", emoji: "⏰", description: "如果你可以重新體驗和我在一起的任何一天，會是哪一天？為什麼？帶我回去！⏳💕" },
  { title: "魔法工作坊", emoji: "✨", description: "今天為我做一件意想不到的甜蜜事情──用你的創意給我驚喜！🎨💝" },
  { title: "舒適角落", emoji: "🛋️", description: "給我最放鬆的背部按摩，同時告訴我你今天的事情！💆‍♀️😌" },
  { title: "美食天堂", emoji: "🍕", description: "做或點我最愛的食物，親自餵我吃第一口！我餓了，想要愛的餵食！👄🍴" },
  { title: "寶藏島", emoji: "🏝️", description: "藏一個小禮物（可以很搞笑！）讓我找到，附上尋寶地圖！🗺️💎" },
  { title: "永恆森林", emoji: "🌲", description: "寫一封信告訴我你如何看待我們的未來──盡情做夢吧我的愛！💌🔮" }
];

export function PunchBoxGrid() {
  const [openedBoxes, setOpenedBoxes] = useState<number[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState<string | null>(null);
  
  const startDate = new Date('2024-07-27');

  useEffect(() => {
    const stored = localStorage.getItem('openedBoxes');
    if (stored) {
      setOpenedBoxes(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('openedBoxes', JSON.stringify(openedBoxes));
  }, [openedBoxes]);

  const getBoxDate = (dayNumber: number): Date => {
    const boxDate = new Date(startDate);
    boxDate.setDate(startDate.getDate() + dayNumber - 1);
    return boxDate;
  };

  const isBoxUnlocked = (dayNumber: number): boolean => {
    const currentDate = new Date();
    const boxDate = getBoxDate(dayNumber);
    return currentDate >= boxDate;
  };

  const isBoxOpened = (dayNumber: number): boolean => {
    return openedBoxes.includes(dayNumber);
  };

  const getBoxClass = (dayNumber: number): string => {
    if (isBoxOpened(dayNumber)) {
      return 'box-opened';
    } else if (isBoxUnlocked(dayNumber)) {
      return 'box-unlocked';
    } else {
      return 'box-locked';
    }
  };

  const getBoxIcon = (dayNumber: number): string => {
    if (isBoxOpened(dayNumber)) {
      return '💜';
    } else if (isBoxUnlocked(dayNumber)) {
      return '💝';
    } else {
      return '🔒';
    }
  };

  const handleBoxClick = (dayNumber: number) => {
    if (!isBoxUnlocked(dayNumber)) {
      const boxDate = getBoxDate(dayNumber);
      const message = `🔒 這個驚喜還沒準備好！請在 ${boxDate.toLocaleDateString('zh-TW', { month: 'long', day: 'numeric' })} 再回來看看！💕`;
      setShowMessage(message);
      setTimeout(() => setShowMessage(null), 3000);
      return;
    }

    if (!isBoxOpened(dayNumber)) {
      setOpenedBoxes(prev => [...prev, dayNumber]);
    }

    setSelectedDay(dayNumber);
  };

  const closeModal = () => {
    setSelectedDay(null);
  };

  const progress = (openedBoxes.length / 20) * 100;

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-8 animate-fade-in">
        <div className="bg-white rounded-full p-1 shadow-lg">
          <div 
            className="bg-gradient-to-r from-[var(--love-pink)] to-[var(--love-coral)] h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center mt-2 text-gray-600 font-medium">
          {openedBoxes.length === 20 
            ? "🎉 所有驚喜都揭曉了！你太棒了！🎉"
            : `已揭曉 ${openedBoxes.length} 個驚喜，共 20 個`
          }
        </p>
      </div>

      {/* Punch Box Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
        {Array.from({ length: 20 }, (_, i) => {
          const dayNumber = i + 1;
          const boxDate = getBoxDate(dayNumber);
          
          return (
            <div
              key={dayNumber}
              className={`
                relative h-24 md:h-28 rounded-2xl shadow-lg 
                flex flex-col items-center justify-center text-white font-semibold
                transform transition-all duration-300 hover:shadow-xl
                ${getBoxClass(dayNumber)}
              `}
              onClick={() => handleBoxClick(dayNumber)}
            >
              <div className="text-xs md:text-sm opacity-80 mb-1">
                第 {dayNumber} 天
              </div>
              <div className="text-lg md:text-xl mb-1">
                {getBoxIcon(dayNumber)}
              </div>
              <div className="text-xs text-center px-2">
                {boxDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Temporary Message */}
      {showMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white border-2 border-[var(--love-pink)] rounded-2xl px-6 py-4 shadow-lg animate-bounce-gentle text-center max-w-sm mx-4">
          <p className="love-purple font-medium">{showMessage}</p>
        </div>
      )}

      {/* Modal */}
      {selectedDay && (
        <PunchBoxModal
          isOpen={true}
          onClose={closeModal}
          dayNumber={selectedDay}
          mission={missions[selectedDay - 1]}
        />
      )}
    </div>
  );
}
