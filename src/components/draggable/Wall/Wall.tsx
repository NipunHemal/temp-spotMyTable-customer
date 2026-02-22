"use client";

import React from "react";
import { Rect, Group } from "react-konva";
import { Decoration } from "@/types/restaurant";

interface WallProps {
    decoration: Decoration;
}

const Wall: React.FC<WallProps> = ({ decoration }) => {
    const { width, height } = decoration.size;

    return (
        <Group
            x={decoration.position.x}
            y={decoration.position.y}
            rotation={decoration.rotation || 0}
            listening={false}
        >
            <Rect
                x={-width / 2}
                y={-height / 2}
                width={width}
                height={height}
                fill="#27272a"
                stroke="#18181b"
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

export default Wall;
