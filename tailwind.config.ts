import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
      "berry-red": "rgb(var(--rgb-berry-red) / <alpha-value>)",
      red: "rgb(var(--rgb-red) / <alpha-value>)",
      orange: "rgb(var(--rgb-orange) / <alpha-value>)",
      yellow: "rgb(var(--rgb-yellow) / <alpha-value>)",
      "olive-green": "rgb(var(--rgb-olive-green) / <alpha-value>)",
      "lime-green": "rgb(var(--rgb-lime-green) / <alpha-value>)",
      green: "rgb(var(--rgb-green) / <alpha-value>)",
      "mint-green": "rgb(var(--rgb-mint-green) / <alpha-value>)",
      teal: "rgb(var(--rgb-teal) / <alpha-value>)",
      "sky-blue": "rgb(var(--rgb-sky-blue) / <alpha-value>)",
      "light-blue": "rgb(var(--rgb-light-blue) / <alpha-value>)",
      blue: "rgb(var(--rgb-blue) / <alpha-value>)",
      grape: "rgb(var(--rgb-grape) / <alpha-value>)",
      violet: "rgb(var(--rgb-violet) / <alpha-value>)",
      lavender: "rgb(var(--rgb-lavender) / <alpha-value>)",
      magenta: "rgb(var(--rgb-magenta) / <alpha-value>)",
      salmon: "rgb(var(--rgb-salmon) / <alpha-value>)",
      charcoal: "rgb(var(--rgb-charcoal) / <alpha-value>)",
      grey: "rgb(var(--rgb-grey) / <alpha-value>)",
      taupe: "rgb(var(--rgb-taupe) / <alpha-value>)",
    },
    fontFamily: {
      monospace: [
        "ui-monospace",
        "SFMono-Regular",
        "SF Mono",
        "Menlo",
        "Monaco",
        "Cascadia Mono",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
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
        // old
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
        // new
        "background-raised": {
          primary: "var(--background-raised-primary)",
          quaternary: "var(--background-raised-quaternary)",
        },
        dropdown: "var(--dropdown-background)",
        option: {
          active: "var(--option-active-fill)",
        },
        scheduler: "var(--scheduler-background)",
        "task-list-item": "var(--task-list-item-background)",
        "theme-card": {
          DEFAULT: "var(--theme-card-background)",
          content: "var(--theme-card-content)",
          sidebar: {
            DEFAULT: "var(--theme-card-sidebar)",
            hover: "var(--theme-card-sidebar-hover)",
            selected: "var(--theme-card-sidebar-selected)",
          },
        },
        // old
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
        // new
        dropdown: "var(--dropdown-border)",
        input: {
          alert: "var(--input-border-alert-tint)",
          focus: "var(--input-border-focus-tint)",
          idle: "var(--input-border-idle-tint)",
        },
        "scheduler-color": "var(--scheduler-border-color)",
        "theme-card-priority": "var(--theme-card-priority)",
        // old
        banner: "var(--border-banner, #f0f0f0)",
        base: {
          primary: "var(--border-base-primary, #ddd)",
        },
        chip: "var(--border-chip, #ddd)",
        dialog: "var(--border-dialog, transparent)",
        field: {
          DEFAULT: "var(--border-field, #ddd)",
          focus: "var(--border-field-focus, #808080)",
        },
        menu: {
          DEFAULT: "var(--border-menu, #ddd)",
          topbar: "var(--border-menu-topbar, #eee)",
        },
        tab: "var(--border-tab, #f5f5f5)",
      },
      borderWidth: {
        // new
        "scheduler-width": "var(--scheduler-border-width)",
        // old
        "dialog-width": "var(--border-dialog-width, 0px)",
      },
      boxShadow: {
        // new
        dropdown: "var(--dropdown-shadow)",
        scheduler: "var(--scheduler-shadow)",
        "task-drop": "var(--task-drop-shadow)",
        // old
        dialog: "var(--shadow-dialog, 0 15px 50px rgb(0,0,0,.35))",
        drag: "var(--shadow-drag, 0 5px 8px rgba(0,0,0,.16))",
        menu: "var(--shadow-menu, 0 1px 8px rgba(0,0,0,.08))",
        "menu-topbar": "var(--shadow-menu-topbar, 0 0 8px rgba(0,0,0,.12))",
        topbar: "var(--shadow-topbar, none)",
      },
      colors: {
        // new
        "actionable-primary": {
          "disabled-fill": "var(--actionable-primary-disabled-fill)",
          "disabled-tint": "var(--actionable-primary-disabled-tint)",
          "hover-fill": "var(--actionable-primary-hover-fill)",
          "hover-tint": "var(--actionable-primary-hover-tint)",
          "idle-fill": "var(--actionable-primary-idle-fill)",
          "idle-tint": "var(--actionable-primary-idle-tint)",
        },
        "actionable-secondary": {
          "disabled-fill": "var(--actionable-secondary-disabled-fill)",
          "disabled-tint": "var(--actionable-secondary-disabled-tint)",
          "hover-fill": "var(--actionable-secondary-hover-fill)",
          "hover-tint": "var(--actionable-secondary-hover-tint)",
          "idle-fill": "var(--actionable-secondary-idle-fill)",
          "idle-tint": "var(--actionable-secondary-idle-tint)",
        },
        "actionable-tertiary": {
          "disabled-tint": "var(--actionable-tertiary-disabled-tint)",
          "hover-fill": "var(--actionable-tertiary-hover-fill)",
          "hover-tint": "var(--actionable-tertiary-hover-tint)",
          "idle-tint": "var(--actionable-tertiary-idle-tint)",
        },
        "actionable-quaternary": {
          "disabled-tint": "var(--actionable-quaternary-disabled-tint)",
          "hover-fill": "var(--actionable-quaternary-hover-fill)",
          "hover-tint": "var(--actionable-quaternary-hover-tint)",
          "idle-tint": "var(--actionable-quaternary-idle-tint)",
        },
        "actionable-destructive": {
          "disabled-tint": "var(--actionable-destructive-disabled-tint)",
          "hover-tint": "var(--actionable-destructive-hover-tint)",
          "idle-tint": "var(--actionable-destructive-idle-tint)",
        },
        actionable: {
          "focus-fill": "var(--actionable-focus-fill)",
        },
        "background-base": {
          primary: "var(--background-base-primary)",
          secondary: "var(--background-base-secondary)",
          tertiary: "#f9f7f6",
        },
        "display-accent": {
          "primary-fill": "var(--display-accent-primary-fill)",
          "primary-tint": "var(--display-accent-primary-tint)",
          "secondary-fill": "var(--display-accent-secondary-fill)",
          "secondary-tint": "var(--display-accent-secondary-tint)",
        },
        "display-content": {
          primary: "#202020",
          secondary: "#666",
          danger: "var(--display-content-danger)",
        },
        "display-primary": {
          "idle-tint": "var(--display-primary-idle-tint)",
          "on-dark-tint": "var(--display-primary-on-dark-tint)",
        },
        "display-secondary": {
          "idle-tint": "var(--display-secondary-idle-tint)",
        },
        "display-tertiary": {
          "idle-tint": "var(--display-tertiary-idle-tint)",
        },
        divider: {
          // shared
          "on-dark": "var(--divider-on-dark)",
          primary: "var(--divider-primary)",
          secondary: "var(--divider-secondary)",
          // old
          tertiary: "var(--divider-tertiary, #f5f5f5)",
          base: "var(--divider-base, #f0f0f0)",
        },
        "info-attention-primary": {
          "idle-fill": "var(--info-attention-primary-idle-fill)",
          "idle-tint": "var(--info-attention-primary-idle-tint)",
        },
        "info-promote-primary": {
          "idle-fill": "var(--info-promote-primary-idle-fill)",
          "idle-tint": "var(--info-promote-primary-idle-tint)",
        },
        "info-promote-tertiary": {
          "idle-fill": "var(--info-promote-tertiary-idle-fill)",
          "idle-tint": "var(--info-promote-tertiary-idle-tint)",
        },
        priority: {
          1: "var(--todoist-p1-color)",
          2: "var(--todoist-p2-color)",
          3: "var(--todoist-p3-color)",
          4: "var(--todoist-p4-color)",
          // 1: "rgb(var(--priority1-rgb, 209 69 59) / <alpha-value>)",
          // 2: "rgb(var(--priority2-rgb, 235 137 9) / <alpha-value>)",
          // 3: "rgb(var(--priority3-rgb, 36 111 224) / <alpha-value>)",
          // 4: "rgb(var(--priority4-rgb, 102 102 102) / <alpha-value>)",
        },
        priorities: {
          p1: {
            "disabled-fill": "var(--priorities-p1-disabled-fill)",
            "disabled-tint": "var(--priorities-p1-disabled-tint)",
            "idle-fill": "var(--priorities-p1-idle-fill)",
            "idle-tint": "var(--priorities-p1-idle-tint)",
          },
          p2: {
            "disabled-fill": "var(--priorities-p2-disabled-fill)",
            "disabled-tint": "var(--priorities-p2-disabled-tint)",
            "idle-fill": "var(--priorities-p2-idle-fill)",
            "idle-tint": "var(--priorities-p2-idle-tint)",
          },
          p3: {
            "disabled-fill": "var(--priorities-p3-disabled-fill)",
            "disabled-tint": "var(--priorities-p3-disabled-tint)",
            "idle-fill": "var(--priorities-p3-idle-fill)",
            "idle-tint": "var(--priorities-p3-idle-tint)",
          },
          p4: {
            "disabled-fill": "var(--priorities-p4-disabled-fill)",
            "disabled-tint": "var(--priorities-p4-disabled-tint)",
            "idle-fill": "var(--priorities-p4-idle-fill)",
            "idle-tint": "var(--priorities-p4-idle-tint)",
          },
        },
        "selectable-primary": {
          "on-dark": {
            "hover-fill": "var(--selectable-primary-on-dark-hover-fill)",
            "selected-fill": "var(--selectable-primary-on-dark-selected-fill)",
          },
          "selected-fill": "var(--selectable-primary-selected-fill)",
          "unselected-fill": "var(--selectable-primary-unselected-fill)",
        },
        "selectable-secondary": {
          "hover-fill": "var(--selectable-secondary-hover-fill)",
          "selected-fill": "var(--selectable-secondary-selected-fill)",
          "selected-tint": "var(--selectable-secondary-selected-tint)",
        },
        schedule: {
          "next-week-fill": "var(--schedule-next-week-fill)",
          "next-week-tint": "var(--schedule-next-week-tint)",
          "overdue-tint": "var(--schedule-overdue-tint)",
          "today-fill": "var(--schedule-today-fill)",
          "today-tint": "var(--schedule-today-tint)",
          "tomorrow-fill": "var(--schedule-tomorrow-fill)",
          "tomorrow-tint": "var(--schedule-tomorrow-tint)",
          "weekend-fill": "var(--schedule-weekend-fill)",
        },
        scheduler: {
          "preview-content-icon": "var(--scheduler-preview-content-icon)",
          "suggestions-item-icon": "var(--scheduler-suggestions-item-icon)",
          "suggestions-item-weekday":
            "var(--scheduler-suggestions-item-weekday)",
        },
        "theme-card": {
          accent: "var(--theme-card-accent)",
        },
        // old
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
        "focus-fill": "var(--focus-fill, #f3f3f3)",
        navbar: {
          "hover-fill": "var(--navbar-hover-fill, rgba(255,255,255,.2))",
          "idle-fill": "var(--navbar-idle-fill, #db4c3f)",
          "idle-tint": "var(--navbar-idle-tint, #fff)",
          "on-idle-fill": "var(--navbar-on-idle-fill, rgba(255,255,255,.2))",
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
        // new
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "50%, 100%": {
            opacity: "1",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "1",
          },
          "50%, 100%": {
            opacity: "0",
          },
        },
        scale: {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.25)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        spin: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        // old
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
        // shared
        outer: "var(--ring-outer)",
        "task-list-item": "var(--task-list-item-ring)",
        // old
        "task-button": "var(--ring-task-button, rgba(31,96,194,.4))",
      },
      ringOffsetColor: {
        inner: "var(--ring-inner)",
      },
      textColor: {
        // new
        dropdown: "var(--dropdown-text)",
        option: {
          checkbox: "var(--option-checkbox)",
        },
        // old
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
        username: "var(--text-username, #98be2f)",
        "field-placeholder": "var(--field-placeholder, rgba(0,0,0,.4))",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, matchVariant }) {
      const hoverModifier = ":hover:not([aria-disabled=true])";
      const hocusModifiers = [
        ":focus-visible:not([aria-disabled=true])",
        hoverModifier,
        "[aria-expanded=true]",
      ];
      addVariant("custom-active", "&:active:not([aria-disabled=true])");
      addVariant(
        "custom-hocus",
        hocusModifiers.map((modifier) => `&${modifier}`),
      );
      matchVariant(
        "peer",
        (_, { modifier: name }) => {
          return hocusModifiers.map((modifier) => {
            return name
              ? `:merge(.peer\\/${name})${modifier} ~ &`
              : `:merge(.peer)${modifier} ~ &`;
          });
        },
        { values: { "custom-hocus": "custom-hocus" } },
      );
      matchVariant(
        "group",
        (_, { modifier: name }) => {
          return hocusModifiers.map((modifier) => {
            return name
              ? `:merge(.group\\/${name})${modifier} &`
              : `:merge(.group)${modifier} &`;
          });
        },
        { values: { "custom-hocus": "custom-hocus" } },
      );
      addVariant("custom-hover", `&${hoverModifier}`);
      matchVariant(
        "peer",
        (_, { modifier: name }) => {
          return name
            ? `:merge(.peer\\/${name})${hoverModifier} ~ &`
            : `:merge(.peer)${hoverModifier} ~ &`;
        },
        { values: { "custom-hover": "custom-hover" } },
      );
    }),
    require("@headlessui/tailwindcss"),
  ],
};
export default config;
