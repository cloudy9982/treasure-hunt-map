import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import './anniversary-card.css';

interface AnniversaryCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnniversaryCard({ isOpen, onClose }: AnniversaryCardProps) {
  const [showContent, setShowContent] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPlayAnimation(true);
      // Reset content visibility when opening
      setShowContent(false);
    } else {
      setPlayAnimation(false);
      setShowContent(false);
    }
  }, [isOpen]);

  const handleRevealClick = () => {
    setShowContent(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl mx-4 h-[90vh] border-none p-0 overflow-hidden">
        <div className="anniversary-card-container">
          {/* Background Music */}
          {isOpen && (
            <audio autoPlay loop className="hidden">
              <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEZBjiJ1fLJdSMFKH3M8+OWRgwQU6Th8bJlGgdBm9Aw7bkAAWgAEAkAAYgAEAMABMwAAYgAEAQAAIAAEAgAAAABgACAAAEAIAAAOAAADAIABAABAwAAJgAEAkAAAAAgAAAAQYAAEAIAAA8AAAABgACAAADAIAAA" type="audio/wav" />
            </audio>
          )}

          {/* Animated Background */}
          <div className="anniversary-background">
            <div className="floating-hearts">
              {[...Array(15)].map((_, i) => (
                <div key={i} className={`heart heart-${i + 1} ${playAnimation ? 'animate' : ''}`}>
                  💕
                </div>
              ))}
            </div>
            <div className="sparkles">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`sparkle sparkle-${i + 1} ${playAnimation ? 'animate' : ''}`}>
                  ✨
                </div>
              ))}
            </div>
            <div className="stars">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`star star-${i + 1} ${playAnimation ? 'animate' : ''}`}>
                  ⭐
                </div>
              ))}
            </div>
          </div>

          {/* Card Content */}
          <div className="anniversary-content">
            <div className="card-header">
              <h1 className="anniversary-title">
                🎉 週年快樂 🎉
              </h1>
              <div className="subtitle">
                I💗C 一週年尋寶之旅完成紀念
              </div>
            </div>

            {!showContent ? (
              <div className="reveal-section">
                <div className="gift-box">
                  🎁
                </div>
                <button 
                  onClick={handleRevealClick}
                  className="reveal-button"
                >
                  點我揭曉驚喜 💝
                </button>
                <p className="hint-text">
                  你已經完成了所有的任務... 🗺️
                </p>
              </div>
            ) : (
              <div className="card-message">
                <div className="message-content">
                  <h2>親愛的寶貝 💕</h2>
                  
                  <div className="message-body">
                    <p>🌟 恭喜你完成了這趟 20 天的尋寶之旅！</p>
                    
                    <p>💝 每一個任務，每一個選擇，都記錄著我們在一起的美好時光。</p>
                    
                    <p>🎯 無論你選擇了甜蜜型、搞笑型還是陪伴型的任務，我們都一起度過了這些珍贵的時刻。</p>
                    
                    <p>💍 從「記憶森林入口」到「一週年紀念台」，我們一起走過了這段奇妙的旅程。</p>
                    
                    <p>🏆 現在，讓我告訴你這趟旅程最大的寶藏是什麼...</p>
                    
                    <div className="treasure-reveal">
                      <p className="treasure-text">
                        「你是我完成任務後的最大寶藏 💝」
                      </p>
                    </div>
                    
                    <p>🐶🐰 謝謝你陪我一起玩這個小遊戲，謝謝你讓我們的每一天都充滿驚喜和歡笑。</p>
                    
                    <p>💖 希望我們可以繼續創造更多美好的回憶，一起迎接更多個週年紀念日！</p>
                    
                    <div className="signature">
                      <p>愛你的 💕</p>
                      <p>[你的名字] 🌹</p>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={onClose}
                  className="close-card-button"
                >
                  收藏這份愛 💌
                </button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>


    </Dialog>
  );
}