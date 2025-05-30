"use client"

import { useGameStore } from "@/store/game-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, FileText, AlertCircle, Eye } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Evidence } from "@/types/game"

export default function EvidenceBoard() {
  const { currentLevel, discoveredEvidences, discoverEvidence, currentBias } = useGameStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Obtener todas las evidencias disponibles del nivel actual
  const availableEvidences = currentLevel?.evidences.filter((e) => !e.isHidden) || []

  // Obtener todas las etiquetas únicas de las evidencias descubiertas
  const allTags = Array.from(new Set(discoveredEvidences.flatMap((evidence) => evidence.tags))).sort()

  // Filtrar evidencias por búsqueda y etiqueta
  const filteredEvidences = discoveredEvidences.filter((evidence) => {
    const matchesSearch =
      searchTerm === "" ||
      evidence.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evidence.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTag = selectedTag === null || evidence.tags.includes(selectedTag)

    return matchesSearch && matchesTag
  })

  // Descubrir una nueva evidencia aleatoria que no haya sido descubierta aún
  const discoverRandomEvidence = () => {
    const undiscoveredEvidences = availableEvidences.filter((e) => !discoveredEvidences.some((de) => de.id === e.id))

    if (undiscoveredEvidences.length > 0) {
      const randomIndex = Math.floor(Math.random() * undiscoveredEvidences.length)
      discoverEvidence(undiscoveredEvidences[randomIndex].id)
    }
  }

  // Renderizar una tarjeta de evidencia
  const renderEvidenceCard = (evidence: Evidence) => {
    // Si la evidencia está filtrada por el sesgo, mostrar una versión oscurecida
    if (evidence.isFiltered) {
      return (
        <div key={evidence.id} className="p-4 rounded-md dotted-border bg-secondary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center p-4">
              <AlertCircle className="h-8 w-8 text-amber-500/70 mx-auto mb-2" />
              <p className="text-muted-foreground">Esta evidencia contradice tus hipótesis actuales.</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 border-amber-800/50 text-amber-500/70"
                onClick={() => {
                  // Marcar como vista (eliminar el filtro)
                  const updatedEvidence = { ...evidence, isFiltered: false }
                  useGameStore.setState({
                    discoveredEvidences: discoveredEvidences.map((e) => (e.id === evidence.id ? updatedEvidence : e)),
                  })
                }}
              >
                <Eye className="h-4 w-4 mr-1" /> Ver de todos modos
              </Button>
            </div>
          </div>
          <div className="opacity-30">
            <h3 className="font-medium">{evidence.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{evidence.description}</p>
          </div>
        </div>
      )
    }

    return (
      <div
        key={evidence.id}
        className="p-4 rounded-md dotted-border bg-secondary/20 hover:bg-secondary/30 transition-colors"
      >
        <h3 className="font-medium">{evidence.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{evidence.description}</p>

        {evidence.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {evidence.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs bg-background/50 hover:bg-background cursor-pointer"
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className="dotted-border bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <FileText className="h-5 w-5 text-amber-500" />
          Tablero de Evidencias
        </CardTitle>
        <CardDescription>
          Evidencias recolectadas durante tu investigación.
          {currentBias === "confirmacion" && (
            <span className="block mt-1 text-amber-500/70">
              ⚠️ Algunas evidencias pueden estar filtradas por tu sesgo de confirmación.
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar evidencias..."
                className="pl-9 bg-background/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="border-zinc-700 text-amber-500 hover:bg-zinc-800/30"
              onClick={discoverRandomEvidence}
              disabled={availableEvidences.length === discoveredEvidences.length}
            >
              Investigar
            </Button>
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <Badge
                variant={selectedTag === null ? "default" : "outline"}
                className={`cursor-pointer ${selectedTag === null ? "bg-amber-500 text-zinc-900" : "bg-background/50 hover:bg-background"}`}
                onClick={() => setSelectedTag(null)}
              >
                Todas
              </Badge>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className={`cursor-pointer ${selectedTag === tag ? "bg-amber-500 text-zinc-900" : "bg-background/50 hover:bg-background"}`}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {discoveredEvidences.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p>No has descubierto ninguna evidencia todavía.</p>
              <p className="text-sm mt-1">Usa el botón "Investigar" para encontrar pistas.</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">{filteredEvidences.map(renderEvidenceCard)}</div>
            </ScrollArea>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
