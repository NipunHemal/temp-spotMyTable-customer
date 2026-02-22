"use client";

import React from "react";
import { Rect, Text, Group, Circle } from "react-konva";
import { Table } from "@/types/restaurant";

interface TableSquareProps {
    table: Table;
    isSelected: boolean;
    isBooked?: boolean;
    isIncompatible?: boolean;
    onSelect: () => void;
}

const TableSquare: React.FC<TableSquareProps> = ({
    table,
    isSelected,
    isBooked = false,
    isIncompatible = false,
    onSelect,
}) => {
    const { width, height } = table.size;
    const chairRadius = 6;
    const chairSpacing = 10;

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

    const renderChairs = () => {
        const chairs: JSX.Element[] = [];
        const seatCount = table.seats;
        const chairFill = isBooked
            ? "#fecaca"
            : isIncompatible
                ? "#f4f4f5"
                : isSelected
                    ? "#ffedd5"
                    : "#f4f4f5";
        const chairStroke = isBooked
            ? "#f87171"
            : isIncompatible
                ? "#e4e4e7"
                : isSelected
                    ? "#fb923c"
                    : "#d4d4d8";

        if (seatCount === 6) {
            for (let i = 0; i < 2; i++) {
                const x = -width / 2 + (i + 1) * (width / 3);
                chairs.push(<Circle key={`top-${i}`} x={x} y={-height / 2 - chairSpacing} radius={chairRadius} fill={chairFill} stroke={chairStroke} strokeWidth={1.5} />);
            }
            for (let i = 0; i < 2; i++) {
                const x = -width / 2 + (i + 1) * (width / 3);
                chairs.push(<Circle key={`bottom-${i}`} x={x} y={height / 2 + chairSpacing} radius={chairRadius} fill={chairFill} stroke={chairStroke} strokeWidth={1.5} />);
            }
            chairs.push(<Circle key="left-0" x={-width / 2 - chairSpacing} y={0} radius={chairRadius} fill={chairFill} stroke={chairStroke} strokeWidth={1.5} />);
            chairs.push(<Circle key="right-0" x={width / 2 + chairSpacing} y={0} radius={chairRadius} fill={chairFill} stroke={chairStroke} strokeWidth={1.5} />);
            return chairs;
        }

        let seatsPlaced = 0;
        const topCount = Math.min(Math.ceil(seatCount / 4), seatCount - seatsPlaced);
        for (let i = 0; i < topCount; i++) {
            const x = -width / 2 + (i + 1) * (width / (topCount + 1));
            chairs.push(<Circle key={`top-${i}`} x={x} y={-height / 2 - chairSpacing} radius={chairRadius} fill={chairFill} stroke={chairStroke} strokeWidth={1.5} />);
            seatsPlaced++;
        }

        const bottomCount = Math.min(Math.ceil(seatCount / 4), seatCount - seatsPlaced);
        for (let i = 0; i < bottomCount; i++) {
            const x = -width / 2 + (i + 1) * (width / (bottomCount + 1));
            chairs.push(<Circle key={`bottom-${i}`} x={x} y={height / 2 + chairSpacing} radius={chairRadius} fill={chairFill} stroke={chairStroke} strokeWidth={1.5} />);
            seatsPlaced++;
        }

        const leftCount = Math.min(Math.ceil(seatCount / 4), seatCount - seatsPlaced);
        for (let i = 0; i < leftCount; i++) {
            const y = -height / 2 + (i + 1) * (height / (leftCount + 1));
            chairs.push(<Circle key={`left-${i}`} x={-width / 2 - chairSpacing} y={y} radius={chairRadius} fill={chairFill} stroke={chairStroke} strokeWidth={1.5} />);
            seatsPlaced++;
        }

        const rightCount = seatCount - seatsPlaced;
        for (let i = 0; i < rightCount; i++) {
            const y = -height / 2 + (i + 1) * (height / (rightCount + 1));
            chairs.push(<Circle key={`right-${i}`} x={width / 2 + chairSpacing} y={y} radius={chairRadius} fill={chairFill} stroke={chairStroke} strokeWidth={1.5} />);
            seatsPlaced++;
        }

        return chairs;
    };

    return (
        <Group
            x={table.position.x}
            y={table.position.y}
            rotation={table.rotation || 0}
            onClick={onSelect}
            onTap={onSelect}
            listening={!isBooked && !isIncompatible}
            opacity={isIncompatible ? 0.5 : 1}
        >
            <Rect x={-width / 2} y={-height / 2} width={width} height={height} fill="black" opacity={0.05} offsetY={-2} cornerRadius={12} shadowBlur={8} shadowOpacity={0.1} />
            <Rect x={-width / 2} y={-height / 2} width={width} height={height} fill={getTableColor()} stroke={getStrokeColor()} strokeWidth={isSelected ? 2.5 : 1.5} cornerRadius={12} />
            <Text text={table.name} fontSize={13} fontFamily="Inter, sans-serif" fontStyle="bold" fill={getTextColor()} width={width} align="center" x={-width / 2} y={-12} />
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
                width={width}
                align="center"
                x={-width / 2}
                y={6}
            />
            {renderChairs()}
        </Group>
    );
};

export default TableSquare;
