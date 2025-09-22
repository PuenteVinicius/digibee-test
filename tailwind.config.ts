import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    heroui({
      layout: {
        dividerWeight: "1px",
        disabledOpacity: "0.5", // opacity-[0.3]
        radius: {
          small: "4px", // rounded-small
          medium: "6px", // rounded-medium
          large: "8px", // rounded-large
        },
        borderWidth: {
          small: "1.5px", // border-small
          medium: "2px", // border-medium
          large: "3px", // border-large
        },
      },
      themes: {
        // LIGHT MODE
        light: {
          layout: {
            // hoverOpacity: 0.8, //  this value is applied as opacity-[value] when the component is hovered
            boxShadow: {
              small:
                "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
              medium:
                "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
              large:
                "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
            },
          },
          colors: {
            // Textual and commons
            background: "#FFFFFF", // SURFACE
            focus: "#0D0D0D", // PRIMARY
            // overlay: "#0D0D0D",                // PRIMARY

            // Surfaces
            content1: {
              DEFAULT: "#FFFFFF", // SURFACE
              foreground: "#0D0D0D", // ON SURFACE
            },
            content2: {
              DEFAULT: "#F2F2F2", // SURFACE DIM
              foreground: "#0D0D0D", // ON SURFACE
            },

            // Fontface
            foreground: {
              50: "#737373", // ON SURFACE VARIANT
              100: "#737373", // ON SURFACE VARIANT
              200: "#737373", // ON SURFACE VARIANT
              300: "#737373", // ON SURFACE VARIANT
              400: "#737373", // ON SURFACE VARIANT
              500: "#737373", // ON SURFACE VARIANT
              600: "#0D0D0D", // ON SURFACE
              700: "#0D0D0D", // ON SURFACE
              800: "#0D0D0D", // ON SURFACE
              900: "#0D0D0D", // ON SURFACE
              foreground: "#0D0D0D", // ON SURFACE
              DEFAULT: "#0D0D0D", // ON SURFACE
            },

            // Global interations (neutral)
            default: {
              50: "#F2F2F2", // SURFACE DIM
              100: "rgba(0,0,0, 0.04)", // SURFACE CONTAINER LOW
              200: "rgba(0,0,0, 0.08)", // SURFACE CONTAINER • OUTLINE
              300: "rgba(0,0,0, 0.16)", // SURFACE CONTAINER HIGH • OUTLINE Hover
              400: "#0D0D0D", // ON SURFACE
              500: "#0D0D0D", // ON SURFACE
              600: "#0D0D0D", // ON SURFACE
              700: "#0D0D0D", // ON SURFACE
              800: "#0D0D0D", // ON SURFACE
              900: "#0D0D0D", // ON SURFACE
              foreground: "#0D0D0D", // ON SURFACE
              DEFAULT: "#F2F2F2", // SURFACE DIM
            },

            // Black
            primary: {
              50: "#F2F2F2", // Primary Container
              100: "#F2F2F2", // Primary Container
              200: "#F2F2F2", // Primary Container
              300: "#F2F2F2", // Primary Container
              400: "#F2F2F2", // Primary Container
              500: "#0D0D0D", // Primary • On Primary Container
              600: "#0D0D0D", // Primary • On Primary Container
              700: "#0D0D0D", // Primary • On Primary Container
              800: "#0D0D0D", // Primary • On Primary Container
              900: "#0D0D0D", // Primary • On Primary Container
              foreground: "#FFFFFF", // On Primary
              DEFAULT: "#0D0D0D", // Primary
            },

            // Brand
            secondary: {
              50: "#F0E7FD", // Secondary Container
              100: "#F0E7FD", // Secondary Container
              200: "#F0E7FD", // Secondary Container
              300: "#F0E7FD", // Secondary Container
              400: "#F0E7FD", // Secondary Container
              500: "#6D0FF0", // Secondary • On Secondary Container
              600: "#6D0FF0", // Secondary • On Secondary Container
              700: "#6D0FF0", // Secondary • On Secondary Container
              800: "#6D0FF0", // Secondary • On Secondary Container
              900: "#6D0FF0", // Secondary • On Secondary Container
              foreground: "#FFFFFF", // On Secondary
              DEFAULT: "#6D0FF0", // Secondary
            },

            // Positive
            success: {
              50: "#EBFFE8", // Success Container
              100: "#EBFFE8", // Success Container
              200: "#EBFFE8", // Success Container
              300: "#EBFFE8", // Success Container
              400: "#EBFFE8", // Success Container
              500: "#016F2F", // Success • On Success Container
              600: "#016F2F", // Success • On Success Container
              700: "#016F2F", // Success • On Success Container
              800: "#016F2F", // Success • On Success Container
              900: "#016F2F", // Success • On Success Container
              foreground: "#FFFFFF", // On Success
              DEFAULT: "#016F2F", // Success
            },

            // Attention
            warning: {
              50: "#FCF2E8", // Warning Container
              100: "#FCF2E8", // Warning Container
              200: "#FCF2E8", // Warning Container
              300: "#FCF2E8", // Warning Container
              400: "#FCF2E8", // Warning Container
              500: "#E58734", // Warning • On Warning Container
              600: "#E58734", // Warning • On Warning Container
              700: "#E58734", // Warning • On Warning Container
              800: "#E58734", // Warning • On Warning Container
              900: "#E58734", // Warning • On Warning Container
              foreground: "#FFFFFF", // On Warning
              DEFAULT: "#E58734", // Warning
            },

            // Negative
            danger: {
              50: "#FFEDEA", // Negative Container
              100: "#FFEDEA", // Negative Container
              200: "#FFEDEA", // Negative Container
              300: "#FFEDEA", // Negative Container
              400: "#BA1A1A", // Negative Container
              500: "#0D0D0D", // Negative • On Negative Container
              600: "#BA1A1A", // Negative • On Negative Container
              700: "#BA1A1A", // Negative • On Negative Container
              800: "#BA1A1A", // Negative • On Negative Container
              900: "#BA1A1A", // Negative • On Negative Container
              foreground: "#FFFFFF", // On Negative
              DEFAULT: "#0D0D0D", // Negative
            },
          },
        },

        // DARK MODE
        dark: {
          layout: {
            hoverOpacity: 0.8, //  this value is applied as opacity-[value] when the component is hovered
            boxShadow: {
              small:
                "0px 0px 5px 0px rgb(0 0 0 / 0.7), 0px 2px 10px 0px rgb(0 0 0 / 0.8), 0px 0px 1px 0px rgb(0 0 0 / 0.9)",
              medium:
                "0px 0px 15px 0px rgb(0 0 0 / 0.6), 0px 2px 30px 0px rgb(0 0 0 / 0.7), 0px 0px 1px 0px rgb(0 0 0 / 0.8)",
              large:
                "0px 0px 30px 0px rgb(0 0 0 / 0.5), 0px 30px 60px 0px rgb(0 0 0 / 0.6), 0px 0px 1px 0px rgb(0 0 0 / 0.7)",
            },
          },
          colors: {
            // Textual and commons
            background: "#0D0D0D", // SURFACE
            focus: "#FFFFFF", // PRIMARY
            overlay: "#FFFFFF", // PRIMARY

            // Surfaces
            // content1: {
            //   DEFAULT: "rgba(255,255,255, 0.05)",  // SURFACE CONTAINER LOW
            //   foreground: "#FFFFFF"                  // ON SURFACE
            // },
            // content2: {
            //   DEFAULT: "#262626",                    // SURFACE DIM
            //   foreground: "#FFFFFF"                  // ON SURFACE
            // },

            // Fontface
            foreground: {
              50: "#8C8C8C", // ON SURFACE VARIANT
              100: "#8C8C8C", // ON SURFACE VARIANT
              200: "#8C8C8C", // ON SURFACE VARIANT
              300: "#8C8C8C", // ON SURFACE VARIANT
              400: "#8C8C8C", // ON SURFACE VARIANT
              500: "#8C8C8C", // ON SURFACE VARIANT
              600: "#FFFFFF", // ON SURFACE
              700: "#FFFFFF", // ON SURFACE
              800: "#FFFFFF", // ON SURFACE
              900: "#FFFFFF", // ON SURFACE
              foreground: "#FFFFFF", // ON SURFACE
              DEFAULT: "#FFFFFF", // ON SURFACE
            },

            // Global interations (neutral)
            default: {
              50: "#262626", // SURFACE DIM
              100: "rgba(255,255,255, 0.04)", // SURFACE CONTAINER LOW
              200: "rgba(255,255,255, 0.08)", // SURFACE CONTAINER • OUTLINE
              300: "rgba(255,255,255, 0.16)", // SURFACE CONTAINER HIGH • OUTLINE Hover
              400: "#FFFFFF", // ON SURFACE
              500: "#FFFFFF", // ON SURFACE
              600: "#FFFFFF", // ON SURFACE
              700: "#FFFFFF", // ON SURFACE
              800: "#FFFFFF", // ON SURFACE
              900: "#FFFFFF", // ON SURFACE
              foreground: "#FFFFFF", // ON SURFACE
              DEFAULT: "#262626", // SURFACE DIM
            },

            // Black
            primary: {
              50: "#262626",
              100: "#262626", // Primary Container
              200: "#262626", // Primary Container
              300: "#262626", // Primary Container
              400: "#FFFFFF", // Primary Container
              500: "#FFFFFF", // Primary • On Primary Container
              600: "#FFFFFF", // Primary • On Primary Container
              700: "#FFFFFF", // Primary • On Primary Container
              800: "#FFFFFF", // Primary • On Primary Container
              900: "#FFFFFF", // Primary • On Primary Container
              foreground: "#0D0D0D", // On Primary
              DEFAULT: "#FFFFFF", // Primary
            },

            // Brand
            secondary: {
              50: "#1C0642", // Secondary Container
              100: "#1C0642", // Secondary Container
              200: "#1C0642", // Secondary Container
              300: "#1C0642", // Secondary Container
              400: "#967CFE", // Secondary Container
              500: "#967CFE", // Secondary • On Secondary Container
              600: "#967CFE", // Secondary • On Secondary Container
              700: "#967CFE", // Secondary • On Secondary Container
              800: "#967CFE", // Secondary • On Secondary Container
              900: "#967CFE", // Secondary • On Secondary Container
              foreground: "#0D0D0D", // On Secondary
              DEFAULT: "#967CFE", // Secondary
            },

            // Positive
            success: {
              50: "#002108", // Success Container
              100: "#002108", // Success Container
              200: "#002108", // Success Container
              300: "#002108", // Success Container
              400: "#47A35B", // Success Container
              500: "#47A35B", // Success • On Success Container
              600: "#47A35B", // Success • On Success Container
              700: "#47A35B", // Success • On Success Container
              800: "#47A35B", // Success • On Success Container
              900: "#47A35B", // Success • On Success Container
              foreground: "#0D0D0D", // On Success
              DEFAULT: "#47A35B", // Success
            },

            // Attention
            warning: {
              50: "#312500", // Warning Container
              100: "#312500", // Warning Container
              200: "#312500", // Warning Container
              300: "#312500", // Warning Container
              400: "#F3C02C", // Warning Container
              500: "#F3C02C", // Warning • On Warning Container
              600: "#F3C02C", // Warning • On Warning Container
              700: "#F3C02C", // Warning • On Warning Container
              800: "#F3C02C", // Warning • On Warning Container
              900: "#F3C02C", // Warning • On Warning Container
              foreground: "#0D0D0D", // On Warning
              DEFAULT: "#F3C02C", // Warning
            },

            // Negative
            danger: {
              50: "#2E0001", // Negative Container
              100: "#2E0001", // Negative Container
              200: "#2E0001", // Negative Container
              300: "#2E0001", // Negative Container
              400: "#FF5449", // Negative Container
              500: "#FF5449", // Negative • On Negative Container
              600: "#FF5449", // Negative • On Negative Container
              700: "#FF5449", // Negative • On Negative Container
              800: "#FF5449", // Negative • On Negative Container
              900: "#FF5449", // Negative • On Negative Container
              foreground: "#0D0D0D", // On Negative
              DEFAULT: "#FF5449", // Negative
            },
          },
        },
      },
    }),
  ],
  darkMode: "class",
};
