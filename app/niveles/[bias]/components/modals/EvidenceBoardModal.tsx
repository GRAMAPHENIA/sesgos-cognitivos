// app/niveles/[bias]/components/modals/EvidenceBoardModal.tsx

import { Modal } from "@/components/modal";
import { EvidenceBoard } from "@/components/evidence-board";

interface EvidenceBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EvidenceBoardModal({ isOpen, onClose }: EvidenceBoardModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tablero de Evidencias"
      size="xl"
    >
      <EvidenceBoard />
    </Modal>
  );
}
