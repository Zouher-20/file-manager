import { connect } from "react-redux";
import { ChangeEvent, useState } from "react";

const mapStateToProps = (state: any) => ({
  ...state.ModalReducer,
});

function AddGroupModal({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [groupName, setGroupName] = useState<string>("");

  const onChange = (e: ChangeEvent) => {
    let name: string = groupName;
    name = (e.target as HTMLInputElement).value;
    setGroupName(name);
  };

  const Submit = () => {
    // create group there
    onSubmit(groupName);
    setGroupName("");
  };

  return (
    <dialog id="add_group_modal" className="modal">
      <div className="modal-box">
        <h3 className="text-center text-2xl font-bold text-primary">
          Create group
        </h3>
        <div className="flex flex-col gap-1 py-4">
          <label className="mb-1 font-bold">Name</label>
          <input
            value={groupName}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Name"
            className="input input-bordered input-primary w-full "
          />
        </div>
        <div className="modal-action ">
          <form method="dialog" className="flex gap-1">
            <button className="btn">Close</button>
            <button onClick={Submit} className="btn btn-primary text-base-100">
              submit
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default connect(mapStateToProps)(AddGroupModal);
