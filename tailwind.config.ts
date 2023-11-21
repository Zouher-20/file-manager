import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  daysyui: {
    themes: ["light", "dim"],
    darkTheme: "dim",
  },
  plugins: [require("daisyui")],
} satisfies Config;
