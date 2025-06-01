// app/niveles/[bias]/components/LevelConclusion.tsx

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { ScoreCard } from "@/components/score-card";

interface LevelConclusionProps {
  currentBias: string;
  title: string;
  conclusion: string;
  isLastLevel: boolean;
  onNextLevel: () => void;
}

export function LevelConclusion({
  currentBias,
  title,
  conclusion,
  isLastLevel,
  onNextLevel,
}: LevelConclusionProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Card className="dotted-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Nivel Completado: {title}</CardTitle>
          <CardDescription>Has superado el sesgo de {currentBias}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>{conclusion}</p>

          <ScoreCard />

          <div className="flex justify-center pt-4">
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-zinc-900"
              size="lg"
              onClick={onNextLevel}
            >
              {isLastLevel ? (
                <>
                  Finalizar Juego
                  <Check className="ml-2 h-5 w-5" />
                </>
              ) : (
                <>
                  Siguiente Nivel
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="absolute inset-0 -z-10 dotted-grid opacity-20"></div>
    </div>
  );
}
