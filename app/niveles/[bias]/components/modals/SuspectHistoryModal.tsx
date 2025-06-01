// app/niveles/[bias]/components/modals/SuspectHistoryModal.tsx

import { Modal } from "@/components/modal";
import SuspectHistory from "@/components/suspect-history";

interface SuspectHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuspectHistoryModal({ isOpen, onClose }: SuspectHistoryModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Historial de Sospechosos"
      size="xl"
    >
      <SuspectHistory />
    </Modal>
  );
}
