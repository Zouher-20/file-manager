import { Icon } from "@iconify/react/dist/iconify.js";

function GridListComponent({
  vertical,
  setVertical,
}: {
  vertical: string;
  setVertical: Function;
}) {
  return (
    <div className="join join-horizontal hover:cursor-pointer">
      <div
        onClick={() => setVertical("grid")}
        className={
          "join-item flex justify-center px-2 py-1 " +
          (vertical === "grid" ? " bg-primary text-base-100" : "border")
        }
      >
        <Icon className="h-6 w-6" icon={"solar:widget-broken"} />
      </div>
      <div
        onClick={() => setVertical("list")}
        className={
          "join-item flex justify-center px-2 py-1 " +
          (vertical === "list" ? " bg-primary text-base-100" : "border")
        }
      >
        <Icon className="h-6 w-6 " icon={"solar:reorder-broken"} />
      </div>
    </div>
  );
}

export default GridListComponent;
