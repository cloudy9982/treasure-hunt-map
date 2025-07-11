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
    theme: '深度連結',
    nodes: [
      { id: 'memory-1', day: 1, x: 15, y: 80, pathId: 'memory', mission: { title: '連結', emoji: '🌸', description: '分享一個過去一年中最喜歡的共同回憶。', type: 'R' }},
      { id: 'memory-2', day: 2, x: 25, y: 65, pathId: 'memory', mission: { title: '交流', emoji: '☕', description: '各自沖一杯茶或咖啡，並用三句話分享今天的亮點。', type: 'R' }},
      { id: 'memory-3', day: 3, x: 40, y: 55, pathId: 'memory', mission: { title: '思考', emoji: '📖', description: '各自選一篇有趣的文章或 podcast，摘要給對方聽。', type: 'F' }},
      { id: 'memory-4', day: 4, x: 55, y: 45, pathId: 'memory', mission: { title: '放鬆', emoji: '🧘', description: '一起做 10 分鐘的伸展操或瑜伽。', type: 'C' }}
    ]
  },
  {
    id: 'fun',
    name: '智趣沙漠線',
    color: '#FFB347',
    theme: '輕鬆解謎',
    nodes: [
      { id: 'fun-1', day: 1, x: 15, y: 50, pathId: 'fun', mission: { title: '解謎', emoji: '🧩', description: '一起完成一個小拼圖或簡單數獨。', type: 'F' }},
      { id: 'fun-2', day: 2, x: 30, y: 40, pathId: 'fun', mission: { title: '遊戲', emoji: '🎯', description: '玩 20 個問題猜物遊戲，從房間選一個東西開始。', type: 'F' }},
      { id: 'fun-3', day: 3, x: 45, y: 35, pathId: 'fun', mission: { title: '規劃', emoji: '🍽️', description: '一起想三個週末晚餐的點子並挑一個。', type: 'C' }},
      { id: 'fun-4', day: 4, x: 60, y: 30, pathId: 'fun', mission: { title: '整理', emoji: '📦', description: '一起花 15 分鐘整理一個抽屜或桌面區域。', type: 'C' }}
    ]
  },
  {
    id: 'starlight',
    name: '星光高塔線',
    color: '#9370DB',
    theme: '成長規劃',
    nodes: [
      { id: 'star-1', day: 1, x: 15, y: 20, pathId: 'starlight', mission: { title: '未來', emoji: '🎯', description: '寫下一個自己未來一年想完成的目標，然後分享。', type: 'C' }},
      { id: 'star-2', day: 2, x: 32, y: 15, pathId: 'starlight', mission: { title: '旅行', emoji: '🗺️', description: '一起規劃一場便宜的一日小旅行。', type: 'R' }},
      { id: 'star-3', day: 3, x: 50, y: 12, pathId: 'starlight', mission: { title: '學習', emoji: '📚', description: '觀看一部 10 分鐘的教學影片，學一個新技能。', type: 'F' }},
      { id: 'star-4', day: 4, x: 68, y: 15, pathId: 'starlight', mission: { title: '感謝', emoji: '💌', description: '各自寫一張「關於對方的 3 件感謝之事」並唸出來。', type: 'R' }}
    ]
  }
];

// Continuation paths for days 5-20 (calmer, more thoughtful activities)
const continuationNodes: MapNode[] = [
  // Days 5-10
  { id: 'cont-5', day: 5, x: 88, y: 35, pathId: 'shared', mission: { title: '深度對話', emoji: '💭', description: '聊聊各自最近學到的一件新事物。', type: 'R' }},
  { id: 'cont-6', day: 6, x: 85, y: 50, pathId: 'shared', mission: { title: '音樂時光', emoji: '🎵', description: '一起聽一首新歌，分享各自的感受。', type: 'R' }},
  { id: 'cont-7', day: 7, x: 80, y: 65, pathId: 'shared', mission: { title: '小遊戲', emoji: '🎲', description: '玩一個簡單的紙筆遊戲，如井字遊戲或文字接龍。', type: 'F' }},
  { id: 'cont-8', day: 8, x: 75, y: 75, pathId: 'shared', mission: { title: '計劃時間', emoji: '📅', description: '一起規劃下週的一個活動或任務。', type: 'C' }},
  { id: 'cont-9', day: 9, x: 65, y: 80, pathId: 'shared', mission: { title: '回憶分享', emoji: '📷', description: '翻看舊照片，各自說一個有趣的回憶。', type: 'R' }},
  { id: 'cont-10', day: 10, x: 55, y: 85, pathId: 'shared', mission: { title: '冥想放鬆', emoji: '🕯️', description: '一起做 5 分鐘的呼吸冥想或靜坐。', type: 'C' }},
  
  // Days 11-15
  { id: 'cont-11', day: 11, x: 45, y: 88, pathId: 'shared', mission: { title: '知識分享', emoji: '📚', description: '各自分享一個最近讀到的有趣知識或事實。', type: 'F' }},
  { id: 'cont-12', day: 12, x: 35, y: 85, pathId: 'shared', mission: { title: '感謝時刻', emoji: '🙏', description: '各自說三件今天值得感謝的小事。', type: 'R' }},
  { id: 'cont-13', day: 13, x: 25, y: 80, pathId: 'shared', mission: { title: '創意時間', emoji: '🎨', description: '一起畫個簡單的塗鴉或寫幾句詩。', type: 'F' }},
  { id: 'cont-14', day: 14, x: 20, y: 70, pathId: 'shared', mission: { title: '舒適按摩', emoji: '🤲', description: '輪流給對方做 5 分鐘的手部或肩膀按摩。', type: 'C' }},
  { id: 'cont-15', day: 15, x: 18, y: 55, pathId: 'shared', mission: { title: '願望清單', emoji: '⭐', description: '各自列出三個今年想完成的小願望並分享。', type: 'R' }},
  
  // Days 16-20
  { id: 'cont-16', day: 16, x: 20, y: 40, pathId: 'shared', mission: { title: '料理時光', emoji: '🍳', description: '一起準備一個簡單的點心或飲品。', type: 'C' }},
  { id: 'cont-17', day: 17, x: 25, y: 30, pathId: 'shared', mission: { title: '觀察練習', emoji: '👀', description: '花 5 分鐘安靜地觀察窗外，然後分享各自看到的細節。', type: 'F' }},
  { id: 'cont-18', day: 18, x: 35, y: 25, pathId: 'shared', mission: { title: '溫柔時光', emoji: '🤗', description: '簡單的擁抱和安靜的陪伴，不需要說話。', type: 'R' }},
  { id: 'cont-19', day: 19, x: 40, y: 22, pathId: 'shared', mission: { title: '準備驚喜', emoji: '🎁', description: '為明天的最終日準備一個小驚喜或紀念品。', type: 'C' }},
  { id: 'cont-20', day: 20, x: 50, y: 25, pathId: 'shared', mission: { title: '周年', emoji: '🌟', description: '最終章：交換手寫信、打開紀念禮物，提前慶祝我們的第一週年紀念日！', type: 'C' }}
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
          <p className="text-gray-600">每條路線都有不同的活動類型，選擇後就無法更改喔！</p>
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
                  {path.id === 'fun' && '🧩'}
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
          <div className="flex items-center justify-center space-x-4">
            <p className="text-gray-600">
              當前路線：<span style={{ color: mapPaths.find(p => p.id === selectedPath)?.color }}>
                {mapPaths.find(p => p.id === selectedPath)?.name}
              </span>
            </p>
            <button
              onClick={() => {
                setSelectedPath(null);
                setGamePhase('path-selection');
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-600 transition-all duration-300"
            >
              返回地圖
            </button>
          </div>
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