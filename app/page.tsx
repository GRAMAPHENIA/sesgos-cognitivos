"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { useGameStore } from "@/store/game-store";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const resetGame = useGameStore((state) => state.resetGame);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="flex flex-col items-center justify-center flex-1 pb-8">
        <div className="text-zinc-800 text-[190px] text-center font-bold ">
          ⫘
        </div>
        <div className="space-y-4">
          <Button
            className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-900"
            onClick={() => router.push("/niveles/confirmacion")}
          >
            Comenzar
          </Button>
          <Button
            variant="outline"
            className="w-full text-amber-500 hover:bg-zinc-800/30"
            onClick={() => router.push("/instrucciones")}
          >
            Ver Instrucciones
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center flex-none w-full pb-4 text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <Brain className="h-6 w-6" />
          <p>Desarrollado para el aprendizaje sobre sesgos cognitivos</p>
        </div>
      </div>
    </div>
  );
}
