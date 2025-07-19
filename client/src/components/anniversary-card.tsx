import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import './anniversary-card.css';

interface AnniversaryCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnniversaryCard({ isOpen, onClose }: AnniversaryCardProps) {
  const [stage, setStage] = useState<'gift' | 'photo' | 'message'>('gift');
  const [playAnimation, setPlayAnimation] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setPlayAnimation(true);
      setStage('gift'); // 每次打開重設為第一階段
    } else {
      setPlayAnimation(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl mx-4 h-[90vh] border-none p-0 overflow-hidden">
        <div className="anniversary-card-container">
          {/* Background Music */}
          {isOpen && (
            <audio autoPlay loop preload="auto">
              <source src="/1.mp3" type="audio/mpeg" />
            </audio>
          )}

          {/* Animated Background */}
          <div className="anniversary-background">
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

            {stage === 'gift' && (
  <div className="reveal-section">
    <div className="gift-box" onClick={() => setStage('photo')} style={{ cursor: 'pointer' }}>
      🎁
    </div>
    <p className="hint-text">點擊禮物盒打開看看 🎁</p>
  </div>
)}

{stage === 'photo' && (
  <div className="reveal-section flip-photo">
    <img
      src="/2.jpg"
      alt="我們的紀念圖"
      className="couple-image"
    />
    <button 
      onClick={() => setStage('message')}
      className="reveal-button"
    >
      點我揭曉驚喜 💝
    </button>
    <p className="hint-text">你已經完成了所有的任務... 🗺️</p>
  </div>
)}

{stage === 'message' && (
  <div className="card-message">
    <div className="message-content">
      <h2>給懿德的信</h2>
      <div className="message-body">
        <p>謝謝你這一年來讓我感覺我不是一個人，這一年走來雖說好像也不是磕磕絆絆的</p>
        <p>畢竟我們都是遇到問題會先理性討論，不會馬上就發脾氣</p>
        <p>在這過程中，可能會讓別人覺得我們的愛情裡少了點什麼</p>
        <p>但我們的每一天都充滿了愛和驚喜，每次你都會讓我感受到我們的愛情是如此真實</p>
        <p>像是之前說好是每個月我下去台中找你一次，但你後來都是每週開車來台北找我</p>
        <p>還有每當我需要幫忙時，你都會馬上回應我的期待來到我身邊</p>
        <p>之前說會因為要跟朋友玩新遊戲所以可能需要減少來找我的次數</p>
        <p>但你依舊維持跟以前一樣的頻率來找我</p>
        <p>我當時跟你在房間時說的我認為遊戲很重要不是說假的</p>
        <p>而是真心認為這很重要</p>
        <p>因為我本身也是個喜歡玩遊戲的人，所以很懂這種感覺</p>
        <p>但你最後依舊跑來找我真的讓我很驚訝</p>
        <p>在你對我說情話時，我都會不知道該怎麼回覆你這種不習慣的感覺</p>
        <p>但是我並不討厭這種心情</p>
        <p>但是內心都是暖暖的，知道我對你來說是個重要的人就開心到一整天</p>
        <p>這一年來，我們一起經歷了很多美好的時刻，從第一次見面到現在的每一天</p>
        <p>我想要陪你一起長長久久，就像這些小任務一樣</p>
        <p>我們在一起的每一天都是一個必經的任務情節，這些情節疊加在一起就是我們共同的回憶</p>
        <p>遇到你之前從來不知道戀愛也可以很甜蜜</p>
        <p>對男性的恐懼及厭惡也在跟你的相處過程中漸漸消融</p>
        <p>對男性的想法本身是讓我感到生理不適的，但是跟你在一起的未來我願意去想像</p>
        <p>你可以對我任性，也可以對我撒嬌、發脾氣</p>
        <p>因為我「想」接受每一個你</p>
        <p>也許未來的某些日子會讓我們都感到厭煩，或是生活上有些意外</p>
        <p>但我相信我們可以一起克服這些挑戰，我也「決定」要跟你一起克服這些困難</p>
        <p>不是為了愛這類的空話</p>
        <p>而是因為我們彼此之間的理解和尊重</p>
        <p>這一年我們在一起的小細節中讓我感受到你對我的愛和關心</p>
        <p>讓我覺得我們的愛情是如此特別</p>
        <p>每一個任務，每一個選擇，都記錄著我們在一起的美好時光，在現實中也一樣</p>
        <p>無論你選擇了哪種類型的任務，我們都一起度過了這些我想和你在一起的時刻</p>
        <p>🏆 現在，讓我告訴你這趟旅程最大的寶藏是什麼好不好？</p>
        <div className="treasure-reveal">
          <p className="treasure-text">「我們一步一步走來的回憶是我們最大的寶藏💝」</p>
        </div>
        <p>🐶🐰 謝謝你陪我一起玩這個小遊戲，謝謝你讓我的每一天都充滿與你的點點滴滴</p>
        <p>將我的想法寫成文字，但其實我內心的感受用文字也是無法全部表現出來的</p>
        <p>希望接下來的我們可以繼續創造更多美好的回憶，讓你感受到我對你無法言喻的感情</p>
        <div className="signature">
          <p>愛你的cloudy💕</p>
        </div>
      </div>
    </div>
    <button onClick={onClose} className="close-card-button">
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