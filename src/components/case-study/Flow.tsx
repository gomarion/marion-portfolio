import type { CaseMedia } from "@/data/case-studies";
import { CaseIcon } from "./CaseIcon";

type Steps = Extract<CaseMedia, { type: "flow" }>["steps"];

// Figma "Frame 1321314393" (478:310): an 800px column, steps 50px apart.
// Boxes have a 1px #686363 outline, 10px corners and 30px top and bottom
// padding, with the icon, an IBM Plex Mono SemiBold 18 title and a Light 16
// detail, 10px apart. Connectors are an icon over a Light 16 note.
export function Flow({ steps }: { steps: Steps }) {
  return (
    <ol className="mx-auto flex max-w-200 flex-col gap-12.5 text-center font-code tracking-design">
      {steps.map((step) =>
        step.kind === "box" ? (
          <li
            key={step.title}
            className="flex flex-col items-center gap-2.5 rounded-[10px] border border-[#686363] px-4 py-7.5"
          >
            <CaseIcon name={step.icon} />
            <span className="text-[1.125rem] leading-[1.5] font-semibold">
              {step.title}
            </span>
            <span className="text-body-sm font-light">{step.detail}</span>
          </li>
        ) : (
          <li
            key={step.text}
            className="flex flex-col items-center gap-2.5 px-4"
          >
            <CaseIcon name={step.icon} flip={step.flip} />
            <span className="text-body-sm font-light">{step.text}</span>
          </li>
        ),
      )}
    </ol>
  );
}
