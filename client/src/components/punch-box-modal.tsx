import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FloatingHearts } from './floating-hearts';

interface Mission {
  title: string;
  emoji: string;
  description: string;
}

interface PunchBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayNumber: number;
  mission: Mission;
}

export function PunchBoxModal({ isOpen, onClose, dayNumber, mission }: PunchBoxModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 rounded-3xl shadow-2xl overflow-hidden border-none p-0">
        <div className="relative bg-white">
          <FloatingHearts isActive={isOpen} />
          
          <div className="relative z-10 p-8 text-center">
            <div className="text-4xl mb-4 animate-heartbeat">
              {mission.emoji}
            </div>
            <h2 className="text-2xl font-bold love-purple mb-4">
              Day {dayNumber} - {mission.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {mission.description}
            </p>
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-[var(--love-pink)] to-[var(--love-coral)] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-none"
            >
              Close 💕
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
