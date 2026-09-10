import { useMemo, useRef } from 'react'
import type { FurnitureDefinition, PlacedFurniture } from './types'
import { CELL_H, CELL_W, getRotatedSize, isoToScreen } from './iso'
import { FurnitureArt } from './furniture-art'

interface Props {
  item: PlacedFurniture
  definition: FurnitureDefinition
  origin: { x: number; y: number }
  selected: boolean
  onPointerDown: (event: React.PointerEvent, item: PlacedFurniture) => void
}

export function Furniture({ item, definition, origin, selected, onPointerDown }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const size = useMemo(() => getRotatedSize(definition.width, definition.height, item.rotation), [definition, item.rotation])
  const point = isoToScreen(item.position, origin)
  const visualWidth = Math.max(86, size.width * CELL_W * 0.72)
  const visualHeight = Math.max(64, size.height * CELL_H * 1.5)

  return (
    <div
      ref={ref}
      className={`furniture ${selected ? 'selected' : ''}`}
      style={{ left: point.x - visualWidth / 2, top: point.y - visualHeight / 2, width: visualWidth, height: visualHeight }}
      onPointerDown={(event) => onPointerDown(event, item)}
      data-instance-id={item.instanceId}
    >
      <FurnitureArt asset={definition.asset} rotation={item.rotation} width={definition.width} height={definition.height} />
      {selected && <span className="selection-dot" />}
    </div>
  )
}
