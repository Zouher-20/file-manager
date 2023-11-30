import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef, useState } from "react";
import { connect } from "react-redux";
import SearchFeild from "../form/search_field";

const mapStateToProps = (state: any) => ({
  ...state.ModalReducer,
});

function AddFileModal(props: any) {
  var [disable, setDisable] = useState(true);
  return (
    <dialog id="add_file_modal" className="modal">
      <div className="modal-box grid ">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="flex gap-4 text-2xl font-bold text-primary">
          Add New File
          <Icon
            className="h-6 w-6 self-center text-primary"
            icon={"solar:file-text-broken"}
          />
        </h3>
        <div className="flex flex-col gap-1 py-4">
          <label className="mb-1 font-bold">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full "
          />
        </div>
        <div className="card w-full border-2 border-gray-500 border-opacity-5 bg-gray-600 bg-opacity-5">
          <textarea
            className="textarea textarea-ghost  textarea-md h-60"
            placeholder="Descriptions"
            defaultValue={""}
          ></textarea>
        </div>
        <ButtonWithDisapleAndLoadingStates
          text="submit"
          disable={disable}
          loading={false}
        />
      </div>
    </dialog>
  );
}

export default connect(mapStateToProps)(AddFileModal);

function ButtonWithDisapleAndLoadingStates(props: any) {
  return (
    <div className="m-3 flex justify-end">
      <button className="btn btn-primary btn-sm" disabled={props.disable}>
        {props.text}
      </button>
    </div>
  );
}
