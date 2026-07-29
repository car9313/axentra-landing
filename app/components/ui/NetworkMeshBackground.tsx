"use client";

import React, { useMemo } from "react";

interface NetworkMeshProps {
  primaryColor?: string;
  secondaryColor?: string;
  gridColor?: string;
  className?: string;
}

// --- 1. Malla en Perspectiva Curva (Rediseñada con más espacio, profundidad y degradado) ---
const WavePerspectiveGrid = React.memo(({ gridColor }: { gridColor: string }) => {
  const gridSquares = useMemo(() => {
    const rows = 12;
    const cols = 16;
    const squares = [];

    let baseR = 180, baseG = 212, baseB = 255;
    if (gridColor.startsWith('#')) {
      const hex = gridColor.replace('#', '');
      if (hex.length === 6) {
        baseR = parseInt(hex.substring(0, 2), 16);
        baseG = parseInt(hex.substring(2, 4), 16);
        baseB = parseInt(hex.substring(4, 6), 16);
      }
    }

    for (let r = 0; r < rows; r++) {
      const v = r / (rows - 1); // 0 = Fondo superior, 1 = Primer plano inferior
      for (let c = 0; c < cols; c++) {
        const u = c / (cols - 1); // 0 = Izquierda, 1 = Derecha

        // Posición base con desplazamiento diagonal (profundidad 3D)
        const xBase = 100 + u * 480 + v * 90;
        const yBase = 120 + v * 360;

        // Onda suave en forma de "S" diagonal 
        const wave = (Math.sin(u * 1.8 + v * 1.5) * 0.6 + Math.sin(u * 3.5 - v * 1.8) * 0.4) * 45;

        const x = xBase + wave * 0.6;
        const y = yBase + wave;

        // El tamaño crece con la profundidad (v) y se multiplica por 0.7 para dejar espacios amplios
        const size = 8 + v * 28;
        const renderSize = size * 0.7; 

        // Degradado de opacidad: muy transparente en la izquierda y en el fondo, sólido en la derecha y frente
        const fadeLeft = Math.pow(u, 0.6);
        const opacity = Math.round(Math.max(0.02, Math.min(0.8, (0.08 + v * 0.55) * fadeLeft)) * 1000) / 1000;

        // Efecto de luz 3D sobre la ola
        const brightness = 0.8 + (wave / 45) * 0.25;
        const r = Math.min(255, Math.round(baseR * brightness));
        const g = Math.min(255, Math.round(baseG * brightness));
        const b = Math.min(255, Math.round(baseB * brightness));

        if (x > -60 && x < 750 && y > 50 && y < 600 && opacity > 0.02) {
          squares.push({
            id: `wgrid-${r}-${c}`,
            x: Math.round(x * 10000) / 10000,
            y: Math.round(y * 10000) / 10000,
            size: Math.round(renderSize * 10000) / 10000,
            opacity,
            fill: `rgb(${r}, ${g}, ${b})`,
          });
        }
      }
    }
    return squares;
  }, [gridColor]);

  return (
    <g id="wave-perspective-grid">
      {gridSquares.map((sq, idx) => (
        <rect
          key={`wg-${idx}`}
          x={sq.x - sq.size / 2}
          y={sq.y - sq.size / 2}
          width={sq.size}
          height={sq.size}
          rx={sq.size * 0.15}
          fill={sq.fill}
          opacity={sq.opacity}
        />
      ))}
    </g>
  );
});
WavePerspectiveGrid.displayName = "WavePerspectiveGrid";

// --- 2. Píxeles Flotantes Dispersos (Posicionados para seguir el flujo visual) ---
const PixelClusters = React.memo(({ color }: { color: string }) => {
  const pixels = useMemo(
    () => [
      // Izquierda
      { x: 150, y: 160, size: 10, opacity: 0.25 },
      { x: 170, y: 180, size: 7, opacity: 0.15 },
      { x: 100, y: 250, size: 9, opacity: 0.3 },
      // Centro Superior
      { x: 280, y: 90, size: 12, opacity: 0.2 },
      { x: 310, y: 110, size: 8, opacity: 0.4 },
      { x: 350, y: 80, size: 14, opacity: 0.3 },
      { x: 400, y: 120, size: 10, opacity: 0.2 },
      // Centro Derecha
      { x: 440, y: 180, size: 11, opacity: 0.3 },
      { x: 480, y: 150, size: 13, opacity: 0.25 },
      { x: 520, y: 100, size: 8, opacity: 0.35 },
      { x: 550, y: 130, size: 9, opacity: 0.2 },
      // Derecha Extrema
      { x: 590, y: 150, size: 12, opacity: 0.3 },
      { x: 620, y: 220, size: 14, opacity: 0.25 },
    ],
    []
  );

  return (
    <g id="pixel-clusters">
      {pixels.map((pix, i) => (
        <rect
          key={`pix-${i}`}
          x={pix.x - pix.size / 2}
          y={pix.y - pix.size / 2}
          width={pix.size}
          height={pix.size}
          rx={pix.size * 0.15}
          fill={color}
          opacity={pix.opacity}
        />
      ))}
    </g>
  );
});
PixelClusters.displayName = "PixelClusters";

// --- 3. Red de Circuitos y Nodos (Sin rotación y alineado) ---
const CircuitNetwork = React.memo(
  ({ primaryColor, secondaryColor }: { primaryColor: string; secondaryColor: string }) => {
    // Trazos en ángulo recto (Manhattan)
    const paths = useMemo(
      () => [
        "M 180 200 L 240 200 L 240 310 L 320 310",                   // Línea inferior izquierda
        "M 180 200 L 180 140 L 260 140 L 260 100",                   // Línea superior izquierda
        "M 260 140 L 330 140 L 330 110 L 400 110 L 400 70",          // Línea central superior
        "M 330 140 L 330 160 L 370 160 L 370 220 L 440 220",         // Ramificación central hacia abajo
        "M 400 110 L 510 110 L 510 150 L 560 150 L 560 100 L 620 100 L 620 70", // Línea superior derecha
        "M 440 220 L 530 220 L 530 180 L 620 180 L 620 220",         // Línea inferior derecha
        "M 560 150 L 580 150 L 580 130",                             // Mini rama
      ],
      []
    );

    // Nodos Circulares (Uniones y finales de línea)
    const circleNodes = useMemo(
      () => [
        { x: 180, y: 200, r: 4.5 },
        { x: 260, y: 140, r: 4 },
        { x: 330, y: 110, r: 4 },
        { x: 400, y: 70, r: 4 },
        { x: 400, y: 110, r: 4.5 },
        { x: 320, y: 310, r: 3.5 },
        { x: 440, y: 220, r: 4 },
        { x: 510, y: 110, r: 4 },
        { x: 560, y: 150, r: 4.5 },
        { x: 620, y: 70, r: 4 },
        { x: 620, y: 180, r: 4.5 },
        { x: 580, y: 130, r: 3.5 },
        { x: 260, y: 100, r: 4 },
        { x: 240, y: 200, r: 3.5 },
        { x: 370, y: 160, r: 3.5 },
        { x: 530, y: 180, r: 3.5 },
        { x: 560, y: 100, r: 3.5 },
        { x: 180, y: 140, r: 3.5 },
      ],
      []
    );

    // Bloques Rectangulares Sólidos (ELIMINADA LA ROTACIÓN DE 45°)
    const blockNodes = useMemo(
      () => [
        { x: 320, y: 310, size: 24 },  // Bloque inferior izquierdo
        { x: 440, y: 220, size: 20 },  // Bloque central
        { x: 260, y: 100, size: 14 },  // Bloque superior izquierdo
        { x: 620, y: 180, size: 16 },  // Bloque derecho
        { x: 580, y: 130, size: 12 },  // Bloque pequeño superior
      ],
      []
    );

    return (
      <g id="circuit-network">
        {/* Líneas */}
        {paths.map((d, i) => (
          <path
            key={`path-${i}`}
            d={d}
            fill="none"
            stroke={primaryColor}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.9}
          />
        ))}

        {/* Nodos Circulares */}
        {circleNodes.map((node, i) => (
          <circle
            key={`c-node-${i}`}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={primaryColor}
            stroke="#FFFFFF"
            strokeWidth={1.8}
          />
        ))}

        {/* Nodos de Bloque (Sin rotación, alineados horizontal/verticalmente) */}
        {blockNodes.map((node, i) => (
          <rect
            key={`b-node-${i}`}
            x={node.x - node.size / 2}
            y={node.y - node.size / 2}
            width={node.size}
            height={node.size}
            rx={node.size * 0.15}
            fill={secondaryColor}
            stroke="#FFFFFF"
            strokeWidth={1.8}
          />
        ))}
      </g>
    );
  }
);
CircuitNetwork.displayName = "CircuitNetwork";

// --- COMPONENTE PRINCIPAL EXPORTADO ---
export function NetworkMeshBackground({
  primaryColor = "#2563EB",   // Azul para líneas y círculos
  secondaryColor = "#1D4ED8", // Azul oscuro para los bloques sólidos
  gridColor = "#AECFFF",      // Azul celeste suave para la malla de fondo y píxeles
  className = "",
}: NetworkMeshProps) {
  const VB_W = 680;
  const VB_H = 520;

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {/* Capa 1: Fondo Malla en Perspectiva 3D */}
        <WavePerspectiveGrid gridColor={gridColor} />

        {/* Capa 2: Píxeles Flotantes Dispersos */}
        <PixelClusters color={gridColor} />

        {/* Capa 3: Red de Circuitos y Nodos */}
        <CircuitNetwork primaryColor={primaryColor} secondaryColor={secondaryColor} />
      </svg>
    </div>
  );
}