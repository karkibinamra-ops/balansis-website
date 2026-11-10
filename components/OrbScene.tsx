"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function DotSphere() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const points = useMemo(() => {
    const positions: number[] = [];
    const rows = 19;
    for (let row = -rows; row <= rows; row++) {
      const y = row / rows;
      const width = Math.sqrt(1 - y * y);
      const count = Math.max(3, Math.round(34 * width));
      for (let col = -count; col <= count; col++) {
        const x = (col / count) * width;
        const z2 = Math.max(0, 1 - x * x - y * y);
        const z = Math.sqrt(z2);
        const radius = 1.58;
        positions.push(x * radius, y * radius, z * radius);
      }
    }
    return new Float32Array(positions);
  }, []);
  useFrame((state, delta) => {
    pointer.current.x += (state.pointer.x * 0.22 - pointer.current.x) * 0.035;
    pointer.current.y += (state.pointer.y * 0.16 - pointer.current.y) * 0.035;
    if (group.current) {
      group.current.rotation.y += delta * 0.055 + pointer.current.x * delta * 0.35;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.current.y, 0.025);
    }
    if (core.current) core.current.rotation.y -= delta * 0.12;
  });
  return <group ref={group}>
    <Points positions={points} stride={3}><PointMaterial transparent color="#eaf6ff" size={0.035} sizeAttenuation depthWrite={false} opacity={0.92} /></Points>
    <mesh ref={core} scale={0.56}><icosahedronGeometry args={[1,3]} /><meshPhysicalMaterial color="#102b43" metalness={0.82} roughness={0.24} transparent opacity={0.42} wireframe /></mesh>
    <mesh rotation={[Math.PI/2.4,0.2,0.3]}><torusGeometry args={[2.05,0.006,8,220]} /><meshBasicMaterial color="#7bcfff" transparent opacity={0.52} /></mesh>
    <mesh rotation={[0.4,Math.PI/2.1,0.8]}><torusGeometry args={[2.25,0.004,8,220]} /><meshBasicMaterial color="#8b9eb1" transparent opacity={0.25} /></mesh>
  </group>;
}
export default function OrbScene() {
  return <div className="orb-scene" aria-label="Interactive three-dimensional Balansis particle sculpture"><Canvas camera={{position:[0,0,6.3],fov:40}} dpr={[1,1.5]} gl={{alpha:true,antialias:true}}><ambientLight intensity={0.8}/><pointLight position={[3,3,4]} intensity={24} color="#b7e7ff"/><pointLight position={[-4,-2,1]} intensity={13} color="#2875b7"/><Float speed={0.7} rotationIntensity={0.08} floatIntensity={0.2}><DotSphere/></Float><Environment preset="city"/></Canvas></div>;
}
