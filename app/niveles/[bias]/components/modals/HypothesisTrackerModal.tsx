// app/niveles/[bias]/components/modals/HypothesisTrackerModal.tsx

import { Modal } from "@/components/modal";
import HypothesisTracker from "@/components/hypothesis-tracker";

interface HypothesisTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HypothesisTrackerModal({ isOpen, onClose }: HypothesisTrackerModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Rastreador de Hipótesis"
      size="xl"
    >
      <HypothesisTracker />
    </Modal>
  );
}
