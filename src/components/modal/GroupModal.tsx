"use client";

import { connect } from "react-redux";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { NO_SPECIAL_CHARS_REGEX } from "~/utils/helpers";

const mapStateToProps = (state: any) => ({
  ...state.ModalReducer,
});

function GroupModal({
  onSubmit,
  title,
  btnLabel,
  color,
  id,
}: {
  onSubmit: (name: string) => void;
  title: string;
  btnLabel: string;
  color: string;
  id: string;
}) {
  const [groupName, setGroupName] = useState<string>("");
  const closeBtn = useRef<HTMLButtonElement | null>(null);
  const onChange = (e: ChangeEvent) => {
    let name: string = groupName;
    name = (e.target as HTMLInputElement).value;
    setGroupName(name);
  };

  const Submit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(groupName);
    setGroupName("");
    (closeBtn?.current as HTMLButtonElement).click();
  };

  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <div className="flex justify-between">
          <h3 className=" text-xl font-bold capitalize">{title}</h3>
          <form method="dialog">
            <button ref={closeBtn} className="cursor-pointer ">
              X
            </button>
          </form>
        </div>

        <div className="modal-action">
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
                className="input input-bordered w-full "
              />
            </div>
            <div className=" flex justify-end gap-2">
              <button
                type="submit"
                className={`btn btn-${color} w-full  px-8 capitalize text-base-100 lg:w-32`}
              >
                {btnLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default connect(mapStateToProps)(GroupModal);
