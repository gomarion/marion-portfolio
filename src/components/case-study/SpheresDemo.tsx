"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { CaseMedia } from "@/data/case-studies";
import { openSans } from "@/lib/fonts";

type SpheresDemoProps = Omit<
  Extract<CaseMedia, { type: "spheres" }>,
  "type" | "caption"
>;

// A rebuild of the Linked Spheres and Image Bubbles WordPress plugins
// (wp-content/plugins/linked-spheres and image-bubbles), in place of the
// screenshot in Figma "Group 49" (412:180).
//
// Everything is in stage units, where 1 is 1px on the live site. The stage
// is 1188 wide, so in the 1080px column it shows at 10/11 (91%) of live
// size; smaller screens scale it down further. On desktop that gives:
// spheres starting every 125px (left 50, 175, 300, 425 and 550px), and the
// bubble cluster ending about 47px from the right edge, so both groups sit
// towards the centre with room for each bubble's 30px hover move. The
// cluster keeps its live arrangement, and both groups are centred
// vertically.
//
// Below 768px a taller stage stacks them instead: the spheres in centred
// rows of 3 and 2, with the bubble cluster centred below. It's 430 wide and
// at most 391px across, so it also tops out at 91% of live size.
const STAGE = { width: 1188, height: 400 };
const MOBILE_STAGE = { width: 430, height: 700, maxWidth: 391 };

// `gap` is centre to centre.
const SPHERE = { size: 114, firstCenterX: 112, gap: 137.5, centerY: 200 };
// Mobile rows: `perRow` across, the first row's centre 40 below the top,
// and rows as far apart as the spheres in a row.
const MOBILE_SPHERE = { perRow: 3, firstCenterY: 97, rowGap: SPHERE.gap };
const BUBBLE_SIZE = 165;

// Bubble centres, and how far each moves on hover (image-bubbles style.scss).
const BUBBLES = [
  { x: 888.7, y: 187.25, hoverX: -30, hoverY: 0 },
  { x: 1033.7, y: 132.85, hoverX: 30, hoverY: -30 },
  { x: 1018.7, y: 267.25, hoverX: 10, hoverY: 30 },
];

// Moves the cluster (centred on 961.2, 200.05) to the middle of the mobile
// stage, 70 below the spheres. Its hover moves stay 30 inside the sides.
const MOBILE_BUBBLE_SHIFT = { x: 215 - 961.2, y: 511.2 - 200.05 };

// Centre of sphere `index` of `count` on the mobile stage: each row is
// centred, so a short last row sits in the middle.
function mobileSphereCenter(index: number, count: number) {
  const { perRow, firstCenterY, rowGap } = MOBILE_SPHERE;
  const row = Math.floor(index / perRow);
  const inRow = Math.min(perRow, count - row * perRow);
  const column = index - row * perRow;
  return {
    x: MOBILE_STAGE.width / 2 + (column - (inRow - 1) / 2) * SPHERE.gap,
    y: firstCenterY + row * rowGap,
  };
}

// Places an item by its top-left corner: `mobile` below 768px, `desktop`
// from there up. The class reads these through the stage's `--u`.
function position(
  mobile: { left: number; top: number },
  desktop: { left: number; top: number },
) {
  return {
    "--mobile-left": mobile.left,
    "--mobile-top": mobile.top,
    "--left": desktop.left,
    "--top": desktop.top,
  };
}

const POSITION_CLASS =
  "left-[calc(var(--mobile-left)*var(--u))] top-[calc(var(--mobile-top)*var(--u))] md:left-[calc(var(--left)*var(--u))] md:top-[calc(var(--top)*var(--u))]";

const u = (n: number) => `calc(${n} * var(--u))`;

// Spheres: hovering one slides its photo up into the circle while the label
// fades out (linked-spheres style.scss timings). They show a pointer cursor
// like the live links but do nothing when clicked. Bubbles: each shifts 30px
// out on hover. On touch screens, which can't hover, a tap plays the same
// animation instead and a second tap reverses it; one item is active at a
// time, as with hover. A touch anywhere outside the spheres and bubbles puts
// the active one back. With reduced motion the photos fade without sliding
// and the bubbles stay put.
export function SpheresDemo({ spheres, bubbles, label }: SpheresDemoProps) {
  const [active, setActive] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hasActive = active !== null;

  // `pointerdown` rather than `click`, since iOS doesn't send clicks from
  // taps on plain page content. Touches on a tappable sphere or bubble are
  // left to its own tap.
  useEffect(() => {
    if (!hasActive) return;
    const onPointerDown = (event: PointerEvent) => {
      const item = (event.target as Element).closest("[data-tappable]");
      if (item && stageRef.current?.contains(item)) return;
      setActive(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [hasActive]);

  // Mouse clicks do nothing: with a mouse, hover already plays them.
  const toggle = (key: string) => {
    if (window.matchMedia("(hover: hover)").matches) return;
    setActive((current) => (current === key ? null : key));
  };

  return (
    <div
      role="group"
      aria-label={label}
      className={`overflow-hidden bg-[#e47c5a] ${openSans.className}`}
    >
      <div
        style={{ maxWidth: MOBILE_STAGE.maxWidth }}
        className="mx-auto @container md:max-w-none!"
      >
        <div
          ref={stageRef}
          style={
            {
              "--mobile-u": `calc(100cqw / ${MOBILE_STAGE.width})`,
              "--desktop-u": `calc(100cqw / ${STAGE.width})`,
              "--mobile-ratio": `${MOBILE_STAGE.width} / ${MOBILE_STAGE.height}`,
              "--desktop-ratio": `${STAGE.width} / ${STAGE.height}`,
            } as CSSProperties
          }
          className="relative aspect-(--mobile-ratio) w-full [--u:var(--mobile-u)] md:aspect-(--desktop-ratio) md:[--u:var(--desktop-u)]"
        >
          <ul>
            {spheres.map((sphere, index) => (
              <li
                key={sphere.label}
                data-active={active === `sphere-${index}` || undefined}
                data-tappable={sphere.image ? true : undefined}
                onClick={
                  sphere.image ? () => toggle(`sphere-${index}`) : undefined
                }
                style={
                  {
                    ...position(
                      {
                        left:
                          mobileSphereCenter(index, spheres.length).x -
                          SPHERE.size / 2,
                        top:
                          mobileSphereCenter(index, spheres.length).y -
                          SPHERE.size / 2,
                      },
                      {
                        left:
                          SPHERE.firstCenterX +
                          index * SPHERE.gap -
                          SPHERE.size / 2,
                        top: SPHERE.centerY - SPHERE.size / 2,
                      },
                    ),
                    width: u(SPHERE.size),
                    height: u(SPHERE.size),
                    borderWidth: u(4),
                  } as CSSProperties
                }
                className={`group absolute ${POSITION_CLASS} overflow-hidden rounded-full border-solid border-[#dd6741] bg-[#ebebeb]`}
              >
                <div
                  className={`flex size-full items-center justify-center ${
                    sphere.image ? "cursor-pointer" : ""
                  }`}
                >
                  {sphere.image && (
                    <Image
                      src={sphere.image.src}
                      alt=""
                      width={sphere.image.width}
                      height={sphere.image.height}
                      sizes="120px"
                      className="absolute inset-0 size-full object-cover opacity-0 transition-[opacity,translate] duration-[200ms,400ms] ease-[ease-in-out,ease] group-hover:opacity-100 group-hover:duration-[900ms,700ms] group-data-active:opacity-100 group-data-active:duration-[900ms,700ms] motion-safe:translate-y-full motion-safe:group-hover:translate-y-0 motion-safe:group-data-active:translate-y-0"
                    />
                  )}
                  <span
                    style={{ fontSize: u(14), letterSpacing: u(1) }}
                    className={`relative leading-[1.5] text-ink uppercase transition-opacity duration-300 ease-in-out ${
                      sphere.image
                        ? "group-hover:opacity-0 group-hover:duration-400 group-data-active:opacity-0 group-data-active:duration-400"
                        : ""
                    }`}
                  >
                    {sphere.label}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <ul>
            {bubbles.map((image, index) => {
              const bubble = BUBBLES[index];
              return (
                <li
                  key={image.src}
                  data-active={active === `bubble-${index}` || undefined}
                  data-tappable
                  onClick={() => toggle(`bubble-${index}`)}
                  style={
                    {
                      ...position(
                        {
                          left:
                            bubble.x + MOBILE_BUBBLE_SHIFT.x - BUBBLE_SIZE / 2,
                          top:
                            bubble.y + MOBILE_BUBBLE_SHIFT.y - BUBBLE_SIZE / 2,
                        },
                        {
                          left: bubble.x - BUBBLE_SIZE / 2,
                          top: bubble.y - BUBBLE_SIZE / 2,
                        },
                      ),
                      width: u(BUBBLE_SIZE),
                      height: u(BUBBLE_SIZE),
                      borderWidth: u(4),
                      "--hover-x": u(bubble.hoverX),
                      "--hover-y": u(bubble.hoverY),
                    } as CSSProperties
                  }
                  className={`absolute ${POSITION_CLASS} overflow-hidden rounded-full border-solid border-[#828282] bg-[#21759b] transition-[translate] duration-150 ease-[cubic-bezier(0.4,0,0.54,0.88)] motion-safe:hover:translate-x-(--hover-x) motion-safe:hover:translate-y-(--hover-y) motion-safe:data-active:translate-x-(--hover-x) motion-safe:data-active:translate-y-(--hover-y)`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="180px"
                    className="size-full object-cover"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
