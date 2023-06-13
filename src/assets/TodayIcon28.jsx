import React from "react";

export default function TodayIcon28() {
  const today = new Date().getDate().toString().padStart(2, "0");

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor" fillRule="nonzero">
        <path
          d="M6 3.5h16A2.5 2.5 0 0 1 24.5 6v2.5h-21V6A2.5 2.5 0 0 1 6 3.5z"
          opacity=".1"
        ></path>
        <path d="M22 3a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h16zm0 1H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-.5 4a.5.5 0 1 1 0 1h-15a.5.5 0 0 1 0-1z"></path>
        <text
          fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
          fontSize="11"
          transform="translate(4 2)"
          fontWeight="500"
        >
          <tspan x="9.5" y="18" textAnchor="middle">
            {today}
          </tspan>
        </text>
      </g>
    </svg>
  );
}
