import * as React from "react";
import type { SVGProps } from "react";
const SvgRedoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="icon"
    {...props}
  >
    <path
      fill={props.color || "currentColor" || `#2C3641`}
      d="M18.63 11.1c-1.85-1.61-4.25-2.6-6.9-2.6-4.65 0-8.58 3.03-9.96 7.22l2.36.78a8 8 0 0 1 7.6-5.5c1.95 0 3.73.72 5.12 1.88l-3.62 3.62h9v-9z"
    />
  </svg>
);
export default SvgRedoIcon;