// app/niveles/[bias]/components/modals/CognitiveProgressModal.tsx

import { Modal } from "@/components/modal";
import { CognitiveProgressBar } from "@/components/cognitive-progress-bar";

interface CognitiveProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CognitiveProgressModal({ isOpen, onClose }: CognitiveProgressModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Progreso Cognitivo"
      size="md"
    >
      <div className="p-4">
        <CognitiveProgressBar />
      </div>
    </Modal>
  );
}
