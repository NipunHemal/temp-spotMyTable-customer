"use client";

import React from "react";
import { Rect, Group, Arc } from "react-konva";
import { Decoration } from "@/types/restaurant";

interface DoorProps {
    decoration: Decoration;
}

const Door: React.FC<DoorProps> = ({ decoration }) => {
    const { width, height } = decoration.size;

    return (
        <Group
            x={decoration.position.x}
            y={decoration.position.y}
            rotation={decoration.rotation || 0}
            listening={false}
        >
            <Arc
                x={-width / 2}
                y={height / 2}
                innerRadius={width - 5}
                outerRadius={width}
                angle={90}
                rotation={-90}
                fill="#f4f4f5"
                stroke="#d4d4d8"
                strokeWidth={1}
                opacity={0.6}
            />
            <Rect
                x={-width / 2}
                y={-height / 2}
                width={width}
                height={height}
                fill="#27272a"
                stroke="#111827"
                strokeWidth={1.5}
                cornerRadius={2}
                shadowColor="rgba(0, 0, 0, 0.4)"
                shadowBlur={4}
                shadowOffset={{ x: 3, y: 3 }}
                shadowOpacity={0.3}
            />
        </Group>
    );
};

export default Door;
