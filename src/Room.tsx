import type { PointerEvent } from 'react'
import type { FurnitureDefinition, PlacedFurniture } from './types'
import { CELL_H, CELL_W, getFurnitureDepth, getRotatedSize, screenToIso, snapToGrid } from './iso'
import { ROOM_HEIGHT, ROOM_WIDTH } from './data'
import { Furniture } from './Furniture'

interface Props {
  furniture: PlacedFurniture[]
  definitions: Map<string, FurnitureDefinition>
  selectedId: string | null
  onSelect: (id: string | null) => void
  onMove: (id: string, x: number, y: number) => void
}

const ORIGIN = { x: 208, y: 38 }

export function Room({ furniture, definitions, selectedId, onSelect, onMove }: Props) {
  const floorPoints = [
    `${ORIGIN.x},${ORIGIN.y}`,
    `${ORIGIN.x + ROOM_WIDTH * CELL_W / 2},${ORIGIN.y + ROOM_WIDTH * CELL_H / 2}`,
    `${ORIGIN.x + (ROOM_WIDTH - ROOM_HEIGHT) * CELL_W / 2},${ORIGIN.y + (ROOM_WIDTH + ROOM_HEIGHT) * CELL_H / 2}`,
    `${ORIGIN.x - ROOM_HEIGHT * CELL_W / 2},${ORIGIN.y + ROOM_HEIGHT * CELL_H / 2}`,
  ].join(' ')

  const leftWallPoints = [
    `${ORIGIN.x},${ORIGIN.y}`,
    `${ORIGIN.x - ROOM_HEIGHT * CELL_W / 2},${ORIGIN.y + ROOM_HEIGHT * CELL_H / 2}`,
    `${ORIGIN.x - ROOM_HEIGHT * CELL_W / 2},310`,
    `208,350`,
  ].join(' ')

  const rightWallPoints = [
    `${ORIGIN.x},${ORIGIN.y}`,
    `${ORIGIN.x + ROOM_WIDTH * CELL_W / 2},${ORIGIN.y + ROOM_WIDTH * CELL_H / 2}`,
    `${ORIGIN.x + ROOM_WIDTH * CELL_W / 2},310`,
    `208,350`,
  ].join(' ')

  const handlePointerDown = (event: PointerEvent, item: PlacedFurniture) => {
    event.stopPropagation()
    const target = event.currentTarget as HTMLElement
    target.setPointerCapture(event.pointerId)
    onSelect(item.instanceId)

    const start = { x: event.clientX, y: event.clientY }
    const startPosition = { ...item.position }

    const move = (moveEvent: globalThis.PointerEvent) => {
      const dx = moveEvent.clientX - start.x
      const dy = moveEvent.clientY - start.y
      const isoDelta = screenToIso({ x: dx, y: dy }, { x: 0, y: 0 })
      onMove(item.instanceId, startPosition.x + isoDelta.x, startPosition.y + isoDelta.y)
    }
    const up = () => {
      if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up, { once: true })
  }

  return (
    <div className="room-stage" onPointerDown={() => onSelect(null)}>
      <svg className="room-svg" viewBox="0 0 416 370" preserveAspectRatio="xMidYMid meet" aria-label="Isometric room">
        <defs>
          <linearGradient id="floor" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#f5e6d8"/><stop offset="1" stopColor="#e9d4c4"/></linearGradient>
          <linearGradient id="wallLeft" x1="0" x2="1"><stop offset="0" stopColor="#f9ddd9"/><stop offset="1" stopColor="#f4c9cf"/></linearGradient>
          <linearGradient id="wallRight" x1="0" x2="1"><stop offset="0" stopColor="#f7d9df"/><stop offset="1" stopColor="#f1c2ce"/></linearGradient>
          <pattern id="floorPattern" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><path d="M0 13h26" stroke="#dfc7b7" strokeWidth="1" opacity=".45"/></pattern>
        </defs>
        <polygon points={leftWallPoints} fill="url(#wallLeft)" stroke="#a77b7d" strokeWidth="2"/>
        <polygon points={rightWallPoints} fill="url(#wallRight)" stroke="#a77b7d" strokeWidth="2"/>
        <polygon points={floorPoints} fill="url(#floor)" stroke="#a77b7d" strokeWidth="2"/>
        <polygon points={floorPoints} fill="url(#floorPattern)" opacity=".8"/>
        <g className="wall-decor">
          <rect x="72" y="125" width="58" height="45" rx="4" fill="#fff8ef" stroke="#a77b7d" strokeWidth="2"/>
          <rect x="80" y="133" width="42" height="29" rx="2" fill="#c6dfe1" stroke="#a77b7d" strokeWidth="2"/>
          <path d="M101 133v29M80 147h42" stroke="#a77b7d" strokeWidth="2"/>
          <rect x="281" y="119" width="52" height="36" rx="3" fill="#fff8ef" stroke="#a77b7d" strokeWidth="2"/>
          <path d="M289 127h36v20h-36z" fill="#d5e4d1" stroke="#a77b7d" strokeWidth="1.5"/>
          <path d="M154 111q0-16 15-16t15 16v10h-30z" fill="#f6c4cc" stroke="#a77b7d" strokeWidth="2"/>
          <circle cx="169" cy="95" r="5" fill="#fff2cf" stroke="#a77b7d" strokeWidth="2"/>
          <rect x="193" y="305" width="30" height="45" fill="#c7977f" stroke="#a77b7d" strokeWidth="2"/>
          <circle cx="217" cy="328" r="2" fill="#fff0d5"/>
        </g>
      </svg>
      <div className="furniture-layer">
        {furniture
          .slice()
          .sort((a, b) => getFurnitureDepth(a) - getFurnitureDepth(b))
          .map((item) => {
            const definition = definitions.get(item.furnitureId)
            if (!definition) return null
            const position = snapToGrid(item.position)
            return <Furniture key={item.instanceId} item={{ ...item, position }} definition={definition} origin={ORIGIN} selected={selectedId === item.instanceId} onPointerDown={handlePointerDown} />
          })}
      </div>
    </div>
  )
}
