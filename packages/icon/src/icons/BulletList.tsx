import * as React from 'react';
import type { SVGProps } from 'react';
const SvgBulletListIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || props.fontSize || 24}
    height={props.height || props.fontSize || 24}
    fill="none"
    {...props}>
    <path
      fill={props.color || `#2C3641`}
      d="M4.25 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5m0-6c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5m0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5m3 2.5h14v-2h-14zm0-6h14v-2h-14zm0-8v2h14V5z"
    />
  </svg>
);
export default SvgBulletListIcon;
