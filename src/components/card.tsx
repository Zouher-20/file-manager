import { Icon } from "@iconify/react/dist/iconify.js";
import { fileInterface } from "~/pages/interface";
import { useDispatch } from "react-redux";
import { LOAD_MODAL_DATA } from "~/redux/action_type_constant";

const FileCard = ({ card }: { card: fileInterface["file"] }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-base-200 px-4 py-2 text-sm">
      <div className="flex flex-row-reverse">
        <FileDropDownComponent />
      </div>
      <div className="mb-auto flex justify-center">
        <Icon className="h-12 w-12 text-gray-500" icon={"ci:file-blank"} />
      </div>
      <div className="grid ">
        <span className="mr-auto font-bold">{card.name}</span>
        <div className="flex">
          <span className="mr-auto text-green-500">{card.state}</span>
          <span>{card.date}</span>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
function FileDropDownComponent() {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0}>
        <Icon className="h-4 w-4 " icon={"pepicons-pop:dots-y"} />
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-32 rounded-box bg-base-100 p-2 shadow"
      >
        <li>
          <a
            onClick={() => {
              const modal = document.getElementById("update_modal");
              if (modal !== null) {
                /// todo : send file to redux
                // dispatch({ type: LOAD_MODAL_DATA, file });
                modal.showModal();
              }
            }}
          >
            details
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              const modal = document.getElementById("delete_modal");
              if (modal !== null) {
                /// todo : send file to redux
                // dispatch({ type: LOAD_MODAL_DATA, file });
                modal.showModal();
              }
            }}
          >
            delete
          </a>
        </li>
        <li>
          <a>download</a>
        </li>
      </ul>
    </div>
  );
}
