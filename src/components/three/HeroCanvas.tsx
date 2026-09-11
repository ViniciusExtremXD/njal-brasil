'use client';

import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2  uPlane;      // proporção do plano na tela
  uniform vec2  uImage;      // proporção da imagem
  uniform vec2  uMouse;      // ponteiro normalizado (-1..1)
  uniform float uTime;
  uniform float uEnergy;     // 0..1 — sobe com a velocidade do scroll/ponteiro
  uniform float uReveal;     // 0..1 — entrada do hero
  uniform vec2  uFocus;      // ponto de interesse do recorte (0..1)
  uniform float uZoom;       // <1 aproxima e isola uma região da arte

  varying vec2 vUv;

  // Ruído barato para a granulação e a ondulação.
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // Recorta a textura como background-size: cover.
  vec2 coverUv(vec2 uv, vec2 plane, vec2 image, vec2 focus, float zoom) {
    float planeRatio = plane.x / plane.y;
    float imageRatio = image.x / image.y;
    vec2 scale = planeRatio > imageRatio
      ? vec2(1.0, imageRatio / planeRatio)
      : vec2(planeRatio / imageRatio, 1.0);
    // Aproxima e ancora no ponto de interesse — as artes da marca trazem
    // tipografia embutida, então o recorte precisa isolar só a fotografia.
    return (uv - 0.5) * scale * zoom + focus;
  }

  void main() {
    vec2 uv = coverUv(vUv, uPlane, uImage, uFocus, uZoom);

    // Campo de atração do ponteiro: a imagem afunda na direção do cursor.
    vec2 toMouse = uv - (uMouse * 0.5 + 0.5);
    float pull = smoothstep(0.55, 0.0, length(toMouse));
    uv -= toMouse * pull * (0.055 + uEnergy * 0.09);

    // Ondulação lenta e contínua — o tecido nunca fica parado.
    uv.x += sin(uv.y * 9.0 + uTime * 0.5) * 0.0022;
    uv.y += cos(uv.x * 7.0 + uTime * 0.4) * 0.0018;

    // Separação RGB proporcional à energia do movimento.
    float shift = (0.0016 + uEnergy * 0.012) * (0.35 + pull);
    float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
    vec3 color = vec3(r, g, b);

    // A fotografia da marca é de estúdio escuro: ganho primeiro, contraste
    // depois, senão o atleta some junto com o fundo.
    // A fotografia da marca é low-key extremo (fundo preto, luz de recorte):
    // sem ganho forte o atleta simplesmente não aparece na tela.
    color *= 2.4;
    color = (color - 0.5) * 1.08 + 0.52;
    color = clamp(color, 0.0, 1.0);

    // Brasa vermelha nas altas luzes, sem tingir a pele inteira.
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    color += vec3(0.36, 0.02, 0.10) * smoothstep(0.55, 1.0, lum) * (0.35 + uEnergy);

    // Granulação e varredura para casar com a atmosfera em CSS.
    color += (noise(vUv * 900.0 + fract(uTime * 0.7) * 60.0) - 0.5) * 0.05;
    color *= 1.0 - 0.05 * step(0.5, fract(vUv.y * 420.0));

    // Vinheta forte: o atleta emerge do escuro.
    // smoothstep exige edge0 < edge1 — invertê-las é comportamento indefinido.
    float vig = 1.0 - smoothstep(0.30, 1.05, length(vUv - 0.5) * 1.6);
    color *= mix(0.5, 1.0, vig);

    // Entrada: revela de baixo para cima com borda quente.
    float edge = smoothstep(uReveal - 0.12, uReveal, vUv.y);
    color = mix(color, vec3(0.91, 0.07, 0.25), edge * 0.9 * step(0.001, 1.0 - uReveal));
    float alpha = 1.0 - edge * step(0.001, 1.0 - uReveal);

    gl_FragColor = vec4(color, alpha);
  }
`;

function Plane({ src, focus, zoom }: { src: string; focus: [number, number]; zoom: number }) {
  const texture = useTexture(src);

  // O shader é custom: não há conversão automática de espaço de cor na
  // amostragem. Marcamos a textura como crua e desligamos a conversão de
  // saída — sem isso a imagem sofre encode sRGB duplo e estoura em branco.
  texture.colorSpace = THREE.NoColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  const mesh = useRef<THREE.Mesh>(null);
  const { viewport, size } = useThree();

  const energy = useRef(0);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const target = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uPlane: { value: new THREE.Vector2(1, 1) },
      uImage: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
      uEnergy: { value: 0 },
      uReveal: { value: 0 },
      uFocus: { value: new THREE.Vector2(focus[0], focus[1]) },
      uZoom: { value: zoom },
    }),
    [texture, focus, zoom]
  );

  useFrame((state, delta) => {
    const u = uniforms;
    u.uTime.value += delta;

    // Entrada do hero: sobe uma vez até 1 e fica.
    u.uReveal.value = Math.min(1, u.uReveal.value + delta * 0.85);

    target.current.set(state.pointer.x, state.pointer.y);
    const travel = pointer.current.distanceTo(target.current);
    pointer.current.lerp(target.current, 0.07);
    u.uMouse.value.copy(pointer.current);

    // Energia decai sozinha — sem isso o shader fica "aceso" para sempre.
    energy.current = Math.min(1, energy.current * 0.92 + travel * 1.6);
    u.uEnergy.value = energy.current;

    u.uPlane.value.set(size.width, size.height);
    const img = texture.image as { width: number; height: number } | undefined;
    if (img?.width) u.uImage.value.set(img.width, img.height);
  });

  return (
    <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

/**
 * Avisa o pai quando o contexto WebGL cai (GPU reset, aba suspensa em
 * dispositivo com pouca memória) para que a página volte à imagem estática
 * em vez de ficar com um canvas morto na tela.
 */
function ContextGuard({ onLost }: { onLost: () => void }) {
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    const canvas = gl.domElement;
    const handle = (e: Event) => {
      e.preventDefault();
      onLost();
    };
    canvas.addEventListener('webglcontextlost', handle);
    return () => canvas.removeEventListener('webglcontextlost', handle);
  }, [gl, onLost]);

  return null;
}

export default function HeroCanvas({
  src,
  focus = [0.5, 0.5],
  zoom = 1,
  onContextLost,
}: {
  src: string;
  /** Ponto da imagem que deve ficar visível no recorte (0..1). */
  focus?: [number, number];
  /** Fator de aproximação: 1 = cover normal, 0.5 = metade da área. */
  zoom?: number;
  onContextLost?: () => void;
}) {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      camera={{ position: [0, 0, 1], fov: 50 }}
      frameloop="always"
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.LinearSRGBColorSpace;
        gl.toneMapping = THREE.NoToneMapping;
      }}
    >
      <ContextGuard onLost={() => onContextLost?.()} />
      <Suspense fallback={null}>
        <Plane src={src} focus={focus} zoom={zoom} />
      </Suspense>
    </Canvas>
  );
}
