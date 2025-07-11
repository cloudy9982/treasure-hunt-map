import { InteractiveMap } from '@/components/interactive-map';

export default function PunchBox() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--love-light)] via-white to-[var(--love-gray)]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold love-pink mb-4 animate-bounce-gentle font-['Quicksand']">
            I💗C 一週年尋寶之旅🐶🐰
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-4 font-['Quicksand'] leading-relaxed">
            2025(7/26～8/15)｜RPG情侶小挑戰
          </p>
          <div className="max-w-3xl mx-auto text-gray-600 mb-6 font-['Quicksand'] leading-relaxed">
            <p className="mb-4">
              嘿嘿，從你打開這張地圖開始，你沒有完成我就不放你走，準備好惹嗎！
            </p>
            <p className="mb-4">
              雖然可能裡面有些任務會有點花時間，但我都有放在週末唷～🏩
            </p>
            <p className="mb-4">
              每天都有一個地點，一個任務，一點點驚喜，有時是搞笑的小挑戰、有時是讓人臉紅的任務，也有一些靜靜陪在彼此身邊的時光❤️
            </p>
          </div>
          <div className="flex justify-center items-center space-x-2 love-coral">
            <span className="animate-heartbeat">💖</span>
            <span className="text-sm font-medium font-['Quicksand']">每天三選一，選擇你最想完成的任務！</span>
            <span className="animate-heartbeat">💖</span>
          </div>
        </header>

        {/* Interactive Map Component */}
        <InteractiveMap />

        {/* Instructions */}
        <div className="text-center bg-white rounded-2xl p-6 shadow-lg animate-fade-in">
          <h3 className="text-xl font-semibold love-purple mb-3 font-['Quicksand']">遊戲指南 🎮</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700 font-['Quicksand']">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">📅</span>
              <span>每天解鎖一個新地點</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🎯</span>
              <span>三選一：選擇你想完成的任務類型</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🏆</span>
              <span>完成 21 天獲得一週年終極寶藏</span>
            </div>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4 text-xs text-gray-600 font-['Quicksand']">
            <div className="bg-pink-50 rounded-lg p-3">
              <div className="font-semibold text-pink-600 mb-1">❤️ 甜蜜型 (R)</div>
              <div>讓人臉紅的浪漫任務</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <div className="font-semibold text-orange-600 mb-1">😄 搞笑型 (F)</div>
              <div>輕鬆有趣的小挑戰</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="font-semibold text-purple-600 mb-1">🤗 陪伴型 (C)</div>
              <div>安靜相處的溫馨時光</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
