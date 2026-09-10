import type { FurnitureDefinition, RoomData } from './types'

export const ROOM_WIDTH = 8
export const ROOM_HEIGHT = 6

export const FURNITURE: FurnitureDefinition[] = [
  { id: 'default-bed', name: 'Bed', category: 'bed', rarity: 'default', theme: 'basic', width: 2, height: 3, asset: 'bed' },
  { id: 'default-sofa', name: 'Sofa', category: 'sofa', rarity: 'default', theme: 'basic', width: 3, height: 1, asset: 'sofa' },
  { id: 'default-coffee-table', name: 'Coffee Table', category: 'table', rarity: 'default', theme: 'basic', width: 2, height: 2, asset: 'coffee-table' },
  { id: 'default-dining-table', name: 'Dining Table', category: 'table', rarity: 'default', theme: 'basic', width: 3, height: 2, asset: 'dining-table' },
  { id: 'default-chair', name: 'Chair', category: 'chair', rarity: 'default', theme: 'basic', width: 1, height: 1, asset: 'chair' },
  { id: 'default-cabinet', name: 'Cabinet', category: 'storage', rarity: 'default', theme: 'basic', width: 2, height: 1, asset: 'cabinet' },
  { id: 'default-bookshelf', name: 'Bookshelf', category: 'storage', rarity: 'default', theme: 'basic', width: 2, height: 1, asset: 'bookshelf' },
  { id: 'default-lamp', name: 'Floor Lamp', category: 'light', rarity: 'default', theme: 'basic', width: 1, height: 1, asset: 'lamp' },
  { id: 'default-plant', name: 'Plant', category: 'decor', rarity: 'default', theme: 'basic', width: 1, height: 1, asset: 'plant' },
  { id: 'default-rug', name: 'Rug', category: 'floor', rarity: 'default', theme: 'basic', width: 3, height: 2, asset: 'rug' },
]

export const EMPTY_ROOM: RoomData = {
  id: 'default-room',
  name: 'My Cozy Room',
  theme: 'basic',
  furniture: [],
}
