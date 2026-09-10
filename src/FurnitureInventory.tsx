import type { FurnitureDefinition } from './types'
import { FurnitureArt } from './furniture-art'

interface Props {
  furniture: FurnitureDefinition[]
  onAdd: (definition: FurnitureDefinition) => void
}

export function FurnitureInventory({ furniture, onAdd }: Props) {
  return (
    <section className="inventory" aria-label="Furniture inventory">
      <div className="inventory-header">
        <div>
          <span className="eyebrow">COLLECTION</span>
          <h2>Furniture</h2>
        </div>
        <span className="count-pill">{furniture.length} items</span>
      </div>
      <div className="inventory-scroll">
        {furniture.map((item) => (
          <button className="inventory-card" key={item.id} onClick={() => onAdd(item)} aria-label={`Add ${item.name}`}>
            <div className="thumb"><FurnitureArt asset={item.asset} rotation={0} width={item.width} height={item.height} /></div>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
