"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function StarField() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow constant rotation
      groupRef.current.rotation.y += 0.0005;
      groupRef.current.rotation.x += 0.0002;
      
      // Slight parallax based on mouse
      const targetX = (state.pointer.y * Math.PI) / 10;
      const targetY = (state.pointer.x * Math.PI) / 10;
      
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.02;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={20} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

export function NeuralBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#0a0a0a]">
      {/* We use a black background to make the stars pop. The portfolio uses #0a0a0a mostly anyway */}
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarField />
      </Canvas>
    </div>
  );
}
