import Image from "next/image";
import type { CSSProperties } from "react";
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
const STAGE = { width: 1188, height: 400 };

// `gap` is centre to centre.
const SPHERE = { size: 114, firstCenterX: 112, gap: 137.5, centerY: 200 };
const BUBBLE_SIZE = 165;

// Bubble centres, and how far each moves on hover (image-bubbles style.scss).
const BUBBLES = [
  { x: 888.7, y: 187.25, hoverX: -30, hoverY: 0 },
  { x: 1033.7, y: 132.85, hoverX: 30, hoverY: -30 },
  { x: 1018.7, y: 267.25, hoverX: 10, hoverY: 30 },
];

const u = (n: number) => `calc(${n} * var(--u))`;

// Spheres: hovering one slides its photo up into the circle while the label
// fades out (linked-spheres style.scss timings). They show a pointer cursor
// like the live links but do nothing when clicked. Bubbles: each shifts 30px
// out on hover. Hover only, so touch screens see them at rest. With reduced
// motion the photos fade without sliding and the bubbles stay put.
export function SpheresDemo({ spheres, bubbles, label }: SpheresDemoProps) {
  return (
    <div className="@container">
      <div
        role="group"
        aria-label={label}
        style={
          {
            "--u": `calc(100cqw / ${STAGE.width})`,
            aspectRatio: `${STAGE.width} / ${STAGE.height}`,
          } as CSSProperties
        }
        className={`relative w-full overflow-hidden bg-[#e47c5a] ${openSans.className}`}
      >
        <ul>
          {spheres.map((sphere, index) => (
            <li
              key={sphere.label}
              style={{
                left: u(
                  SPHERE.firstCenterX + index * SPHERE.gap - SPHERE.size / 2,
                ),
                top: u(SPHERE.centerY - SPHERE.size / 2),
                width: u(SPHERE.size),
                height: u(SPHERE.size),
                borderWidth: u(4),
              }}
              className="group absolute overflow-hidden rounded-full border-solid border-[#dd6741] bg-[#ebebeb]"
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
                    className="absolute inset-0 size-full object-cover opacity-0 transition-[opacity,translate] duration-[200ms,400ms] ease-[ease-in-out,ease] group-hover:opacity-100 group-hover:duration-[900ms,700ms] motion-safe:translate-y-full motion-safe:group-hover:translate-y-0"
                  />
                )}
                <span
                  style={{ fontSize: u(14), letterSpacing: u(1) }}
                  className={`relative leading-[1.5] text-ink uppercase transition-opacity duration-300 ease-in-out ${
                    sphere.image
                      ? "group-hover:opacity-0 group-hover:duration-400"
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
                style={
                  {
                    left: u(bubble.x - BUBBLE_SIZE / 2),
                    top: u(bubble.y - BUBBLE_SIZE / 2),
                    width: u(BUBBLE_SIZE),
                    height: u(BUBBLE_SIZE),
                    borderWidth: u(4),
                    "--hover-x": u(bubble.hoverX),
                    "--hover-y": u(bubble.hoverY),
                  } as CSSProperties
                }
                className="absolute overflow-hidden rounded-full border-solid border-[#828282] bg-[#21759b] transition-[translate] duration-150 ease-[cubic-bezier(0.4,0,0.54,0.88)] motion-safe:hover:translate-x-(--hover-x) motion-safe:hover:translate-y-(--hover-y)"
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
  );
}
