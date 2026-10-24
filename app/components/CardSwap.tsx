"use client";

/**
 * CardSwap Component
 * An elegant card swapping animation using GSAP for smooth transitions.
 * Supports automated cycling, perspective depth, and interactive elements.
 */
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  onActiveIndexChange?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: ReactNode;
}

export interface CardSwapHandle {
  swapNext: () => void;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-2xl border border-zinc-800 bg-zinc-950/95 shadow-2xl [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${
        customClass ?? ""
      } ${rest.className ?? ""}`.trim()}
    />
  )
);

Card.displayName = "Card";

type CardRef = RefObject<HTMLDivElement | null>;

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

export const CardSwap = forwardRef<CardSwapHandle, CardSwapProps>(
  (
    {
      width = 500,
      height = 400,
      cardDistance = 60,
      verticalDistance = 70,
      delay = 5000,
      pauseOnHover = false,
      onCardClick,
      onActiveIndexChange,
      skewAmount = 6,
      easing = "elastic",
      children,
    },
    ref
  ) => {
    const config = useMemo(
      () =>
        easing === "elastic"
          ? {
              ease: "elastic.out(0.6,0.9)",
              durDrop: 1.8,
              durMove: 1.8,
              durReturn: 1.8,
              promoteOverlap: 0.9,
              returnDelay: 0.05,
            }
          : {
              ease: "power1.inOut",
              durDrop: 0.8,
              durMove: 0.8,
              durReturn: 0.8,
              promoteOverlap: 0.45,
              returnDelay: 0.2,
            },
      [easing]
    );

    const childArr = useMemo(
      () => Children.toArray(children) as ReactElement<CardProps>[],
      [children]
    );
    const refs = useMemo<CardRef[]>(
      () => childArr.map(() => React.createRef<HTMLDivElement>()),
      [childArr]
    );
    const order = useRef<number[]>(
      Array.from({ length: childArr.length }, (_, i) => i)
    );
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const intervalRef = useRef<number>(0);
    const container = useRef<HTMLDivElement>(null);
    const isSwapping = useRef<boolean>(false);

    const swapFnRef = useRef<() => void>(() => {});

    useEffect(() => {
      const total = refs.length;
      refs.forEach((r, i) => {
        if (r.current) {
          placeNow(
            r.current,
            makeSlot(i, cardDistance, verticalDistance, total),
            skewAmount
          );
        }
      });

      const dropY = typeof height === "number" ? height + 120 : 420;

      const swap = () => {
        if (order.current.length < 2 || isSwapping.current) return;
        isSwapping.current = true;

        const [front, ...rest] = order.current;
        const elFront = refs[front].current;
        if (!elFront) {
          isSwapping.current = false;
          return;
        }

        const tl = gsap.timeline({
          onComplete: () => {
            isSwapping.current = false;
          },
        });
        tlRef.current = tl;

        tl.to(elFront, {
          y: `+=${dropY}`,
          duration: config.durDrop,
          ease: config.ease,
        });

        tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
        rest.forEach((idx, i) => {
          const el = refs[idx].current;
          if (!el) return;
          const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
          tl.set(el, { zIndex: slot.zIndex }, "promote");
          tl.to(
            el,
            {
              x: slot.x,
              y: slot.y,
              z: slot.z,
              duration: config.durMove,
              ease: config.ease,
            },
            `promote+=${i * 0.12}`
          );
        });

        const backSlot = makeSlot(
          refs.length - 1,
          cardDistance,
          verticalDistance,
          refs.length
        );
        tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
        tl.call(
          () => {
            gsap.set(elFront, { zIndex: backSlot.zIndex });
          },
          undefined,
          "return"
        );

        tl.to(
          elFront,
          {
            x: backSlot.x,
            y: backSlot.y,
            z: backSlot.z,
            duration: config.durReturn,
            ease: config.ease,
          },
          "return"
        );

        tl.call(() => {
          order.current = [...rest, front];
          onActiveIndexChange?.(rest[0]);
        });
      };

      swapFnRef.current = swap;

      intervalRef.current = window.setInterval(swap, delay);

      if (pauseOnHover && container.current) {
        const node = container.current;
        const pause = () => {
          tlRef.current?.pause();
          clearInterval(intervalRef.current);
        };
        const resume = () => {
          tlRef.current?.play();
          intervalRef.current = window.setInterval(swap, delay);
        };
        node.addEventListener("mouseenter", pause);
        node.addEventListener("mouseleave", resume);
        return () => {
          tlRef.current?.kill();
          node.removeEventListener("mouseenter", pause);
          node.removeEventListener("mouseleave", resume);
          clearInterval(intervalRef.current);
        };
      }

      return () => {
        tlRef.current?.kill();
        clearInterval(intervalRef.current);
      };
    }, [
      cardDistance,
      verticalDistance,
      delay,
      pauseOnHover,
      skewAmount,
      config,
      height,
      refs,
      onActiveIndexChange,
    ]);

    useImperativeHandle(ref, () => ({
      swapNext: () => {
        swapFnRef.current();
      },
    }));

    const rendered = childArr.map((child, i) =>
      isValidElement<CardProps>(child)
        ? cloneElement(child, {
            key: i,
            ref: refs[i],
            style: { width, height, ...(child.props.style ?? {}) },
            onClick: (e: React.MouseEvent<HTMLDivElement>) => {
              child.props.onClick?.(e);
              onCardClick?.(i);
            },
          } as CardProps & React.RefAttributes<HTMLDivElement>)
        : child
    );

    return (
      <div
        ref={container}
        className="relative transform-gpu select-none"
        style={{
          width,
          height,
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {rendered}
        </div>
      </div>
    );
  }
);

CardSwap.displayName = "CardSwap";

export default CardSwap;
