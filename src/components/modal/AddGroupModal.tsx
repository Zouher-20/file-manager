import { connect } from "react-redux";
import { ChangeEvent, FormEvent, useState } from "react";
import { NO_SPECIAL_CHARS_REGEX } from "~/utils/helpers";

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

  const Submit = (event : FormEvent) => {
    event.preventDefault()
    onSubmit(groupName);
    setGroupName("");
  };

  return (
    <dialog id="add_group_modal" className="modal">
      <div className="modal-box">
        <div className="flex justify-between">
          <h3 className=" text-xl font-bold">Create group</h3>
          <form method="dialog">
            <button className="cursor-pointer ">X</button>
          </form>
        </div>

        <div className="modal-action ">
          <form onSubmit={Submit} className=" w-full">
            <div className="flex flex-col gap-1 pb-4">
              <label className="mb-1 font-bold">Name</label>
              <input
                value={groupName}
                onChange={(e) => onChange(e)}
                type="text"
                required
                pattern={NO_SPECIAL_CHARS_REGEX}
                maxLength={32}
                className="input input-bordered  w-full "
              />
            </div>
            <div className=" flex justify-end gap-2">
              <button type="submit" className="btn btn-success px-8  w-full lg:w-32 text-base-100">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default connect(mapStateToProps)(AddGroupModal);
