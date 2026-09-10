import type { GridPosition, PlacedFurniture, Rotation } from './types'
import { ROOM_HEIGHT, ROOM_WIDTH } from './data'

export const CELL_W = 52
export const CELL_H = 26

export function isoToScreen(position: GridPosition, origin: { x: number; y: number }) {
  return {
    x: origin.x + (position.x - position.y) * CELL_W / 2,
    y: origin.y + (position.x + position.y) * CELL_H / 2,
  }
}

export function screenToIso(screen: { x: number; y: number }, origin: { x: number; y: number }): GridPosition {
  const dx = screen.x - origin.x
  const dy = screen.y - origin.y
  return {
    x: (dx / (CELL_W / 2) + dy / (CELL_H / 2)) / 2,
    y: (dy / (CELL_H / 2) - dx / (CELL_W / 2)) / 2,
  }
}

export function snapToGrid(position: GridPosition): GridPosition {
  return { x: Math.round(position.x), y: Math.round(position.y) }
}

export function getRotatedSize(width: number, height: number, rotation: Rotation) {
  return rotation % 2 === 0 ? { width, height } : { width: height, height: width }
}

export function getFurnitureCells(item: PlacedFurniture, size: { width: number; height: number }) {
  const cells: GridPosition[] = []
  for (let x = 0; x < size.width; x += 1) {
    for (let y = 0; y < size.height; y += 1) {
      cells.push({ x: item.position.x + x, y: item.position.y + y })
    }
  }
  return cells
}

export function isInsideRoom(position: GridPosition, width: number, height: number) {
  return position.x >= 0 && position.y >= 0 && position.x + width <= ROOM_WIDTH && position.y + height <= ROOM_HEIGHT
}

function overlaps(a: GridPosition, aSize: { width: number; height: number }, b: GridPosition, bSize: { width: number; height: number }) {
  return a.x < b.x + bSize.width && a.x + aSize.width > b.x && a.y < b.y + bSize.height && a.y + aSize.height > b.y
}

export function checkCollision(
  candidate: PlacedFurniture,
  candidateSize: { width: number; height: number },
  others: Array<{ item: PlacedFurniture; size: { width: number; height: number } }>,
) {
  return others.some(({ item, size }) => item.instanceId !== candidate.instanceId && overlaps(candidate.position, candidateSize, item.position, size))
}

export function getFurnitureDepth(item: PlacedFurniture) {
  return item.position.x + item.position.y
}

export function rotateFurniture(rotation: Rotation): Rotation {
  return ((rotation + 1) % 4) as Rotation
}
