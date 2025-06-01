"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
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
        <div className="relative w-64 h-64 mb-8">
          <Image
            src="/logo.svg"
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
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
      <Brain className="h-6 w-6 text-amber-500" />
      <div className="flex items-center justify-center flex-none w-full  text-muted-foreground">
        <div className="flex items-center justify-center">
          <p className="text-zinc-700">Sesgos Cognitivos.</p>
        </div>
      </div>
      <p className="text-zinc-600">2025</p>
    </div>
  );
}
