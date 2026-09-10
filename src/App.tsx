import { useEffect, useMemo, useState } from 'react'
import { EMPTY_ROOM, FURNITURE, ROOM_HEIGHT, ROOM_WIDTH } from './data'
import { FurnitureInventory } from './FurnitureInventory'
import { Room } from './Room'
import { checkCollision, getRotatedSize, isInsideRoom, snapToGrid, rotateFurniture } from './iso'
import type { FurnitureDefinition, PlacedFurniture, RoomData, Rotation } from './types'

const STORAGE_KEY = 'decor-room-v1'

function loadRoom(): RoomData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved) as RoomData
  } catch { /* use default */ }
  return structuredClone(EMPTY_ROOM)
}

function makeInstance(furnitureId: string, position: { x: number; y: number }): PlacedFurniture {
  return { instanceId: `${furnitureId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, furnitureId, position, rotation: 0 }
}

export default function App() {
  const [room, setRoom] = useState<RoomData>(loadRoom)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const definitions = useMemo(() => new Map(FURNITURE.map((item) => [item.id, item])), [])
  const selected = room.furniture.find((item) => item.instanceId === selectedId) ?? null
  const selectedDefinition = selected ? definitions.get(selected.furnitureId) ?? null : null

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(room))
  }, [room])

  const updateFurniture = (instanceId: string, updater: (item: PlacedFurniture) => PlacedFurniture) => {
    setRoom((current) => ({
      ...current,
      furniture: current.furniture.map((item) => item.instanceId === instanceId ? updater(item) : item),
    }))
  }

  const addFurniture = (definition: FurnitureDefinition) => {
    const size = getRotatedSize(definition.width, definition.height, 0)
    const preferred = { x: Math.max(0, Math.floor((ROOM_WIDTH - size.width) / 2)), y: Math.max(0, Math.floor((ROOM_HEIGHT - size.height) / 2)) }
    const candidate = makeInstance(definition.id, preferred)
    setRoom((current) => ({ ...current, furniture: [...current.furniture, candidate] }))
    setSelectedId(candidate.instanceId)
  }

  const moveFurniture = (instanceId: string, x: number, y: number) => {
    const currentItem = room.furniture.find((item) => item.instanceId === instanceId)
    if (!currentItem) return
    const definition = definitions.get(currentItem.furnitureId)
    if (!definition) return
    const position = snapToGrid({ x, y })
    const size = getRotatedSize(definition.width, definition.height, currentItem.rotation)
    const bounded = {
      x: Math.max(0, Math.min(ROOM_WIDTH - size.width, position.x)),
      y: Math.max(0, Math.min(ROOM_HEIGHT - size.height, position.y)),
    }
    const candidate = { ...currentItem, position: bounded }
    const others = room.furniture.map((item) => {
      const def = definitions.get(item.furnitureId)
      return def ? { item, size: getRotatedSize(def.width, def.height, item.rotation) } : null
    }).filter(Boolean) as Array<{ item: PlacedFurniture; size: { width: number; height: number } }>
    if (isInsideRoom(bounded, size.width, size.height) && !checkCollision(candidate, size, others)) {
      updateFurniture(instanceId, () => candidate)
    }
  }

  const rotateSelected = () => {
    if (!selected || !selectedDefinition) return
    const nextRotation = rotateFurniture(selected.rotation)
    const nextSize = getRotatedSize(selectedDefinition.width, selectedDefinition.height, nextRotation)
    if (!isInsideRoom(selected.position, nextSize.width, nextSize.height)) return
    const candidate = { ...selected, rotation: nextRotation as Rotation }
    const others = room.furniture.map((item) => {
      const def = definitions.get(item.furnitureId)
      return def ? { item, size: getRotatedSize(def.width, def.height, item.rotation) } : null
    }).filter(Boolean) as Array<{ item: PlacedFurniture; size: { width: number; height: number } }>
    if (!checkCollision(candidate, nextSize, others)) updateFurniture(selected.instanceId, () => candidate)
  }

  const removeSelected = () => {
    if (!selectedId) return
    setRoom((current) => ({ ...current, furniture: current.furniture.filter((item) => item.instanceId !== selectedId) }))
    setSelectedId(null)
  }

  const resetRoom = () => {
    if (!window.confirm('Reset this room and remove all furniture?')) return
    setRoom(structuredClone(EMPTY_ROOM))
    setSelectedId(null)
    setMenuOpen(false)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="icon-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Open menu">☰</button>
        <div className="title-block"><span className="eyebrow">HOME 01</span><h1>{room.name}</h1></div>
        <div className="top-actions"><span className="save-dot" title="Saved locally"/><button className="icon-button" onClick={() => setSelectedId(null)} aria-label="Deselect">×</button></div>
      </header>

      {menuOpen && <div className="menu-popover"><strong>Room settings</strong><p>Changes are saved on this device.</p><button onClick={resetRoom}>Reset room</button></div>}

      <section className="game-area">
        <Room furniture={room.furniture} definitions={definitions} selectedId={selectedId} onSelect={setSelectedId} onMove={moveFurniture} />
        {selected && selectedDefinition && (
          <div className="floating-controls" onPointerDown={(e) => e.stopPropagation()}>
            <div className="selected-name">{selectedDefinition.name}</div>
            <button onClick={rotateSelected} aria-label="Rotate furniture">↻</button>
            <button onClick={removeSelected} aria-label="Remove furniture">⌫</button>
          </div>
        )}
      </section>

      <FurnitureInventory furniture={FURNITURE} onAdd={addFurniture} />
    </main>
  )
}
