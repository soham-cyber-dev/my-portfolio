"use client";

import React, { Children, cloneElement, useEffect, useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion";

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
  href?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  orientation?: "horizontal" | "vertical";
  tooltipPosition?: "left" | "right" | "top" | "bottom";
  distance?: number;
  panelSize?: number;
  baseItemSize?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseCoord: MotionValue<number>;
  orientation: "horizontal" | "vertical";
  tooltipPosition?: "left" | "right" | "top" | "bottom";
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
};

function DockItem({
  children,
  className = "",
  onClick,
  mouseCoord,
  orientation,
  tooltipPosition,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseCoord, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Infinity;

    if (orientation === "vertical") {
      return val - (rect.y + rect.height / 2);
    } else {
      return val - (rect.x + rect.width / 2);
    }
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative shrink-0 inline-flex items-center justify-center rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-cyan-400/80 hover:bg-zinc-800 shadow-[0_8px_25px_rgba(0,0,0,0.85)] cursor-pointer transition-colors duration-200 select-none z-10 hover:z-30 ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) =>
        React.isValidElement(child)
          ? cloneElement(
              child as React.ReactElement<{
                isHovered?: MotionValue<number>;
                orientation?: string;
                tooltipPosition?: string;
              }>,
              { isHovered, orientation, tooltipPosition }
            )
          : child
      )}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
  orientation?: "horizontal" | "vertical";
  tooltipPosition?: "left" | "right" | "top" | "bottom";
};

function DockLabel({
  children,
  className = "",
  isHovered,
  orientation = "horizontal",
  tooltipPosition,
}: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  const pos = tooltipPosition || (orientation === "vertical" ? "right" : "top");

  const getPositionClasses = () => {
    switch (pos) {
      case "right":
        return "left-full top-1/2 ml-3.5";
      case "left":
        return "right-full top-1/2 mr-3.5";
      case "bottom":
        return "-bottom-10 left-1/2";
      case "top":
      default:
        return "-top-10 left-1/2";
    }
  };

  const getMotionProps = () => {
    switch (pos) {
      case "right":
        return {
          initial: { opacity: 0, x: -6, y: "-50%" },
          animate: { opacity: 1, x: 0, y: "-50%" },
          exit: { opacity: 0, x: -6, y: "-50%" },
        };
      case "left":
        return {
          initial: { opacity: 0, x: 6, y: "-50%" },
          animate: { opacity: 1, x: 0, y: "-50%" },
          exit: { opacity: 0, x: 6, y: "-50%" },
        };
      case "bottom":
        return {
          initial: { opacity: 0, y: -6, x: "-50%" },
          animate: { opacity: 1, y: 0, x: "-50%" },
          exit: { opacity: 0, y: -6, x: "-50%" },
        };
      case "top":
      default:
        return {
          initial: { opacity: 0, y: 6, x: "-50%" },
          animate: { opacity: 1, y: 0, x: "-50%" },
          exit: { opacity: 0, y: 6, x: "-50%" },
        };
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          {...getMotionProps()}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className={`${className} ${getPositionClasses()} pointer-events-none absolute z-50 whitespace-pre rounded-lg border border-zinc-700/80 bg-zinc-950/95 px-2.5 py-1 text-[11px] font-mono tracking-wider text-white shadow-2xl backdrop-blur-md`}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockIcon({ children, className = "" }: DockIconProps) {
  return (
    <div className={`flex items-center justify-center text-current transition-transform duration-200 ${className}`}>
      {children}
    </div>
  );
}

export function MagnificationDock({
  items,
  className = "",
  orientation = "horizontal",
  tooltipPosition,
  spring = { mass: 0.1, stiffness: 160, damping: 13 },
  magnification = 64,
  distance = 150,
  panelSize = 54,
  baseItemSize = 42,
}: DockProps) {
  const mouseCoord = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const isVertical = orientation === "vertical";

  return (
    <div
      className={`flex items-center justify-center select-none ${
        isVertical ? "h-auto w-fit" : "w-auto max-w-full"
      }`}
    >
      <motion.div
        onMouseMove={(e) => {
          isHovered.set(1);
          mouseCoord.set(isVertical ? e.clientY : e.clientX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseCoord.set(Infinity);
        }}
        onTouchMove={(e) => {
          if (e.touches.length > 0) {
            isHovered.set(1);
            mouseCoord.set(isVertical ? e.touches[0].clientY : e.touches[0].clientX);
          }
        }}
        onTouchEnd={() => {
          isHovered.set(0);
          mouseCoord.set(Infinity);
        }}
        onTouchCancel={() => {
          isHovered.set(0);
          mouseCoord.set(Infinity);
        }}
        className={`${className} flex ${
          isVertical ? "flex-col py-3 px-2" : "flex-row px-3 py-2"
        } items-center gap-2.5 rounded-full border border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(0,0,0,0.6)]`}
        style={
          isVertical
            ? { width: panelSize, minHeight: panelSize }
            : { height: panelSize, minWidth: panelSize }
        }
        role="toolbar"
        aria-label={isVertical ? "Vertical dock" : "Interactive dock"}
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseCoord={mouseCoord}
            orientation={orientation}
            tooltipPosition={tooltipPosition}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel orientation={orientation} tooltipPosition={tooltipPosition}>
              {item.label}
            </DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </div>
  );
}

export default MagnificationDock;
