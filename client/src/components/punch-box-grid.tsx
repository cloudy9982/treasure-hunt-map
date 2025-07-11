import { useState, useEffect } from 'react';
import { PunchBoxModal } from './punch-box-modal';

interface Mission {
  title: string;
  emoji: string;
  description: string;
}

const missions: Mission[] = [
  { title: "降臨之夜 - 契約啟動儀式", emoji: "📜", description: "簽下「戀人契約」：例如每天要抱一次＋不能偷看明天任務＋說一句情話 💫⚔️" },
  { title: "記憶森林入口 - 愛之回憶解封", emoji: "🌸", description: "各挑一張我們以前的合照，分享那天腦中最深刻的記憶 📸💖" },
  { title: "糖果小屋 - 偷偷塞糖計畫", emoji: "🍬", description: "我送你一包你最愛的零食，任務：由我餵你吃掉它😋" },
  { title: "語咒塔下 - 情話唸咒練習", emoji: "🗼", description: "各寫一句今天的心情＋一句我想對你說的話（用便條傳）💌" },
  { title: "搞怪訓練營 - 啵啵交換挑戰", emoji: "🎪", description: "每完成一個小任務就能換一個親親（任務自訂：比鬼臉、唱一句歌等）💋" },
  { title: "抱抱療癒站 - 三段式擁抱之術", emoji: "🤗", description: "今天必須完成三種抱抱（背後抱、睡前抱、隨機閃電抱）🫂" },
  { title: "雙人料理屋 - 微型情侶餐任務", emoji: "🍳", description: "一起完成一道料理（泡麵、蛋餅、沙拉皆可），記得要餵對方一口 👄🍴" },
  { title: "情緒測驗室 - emoji 情感傳心術", emoji: "😊", description: "各自畫一張「我今天的感覺圖」，交換後講解給對方聽 🎨" },
  { title: "詞語迷宮 - 愛的問答解鎖", emoji: "🔮", description: "各問對方三題戀愛相關小問答（例如：「我最喜歡你笑起來的哪一瞬間？」）❓💕" },
  { title: "靜心之湖 - 把我畫出來", emoji: "🎨", description: "用紙筆各自畫對方現在的模樣＋互相展示（可認真也可惡搞）✏️" },
  { title: "幻想約會街 - 腦洞約會設計圖", emoji: "🌈", description: "分享一場「你想跟我去哪裡過情人節」幻想約會劇情 ✈️💭" },
  { title: "擁抱之橋 - 公主抱大挑戰", emoji: "👑", description: "嘗試抱起對方一次（也可以搞笑演出／互相做反應挑戰）💪" },
  { title: "星語草原 - 星星瓶傳訊", emoji: "⭐", description: "傳一段語音：「謝謝你這段時間的陪伴，我最想感謝的是＿＿＿」🎤💝" },
  { title: "問答神殿 - 戀人小測驗", emoji: "🏛️", description: "我問你五題關於我們的記憶：第一次去的餐廳？我最常說的口頭禪？📝" },
  { title: "撒嬌泉邊 - 嗲音全開日", emoji: "🦢", description: "今天說話要有撒嬌語氣模式（含「嗚嗚嗚」、「你最好是」、「哼哼哼」）🥺" },
  { title: "小紙條森林 - 任務輪到你", emoji: "🌲", description: "由對方設計今天的任務，寫在一張紙條上讓你完成！📋✨" },
  { title: "溫暖火堆 - 3件你沒發現的小事", emoji: "🔥", description: "我分享我偷偷觀察你做得很可愛的 3 件小事，請你猜猜是哪天我發現的 👀💕" },
  { title: "擁抱挑戰場 - 10秒不說話深情對望", emoji: "👁️", description: "任務：今天互看對方眼睛 10 秒，什麼都不能說，只能用眼神表達❤️" },
  { title: "心跳風鈴林 - 交互誇誇日", emoji: "🎐", description: "各寫一張「我最欣賞你的地方TOP3」貼在對方筆記本 / 鏡子上 ✍️" },
  { title: "命運轉盤所 - 抽一張浪漫券", emoji: "🎯", description: "對方抽你準備的 3 張浪漫任務卡（如：今晚我幫你按摩、親親3次、情話5連發）🎫" },
  { title: "終焉星光台 - 終極寶藏解鎖", emoji: "🌟", description: "打開你藏好的禮物 + 一封給未來的我們的信（可寫明年開封）🎁💌\n\n🎫 自製「一週年戀人通行證」一張\n此卡持有人可永久免費兌換擁抱、親親、撒嬌與心靈安慰服務\n發卡日：2025.08.15，有效期：一生一世" }
];

export function PunchBoxGrid() {
  const [openedBoxes, setOpenedBoxes] = useState<number[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState<string | null>(null);
  
  const startDate = new Date('2024-07-26');

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

  const progress = (openedBoxes.length / 21) * 100;

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
          {openedBoxes.length === 21 
            ? "🎉 所有任務都完成了！恭喜通關！🎉"
            : `已完成 ${openedBoxes.length} 個任務，共 21 個`
          }
        </p>
      </div>

      {/* Punch Box Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 mb-12">
        {Array.from({ length: 21 }, (_, i) => {
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
                {dayNumber === 1 ? "序章" : `DAY ${dayNumber - 1}`}
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
