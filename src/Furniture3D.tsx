import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { FurnitureDefinition, PlacedFurniture } from './game-types'

type Props = {
  item: PlacedFurniture
  definition: FurnitureDefinition
  selected: boolean
  onSelect: (id: string) => void
  onMove: (id: string, x: number, z: number) => void
}

type BoxProps = {
  size: [number, number, number]
  position: [number, number, number]
  color: string
  radius?: number
}

function Box({ size, position, color }: BoxProps) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.82} />
    </mesh>
  )
}

function Bed({ color, accent }: FurnitureDefinition) {
  return (
    <group>
      <Box size={[2.8, 0.35, 4]} position={[0, 0.35, 0]} color="#9c7658" />
      <Box size={[2.62, 0.28, 3.72]} position={[0, 0.65, 0.05]} color={accent} />
      <Box size={[2.8, 1.45, 0.28]} position={[0, 0.95, -1.86]} color={color} />
      <Box size={[1.05, 0.18, 0.72]} position={[-0.65, 0.86, -1.35]} color="#fffaf6" />
      <Box size={[1.05, 0.18, 0.72]} position={[0.65, 0.86, -1.35]} color="#fffaf6" />
      <Box size={[0.12, 0.28, 3.55]} position={[-1.25, 0.9, 0.08]} color={color} />
      <Box size={[0.12, 0.28, 3.55]} position={[1.25, 0.9, 0.08]} color={color} />
    </group>
  )
}

function Sofa({ color, accent }: FurnitureDefinition) {
  return (
    <group>
      <Box size={[3.2, 0.42, 1.5]} position={[0, 0.52, 0.08]} color={color} />
      <Box size={[3.15, 1.35, 0.3]} position={[0, 1.18, -0.55]} color={color} />
      <Box size={[0.32, 1.05, 1.52]} position={[-1.43, 0.82, 0.03]} color={accent} />
      <Box size={[0.32, 1.05, 1.52]} position={[1.43, 0.82, 0.03]} color={accent} />
      <Box size={[1.2, 0.16, 1.08]} position={[-0.72, 0.84, 0.05]} color={accent} />
      <Box size={[1.2, 0.16, 1.08]} position={[0.72, 0.84, 0.05]} color={accent} />
      <Box size={[0.18, 0.28, 1.25]} position={[-1.1, 0.18, 0.08]} color="#76513c" />
      <Box size={[0.18, 0.28, 1.25]} position={[1.1, 0.18, 0.08]} color="#76513c" />
    </group>
  )
}

function CoffeeTable({ color, accent }: FurnitureDefinition) {
  return (
    <group>
      <Box size={[2.2, 0.22, 1.3]} position={[0, 0.72, 0]} color={accent} />
      {([-0.82, 0.82] as const).flatMap((x) =>
        ([-0.42, 0.42] as const).map((z) => (
          <Box key={`${x}-${z}`} size={[0.12, 0.72, 0.12]} position={[x, 0.36, z]} color={color} />
        )),
      )}
    </group>
  )
}

function DiningTable({ color, accent }: FurnitureDefinition) {
  return (
    <group>
      <Box size={[3.4, 0.24, 2]} position={[0, 1.08, 0]} color={accent} />
      {([-1.35, 1.35] as const).flatMap((x) =>
        ([-0.72, 0.72] as const).map((z) => (
          <Box key={`${x}-${z}`} size={[0.15, 1.05, 0.15]} position={[x, 0.52, z]} color={color} />
        )),
      )}
    </group>
  )
}

function Chair({ color, accent }: FurnitureDefinition) {
  return (
    <group>
      <Box size={[1.15, 0.22, 1.15]} position={[0, 0.68, 0]} color={color} />
      <Box size={[1.12, 1.15, 0.18]} position={[0, 1.2, -0.48]} color={accent} />
      {([-0.42, 0.42] as const).flatMap((x) =>
        ([-0.42, 0.42] as const).map((z) => (
          <Box key={`${x}-${z}`} size={[0.1, 0.65, 0.1]} position={[x, 0.32, z]} color="#76513c" />
        )),
      )}
    </group>
  )
}

function Cabinet({ color, accent }: FurnitureDefinition) {
  return (
    <group>
      <Box size={[2.2, 2.35, 1]} position={[0, 1.18, 0]} color={color} />
      <Box size={[0.92, 1.72, 0.05]} position={[-0.52, 1.15, 0.53]} color={accent} />
      <Box size={[0.92, 1.72, 0.05]} position={[0.52, 1.15, 0.53]} color={accent} />
      <Box size={[0.12, 0.12, 0.08]} position={[-0.12, 1.15, 0.59]} color="#8c6849" />
      <Box size={[0.12, 0.12, 0.08]} position={[0.12, 1.15, 0.59]} color="#8c6849" />
      <Box size={[1.95, 0.12, 0.9]} position={[0, 2.32, 0]} color="#a9825e" />
    </group>
  )
}

function Bookshelf({ color, accent }: FurnitureDefinition) {
  const bookColors = ['#e89b8f', '#91a9d7', '#e4c46d', '#9abf9a', '#c08bc5']
  return (
    <group>
      <Box size={[2.2, 2.8, 0.18]} position={[-0.98, 1.4, 0]} color={color} />
      <Box size={[2.2, 2.8, 0.18]} position={[0.98, 1.4, 0]} color={color} />
      {[0.35, 1.25, 2.15].map((y, index) => (
        <Box key={y} size={[2.05, 0.12, 0.72]} position={[0, y, 0]} color={accent} />
      ))}
      {bookColors.map((bookColor, index) => (
        <Box key={bookColor} size={[0.3, 0.58 + (index % 2) * 0.16, 0.42]} position={[-0.58 + index * 0.28, 0.72, -0.08]} color={bookColor} />
      ))}
      <Box size={[0.42, 0.78, 0.42]} position={[-0.45, 1.55, -0.08]} color="#8ca8d2" />
      <Box size={[0.32, 0.68, 0.42]} position={[0.05, 1.5, -0.08]} color="#d69a77" />
      <Box size={[0.4, 0.7, 0.42]} position={[0.48, 2.08, -0.08]} color="#9dbb8c" />
    </group>
  )
}

function Lamp({ color, accent }: FurnitureDefinition) {
  return (
    <group>
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.5, 0.18, 24]} />
        <meshStandardMaterial color="#9b7658" />
      </mesh>
      <mesh position={[0, 1.48, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 2.55, 16]} />
        <meshStandardMaterial color="#a67c52" />
      </mesh>
      <mesh position={[0, 2.68, 0]} castShadow>
        <coneGeometry args={[0.52, 0.65, 24]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.14, 16, 10]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.35} />
      </mesh>
    </group>
  )
}

function Plant({ color, accent }: FurnitureDefinition) {
  return (
    <group>
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.55, 0.7, 24]} />
        <meshStandardMaterial color="#c47f67" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.73, 0]}>
        <cylinderGeometry args={[0.36, 0.42, 0.12, 24]} />
        <meshStandardMaterial color="#7f624d" />
      </mesh>
      {[[-0.42, 1.18, 0], [0.4, 1.3, 0.1], [0, 1.72, 0], [-0.2, 1.42, 0.28], [0.18, 1.48, -0.3]].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]} rotation={[0.15 * index, 0.25 * index, 0]} castShadow>
          <sphereGeometry args={[0.48 - index * 0.035, 16, 12]} />
          <meshStandardMaterial color={index % 2 ? accent : color} roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function Rug({ color, accent }: FurnitureDefinition) {
  return (
    <group>
      <Box size={[3.8, 0.08, 2.5]} position={[0, 0.04, 0]} color={color} />
      <Box size={[3.45, 0.02, 2.15]} position={[0, 0.095, 0]} color={accent} />
    </group>
  )
}

function Model({ definition }: { definition: FurnitureDefinition }) {
  switch (definition.kind) {
    case 'bed': return <Bed {...definition} />
    case 'sofa': return <Sofa {...definition} />
    case 'coffeeTable': return <CoffeeTable {...definition} />
    case 'diningTable': return <DiningTable {...definition} />
    case 'chair': return <Chair {...definition} />
    case 'cabinet': return <Cabinet {...definition} />
    case 'bookshelf': return <Bookshelf {...definition} />
    case 'lamp': return <Lamp {...definition} />
    case 'plant': return <Plant {...definition} />
    case 'rug': return <Rug {...definition} />
  }
}

export function Furniture3D({ item, definition, selected, onSelect, onMove }: Props) {
  const dragging = useRef(false)
  const offset = useRef(new THREE.Vector3())
  const dragPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), [])

  return (
    <group
      position={[item.x, 0, item.z]}
      rotation={[0, item.rotation * (Math.PI / 2), 0]}
      onPointerDown={(event) => {
        event.stopPropagation()
        onSelect(item.id)
        dragging.current = true
        const hit = event.ray.intersectPlane(dragPlane, new THREE.Vector3())
        if (hit) offset.current.copy(hit).sub(new THREE.Vector3(item.x, 0, item.z))
        event.target.setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        if (!dragging.current) return
        event.stopPropagation()
        const hit = event.ray.intersectPlane(dragPlane, new THREE.Vector3())
        if (!hit) return
        const next = hit.sub(offset.current)
        onMove(item.id, next.x, next.z)
      }}
      onPointerUp={(event) => {
        event.stopPropagation()
        dragging.current = false
        event.target.releasePointerCapture(event.pointerId)
      }}
      onPointerCancel={(event) => {
        dragging.current = false
        event.target.releasePointerCapture(event.pointerId)
      }}
    >
      {selected && (
        <mesh position={[0, 0.025, 0]}>
          <boxGeometry args={[definition.size[0] + 0.18, 0.03, definition.size[1] + 0.18]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.42} />
        </mesh>
      )}
      <Model definition={definition} />
    </group>
  )
}
