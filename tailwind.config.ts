import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      sm: '0.7rem',
      base: '0.8rem',
      xl: '1rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    fontFamily: {
      sans: [
        "'geistSans', 'geistSans Fallback'"
      ]
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "foreground-white": "var(--foreground-white)",
        "table-background": "var(--table-background)",
        "table-heading": "var(--table-bg)",
        "table-row": "var(--table-row)",
        "table-border": "var(--table-border)",
        "table-hover": "var(--table-hover)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        sidenav: "var(--sidenav-bg)"
      },
      transitionProperty: {
        'width': 'width',
      }
    },
  },
  plugins: [],
};
export default config;
