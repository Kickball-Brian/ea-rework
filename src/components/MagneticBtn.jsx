import { useEffect, useRef } from 'react'
import { attachMagnetic } from '../lib/attachMagnetic'

/**
 * Wraps any child element and adds a magnetic pull toward the cursor.
 * Only activates on hover-capable devices. Use around primary CTAs only.
 */
export default function MagneticBtn({ children, radius = 90, strength = 0.28 }) {
  const wrapRef = useRef(null)

  useEffect(() => attachMagnetic(wrapRef.current, { radius, strength }), [radius, strength])

  return (
    <span ref={wrapRef} style={{ display: 'inline-block' }}>
      {children}
    </span>
  )
}
