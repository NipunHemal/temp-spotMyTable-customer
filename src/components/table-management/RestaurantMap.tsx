"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Stage, Layer, Rect } from "react-konva";
import {
    RestaurantLayout,
    RestaurantComponent,
    Table,
    Decoration,
} from "@/types/restaurant";
import TableRound from "@/components/draggable/TableRound/TableRound";
import TableSquare from "@/components/draggable/TableSquare/TableSquare";
import TableRectangle from "@/components/draggable/TableRectangle/TableRectangle";
import Wall from "@/components/draggable/Wall/Wall";
import Door from "@/components/draggable/Door/Door";
import Plant from "@/components/draggable/Plant/Plant";

interface RestaurantMapProps {
    layout: RestaurantLayout;
    bookedTableIds: string[];
    incompatibleTableIds: string[];
    selectedTableId: string | null;
    mapSearched: boolean;
    onSelectTable: (table: Table) => void;
}

const RestaurantMap: React.FC<RestaurantMapProps> = ({
    layout,
    bookedTableIds,
    incompatibleTableIds,
    selectedTableId,
    mapSearched,
    onSelectTable,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
    const [scale, setScale] = useState(1);

    const calculateScale = useCallback(() => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.offsetWidth;
        const canvasWidth = layout.canvasSize?.width || 800;
        const canvasHeight = layout.canvasSize?.height || 600;

        const padding = 20;
        const availableWidth = containerWidth - padding * 2;

        const newScale = Math.min(availableWidth / canvasWidth, 1);
        setScale(newScale);
        setStageSize({
            width: canvasWidth * newScale,
            height: canvasHeight * newScale,
        });
    }, [layout.canvasSize]);

    useEffect(() => {
        calculateScale();
        const handleResize = () => calculateScale();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [calculateScale]);

    const handleTableSelect = (comp: RestaurantComponent) => {
        if (!mapSearched) return; // Prevent selection before search
        if (comp.type === "table") {
            const table = comp as Table;
            const isBooked = bookedTableIds.includes(table.id);
            const isIncompatible = incompatibleTableIds.includes(table.id);
            if (!isBooked && !isIncompatible) {
                onSelectTable(table);
            }
        }
    };

    const renderComponent = (comp: RestaurantComponent) => {
        if (comp.type === "table") {
            const table = comp as Table;
            const isBooked = bookedTableIds.includes(table.id);
            const isIncompatible = incompatibleTableIds.includes(table.id);
            const isSelected = selectedTableId === table.id;

            const tableProps = {
                table,
                isSelected,
                isBooked,
                isIncompatible,
                onSelect: () => handleTableSelect(comp),
            };

            switch (table.tableType) {
                case "round":
                    return <TableRound key={table.id} {...tableProps} />;
                case "square":
                    return <TableSquare key={table.id} {...tableProps} />;
                case "rectangle":
                    return <TableRectangle key={table.id} {...tableProps} />;
                default:
                    return <TableSquare key={table.id} {...tableProps} />;
            }
        }

        if (comp.type === "decoration") {
            const decoration = comp as Decoration;
            switch (decoration.decorationType) {
                case "wall":
                    return <Wall key={decoration.id} decoration={decoration} />;
                case "door":
                    return <Door key={decoration.id} decoration={decoration} />;
                case "plant":
                    return <Plant key={decoration.id} decoration={decoration} />;
                default:
                    return null;
            }
        }

        return null;
    };

    return (
        <div ref={containerRef} className="w-full flex justify-center">
            <div
                className="relative rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-sm"
                style={{ width: stageSize.width, height: stageSize.height }}
            >
                <Stage
                    width={stageSize.width}
                    height={stageSize.height}
                    scaleX={scale}
                    scaleY={scale}
                >
                    <Layer>
                        {/* Canvas background */}
                        <Rect
                            x={0}
                            y={0}
                            width={layout.canvasSize?.width || 800}
                            height={layout.canvasSize?.height || 600}
                            fill="#fafafa"
                        />

                        {/* Grid dots */}
                        {Array.from(
                            {
                                length:
                                    Math.ceil(layout.canvasSize?.width / 40) *
                                    Math.ceil(layout.canvasSize?.height / 40),
                            },
                            (_, i) => {
                                const cols = Math.ceil(layout.canvasSize.width / 40);
                                const x = (i % cols) * 40;
                                const y = Math.floor(i / cols) * 40;
                                return (
                                    <Rect
                                        key={`dot-${i}`}
                                        x={x}
                                        y={y}
                                        width={1.5}
                                        height={1.5}
                                        fill="#e4e4e7"
                                        cornerRadius={1}
                                    />
                                );
                            }
                        )}

                        {/* Components */}
                        {layout.components.map(renderComponent)}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};

export default RestaurantMap;
