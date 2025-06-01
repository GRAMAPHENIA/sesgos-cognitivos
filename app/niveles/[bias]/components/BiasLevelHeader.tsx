// app/niveles/[bias]/components/BiasLevelHeader.tsx

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Award, BrainCircuit, FileText, User, Lightbulb, ArrowLeft } from "lucide-react";

interface BiasLevelHeaderProps {
  onOpenScoreCard: () => void;
  onOpenCognitiveProgress: () => void;
  onOpenEvidenceBoard: () => void;
  onOpenSuspectHistory: () => void;
  onOpenHypothesisTracker: () => void;
  newEvidencesCount: number;
  onResetNewEvidencesCount: () => void;
}

export function BiasLevelHeader({
  onOpenScoreCard,
  onOpenCognitiveProgress,
  onOpenEvidenceBoard,
  onOpenSuspectHistory,
  onOpenHypothesisTracker,
  newEvidencesCount,
  onResetNewEvidencesCount,
}: BiasLevelHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center">
      <Button variant="ghost" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
      </Button>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenScoreCard}
            className="rounded-full hover:bg-zinc-800/30"
            title="Puntuación"
          >
            <Award className="h-5 w-5 text-amber-500" />
            <span className="sr-only">Puntuación</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenCognitiveProgress}
            className="rounded-full hover:bg-zinc-800/30"
            title="Progreso Cognitivo"
          >
            <BrainCircuit className="h-5 w-5 text-amber-500" />
            <span className="sr-only">Progreso Cognitivo</span>
          </Button>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                onOpenEvidenceBoard();
                onResetNewEvidencesCount();
              }}
              className="rounded-full hover:bg-zinc-800/30 relative"
              title="Tablero de Evidencias"
            >
              <FileText className="h-5 w-5 text-amber-500" />
              <span className="sr-only">Tablero de Evidencias</span>
              {newEvidencesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {newEvidencesCount}
                </span>
              )}
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSuspectHistory}
            className="rounded-full hover:bg-zinc-800/30"
            title="Historial de Sospechosos"
          >
            <User className="h-5 w-5 text-amber-500" />
            <span className="sr-only">Historial de Sospechosos</span>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenHypothesisTracker}
          className="rounded-full hover:bg-zinc-800/30"
          title="Rastreador de Hipótesis"
        >
          <Lightbulb className="h-5 w-5 text-amber-500" />
          <span className="sr-only">Rastreador de Hipótesis</span>
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
}
