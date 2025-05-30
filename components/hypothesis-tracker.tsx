"use client"

import { useState } from "react"
import { useGameStore } from "@/store/game-store"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lightbulb, Plus, Edit, Trash2, Save, X } from "lucide-react"
import type { Hypothesis } from "@/types/game"

export default function HypothesisTracker() {
  const { activeHypotheses, addHypothesis, editHypothesis, removeHypothesis } = useGameStore()
  const [newHypothesis, setNewHypothesis] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")

  const handleAddHypothesis = () => {
    if (newHypothesis.trim()) {
      addHypothesis(newHypothesis.trim())
      setNewHypothesis("")
    }
  }

  const startEditing = (hypothesis: Hypothesis) => {
    setEditingId(hypothesis.id)
    setEditContent(hypothesis.content)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditContent("")
  }

  const saveEdit = (id: string) => {
    if (editContent.trim()) {
      editHypothesis(id, editContent.trim())
      setEditingId(null)
      setEditContent("")
    }
  }

  return (
    <Card className="dotted-border bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          Rastreador de Hipótesis
        </CardTitle>
        <CardDescription>
          Registra tus teorías sobre el caso. Las hipótesis influyen en cómo percibes la evidencia.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Escribe una nueva hipótesis..."
            value={newHypothesis}
            onChange={(e) => setNewHypothesis(e.target.value)}
            className="bg-background/50"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddHypothesis()
            }}
          />
          <Button
            onClick={handleAddHypothesis}
            disabled={!newHypothesis.trim()}
            className="bg-amber-500 hover:bg-amber-600 text-zinc-900"
          >
            <Plus className="h-4 w-4 mr-1" /> Añadir
          </Button>
        </div>

        <div className="space-y-3 mt-4">
          {activeHypotheses.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No hay hipótesis activas. Añade una para comenzar.</p>
          ) : (
            activeHypotheses.map((hypothesis) => (
              <div key={hypothesis.id} className="p-3 rounded-md bg-secondary/50 dotted-border">
                {editingId === hypothesis.id ? (
                  <div className="space-y-2">
                    <Input
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="bg-background/50"
                      autoFocus
                    />
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={cancelEditing}>
                        <X className="h-4 w-4 mr-1" /> Cancelar
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => saveEdit(hypothesis.id)}
                        disabled={!editContent.trim()}
                        className="bg-zinc-700 hover:bg-zinc-600"
                      >
                        <Save className="h-4 w-4 mr-1" /> Guardar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start gap-2">
                    <p className="flex-1">{hypothesis.content}</p>
                    <div className="flex gap-1 shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => startEditing(hypothesis)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeHypothesis(hypothesis.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 text-xs text-muted-foreground">
        Tus hipótesis pueden influir en cómo interpretas la evidencia, especialmente en el nivel de sesgo de
        confirmación.
      </CardFooter>
    </Card>
  )
}
