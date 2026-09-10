export type FurnitureKind =
  | 'bed'
  | 'sofa'
  | 'coffeeTable'
  | 'diningTable'
  | 'chair'
  | 'cabinet'
  | 'bookshelf'
  | 'lamp'
  | 'plant'
  | 'rug'

export type FurnitureDefinition = {
  id: string
  name: string
  kind: FurnitureKind
  size: [number, number]
  height: number
  color: string
  accent: string
}

export type PlacedFurniture = {
  id: string
  furnitureId: string
  x: number
  z: number
  rotation: 0 | 1 | 2 | 3
}
