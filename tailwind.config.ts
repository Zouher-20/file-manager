import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  daysyui: {
    themes: ["light", "dark"],
    darkTheme: "dark",
  },
  plugins: [require("daisyui")],
} satisfies Config;
