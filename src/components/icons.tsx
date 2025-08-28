import type { SVGProps } from 'react';

export function PotholeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 4.5a8.5 8.5 0 0 1 5.4 15.4L12 21l-5.4-1.1a8.5 8.5 0 0 1 5.4-15.4z" />
      <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0" />
      <path d="m14.5 9-1 1" />
      <path d="m9.5 15-1 1" />
      <path d="m15 14-1 1" />
      <path d="m9 10-1 1" />
    </svg>
  );
}

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 9.8c0 7.3-8 11.8-8 11.8z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
