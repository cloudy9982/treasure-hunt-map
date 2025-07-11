import { PunchBoxGrid } from '@/components/punch-box-grid';

export default function PunchBox() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--love-light)] via-white to-[var(--love-gray)]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold love-pink mb-4 animate-bounce-gentle font-['Quicksand']">
            💕 20-Day Surprise Punch Box 💕
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-2 font-['Quicksand']">
            July 27 - August 15 • A journey of love and surprises
          </p>
          <div className="flex justify-center items-center space-x-2 love-coral">
            <span className="animate-heartbeat">💖</span>
            <span className="text-sm font-medium font-['Quicksand']">Click on unlocked boxes to reveal your surprise!</span>
            <span className="animate-heartbeat">💖</span>
          </div>
        </header>

        {/* Punch Box Grid Component */}
        <PunchBoxGrid />

        {/* Instructions */}
        <div className="text-center bg-white rounded-2xl p-6 shadow-lg animate-fade-in">
          <h3 className="text-xl font-semibold love-purple mb-3 font-['Quicksand']">How it works 📋</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700 font-['Quicksand']">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🔒</span>
              <span>Boxes unlock daily starting July 27</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">💝</span>
              <span>Click unlocked boxes for surprises</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">💾</span>
              <span>Progress saves automatically</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
