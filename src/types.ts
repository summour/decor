export type Rotation = 0 | 1 | 2 | 3
export type Rarity = 'default' | 'common' | 'rare' | 'super-rare' | 'special'

export interface GridPosition {
  x: number
  y: number
}

export interface FurnitureDefinition {
  id: string
  name: string
  category: string
  rarity: Rarity
  theme: string
  width: number
  height: number
  asset: string
}

export interface PlacedFurniture {
  instanceId: string
  furnitureId: string
  position: GridPosition
  rotation: Rotation
}

export interface RoomData {
  id: string
  name: string
  theme: string
  furniture: PlacedFurniture[]
}
