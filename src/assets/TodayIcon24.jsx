import dayjs from "@/lib/dayjs";

export default function TodayIcon24() {
  const today = dayjs().format("DD");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g fill="currentColor" fillRule="evenodd">
        <path
          fillRule="nonzero"
          d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1"
        ></path>
        <text
          fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
          fontSize="9"
          fontWeight="500"
          transform="translate(4 2)"
        >
          <tspan x="8" y="15" textAnchor="middle">
            {today}
          </tspan>
        </text>
      </g>
    </svg>
  );
}
