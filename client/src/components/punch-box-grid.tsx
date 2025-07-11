import { useState, useEffect } from 'react';
import { PunchBoxModal } from './punch-box-modal';

interface Mission {
  title: string;
  emoji: string;
  description: string;
}

const missions: Mission[] = [
  { title: "Memory Garden", emoji: "🌸", description: "Write down your favorite memory of us together and hide it somewhere I'll find it today! 💖" },
  { title: "Love Note Hills", emoji: "💌", description: "Leave me a sweet note in my favorite book with reasons why you love me! 📚💕" },
  { title: "Future Tower", emoji: "🏰", description: "Tell me about one place you want to visit with me and why it would be special! ✈️💝" },
  { title: "Cuddle Valley", emoji: "🤗", description: "Plan a cozy movie night with my favorite snacks and your warmest hugs! 🍿❤️" },
  { title: "Adventure Peak", emoji: "⛰️", description: "Suggest a fun activity we've never done together before! Let's be adventurous! 🎯💫" },
  { title: "Sunrise Café", emoji: "☕", description: "Wake me up with my favorite morning drink and a gentle kiss! Good morning sunshine! ☀️💋" },
  { title: "Music Bridge", emoji: "🎵", description: "Create a playlist of 5 songs that remind you of us and play it during dinner! 🎶💕" },
  { title: "Starlight Harbor", emoji: "⭐", description: "Look at the stars with me tonight and make a wish for our future together! 🌟💫" },
  { title: "Laughter Springs", emoji: "😂", description: "Tell me your silliest joke and make me laugh until my cheeks hurt! 🤭💖" },
  { title: "Dream Castle", emoji: "🏯", description: "Share with me a dream you had about us - silly, sweet, or completely random! 😴💭" },
  { title: "Gratitude Grove", emoji: "🙏", description: "List 3 things you're grateful for about our relationship right now! 📝💚" },
  { title: "Dance Floor", emoji: "💃", description: "Dance with me in the kitchen while we cook dinner - no music required! 🕺❤️" },
  { title: "Photo Booth", emoji: "📸", description: "Take a silly selfie with me doing your best funny face! Let's be goofy! 🤪📱" },
  { title: "Secret Garden", emoji: "🌺", description: "Whisper a secret in my ear that you've never told anyone else! 🤫💗" },
  { title: "Time Machine", emoji: "⏰", description: "If you could relive any day with me, which would it be and why? Take me back! ⏳💕" },
  { title: "Magic Workshop", emoji: "✨", description: "Do something unexpectedly sweet for me today - surprise me with your creativity! 🎨💝" },
  { title: "Comfort Corner", emoji: "🛋️", description: "Give me the most relaxing back massage while telling me about your day! 💆‍♀️😌" },
  { title: "Foodie Paradise", emoji: "🍕", description: "Cook or order my favorite food and feed me the first bite! I'm hungry for love! 👄🍴" },
  { title: "Treasure Island", emoji: "🏝️", description: "Hide a small gift (can be silly!) somewhere for me to find with a treasure map! 🗺️💎" },
  { title: "Forever Forest", emoji: "🌲", description: "Write me a letter about how you see our future together - dream big my love! 💌🔮" }
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
      const message = `🔒 This surprise isn't ready yet! Check back on ${boxDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}! 💕`;
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
            ? "🎉 All surprises revealed! You're amazing! 🎉"
            : `${openedBoxes.length} of 20 surprises revealed`
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
                Day {dayNumber}
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
