'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const holoVertexShader = `
varying vec3 vNormal;
void main() {
  vNormal = normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const holoFragmentShader = `
uniform vec3 uColor;
uniform float uTime;
varying vec3 vNormal;
void main() {
  float fresnel = 1.0 - dot(normalize(vNormal), vec3(0.0, 0.0, 1.0));
  float scanline = sin(gl_FragCoord.y * 0.8 + uTime * 20.0) * 0.05;
  gl_FragColor = vec4(uColor * fresnel + scanline, fresnel * 0.8);
  gl_FragColor.a = clamp(gl_FragColor.a, 0.0, 1.0);
}`;

export function HoloAvatar() {
  const ref = useRef<THREE.Mesh>(null!);
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame(({ clock }) => {
    if(shaderRef.current) shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
    if(ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  const uniforms = {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#5AF4FF') },
  };

  return (
    <mesh ref={ref} position={[0, 1.5, 0]}>
      <icosahedronGeometry args={[1, 4]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={holoVertexShader}
        fragmentShader={holoFragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}
