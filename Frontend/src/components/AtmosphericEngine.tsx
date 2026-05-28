import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ═══ SHADER: SUBTLE FLOWING FABRIC ═══
 * A custom vertex shader for slow, organic wave motion.
 */
const FabricShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#FAF7F3") },
    uOpacity: { value: 0.15 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      float elevation = sin(modelPosition.x * 1.5 + uTime * 0.4) * 0.15;
      elevation += sin(modelPosition.y * 2.0 + uTime * 0.3) * 0.1;
      
      modelPosition.z += elevation;
      vElevation = elevation;
      
      gl_Position = projectionMatrix * viewMatrix * modelPosition;
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying float vElevation;
    uniform vec3 uColor;
    uniform float uOpacity;
    
    void main() {
      float highlight = vElevation * 2.5;
      gl_FragColor = vec4(uColor + highlight, uOpacity);
    }
  `,
};

function Fabric({
  position = [0, 0, 0] as [number, number, number],
  scale = [5, 5, 1] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={FabricShader.vertexShader}
        fragmentShader={FabricShader.fragmentShader}
        uniforms={FabricShader.uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/**
 * ═══ DUST PARTICLES ═══
 * Barely visible, floating environmental specks.
 */
function DustParticles({ count = 40 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#c76600" transparent opacity={0.2} sizeAttenuation />
    </points>
  );
}

/**
 * ═══ ATMOSPHERIC LIGHT RAYS ═══
 */
function LightRays() {
  return (
    <group rotation={[0.5, 0.2, 0]}>
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} position={[i * 1.5 - 2, 0, -2]} scale={[0.5, 8, 1]}>
          <planeGeometry />
          <meshBasicMaterial
            color="#fce7d2"
            transparent
            opacity={0.03 + i * 0.01}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * ═══ CORE ENGINE COMPONENT ═══
 */
export function AtmosphericEngine({
  type = "story", // 'story' or 'tech'
  className = "",
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none z-0 ${className}`}>
      <Canvas alpha dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.5} />

        <Suspense fallback={null}>
          {/* Global Environmental Depth */}
          <DustParticles count={type === "story" ? 60 : 30} />

          {type === "story" && (
            <>
              <LightRays />
              <Fabric position={[0, 0, -2]} scale={[12, 8, 1]} rotation={[0.2, 0, 0]} />
            </>
          )}

          {type === "tech" && (
            <group position={[0, 0, -1]}>
              {/* Layered material feel */}
              <Fabric position={[0, 0.5, 0]} scale={[10, 4, 1]} />
              <Fabric position={[0, -0.5, -1]} scale={[10, 4, 1]} />
            </group>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

/**
 * ═══ INTERACTIVE CARD 3D ═══
 * Subtle tilt effect for premium cards.
 */
export function InteractiveCard3D({ children, className = "" }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-500 ease-out will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
