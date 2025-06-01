// app/niveles/[bias]/components/modals/ScoreCardModal.tsx

import { Modal } from "@/components/modal";
import ScoreCard from "@/components/score-card";

interface ScoreCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScoreCardModal({ isOpen, onClose }: ScoreCardModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tu Puntuación"
      size="md"
    >
      <div className="p-4">
        <ScoreCard />
      </div>
    </Modal>
  );
}
