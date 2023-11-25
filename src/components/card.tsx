import { Icon } from "@iconify/react/dist/iconify.js";
import { fileInterface } from "~/pages/interface";

const Card = ({ card }: { card: fileInterface["file"] }) => {
  return (
    <div className="flex h-32 flex-col gap-4 rounded-lg bg-gray-100 px-4 py-2 text-sm">
      <div className="flex flex-row-reverse gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0}>
            <Icon className="h-4 w-4 " icon={"pepicons-pop:dots-y"} />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-32 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>

        <Icon className="h-4 w-4 text-primary" icon={"bytesize:download"} />
      </div>
      <div className="mb-auto flex justify-center">
        <Icon
          className="h-6 w-6 text-gray-500"
          icon={"mdi:file-document-outline"}
        />
      </div>
      <div className="grid ">
        <span className="mr-auto font-bold">{card.name}</span>
        <div className="flex">
          <span className="mr-auto text-green-500">{card.state}</span>
          <div>{card.date}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
