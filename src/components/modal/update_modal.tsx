import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  ...state.ModalReducer,
});

function UpdateModal(props) {
  return (
    <dialog id="update_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-lg font-bold">File Details</h3>
        <div className="grid grid-cols-1 divide-y">
          <DataSectionComponenet name={"Name"} data={"majd"} />
          <DataSectionComponenet name={"Date Added"} data={"20/2/2023"} />
        </div>
        <DescriptionSection />
        <button className="btn btn-primary btn-active my-2 w-full">
          update
        </button>
        <button className="btn btn-outline btn-primary w-full">download</button>
      </div>
    </dialog>
  );
}
export default connect(mapStateToProps)(UpdateModal);

function DataSectionComponenet(props) {
  return (
    <div className="flex justify-between">
      <p className="py-4 text-xs text-black">{props.name}:</p>
      <p className="py-4 text-sm font-bold text-black">{props.data}</p>
    </div>
  );
}

function DescriptionSection(props) {
  var description = props.description;
  if (!props.description) {
    description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  }
  return (
    <div>
      <p className="py-4 text-xs text-black">Description</p>
      <div className="card w-full border-2 border-gray-500 border-opacity-5 bg-gray-600 bg-opacity-5">
        <div className="card-body">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
