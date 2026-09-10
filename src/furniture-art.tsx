import type { Rotation } from './types'

interface Props { asset: string; rotation: Rotation; width: number; height: number }

const stroke = '#6b4f58'

export function FurnitureArt({ asset, rotation, width, height }: Props) {
  const sx = rotation % 2 === 0 ? width : height
  const sy = rotation % 2 === 0 ? height : width
  const w = 100 + sx * 24
  const h = 70 + sy * 18
  const common = { stroke, strokeWidth: 2.5, strokeLinejoin: 'round' as const }

  const content = (() => {
    switch (asset) {
      case 'bed': return <><rect x="12" y="22" width="76" height="38" rx="7" fill="#f5c5cf" {...common}/><rect x="18" y="27" width="30" height="14" rx="5" fill="#fff5ee" {...common}/><path d="M50 27v32M20 48h64" fill="none" {...common}/><circle cx="72" cy="33" r="3" fill="#d994a6"/></>
      case 'sofa': return <><path d="M14 32Q14 20 26 20h48q12 0 12 12v25H14Z" fill="#b9cde5" {...common}/><path d="M18 45h64v17H18z" fill="#9eb7d6" {...common}/><path d="M28 24v20M72 24v20" fill="none" {...common}/><circle cx="37" cy="36" r="7" fill="#d9e4f0" {...common}/><circle cx="63" cy="36" r="7" fill="#d9e4f0" {...common}/></>
      case 'coffee-table': return <><ellipse cx="50" cy="36" rx="34" ry="16" fill="#e7b88d" {...common}/><path d="M28 40v22M72 40v22" fill="none" stroke={stroke} strokeWidth="5"/><ellipse cx="50" cy="34" rx="12" ry="5" fill="#f7d7b5"/></>
      case 'dining-table': return <><ellipse cx="50" cy="34" rx="38" ry="17" fill="#d8a87b" {...common}/><path d="M25 39l-7 24M75 39l7 24M50 42v22" fill="none" stroke={stroke} strokeWidth="5"/><path d="M37 29h26" stroke="#fff1df" strokeWidth="4"/></>
      case 'chair': return <><path d="M30 25h40v27H30z" fill="#e6a6b5" {...common}/><path d="M30 44h40v16H30z" fill="#d98e9f" {...common}/><path d="M35 60l-4 8M65 60l4 8" fill="none" stroke={stroke} strokeWidth="4"/></>
      case 'cabinet': return <><rect x="16" y="18" width="68" height="45" rx="4" fill="#d5aa82" {...common}/><path d="M50 18v45" stroke={stroke} strokeWidth="2"/><circle cx="44" cy="41" r="2.5" fill={stroke}/><circle cx="56" cy="41" r="2.5" fill={stroke}/><path d="M22 26h22M56 26h22" stroke="#f3d5b3" strokeWidth="4"/></>
      case 'bookshelf': return <><rect x="16" y="14" width="68" height="50" rx="3" fill="#c98f70" {...common}/><path d="M18 30h64M18 46h64" stroke="#f0c6a4" strokeWidth="3"/><path d="M27 18v10M38 18v10M58 34v10M70 34v10M30 50v10M45 50v10" stroke="#f4e0bf" strokeWidth="5"/></>
      case 'lamp': return <><path d="M50 30v34" stroke={stroke} strokeWidth="4"/><path d="M32 31h36l-6-16H38z" fill="#f3d88c" {...common}/><circle cx="50" cy="66" r="9" fill="#c89e83" {...common}/><circle cx="50" cy="30" r="7" fill="#fff1b8"/></>
      case 'plant': return <><path d="M36 40h28l-4 25H40z" fill="#e7a99d" {...common}/><path d="M50 40V23M50 30Q34 27 31 16Q45 15 50 26M50 33Q65 30 69 20Q56 18 50 28" fill="#9fc98d" {...common}/></>
      case 'rug': return <><ellipse cx="50" cy="40" rx="40" ry="20" fill="#e8b7c4" {...common}/><ellipse cx="50" cy="40" rx="29" ry="13" fill="#f5d4dc" stroke="#b97991" strokeWidth="2" strokeDasharray="4 4"/></>
      default: return <rect x="20" y="20" width="60" height="35" rx="8" fill="#ddd" {...common}/>
    }
  })()

  return <svg width={w} height={h} viewBox="0 0 100 80" aria-hidden="true" className="furniture-svg"><g transform={`rotate(${rotation * 90} 50 40)`}>{content}</g></svg>
}
