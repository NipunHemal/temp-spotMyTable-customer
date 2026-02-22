"use client";

import React from "react";
import { Circle, Group, Path } from "react-konva";
import { Decoration } from "@/types/restaurant";

interface PlantProps {
    decoration: Decoration;
}

const Plant: React.FC<PlantProps> = ({ decoration }) => {
    const { width, height } = decoration.size;
    const radius = Math.min(width, height) / 2;

    return (
        <Group
            x={decoration.position.x}
            y={decoration.position.y}
            rotation={decoration.rotation || 0}
            listening={false}
        >
            <Circle
                radius={radius}
                fill="#ffffff"
                stroke="#e4e4e7"
                strokeWidth={1.5}
                shadowColor="rgba(0, 0, 0, 0.1)"
                shadowBlur={5}
                shadowOffset={{ x: 2, y: 2 }}
                shadowOpacity={0.3}
            />
            <Path
                data="M0,-12 C4,-12 8,-8 8,0 C8,8 4,12 0,12 C-4,12 -8,8 -8,0 C-8,-8 -4,-12 0,-12 Z"
                fill="#10b981"
                opacity={0.8}
                scaleX={radius / 20}
                scaleY={radius / 20}
            />
            <Path
                data="M0,-10 L0,10"
                stroke="#064e3b"
                strokeWidth={0.5}
                opacity={0.4}
                scaleX={radius / 20}
                scaleY={radius / 20}
            />
        </Group>
    );
};

export default Plant;
