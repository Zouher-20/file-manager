import { connect } from "react-redux";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const mapStateToProps = (state: any) => ({
  ...state.ModalReducer,
});

function UpdateModal(props: any) {
  const [swap, setSwap] = useState(true);
  return (
    <dialog id="update_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            onClick={() => setSwap(true)}
          >
            ✕
          </button>
        </form>
        {swap ? (
          <DetailsModal onSwap={(val: boolean) => setSwap(val)} />
        ) : (
          <EditModal onSwap={(val: boolean) => setSwap(val)} />
        )}
      </div>
    </dialog>
  );
}
export default connect(mapStateToProps)(UpdateModal);

function DetailsModal({ onSwap }: { onSwap: any }) {
  return (
    <>
      <h3 className="text-lg font-bold">File Details</h3>
      <div className="grid grid-cols-1 divide-y">
        <DataSectionComponenet name={"Name"} data={"majd"} />
        <DataSectionComponenet name={"Date Added"} data={"20/2/2023"} />
      </div>
      <DescriptionSection swap={false} />

      <button
        className="btn btn-primary btn-active my-2 w-full"
        onClick={() => onSwap(false)}
      >
        Edit
      </button>
      <button className="btn btn-outline btn-primary w-full">download</button>
    </>
  );
}

function EditModal({ onSwap }: { onSwap: any }) {
  return (
    <>
      <div>
        <button
          className="btn btn-circle btn-ghost btn-sm absolute left-2 top-2"
          onClick={() => onSwap(true)}
        >
          <Icon className="h-4 w-4 " icon={"eva:arrow-ios-back-outline"} />
        </button>
        <h3 className="mt-4 text-lg font-bold">Update File</h3>
        <div className="grid grid-cols-1 divide-y">
          <DataSectionComponenet name={"Name"} data={"majd"} />
          <DataSectionComponenet name={"Date Added"} data={"20/2/2023"} />
        </div>
        <DescriptionSection swap={true} />
        <button className="btn btn-primary btn-active my-2 w-full">
          Update
        </button>
      </div>
    </>
  );
}
function DataSectionComponenet(props: any) {
  return (
    <div className="flex justify-between">
      <p className="py-4 text-xs">{props.name}:</p>
      <p className="py-4 text-sm font-bold">{props.data}</p>
    </div>
  );
}

function DescriptionSection(props: any) {
  var description = props.description;
  if (!props.description) {
    description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  }
  return (
    <div>
      <p className="py-4 text-xs">Description</p>
      <div className="card w-full border-2 border-gray-500 border-opacity-5 bg-gray-600 bg-opacity-5">
        {props.swap ? (
          <textarea
            className="textarea textarea-ghost textarea-lg h-60"
            placeholder="Bio"
            value={description}
          ></textarea>
        ) : (
          <div className="card-body">
            <p>{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
