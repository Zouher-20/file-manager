"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

interface DropDownItem {
  icon?: string;
  color?: string;
  action: () => unknown;
  label: string;
}

interface DropDownProps {
  btnIcon?: string;
  items: DropDownItem[];
}

function DropDownMenu({ btnIcon, items }: DropDownProps) {
  return (
    <div className="dropdown dropdown-end absolute right-4 top-4">
      <label tabIndex={0}>
        <Icon className="h-4 w-4" icon={btnIcon || "pepicons-pop:dots-y"} />
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-48 rounded-box bg-base-100 p-2 shadow"
      >
        {items.map((item, index) => (
          <li key={index} className={item.color ? `text-${item.color}` : ""}>
            <a onClick={item.action}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropDownMenu;
