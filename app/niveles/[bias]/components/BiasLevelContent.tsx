// app/niveles/[bias]/components/BiasLevelContent.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Decision, DecisionOption } from "../types/bias-level.types";

interface BiasLevelContentProps {
  currentLevel: {
    title: string;
    description: string;
    introduction: string;
  };
  pendingDecisions: Decision[];
  isLevelComplete: boolean;
  onOptionSelect: (decision: Decision, option: DecisionOption) => void;
  onCompleteLevel: () => void;
}

export function BiasLevelContent({
  currentLevel,
  pendingDecisions,
  isLevelComplete,
  onOptionSelect,
  onCompleteLevel,
}: BiasLevelContentProps) {
  return (
    <div className="space-y-4">
      <Card className="dotted-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{currentLevel.title}</CardTitle>
          <CardDescription>{currentLevel.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{currentLevel.introduction}</p>
        </CardContent>
      </Card>

      {pendingDecisions.length > 0 && (
        <Card className="dotted-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Toma una Decisión</CardTitle>
            <CardDescription>
              Tus decisiones afectarán el progreso del caso y tu comprensión del sesgo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="font-medium">{pendingDecisions[0].description}</p>

            <div className="space-y-3">
              {pendingDecisions[0].options.map((option) => (
                <Button
                  key={option.id}
                  className="w-full justify-start text-left h-auto py-3 bg-secondary/50 hover:bg-secondary/70 dotted-border"
                  onClick={() => onOptionSelect(pendingDecisions[0], option)}
                >
                  {option.text}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {isLevelComplete && pendingDecisions.length === 0 && (
        <div className="flex justify-center mt-8">
          <Button
            className="bg-amber-500 hover:bg-amber-600 text-zinc-900"
            size="lg"
            onClick={onCompleteLevel}
          >
            Completar Nivel
            <Check className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
