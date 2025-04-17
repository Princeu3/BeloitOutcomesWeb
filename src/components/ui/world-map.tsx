"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface LocationPoint {
  lat: number;
  lng: number;
  label?: string;
}

export interface Destination {
  start: LocationPoint;
  end: LocationPoint;
  count?: number;
}

interface MapProps {
  dots?: Destination[];
  lineColor?: string;
  showPopup?: boolean;
  onDotClick?: (dot: Destination) => void;
}

export default function WorldMap({
  dots = [],
  lineColor = "#3b82f6",
  showPopup = true,
  onDotClick,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });
  const { theme } = useTheme();
  const [selectedDot, setSelectedDot] = useState<Destination | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#00000040",
    shape: "circle",
    backgroundColor: "transparent",
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const handleDotClick = (dot: Destination, x: number, y: number) => {
    if (onDotClick) {
      onDotClick(dot);
    }
    if (showPopup) {
      setSelectedDot(dot);
      setPopupPosition({ x, y });
    }
  };

  return (
    <div className="w-full aspect-[2/1] dark:bg-black bg-white rounded-lg relative font-sans">
      <div className="relative w-full h-full">
        <Image
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          alt="World map visualization"
          fill
          priority
          className="[mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none object-cover"
        />
      </div>
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const isSelected = selectedDot === dot;
          
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke={lineColor}
                strokeWidth={isSelected ? "2" : "1"}
                strokeOpacity={isSelected ? "0.8" : "0.4"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 0.2 * i,
                  ease: "easeOut",
                }}
              />
              <g key={`start-${i}`}>
                <circle
                  cx={startPoint.x}
                  cy={startPoint.y}
                  r={2}
                  fill={lineColor}
                  className="transition-all duration-300"
                  style={{
                    transform: isSelected ? "scale(1.5)" : "scale(1)",
                  }}
                />
                <circle
                  cx={startPoint.x}
                  cy={startPoint.y}
                  r={2}
                  fill={lineColor}
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from="2"
                    to="8"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
              <g 
                key={`end-${i}`} 
                style={{ cursor: "pointer" }} 
                onClick={() => handleDotClick(dot, endPoint.x, endPoint.y)}
                className="cursor-pointer"
              >
                <circle
                  cx={endPoint.x}
                  cy={endPoint.y}
                  r={dot.count ? Math.max(2, Math.min(6, Math.sqrt(dot.count) * 1.5)) : 2}
                  fill={lineColor}
                  className="transition-all duration-300"
                  style={{
                    transform: isSelected ? "scale(1.5)" : "scale(1)",
                  }}
                />
                <circle
                  cx={endPoint.x}
                  cy={endPoint.y}
                  r={dot.count ? Math.max(2, Math.min(6, Math.sqrt(dot.count) * 1.5)) : 2}
                  fill={lineColor}
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from={dot.count ? Math.max(2, Math.min(6, Math.sqrt(dot.count) * 1.5)).toString() : "2"}
                    to={(dot.count ? Math.max(2, Math.min(6, Math.sqrt(dot.count) * 1.5)) : 2) * 4}
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </g>
          );
        })}
      </svg>

      <AnimatePresence>
        {showPopup && selectedDot && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 transform -translate-x-1/2 -translate-y-full"
            style={{
              left: (popupPosition.x / 800) * 100 + "%",
              top: (popupPosition.y / 400) * 100 + "%",
            }}
          >
            <Card className="p-3 shadow-lg">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="default">
                    {selectedDot.count} {selectedDot.count === 1 ? 'Alumni' : 'Alumni'}
                  </Badge>
                </div>
                {selectedDot.start.label && (
                  <div className="text-sm">
                    From: <span className="font-medium">{selectedDot.start.label}</span>
                  </div>
                )}
                {selectedDot.end.label && (
                  <div className="text-sm">
                    To: <span className="font-medium">{selectedDot.end.label}</span>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 