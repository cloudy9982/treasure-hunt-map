import { PunchBoxGrid } from '@/components/punch-box-grid';

export default function PunchBox() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--love-light)] via-white to-[var(--love-gray)]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold love-pink mb-4 animate-bounce-gentle font-['Quicksand']">
            ⚔️ RPG 愛情冒險：21天戳戳樂任務
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-4 font-['Quicksand'] leading-relaxed">
            7月26日 - 8月15日 • 一場只屬於我們的RPG愛情世界
          </p>
          <div className="max-w-3xl mx-auto text-gray-600 mb-6 font-['Quicksand'] leading-relaxed">
            <p className="mb-4">
              🌟 歡迎來到我們的RPG愛情世界！從 7 月 26 日的序章開始，一場奇幻的戀人冒險即將展開。
            </p>
            <p className="mb-4">
              在接下來的 21 天裡，你將穿越不同的奇幻地點，完成各種愛情任務：有情感連結、搞怪挑戰、還有滿滿的儀式感。
            </p>
            <p className="mb-4">
              從「記憶森林」到「終焉星光台」，每一個地點都有獨特的任務等待你解鎖！
            </p>
            <p className="mb-4">
              💑 適合你們兩人實際在一起的空間進行，搭配實體紙條、零食、貼紙都適用！
            </p>
          </div>
          <div className="flex justify-center items-center space-x-2 love-coral">
            <span className="animate-heartbeat">💖</span>
            <span className="text-sm font-medium font-['Quicksand']">點擊已解鎖的格子來揭曉你的驚喜！</span>
            <span className="animate-heartbeat">💖</span>
          </div>
        </header>

        {/* Punch Box Grid Component */}
        <PunchBoxGrid />

        {/* Instructions */}
        <div className="text-center bg-white rounded-2xl p-6 shadow-lg animate-fade-in">
          <h3 className="text-xl font-semibold love-purple mb-3 font-['Quicksand']">使用說明 📋</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700 font-['Quicksand']">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">⚔️</span>
              <span>RPG任務每日解鎖，請耐心等待冒險開始</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🗺️</span>
              <span>點擊已解鎖的地點開始任務</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🌟</span>
              <span>完成所有任務後，將獲得「一週年戀人通行證」</span>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600 font-['Quicksand'] text-sm">
              💌 準備好了嗎？讓我們一起展開這 20 天的甜蜜探索
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
