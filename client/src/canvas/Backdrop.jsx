import React, { useRef } from 'react'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Backdrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      temporalSmoothing={true}
      frames={60}
      alphaTest={0.85}
      scale={0}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <RandomizedLight
        amount={4}
        radius={10}
        intensity={0.55}
        ambient={1.5}
        position={[5,5,-10]}
      />
      <RandomizedLight
        amount={9}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5,5,-9]}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop