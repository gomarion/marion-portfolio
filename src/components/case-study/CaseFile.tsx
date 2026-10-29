import type { CSSProperties } from "react";
import type { CaseFile as CaseFileData } from "@/data/case-studies";
import { CaseSection } from "./CaseSection";

// Figma "Case Study file" (259:53): a grey panel styled as a paper case file,
// with 100px padding, 80px between blocks, a repeated-name watermark across
// the top, a staple at the top-left and a folded corner on the right.
export function CaseFile({ file }: { file: CaseFileData }) {
  // The case file's name repeated across the top (60 times unless the data
  // sets `watermarkRepeats`). Anything past 7 lines is clipped.
  const watermark = Array.from(
    { length: file.watermarkRepeats ?? 60 },
    () => file.name,
  ).join(" · ");
  const columns = file.detailColumns;

  return (
    <article
      className={`relative overflow-hidden bg-panel px-5 pt-28 sm:px-10 lg:p-25 ${
        file.fold === "bottom" ? "pb-28" : "pb-16"
      }`}
    >
      <p
        aria-hidden
        style={
          file.watermarkWidth ? { width: file.watermarkWidth } : undefined
        }
        className="pointer-events-none absolute top-7.25 -left-5.5 max-h-[calc(7*1.3em)] w-[calc(100%+3.75rem)] overflow-hidden font-code text-[1.1875rem] leading-[1.3] font-extralight text-ink/13 uppercase select-none"
      >
        {watermark}
      </p>
      <Staple />
      <Fold position={file.fold} />

      <div className="relative flex flex-col gap-14 lg:gap-20">
        <h2 className="text-lead font-semibold uppercase">
          Case file #{file.number}: {file.title ?? file.name}
        </h2>

        <div className="flex flex-col gap-5">
          <h3 className="text-lead font-semibold uppercase">Project details</h3>
          <dl
            style={
              columns &&
              ({
                "--details-cols": `${columns.left}fr ${columns.right}fr`,
                "--details-gap": `${columns.gap}px`,
              } as CSSProperties)
            }
            className={`grid gap-y-6 sm:gap-y-10 ${
              columns
                ? "gap-x-(--details-gap) sm:grid-cols-(--details-cols)"
                : "max-w-249 gap-x-17.5 sm:grid-cols-2"
            }`}
          >
            {file.details.map((detail) => (
              <div key={detail.label}>
                <dt className="text-body-sm text-subtle">{detail.label}</dt>
                <dd className="font-code text-body-sm font-semibold">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {file.sections.map((section) => (
          <CaseSection key={section.title} section={section} />
        ))}
      </div>
    </article>
  );
}

// Figma "Staple" (335:1034): two 43×5.7px bars with 2px corners, 7.5px apart,
// tilted 37.7° up to the right from (33, 102), with a soft grey glow. Below
// `sm` the bars shrink to 27px, 7px apart, starting from (18, 60).
function Staple() {
  return (
    <div
      aria-hidden
      className="absolute top-[60px] left-[18px] h-[5.68px] w-[62px] origin-top-left -rotate-[37.7deg] sm:top-[102.28px] sm:left-8.25 sm:w-[93.65px]"
    >
      <span className="absolute inset-y-0 left-0 w-[27px] rounded-[2px] bg-ink shadow-[0_0_4px_1px_rgb(93_90_90)] sm:w-[43.1px]" />
      <span className="absolute inset-y-0 left-[34px] w-[27px] rounded-[2px] bg-ink shadow-[0_0_4px_1px_rgb(93_90_90)] sm:left-[50.55px] sm:w-[43.1px]" />
    </div>
  );
}

// Figma "Fold" (335:1188): a 114×101 triangle in the panel colour with a soft
// shadow, in the top- or bottom-right corner. The 1px outline is ink at 20%
// opacity (Figma uses solid black). Below `sm` it shrinks to 72×67; the
// triangle stretches to fit, and the outline stays 1px.
function Fold({ position }: { position: "top" | "bottom" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 114 101"
      preserveAspectRatio="none"
      className={`absolute right-0 h-[67px] w-[72px] overflow-visible drop-shadow-[-1px_1px_7px_rgb(0_0_0/0.2)] sm:h-[101px] sm:w-[114px] ${
        position === "top" ? "top-0" : "bottom-0"
      }`}
    >
      <polygon
        points={position === "top" ? "0,0 0,101 114,101" : "0,0 114,0 0,101"}
        className="fill-panel stroke-ink/20"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
