import { PunchBoxGrid } from '@/components/punch-box-grid';

export default function PunchBox() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--love-light)] via-white to-[var(--love-gray)]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold love-pink mb-4 animate-bounce-gentle font-['Quicksand']">
            🎁 20 天的愛情任務：戳戳樂驚喜盒
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-4 font-['Quicksand'] leading-relaxed">
            7月27日 - 8月15日 • 一場只屬於我們的秘密任務
          </p>
          <div className="max-w-3xl mx-auto text-gray-600 mb-6 font-['Quicksand'] leading-relaxed">
            <p className="mb-4">
              從 7 月 27 日起，一場只屬於我們的秘密任務悄悄展開。
            </p>
            <p className="mb-4">
              在接下來的 20 天裡，每天都有一格等待你揭曉，每一格都是我精心準備的驚喜、任務、情話或回憶拼圖。
            </p>
            <p className="mb-4">
              這不是普通的戳戳樂，這是一趟「我們的愛情冒險旅程」──有時溫柔、有時搞怪，有時讓你嘴角失守。
            </p>
            <p className="mb-4">
              你只需要每天花一點時間，戳一戳、笑一笑、想一想，就能慢慢拼湊出這段日子的濃濃心意。
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
              <span className="text-2xl">🔒</span>
              <span>每日任務限當天解鎖，請耐心等待</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">💝</span>
              <span>點擊已解鎖的格子揭曉驚喜</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🎉</span>
              <span>完成所有挑戰後，將解鎖「最終寶藏」</span>
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
