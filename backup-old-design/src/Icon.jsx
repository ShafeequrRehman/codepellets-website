const paths = {
  receipt: <><path d="M6 2h12v20l-3-2-3 2-3-2-3 2z" /><path d="M9 7h6M9 11h6M9 15h4" /></>,
  boxes: <><path d="M3 7l9-4 9 4-9 4-9-4z" /><path d="M3 7v10l9 4 9-4V7" /><path d="M12 11v10" /></>,
  chart: <><path d="M3 21h18" /><path d="M6 17v-6M11 17V6M16 17v-4M20 17V8" /></>,
  book: <><path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z" /><path d="M8 9h6M8 13h6" /></>,
  tooth: <path d="M7 3c-2.5 0-4 2-4 4.5 0 3 1.5 5 2 8 .5 3 1.2 5.5 2.5 5.5S9 18 10 15.5c.5-1.2 1-1.5 2-1.5s1.5.3 2 1.5c1 2.5 1.2 5.5 2.5 5.5s2-2.5 2.5-5.5c.5-3 2-5 2-8C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z" />,
  utensils: <><path d="M7 2v20M4 2v6a3 3 0 0 0 6 0V2" /><path d="M18 2c-2 1.5-3 4-3 7v4h3v9" /></>,
  cart: <><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M2 3h3l2.5 12h11.5l2-8H6.2" /></>,
  leaf: <><path d="M12 22V12" /><path d="M12 12C12 7 8 4 3 4c0 5 4 8 9 8z" /><path d="M12 14c0-4 3-7 9-7 0 5-4 7-9 7z" /></>,
  cloud: <path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 9a4.5 4.5 0 0 0 1 9z" />,
  pin: <><path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></>,
  code: <><path d="M8 7l-5 5 5 5M16 7l5 5-5 5" /><path d="M14 4l-4 16" /></>,
  phone: <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" />,
  chat: <><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.3z" /><path d="M9 8.2c-.4 0-.9.4-.9 1.2 0 2.2 2.6 5.2 5.3 5.6.8.1 1.4-.4 1.5-1l-1.6-.9-.8.7c-1-.4-2-1.4-2.4-2.4l.7-.8-.9-1.6c-.3-.5-.6-.8-.9-.8z" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
}

export default function Icon({ name, size = 28, color = 'currentColor', strokeWidth = 1.8 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}
