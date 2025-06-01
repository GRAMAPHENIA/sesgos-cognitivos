"use client"

import { useState } from "react"
import { useGameStore } from "@/store/game-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, User, Link2 } from "lucide-react"
import type { Suspect } from "@/types/game"

export default function SuspectHistory() {
  const { currentLevel, currentBias } = useGameStore()
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null)

  // Obtener los sospechosos del nivel actual
  const suspects = currentLevel?.suspects || []

  // Si no hay un sospechoso seleccionado y hay sospechosos disponibles, seleccionar el primero
  if (!selectedSuspect && suspects.length > 0) {
    setSelectedSuspect(suspects[0].id)
  }

  // Encontrar el sospechoso seleccionado
  const activeSuspect = suspects.find((s) => s.id === selectedSuspect)

  // Aplicar efectos de sesgo según el nivel actual
  const applySesgoEffects = (suspect: Suspect) => {
    const modifiedSuspect = { ...suspect }

    if (currentBias === "anclaje") {
      // En el sesgo de anclaje, la descripción inicial puede estar sesgada
      if (suspect.initialSuspicionLevel > 70) {
        modifiedSuspect.description = `${suspect.description} Parece muy sospechoso desde el principio.`
      } else if (suspect.initialSuspicionLevel < 30) {
        modifiedSuspect.description = `${suspect.description} Parece poco probable que esté involucrado.`
      }
    }

    if (currentBias === "halo") {
      // En el efecto halo, la percepción se ve afectada por la simpatía
      if (suspect.likeabilityFactor > 70) {
        modifiedSuspect.description = `${suspect.description} Causa una muy buena impresión.`
      }
    }

    return modifiedSuspect
  }

  return (
    <div className="h-full">
      {suspects.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <User className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p>No hay sospechosos disponibles en este nivel.</p>
        </div>
      ) : (
        <Tabs 
          value={selectedSuspect || suspects[0].id} 
          onValueChange={setSelectedSuspect} 
          className="h-full flex flex-col"
          defaultValue={suspects[0].id}
        >
          <TabsList className="w-full bg-secondary/50 mb-4">
            {suspects.map((suspect) => (
              <TabsTrigger key={suspect.id} value={suspect.id} className="flex-1">
                {suspect.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-1 overflow-auto pr-2">
            {suspects.map((suspect) => {
              const modifiedSuspect = applySesgoEffects(suspect)

              return (
                <TabsContent key={suspect.id} value={suspect.id} className="space-y-4 m-0 h-full">
                  <div className="space-y-4">
                    <div className="p-4 rounded-md dotted-border bg-secondary/20">
                      <h3 className="font-medium mb-2">Perfil</h3>
                      <p className="text-sm text-muted-foreground">{modifiedSuspect.description}</p>
                    </div>

                    <div className="p-4 rounded-md dotted-border bg-secondary/20">
                      <h3 className="font-medium mb-2">Antecedentes</h3>
                      <p className="text-sm text-muted-foreground">{modifiedSuspect.background}</p>
                    </div>

                    {modifiedSuspect.relationships.length > 0 && (
                      <div className="p-4 rounded-md dotted-border bg-secondary/20">
                        <h3 className="font-medium mb-2 flex items-center gap-1">
                          <Link2 className="h-4 w-4" /> Relaciones
                        </h3>
                        <ScrollArea className="h-[150px] pr-4">
                          <div className="space-y-3">
                            {modifiedSuspect.relationships.map((rel, index) => {
                              const relatedSuspect = suspects.find((s) => s.id === rel.suspectId)
                              if (!relatedSuspect) return null

                              return (
                                <div key={index} className="text-sm">
                                  <span className="font-medium">{relatedSuspect.name}</span>
                                  <span className="text-muted-foreground"> - {rel.relationshipType}</span>
                                  <p className="text-muted-foreground mt-1">{rel.description}</p>
                                </div>
                              )
                            })}
                          </div>
                        </ScrollArea>
                      </div>
                    )}
                  </div>
                </TabsContent>
              )
            })}
          </div>
        </Tabs>
      )}
    </div>
  )
}
