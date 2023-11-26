import { Icon } from "@iconify/react/dist/iconify.js";

function DropDownCommponent({
  defaultValue,
  itemList,
  listName,
}: {
  defaultValue: string;
  itemList: any;
  listName: string;
}) {
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn m-1 w-full">
        <div className="flex items-center">
          <p className="m-3 w-32">{listName}</p>
          <Icon
            className="h-4 w-4 "
            icon={"solar:alt-arrow-down-bold-duotone"}
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-full rounded-box bg-base-100 p-2 shadow"
      >
        {itemList.map((item: any) => {
          return (
            <li>
              <a>{item}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DropDownCommponent;
