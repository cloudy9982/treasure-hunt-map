import { useState, useEffect } from 'react';
import { PunchBoxModal } from './punch-box-modal';

interface Mission {
  title: string;
  emoji: string;
  description: string;
  type: 'R' | 'F' | 'C'; // Romance, Fun, Challenge
}

interface MapNode {
  id: string;
  day: number;
  x: number;
  y: number;
  pathId: string;
  mission: Mission;
}

interface Path {
  id: string;
  name: string;
  color: string;
  theme: string;
  nodes: MapNode[];
}

const mapPaths: Path[] = [
  {
    id: 'memory',
    name: '回憶森林線',
    color: '#FF69B4',
    theme: '溫柔回憶',
    nodes: [
      { id: 'memory-1', day: 1, x: 15, y: 80, pathId: 'memory', mission: { title: '記憶森林入口', emoji: '🌸', description: '分享最早合照 + 心情 📸💖', type: 'R' }},
      { id: 'memory-2', day: 2, x: 25, y: 65, pathId: 'memory', mission: { title: '回憶樹下', emoji: '🌳', description: '說 3 句我最喜歡你的地方 💕', type: 'R' }},
      { id: 'memory-3', day: 3, x: 40, y: 55, pathId: 'memory', mission: { title: '真假回憶測試', emoji: '🎭', description: '"真假回憶"二選一遊戲，猜猜哪個是真的！😄', type: 'F' }},
      { id: 'memory-4', day: 4, x: 55, y: 45, pathId: 'memory', mission: { title: '畫畫小屋', emoji: '🎨', description: '情侶畫畫挑戰：各自畫對方 ✏️', type: 'C' }},
      { id: 'memory-5', day: 5, x: 70, y: 35, pathId: 'memory', mission: { title: '溫柔湖泊', emoji: '🌊', description: '三段式擁抱之術（背後抱、睡前抱、隨機閃電抱）🤗', type: 'R' }}
    ]
  },
  {
    id: 'fun',
    name: '搞怪沙漠線',
    color: '#FFB347',
    theme: '歡樂搞怪',
    nodes: [
      { id: 'fun-1', day: 1, x: 15, y: 50, pathId: 'fun', mission: { title: '搞怪綠洲', emoji: '🌵', description: '搞笑貼紙尋寶：找到我藏的搞怪貼紙！🔍', type: 'F' }},
      { id: 'fun-2', day: 2, x: 30, y: 40, pathId: 'fun', mission: { title: '鬼臉競技場', emoji: '👹', description: '比誰的鬼臉可怕，輸的人要被親一下！😱💋', type: 'F' }},
      { id: 'fun-3', day: 3, x: 45, y: 35, pathId: 'fun', mission: { title: '沙漠挑戰台', emoji: '🏋️', description: '公主抱挑戰：抱起對方 10 秒鐘！💪', type: 'C' }},
      { id: 'fun-4', day: 4, x: 60, y: 30, pathId: 'fun', mission: { title: '音樂沙丘', emoji: '🎵', description: '躺腿聽情歌：你躺在我腿上聽我們的歌 🎶', type: 'R' }},
      { id: 'fun-5', day: 5, x: 75, y: 25, pathId: 'fun', mission: { title: '料理對決場', emoji: '🍳', description: '微型情侶餐任務：一起做料理餵對方 👄🍴', type: 'C' }}
    ]
  },
  {
    id: 'starlight',
    name: '星光高塔線',
    color: '#9370DB',
    theme: '浪漫星空',
    nodes: [
      { id: 'star-1', day: 1, x: 15, y: 20, pathId: 'starlight', mission: { title: '療癒塔基', emoji: '💆', description: '3 分鐘肩頸按摩 + 告訴我你今天的感受 😌', type: 'C' }},
      { id: 'star-2', day: 2, x: 32, y: 15, pathId: 'starlight', mission: { title: '星語階梯', emoji: '⭐', description: '星星下的情書：寫一張小紙條說愛我的理由 💌', type: 'R' }},
      { id: 'star-3', day: 3, x: 50, y: 12, pathId: 'starlight', mission: { title: '深情觀景台', emoji: '👁️', description: '10 秒深情對望，什麼都不能說，只用眼神表達 ❤️', type: 'R' }},
      { id: 'star-4', day: 4, x: 68, y: 15, pathId: 'starlight', mission: { title: '未來許願台', emoji: '🌈', description: '腦洞未來約會分享：你想帶我去哪裡？✈️💭', type: 'F' }},
      { id: 'star-5', day: 5, x: 85, y: 20, pathId: 'starlight', mission: { title: '星光塔頂', emoji: '🌟', description: '語音傳訊：「謝謝你陪伴，我最想感謝的是＿＿」🎤💝', type: 'R' }}
    ]
  }
];

// Continuation paths for days 6-20
const continuationNodes: MapNode[] = [
  // Days 6-10
  { id: 'cont-6', day: 6, x: 88, y: 35, pathId: 'shared', mission: { title: '情緒測驗室', emoji: '😊', description: '各自畫「我今天的感覺圖」交換講解 🎨', type: 'F' }},
  { id: 'cont-7', day: 7, x: 85, y: 50, pathId: 'shared', mission: { title: '詞語迷宮', emoji: '🔮', description: '愛的問答：「我最喜歡你笑起來的哪一瞬間？」❓💕', type: 'R' }},
  { id: 'cont-8', day: 8, x: 80, y: 65, pathId: 'shared', mission: { title: '撒嬌泉邊', emoji: '🦢', description: '嗲音全開日：說話要撒嬌（「嗚嗚嗚」「哼哼哼」）🥺', type: 'F' }},
  { id: 'cont-9', day: 9, x: 75, y: 75, pathId: 'shared', mission: { title: '小紙條森林', emoji: '🌲', description: '任務輪到你：由對方設計今天的任務！📋✨', type: 'C' }},
  { id: 'cont-10', day: 10, x: 65, y: 80, pathId: 'shared', mission: { title: '溫暖火堆', emoji: '🔥', description: '3件你沒發現的小事：我分享偷偷觀察你的可愛事 👀💕', type: 'R' }},
  
  // Days 11-15
  { id: 'cont-11', day: 11, x: 55, y: 85, pathId: 'shared', mission: { title: '擁抱挑戰場', emoji: '👑', description: '公主抱大挑戰（可搞笑演出）💪', type: 'C' }},
  { id: 'cont-12', day: 12, x: 45, y: 88, pathId: 'shared', mission: { title: '問答神殿', emoji: '🏛️', description: '戀人小測驗：第一次去的餐廳？我的口頭禪？📝', type: 'F' }},
  { id: 'cont-13', day: 13, x: 35, y: 85, pathId: 'shared', mission: { title: '心跳風鈴林', emoji: '🎐', description: '交互誇誇日：寫「我最欣賞你的TOP3」✍️', type: 'R' }},
  { id: 'cont-14', day: 14, x: 25, y: 80, pathId: 'shared', mission: { title: '命運轉盤所', emoji: '🎯', description: '抽浪漫券：按摩/親親3次/情話5連發 🎫', type: 'C' }},
  { id: 'cont-15', day: 15, x: 20, y: 70, pathId: 'shared', mission: { title: '秘密花園', emoji: '🌺', description: '悄悄話：說一個從未告訴別人的秘密 🤫💗', type: 'R' }},
  
  // Days 16-20
  { id: 'cont-16', day: 16, x: 18, y: 55, pathId: 'shared', mission: { title: '時光隧道', emoji: '⏰', description: '如果重新體驗和我一起的任何一天？⏳💕', type: 'F' }},
  { id: 'cont-17', day: 17, x: 20, y: 40, pathId: 'shared', mission: { title: '魔法工作坊', emoji: '✨', description: '意想不到的甜蜜事情：用創意給我驚喜！🎨💝', type: 'C' }},
  { id: 'cont-18', day: 18, x: 25, y: 30, pathId: 'shared', mission: { title: '舒適角落', emoji: '🛋️', description: '最放鬆的背部按摩 + 告訴我你的一天 💆‍♀️😌', type: 'R' }},
  { id: 'cont-19', day: 19, x: 35, y: 25, pathId: 'shared', mission: { title: '寶藏前哨', emoji: '🏝️', description: '藏小禮物讓我找到，附上尋寶地圖！🗺️💎', type: 'F' }},
  { id: 'cont-20', day: 20, x: 50, y: 25, pathId: 'shared', mission: { title: '終焉星光台', emoji: '🌟', description: '終極寶藏：禮物 + 給未來的信 + 一週年戀人通行證 🎁💌', type: 'C' }}
];

export function InteractiveMap() {
  const [openedNodes, setOpenedNodes] = useState<string[]>([]);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const [showMessage, setShowMessage] = useState<string | null>(null);
  const [gamePhase, setGamePhase] = useState<'prologue' | 'path-selection' | 'adventure'>('prologue');
  
  const startDate = new Date('2024-07-26');

  useEffect(() => {
    const stored = localStorage.getItem('mapProgress');
    if (stored) {
      const progress = JSON.parse(stored);
      setOpenedNodes(progress.openedNodes || []);
      setSelectedPath(progress.selectedPath || null);
      setGamePhase(progress.gamePhase || 'prologue');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mapProgress', JSON.stringify({
      openedNodes,
      selectedPath,
      gamePhase
    }));
  }, [openedNodes, selectedPath, gamePhase]);

  const getNodeDate = (dayNumber: number): Date => {
    const nodeDate = new Date(startDate);
    nodeDate.setDate(startDate.getDate() + dayNumber - 1);
    return nodeDate;
  };

  const isNodeUnlocked = (dayNumber: number): boolean => {
    const currentDate = new Date();
    const nodeDate = getNodeDate(dayNumber);
    return currentDate >= nodeDate;
  };

  const handlePathSelection = (pathId: string) => {
    if (gamePhase !== 'path-selection') return;
    setSelectedPath(pathId);
    setGamePhase('adventure');
  };

  const handleNodeClick = (node: MapNode) => {
    if (!isNodeUnlocked(node.day)) {
      const nodeDate = getNodeDate(node.day);
      setShowMessage(`🔒 這個地點還沒開放！請在 ${nodeDate.toLocaleDateString('zh-TW', { month: 'long', day: 'numeric' })} 再來探索！💫`);
      setTimeout(() => setShowMessage(null), 3000);
      return;
    }

    // For days 1-5, check if path is selected
    if (node.day <= 5 && selectedPath && node.pathId !== selectedPath) {
      setShowMessage(`✨ 你已經選擇了不同的冒險路線！無法進入這個地點。`);
      setTimeout(() => setShowMessage(null), 3000);
      return;
    }

    if (!openedNodes.includes(node.id)) {
      setOpenedNodes(prev => [...prev, node.id]);
    }

    setSelectedNode(node);
  };

  const handlePrologueComplete = () => {
    setGamePhase('path-selection');
    setOpenedNodes(['prologue']);
  };

  const getAllNodes = (): MapNode[] => {
    if (!selectedPath) return [];
    
    const pathNodes = mapPaths.find(p => p.id === selectedPath)?.nodes || [];
    return [...pathNodes, ...continuationNodes];
  };

  const getVisiblePaths = (): Path[] => {
    if (gamePhase === 'path-selection') return mapPaths;
    if (selectedPath) return mapPaths.filter(p => p.id === selectedPath);
    return [];
  };

  if (gamePhase === 'prologue') {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-black rounded-3xl p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">🌟 序章：降臨之夜</h2>
            <div className="text-6xl mb-6 animate-pulse">📜</div>
            <p className="text-xl mb-8 leading-relaxed">
              歡迎來到戀人之島！在這片神奇的土地上，<br/>
              你將展開一場為期 20 天的愛情冒險。
            </p>
            <div className="bg-white/10 rounded-2xl p-6 mb-8">
              <h3 className="text-2xl font-semibold mb-4">🤝 戀人契約</h3>
              <div className="text-left space-y-2">
                <p>✓ 每天要抱一次</p>
                <p>✓ 不能偷看明天任務</p>
                <p>✓ 說一句情話</p>
                <p>✓ 完成任務後才能前進</p>
              </div>
            </div>
            <button
              onClick={handlePrologueComplete}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              簽署契約，開始冒險！⚔️
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gamePhase === 'path-selection') {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold love-purple mb-4">🗺️ 選擇你的冒險路線</h2>
          <p className="text-gray-600">每條路線都有不同的體驗，選擇後就無法更改喔！</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {mapPaths.map((path) => (
            <div
              key={path.id}
              onClick={() => handlePathSelection(path.id)}
              className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-pink-300"
            >
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl"
                  style={{ backgroundColor: path.color + '20', border: `3px solid ${path.color}` }}
                >
                  {path.id === 'memory' && '🌸'}
                  {path.id === 'fun' && '🌵'}
                  {path.id === 'starlight' && '⭐'}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: path.color }}>
                  {path.name}
                </h3>
                <p className="text-gray-600 mb-4">{path.theme}</p>
                <div className="text-sm text-left space-y-1">
                  {path.nodes.slice(0, 3).map((node, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="text-lg">{node.mission.emoji}</span>
                      <span>{node.mission.title}</span>
                    </div>
                  ))}
                  <div className="text-gray-400">...還有更多</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Map Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold love-purple mb-2">
          🗺️ 戀人之島冒險地圖
        </h2>
        {selectedPath && (
          <p className="text-gray-600">
            當前路線：<span style={{ color: mapPaths.find(p => p.id === selectedPath)?.color }}>
              {mapPaths.find(p => p.id === selectedPath)?.name}
            </span>
          </p>
        )}
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

        {/* Paths */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {getVisiblePaths().map((path) => {
            const nodes = path.nodes;
            let pathString = `M ${nodes[0].x}% ${nodes[0].y}%`;
            for (let i = 1; i < nodes.length; i++) {
              pathString += ` Q ${(nodes[i-1].x + nodes[i].x) / 2}% ${(nodes[i-1].y + nodes[i].y - 5) / 2}% ${nodes[i].x}% ${nodes[i].y}%`;
            }
            // Connect to continuation path
            if (continuationNodes.length > 0) {
              pathString += ` Q ${(nodes[nodes.length-1].x + continuationNodes[0].x) / 2}% ${(nodes[nodes.length-1].y + continuationNodes[0].y - 5) / 2}% ${continuationNodes[0].x}% ${continuationNodes[0].y}%`;
            }
            
            return (
              <path
                key={path.id}
                d={pathString}
                stroke={path.color}
                strokeWidth="4"
                fill="none"
                strokeDasharray="10,5"
                opacity="0.6"
              />
            );
          })}
          
          {/* Continuation path */}
          {selectedPath && continuationNodes.length > 1 && (
            <path
              d={continuationNodes.reduce((path, node, index) => {
                if (index === 0) return `M ${node.x}% ${node.y}%`;
                const prev = continuationNodes[index - 1];
                return path + ` Q ${(prev.x + node.x) / 2}% ${(prev.y + node.y - 3) / 2}% ${node.x}% ${node.y}%`;
              }, '')}
              stroke="#666"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8,4"
              opacity="0.5"
            />
          )}
        </svg>

        {/* Nodes */}
        {getAllNodes().map((node) => {
          const isUnlocked = isNodeUnlocked(node.day);
          const isOpened = openedNodes.includes(node.id);
          
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
                ${isOpened 
                  ? 'bg-purple-500 border-purple-600 text-white' 
                  : isUnlocked 
                    ? 'bg-white border-pink-400 text-gray-800 hover:bg-pink-50' 
                    : 'bg-gray-300 border-gray-400 text-gray-500'
                }
              `}>
                {isOpened ? '✨' : isUnlocked ? node.mission.emoji : '🔒'}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium text-center">
                <div>{node.day <= 5 ? `Day ${node.day}` : `Day ${node.day}`}</div>
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
            style={{ width: `${(openedNodes.length / 21) * 100}%` }}
          />
        </div>
        <p className="text-center mt-2 text-gray-600 font-medium">
          冒險進度：{openedNodes.length} / 21 個地點已探索
        </p>
      </div>

      {/* Message */}
      {showMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white border-2 border-pink-400 rounded-2xl px-6 py-4 shadow-lg animate-bounce-gentle text-center max-w-sm mx-4">
          <p className="love-purple font-medium">{showMessage}</p>
        </div>
      )}

      {/* Modal */}
      {selectedNode && (
        <PunchBoxModal
          isOpen={true}
          onClose={() => setSelectedNode(null)}
          dayNumber={selectedNode.day}
          mission={selectedNode.mission}
        />
      )}
    </div>
  );
}