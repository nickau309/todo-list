import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      black: "rgb(0, 0, 0)",
      white: "rgb(255, 255, 255)",
      "berry-red": "rgb(184, 37, 111)",
      red: "rgb(219, 64, 53)",
      orange: "rgb(255, 153, 51)",
      yellow: "rgb(250, 208, 0)",
      "olive-green": "rgb(175, 184, 59)",
      "lime-green": "rgb(126, 204, 73)",
      green: "rgb(41, 148, 56)",
      "mint-green": "rgb(106, 204, 188)",
      teal: "rgb(21, 143, 173)",
      "sky-blue": "rgb(20, 170, 245)",
      "light-blue": "rgb(150, 195, 235)",
      blue: "rgb(64, 115, 255)",
      grape: "rgb(136, 77, 255)",
      violet: "rgb(175, 56, 235)",
      lavender: "rgb(235, 150, 235)",
      magenta: "rgb(224, 81, 148)",
      salmon: "rgb(255, 141, 133)",
      charcoal: "rgb(128, 128, 128)",
      grey: "rgb(184, 184, 184)",
      taupe: "rgb(204, 172, 147)",
    },
    fontFamily: {
      reactist: [
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Noto",
        "Oxygen-Sans",
        "Ubuntu",
        "Cantrell",
        "Helvetica Neue",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
      ],
      sans: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Apple Color Emoji",
        "Helvetica",
        "Arial",
        "sans-serif",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
      ],
    },
    extend: {
      animation: {
        "p1-checkbox-check": "p1-checkbox-complete 0.25s linear forwards",
        "p1-checkbox-uncheck":
          "p1-checkbox-complete 0.25s linear forwards reverse",
        "p2-checkbox-check": "p2-checkbox-complete 0.25s linear forwards",
        "p2-checkbox-uncheck":
          "p2-checkbox-complete 0.25s linear forwards reverse",
        "p3-checkbox-check": "p3-checkbox-complete 0.25s linear forwards",
        "p3-checkbox-uncheck":
          "p3-checkbox-complete 0.25s linear forwards reverse",
        "p4-checkbox-check": "p4-checkbox-complete 0.25s linear forwards",
        "p4-checkbox-uncheck":
          "p4-checkbox-complete 0.25s linear forwards reverse",
      },
      backgroundColor: {
        aside: "var(--bg-aside, #fafafa)",
        banner: "var(--bg-banner, #fafafa)",
        base: {
          DEFAULT: "var(--bg-base, #fff)",
          primary: "var(--bg-base-primary, #fff)",
          "primary-hover": "var(--bg-base-primary-hover, #eee)",
          "secondary-hover": "var(--bg-base-secondary-hover, #eee)",
        },
        default: "var(--bg-default, #fff)",
        drag: {
          DEFAULT: "var(--bg-drag, #fff)",
          placeholder: {
            primary: "var(--bg-drag-placeholder-primary, #f1f1f1)",
            secondary: "var(--bg-drag-placeholder-secondary, #e5e5e5)",
          },
        },
        dropdown: "var(--bg-dropdown, #fff)",
        menu: {
          DEFAULT: "var(--bg-menu, #fff)",
          item: {
            "primary-hover": "var(--bg-menu-item-primary-hover, #fafafa)",
            "secondary-hover": "var(--bg-menu-item-secondary-hover, #f3f3f3)",
          },
        },
        tab: {
          DEFAULT: "var(--bg-tab, #f5f5f5)",
          "hover-fill": "var(--bg-tab-hover-fill, #e6e6e6)",
        },
        "task-button": "var(--bg-task-button, #fafafa)",
        "theme-card": {
          DEFAULT: "var(--bg-theme-card, #fff)",
          content: "var(--bg-theme-card-content, #e5e5e5)",
          header: "var(--bg-theme-card-header, #dc4c3e)",
        },
        toggle: {
          DEFAULT: "var(--bg-toggle, #b3b3b3)",
          checked: "var(--bg-toggle-checked, #db4c3f)",
        },
      },
      backgroundImage: {
        fade: "var(--bg-fade, linear-gradient(90deg,rgba(255,255,255,0) 0,rgb(255,255,255) 16px 100%))",
        "fade-panel":
          "var(--bg-fade-panel, linear-gradient(90deg,rgba(255,255,255,0) 0,rgb(255,255,255) 16px 100%))",
      },
      borderColor: {
        banner: "var(--border-banner, #f0f0f0)",
        base: {
          primary: "var(--border-base-primary, #ddd)",
        },
        chip: "var(--border-chip, #ddd)",
        dialog: "var(--border-dialog, transparent)",
        "divider-on-dark": "var(--divider-on-dark, rgba(102,102,102,.6))",
        dropdown: "var(--border-dropdown, rgba(0,0,0,.1))",
        field: {
          DEFAULT: "var(--border-field, #ddd)",
          focus: "var(--border-field-focus, #808080)",
        },
        menu: {
          DEFAULT: "var(--border-menu, #ddd)",
          topbar: "var(--border-menu-topbar, #eee)",
        },
        tab: "var(--border-tab, #f5f5f5)",
        "theme-card": "var(--border-theme-card, #e5e5e5)",
      },
      borderWidth: {
        "dialog-width": "var(--border-dialog-width, 0px)",
      },
      boxShadow: {
        dialog: "var(--shadow-dialog, 0 15px 50px rgb(0,0,0,.35))",
        drag: "var(--shadow-drag, 0 5px 8px rgba(0,0,0,.16))",
        dropdown: "var(--shadow-dropdown, 0 2px 4px rgba(0,0,0,.08))",
        menu: "var(--shadow-menu, 0 1px 8px rgba(0,0,0,.08))",
        "menu-topbar": "var(--shadow-menu-topbar, 0 0 8px rgba(0,0,0,.12))",
        topbar: "var(--shadow-topbar, none)",
      },
      colors: {
        primary: {
          tint: "var(--primary-tint, #fff)",
          fill: "var(--primary-fill, #db4c3f)",
          "hover-tint": "var(--primary-hover-tint, #fff)",
          "hover-fill": "var(--primary-hover-fill, #b03d32)",
          "disabled-tint": "var(--primary-disabled-tint, #fff)",
          "disabled-fill": "var(--primary-disabled-fill, rgba(219,76,63,0.4))",
        },
        secondary: {
          tint: "var(--secondary-tint, #444)",
          fill: "var(--secondary-fill, #f5f5f5)",
          "hover-tint": "var(--secondary-hover-tint, #1a1a1a)",
          "hover-fill": "var(--secondary-hover-fill, #e5e5e5)",
          "disabled-tint": "var(--secondary-disabled-tint, #999)",
          "disabled-fill": "var(--secondary-disabled-fill, #fafafa)",
        },
        tertiary: {
          tint: "var(--tertiary-tint, #db4c3f)",
          "hover-tint": "var(--tertiary-hover-tint, #db4c3f)",
          "hover-fill": "var(--tertiary-hover-fill, #fafafa)",
          "disabled-tint": "var(--tertiary-disabled-tint, #b2b2b2)",
        },
        quaternary: {
          tint: "var(--quaternary-tint, #666)",
          "hover-fill": "var(--quaternary-hover-fill, #eee)",
          "hover-tint": "var(--quaternary-hover-tint, #1a1a1a)",
          "on-hover-fill": "var(--quaternary-on-hover-fill, #d3d3d3)",
          "on-hover-tint": "var(--quaternary-on-hover-tint, #1a1a1a)",
          "disabled-tint": "var(--quaternary-disabled-tint, #b2b2b2)",
        },
        "add-task": {
          icon: "var(--add-task-icon, #dd4b39)",
          text: "var(--add-task-text, #dd4b39)",
        },
        badge: {
          promote: {
            fill: "var(--badge-promote-fill, #faead1)",
            tint: "var(--badge-promote-tint, #8f4700)",
          },
        },
        brand: "var(--brand, #246fe0)",
        checkbox: {
          p1: {
            DEFAULT: "rgb(var(--checkbox-p1-rgb, 209 69 59) / <alpha-value>)",
            disabled:
              "rgb(var(--checkbox-p1-disabled, 237 181 177) / <alpha-value>)",
          },
          p2: {
            DEFAULT: "rgb(var(--checkbox-p2-rgb, 235 137 9) / <alpha-value>)",
            disabled:
              "rgb(var(--checkbox-p2-disabled, 247 208 157) / <alpha-value>)",
          },
          p3: {
            DEFAULT: "rgb(var(--checkbox-p3-rgb, 36 111 224) / <alpha-value>)",
            disabled:
              "rgb(var(--checkbox-p3-disabled, 167 197 243) / <alpha-value>)",
          },
          p4: {
            DEFAULT: "rgb(var(--checkbox-p4-rgb, 128 128 128) / <alpha-value>)",
            disabled:
              "rgb(var(--checkbox-p4-disabled, 214 214 214) / <alpha-value>)",
          },
        },
        content: {
          primary: "var(--content-primary, #202020)",
          secondary: "var(--content-secondary, #808080)",
        },
        date: {
          "next-week": {
            fill: "var(--date-next-week-fill, #692ec2)",
            tint: "var(--date-next-week-tint, #692ec2)",
          },
          overdue: {
            fill: "var(--date-overdue-fill, #d1453b)",
            tint: "var(--date-overdue-tint, #d1453b)",
          },
          today: {
            fill: "var(--date-today-fill, #4b9244)",
            tint: "var(--date-today-tint, #058527)",
          },
          tomorrow: {
            fill: "var(--date-tomorrow-fill, #ad6200)",
            tint: "var(--date-tomorrow-tint, #ad6200)",
          },
          weekend: {
            fill: "var(--date-weekend-fill, #246fe0)",
            tint: "var(--date-weekend-tint, #246fe0)",
          },
        },
        divider: {
          primary: "var(--divider-primary, #999)",
          secondary: "var(--divider-secondary, #eee)",
          tertiary: "var(--divider-tertiary, #f5f5f5)",
          base: "var(--divider-base, #f0f0f0)",
        },
        "focus-fill": "var(--focus-fill, #f3f3f3)",
        navbar: {
          "hover-fill": "var(--navbar-hover-fill, rgba(255,255,255,.2))",
          "idle-fill": "var(--navbar-idle-fill, #db4c3f)",
          "idle-tint": "var(--navbar-idle-tint, #fff)",
          "on-idle-fill": "var(--navbar-on-idle-fill, rgba(255,255,255,.2))",
        },
        priority: {
          1: "rgb(var(--priority1-rgb, 209 69 59) / <alpha-value>)",
          2: "rgb(var(--priority2-rgb, 235 137 9) / <alpha-value>)",
          3: "rgb(var(--priority3-rgb, 36 111 224) / <alpha-value>)",
          4: "rgb(var(--priority4-rgb, 102 102 102) / <alpha-value>)",
        },
        views: {
          "filters-labels": "var(--views-filters-labels, #c77100)",
          inbox: "var(--views-inbox, #246fe0)",
          today: "var(--views-today, #4b9244)",
          upcoming: "var(--views-upcoming, #692ec2)",
        },
      },
      fill: {
        banner: "var(--fill-banner, #666)",
      },
      keyframes: {
        "p1-checkbox-complete": {
          "0%": { transform: "scale(1)" },
          "50%": {
            transform: "scale(1.25)",
            backgroundColor: "rgb(var(--checkbox-p1-rgb, 209 69 59))",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "rgb(var(--checkbox-p1-rgb, 209 69 59))",
          },
        },
        "p2-checkbox-complete": {
          "0%": { transform: "scale(1)" },
          "50%": {
            transform: "scale(1.25)",
            backgroundColor: "rgb(var(--checkbox-p2-rgb, 235 137 9))",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "rgb(var(--checkbox-p2-rgb, 235 137 9))",
          },
        },
        "p3-checkbox-complete": {
          "0%": { transform: "scale(1)" },
          "50%": {
            transform: "scale(1.25)",
            backgroundColor: "rgb(var(--checkbox-p3-rgb, 36 111 224))",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "rgb(var(--checkbox-p3-rgb, 36 111 224))",
          },
        },
        "p4-checkbox-complete": {
          "0%": { transform: "scale(1)" },
          "50%": {
            transform: "scale(1.25)",
            backgroundColor: "rgb(var(--checkbox-p4-rgb, 128 128 128))",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "rgb(var(--checkbox-p4-rgb, 128 128 128))",
          },
        },
      },
      letterSpacing: {
        dark: "var(--tracking-dark, 0)",
      },
      ringColor: {
        outer: "var(--ring-outer, #dceaff)",
        "task-button": "var(--ring-task-button, rgba(31,96,194,.4))",
      },
      ringOffsetColor: {
        inner: "var(--ring-inner, #1f60c2)",
      },
      textColor: {
        banner: {
          title: "var(--text-banner-title, #202020)",
        },
        base: {
          primary: "var(--text-base-primary, #202020)",
          input: "var(--text-base-input, #000)",
        },
        count: "var(--text-count, #aaa)",
        default: "var(--text-default, #202020)",
        display: {
          secondary: "var(--display-secondary, #808080)",
        },
        menu: "var(--text-menu, #202020)",
        settings: {
          icon: "var(--text-settings-icon, rgba(0,0,0,.56))",
        },
        tab: {
          selected: "var(--text-tab-selected, #202020)",
          unselected: "var(--text-tab-unselected, #666)",
        },
        "theme-card": {
          header: "var(--text-theme-card-header, #fff)",
          priority: "var(--text-theme-card-priority, #666)",
          "selected-icon": "var(--text-theme-card-selected-icon, #dc4c3e)",
        },
        username: "var(--text-username, #98be2f)",
        "field-placeholder": "var(--field-placeholder, rgba(0,0,0,.4))",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
export default config;
