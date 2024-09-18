"use client";

import React, { useEffect, useState } from "react";

interface Flower {
    id: string;
    x: number;
    y: number;
}

export default function Bubbles() {
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        // Actualizar el tamaño de la ventana
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        handleResize(); // Establecer tamaño inicial
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (windowSize.width === 0 || windowSize.height === 0) return;

        const interval = setInterval(() => {
            // Generar una nueva flor
            const newFlower: Flower = {
                id: Math.random().toString(36).substr(2, 9),
                x: Math.random() * (windowSize.width - 50), // Restar el tamaño de la flor
                y: Math.random() * (windowSize.height - 50),
            };

            setFlowers((prevFlowers) => [...prevFlowers, newFlower]);

            // Eliminar la flor después de cierto tiempo
            setTimeout(() => {
                setFlowers((prevFlowers) => prevFlowers.filter((f) => f.id !== newFlower.id));
            }, 5000); // La flor dura 5 segundos
        }, 1000); // Generar una flor cada segundo

        return () => clearInterval(interval);
    }, [windowSize]);

    return (
        <div className="fixed inset-0 pointer-events-none">
            {flowers.map((flower) => (
                <div
                    key={flower.id}
                    className="absolute animate-flower"
                    style={{ left: flower.x, top: flower.y }}
                >
                    {/* SVG de una margarita con efectos de iluminación */}
                    <svg width="50" height="50" viewBox="0 0 50 50">
                        {/* Definiciones para efectos de iluminación */}
                        <defs>
                            <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#fff59d" />
                                <stop offset="100%" stopColor="#fbc02d" />
                            </radialGradient>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        {/* Pétalos de la margarita */}
                        <g filter="url(#glow)">
                            {[...Array(8)].map((_, i) => (
                                <ellipse
                                    key={i}
                                    cx="25"
                                    cy="15"
                                    rx="5"
                                    ry="15"
                                    fill="url(#gradient)"
                                    transform={`rotate(${i * 45} 25 25)`}
                                />
                            ))}
                            {/* Centro de la flor */}
                            <circle cx="25" cy="25" r="8" fill="#ffeb3b" />
                        </g>
                    </svg>
                </div>
            ))}
        </div>
    );
}
