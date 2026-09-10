import type { FurnitureDefinition, PlacedFurniture } from './game-types'

export const ROOM_WIDTH = 10
export const ROOM_DEPTH = 8

export const FURNITURE: FurnitureDefinition[] = [
  { id: 'bed', name: 'เตียงเดี่ยว', kind: 'bed', size: [2.8, 4], height: 1.3, color: '#f5d9d7', accent: '#fff5f2' },
  { id: 'sofa', name: 'โซฟา', kind: 'sofa', size: [3.2, 1.5], height: 1.4, color: '#d9c4e8', accent: '#f5ebfb' },
  { id: 'coffee-table', name: 'โต๊ะกลาง', kind: 'coffeeTable', size: [2.2, 1.3], height: 0.75, color: '#c89568', accent: '#e9c29f' },
  { id: 'dining-table', name: 'โต๊ะอาหาร', kind: 'diningTable', size: [3.4, 2], height: 1.15, color: '#b9855b', accent: '#e1b88f' },
  { id: 'chair', name: 'เก้าอี้', kind: 'chair', size: [1.2, 1.2], height: 1.8, color: '#e6b46f', accent: '#f6d29e' },
  { id: 'cabinet', name: 'ตู้เก็บของ', kind: 'cabinet', size: [2.2, 1], height: 2.4, color: '#c7a47d', accent: '#ead5b9' },
  { id: 'bookshelf', name: 'ชั้นหนังสือ', kind: 'bookshelf', size: [2.2, 0.8], height: 2.8, color: '#a87350', accent: '#e7c7a5' },
  { id: 'lamp', name: 'โคมไฟตั้งพื้น', kind: 'lamp', size: [0.9, 0.9], height: 3, color: '#e9bd66', accent: '#fff0b8' },
  { id: 'plant', name: 'ต้นไม้กระถาง', kind: 'plant', size: [1.2, 1.2], height: 2, color: '#8eaa73', accent: '#d6e4b8' },
  { id: 'rug', name: 'พรม', kind: 'rug', size: [3.8, 2.5], height: 0.08, color: '#c9a6a1', accent: '#efd8d2' },
]

export const DEFAULT_ROOM: PlacedFurniture[] = [
  { id: 'bed-1', furnitureId: 'bed', x: -3.1, z: 1.65, rotation: 0 },
  { id: 'sofa-1', furnitureId: 'sofa', x: 2.35, z: 2.2, rotation: 0 },
  { id: 'coffee-table-1', furnitureId: 'coffee-table', x: 2.25, z: 0.35, rotation: 0 },
  { id: 'dining-table-1', furnitureId: 'dining-table', x: -0.2, z: -2.35, rotation: 0 },
  { id: 'chair-1', furnitureId: 'chair', x: -2.25, z: -2.25, rotation: 0 },
  { id: 'chair-2', furnitureId: 'chair', x: 1.45, z: -2.25, rotation: 0 },
  { id: 'cabinet-1', furnitureId: 'cabinet', x: 3.95, z: -2.95, rotation: 1 },
  { id: 'bookshelf-1', furnitureId: 'bookshelf', x: -3.85, z: -1.75, rotation: 1 },
  { id: 'lamp-1', furnitureId: 'lamp', x: 4.15, z: 1.8, rotation: 0 },
  { id: 'plant-1', furnitureId: 'plant', x: -4.05, z: 2.9, rotation: 0 },
  { id: 'rug-1', furnitureId: 'rug', x: 0.5, z: 0.35, rotation: 0 },
]

export const furnitureById = new Map(FURNITURE.map((item) => [item.id, item]))
