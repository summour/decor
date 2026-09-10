import { useCallback, useEffect, useMemo, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { DEFAULT_ROOM, FURNITURE, ROOM_DEPTH, ROOM_WIDTH, furnitureById } from './game-data'
import type { FurnitureDefinition, PlacedFurniture } from './game-types'
import { Furniture3D } from './Furniture3D'
import './styles.css'

const SAVE_KEY = 'decor-3d-room-v1'

type SceneProps = {
  furniture: PlacedFurniture[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  onMove: (id: string, x: number, z: number) => void
}

function CameraRig() {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(11, 11, 11)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera])

  return null
}

function Window({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.9, 1.75, 0.06]} />
        <meshStandardMaterial color="#b9d9df" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[0.09, 1.82, 0.12]} />
        <meshStandardMaterial color="#fff7ee" />
      </mesh>
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[2.96, 0.09, 0.12]} />
        <meshStandardMaterial color="#fff7ee" />
      </mesh>
      <mesh position={[-1.5, 0, 0.07]}>
        <boxGeometry args={[0.12, 1.9, 0.12]} />
        <meshStandardMaterial color="#fff7ee" />
      </mesh>
      <mesh position={[1.5, 0, 0.07]}>
        <boxGeometry args={[0.12, 1.9, 0.12]} />
        <meshStandardMaterial color="#fff7ee" />
      </mesh>
    </group>
  )
}

function RoomScene({ furniture, selectedId, onSelect, onMove }: SceneProps) {
  return (
    <>
      <ambientLight intensity={1.8} />
      <directionalLight
        castShadow
        position={[4, 10, 5]}
        intensity={2.4}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
      <hemisphereLight intensity={0.65} groundColor="#d7c5b7" color="#fff8ed" />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        onPointerDown={(event) => {
          event.stopPropagation()
          onSelect(null)
        }}
      >
        <planeGeometry args={[ROOM_WIDTH, ROOM_DEPTH]} />
        <meshStandardMaterial color="#ead9c4" roughness={0.9} />
      </mesh>

      <mesh position={[0, 2.4, -4.08]} receiveShadow>
        <boxGeometry args={[ROOM_WIDTH + 0.25, 4.8, 0.18]} />
        <meshStandardMaterial color="#f4eee6" roughness={0.95} />
      </mesh>
      <mesh position={[-5.08, 2.4, 0]} receiveShadow>
        <boxGeometry args={[0.18, 4.8, ROOM_DEPTH + 0.25]} />
        <meshStandardMaterial color="#eee5da" roughness={0.95} />
      </mesh>

      <mesh position={[0, 0.12, -3.95]}>
        <boxGeometry args={[ROOM_WIDTH, 0.18, 0.14]} />
        <meshStandardMaterial color="#d5bda2" />
      </mesh>
      <mesh position={[-4.95, 0.12, 0]}>
        <boxGeometry args={[0.14, 0.18, ROOM_DEPTH]} />
        <meshStandardMaterial color="#d5bda2" />
      </mesh>

      <Window position={[0.15, 2.85, -3.93]} />
      <Window position={[-4.93, 2.85, 0.7]} rotation={[0, Math.PI / 2, 0]} />

      <group position={[-4.92, 1.7, -2.25]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.8, 3.1, 0.1]} />
          <meshStandardMaterial color="#b97d5c" />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[1.4, 2.72, 0.05]} />
          <meshStandardMaterial color="#d89d78" />
        </mesh>
        <mesh position={[0.55, 0, 0.14]}>
          <sphereGeometry args={[0.08, 12, 8]} />
          <meshStandardMaterial color="#f0cf83" />
        </mesh>
      </group>

      {furniture.map((item) => {
        const definition = furnitureById.get(item.furnitureId)
        if (!definition) return null
        return (
          <Furniture3D
            key={item.id}
            item={item}
            definition={definition}
            selected={item.id === selectedId}
            onSelect={onSelect}
            onMove={onMove}
          />
        )
      })}
    </>
  )
}

function clampFurniture(definition: FurnitureDefinition, x: number, z: number, rotation: number) {
  const rotated = rotation % 2 === 1
  const halfX = (rotated ? definition.size[1] : definition.size[0]) / 2
  const halfZ = (rotated ? definition.size[0] : definition.size[1]) / 2
  const limitX = ROOM_WIDTH / 2 - halfX - 0.12
  const limitZ = ROOM_DEPTH / 2 - halfZ - 0.12
  return {
    x: THREE.MathUtils.clamp(x, -limitX, limitX),
    z: THREE.MathUtils.clamp(z, -limitZ, limitZ),
  }
}

function loadSavedRoom(): PlacedFurniture[] {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return DEFAULT_ROOM
    const parsed = JSON.parse(raw) as PlacedFurniture[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ROOM
  } catch {
    return DEFAULT_ROOM
  }
}

export default function App() {
  const [furniture, setFurniture] = useState<PlacedFurniture[]>(loadSavedRoom)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(furniture))
  }, [furniture])

  const selected = useMemo(
    () => furniture.find((item) => item.id === selectedId) ?? null,
    [furniture, selectedId],
  )

  const selectedDefinition = selected ? furnitureById.get(selected.furnitureId) ?? null : null

  const moveFurniture = useCallback((id: string, x: number, z: number) => {
    setFurniture((current) => current.map((item) => {
      if (item.id !== id) return item
      const definition = furnitureById.get(item.furnitureId)
      if (!definition) return item
      const position = clampFurniture(definition, x, z, item.rotation)
      return { ...item, ...position }
    }))
  }, [])

  const rotateSelected = () => {
    if (!selected) return
    setFurniture((current) => current.map((item) => {
      if (item.id !== selected.id) return item
      const nextRotation = ((item.rotation + 1) % 4) as 0 | 1 | 2 | 3
      const definition = furnitureById.get(item.furnitureId)
      if (!definition) return item
      const position = clampFurniture(definition, item.x, item.z, nextRotation)
      return { ...item, rotation: nextRotation, ...position }
    }))
  }

  const deleteSelected = () => {
    if (!selected) return
    setFurniture((current) => current.filter((item) => item.id !== selected.id))
    setSelectedId(null)
  }

  const addFurniture = (definition: FurnitureDefinition) => {
    const id = `${definition.id}-${Date.now()}`
    const position = clampFurniture(definition, 0, 0, 0)
    setFurniture((current) => [...current, {
      id,
      furnitureId: definition.id,
      ...position,
      rotation: 0,
    }])
    setSelectedId(id)
  }

  const resetRoom = () => {
    setFurniture(DEFAULT_ROOM.map((item) => ({ ...item })))
    setSelectedId(null)
  }

  return (
    <main className="game-shell">
      <div className="game-canvas">
        <Canvas
          orthographic
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [11, 11, 11], zoom: 58, near: 0.1, far: 100 }}
          gl={{ antialias: true }}
        >
          <CameraRig />
          <color attach="background" args={['#f7f1e9']} />
          <RoomScene
            furniture={furniture}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onMove={moveFurniture}
          />
        </Canvas>
      </div>

      <header className="top-bar">
        <div>
          <div className="eyebrow">MY LITTLE ROOM</div>
          <h1>ห้องของฉัน</h1>
        </div>
        <button className="reset-button" onClick={resetRoom}>รีเซ็ต</button>
      </header>

      {selected && selectedDefinition && (
        <div className="selection-panel">
          <div className="selection-name">{selectedDefinition.name}</div>
          <button onClick={rotateSelected}>↻ หมุน</button>
          <button className="danger" onClick={deleteSelected}>ลบ</button>
        </div>
      )}

      <section className="inventory-panel">
        <div className="inventory-header">
          <div>
            <strong>Furniture</strong>
            <span>{furniture.length} ชิ้นในห้อง</span>
          </div>
          <span className="hint">แตะเพื่อเพิ่ม · ลากเพื่อย้าย</span>
        </div>
        <div className="inventory-scroll">
          {FURNITURE.map((item) => (
            <button className="inventory-card" key={item.id} onClick={() => addFurniture(item)}>
              <div className="inventory-preview" style={{ background: item.accent }}>
                <span style={{ background: item.color }} />
              </div>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
