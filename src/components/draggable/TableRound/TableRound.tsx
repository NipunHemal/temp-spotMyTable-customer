"use client";

import React from "react";
import { Circle, Text, Group } from "react-konva";
import { Table } from "@/types/restaurant";

interface TableRoundProps {
    table: Table;
    isSelected: boolean;
    isBooked?: boolean;
    isIncompatible?: boolean;
    onSelect: () => void;
}

const TableRound: React.FC<TableRoundProps> = ({
    table,
    isSelected,
    isBooked = false,
    isIncompatible = false,
    onSelect,
}) => {
    const radius = table.size.width / 2;
    const chairRadius = 10;
    const chairDistance = radius + 20;

    const getTableColor = () => {
        if (isBooked) return "#fef2f2";
        if (isIncompatible) return "#fafafa";
        if (isSelected) return "#fff7ed";
        return "#ffffff";
    };

    const getStrokeColor = () => {
        if (isBooked) return "#ef4444";
        if (isIncompatible) return "#e4e4e7";
        if (isSelected) return "#f97316";
        return "#e4e4e7";
    };

    const getTextColor = () => {
        if (isBooked) return "#991b1b";
        if (isIncompatible) return "#a1a1aa";
        if (isSelected) return "#9a3412";
        return "#27272a";
    };

    const chairs = Array.from({ length: table.seats }, (_, i) => {
        const angle = (i / table.seats) * Math.PI * 2;
        const x = Math.cos(angle) * chairDistance;
        const y = Math.sin(angle) * chairDistance;
        return { x, y };
    });

    return (
        <Group
            x={table.position.x}
            y={table.position.y}
            onClick={onSelect}
            onTap={onSelect}
            listening={!isBooked && !isIncompatible}
            opacity={isIncompatible ? 0.5 : 1}
        >
            {/* Shadow */}
            <Circle
                radius={radius}
                fill="black"
                opacity={0.05}
                offsetY={-2}
                shadowBlur={8}
                shadowOpacity={0.1}
            />

            {/* Table */}
            <Circle
                radius={radius}
                fill={getTableColor()}
                stroke={getStrokeColor()}
                strokeWidth={isSelected ? 2.5 : 1.5}
            />

            {/* Name */}
            <Text
                text={table.name}
                fontSize={13}
                fontFamily="Inter, sans-serif"
                fontStyle="bold"
                fill={getTextColor()}
                width={radius * 1.8}
                align="center"
                x={-radius * 0.9}
                y={-12}
            />

            {/* Seats */}
            <Text
                text={`${table.seats} seats`}
                fontSize={9}
                fontFamily="Inter, sans-serif"
                fill={
                    isBooked
                        ? "#ef4444"
                        : isIncompatible
                            ? "#d4d4d8"
                            : isSelected
                                ? "#ea580c"
                                : "#71717a"
                }
                width={radius * 1.8}
                align="center"
                x={-radius * 0.9}
                y={6}
            />

            {/* Chairs */}
            {chairs.map((chair, idx) => (
                <Circle
                    key={idx}
                    x={chair.x}
                    y={chair.y}
                    radius={chairRadius}
                    fill={
                        isBooked
                            ? "#fecaca"
                            : isIncompatible
                                ? "#f4f4f5"
                                : isSelected
                                    ? "#ffedd5"
                                    : "#f4f4f5"
                    }
                    stroke={
                        isBooked
                            ? "#f87171"
                            : isIncompatible
                                ? "#e4e4e7"
                                : isSelected
                                    ? "#fb923c"
                                    : "#d4d4d8"
                    }
                    strokeWidth={1.5}
                />
            ))}
        </Group>
    );
};

export default TableRound;
