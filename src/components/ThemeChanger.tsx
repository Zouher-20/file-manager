import { useTheme } from "next-themes";
import type { ChangeEvent } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

export function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  function onChange(event: ChangeEvent): void {
    if ((event.target as HTMLInputElement).checked) setTheme("light");
    else setTheme("dark");
  }
  return (
    <>
      <div className="tooltip tooltip-bottom" data-tip="Theme">
        <label className="swap swap-rotate">
          <input
            checked={theme === "light"}
            onChange={onChange}
            type="checkbox"
            className="theme-controller"
          />
          <Icon className="swap-on h-8 w-8 " icon={"solar:sun-2-outline"} />
          <Icon className="swap-off h-8 w-8" icon={"solar:moon-outline"} />
        </label>
      </div>
    </>
  );
}
