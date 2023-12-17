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
  onSubmit: (form: { name: string; contents: string }) => void;
  title: string;
  btnLabel: string;
  color: string;
  id: string;
}) {
  const [fileName, setFileName] = useState<string>("");
  const [fileContents, setFileContents] = useState<string>("");

  const closeBtn = useRef<HTMLButtonElement | null>(null);
  const onNameChange = (e: ChangeEvent) => {
    let name: string = fileName;
    name = (e.target as HTMLInputElement).value;
    setFileName(name);
  };
  const onContentsChange = (e: ChangeEvent) => {
    let contents: string = fileContents;
    contents = (e.target as HTMLInputElement).value;
    setFileContents(contents);
  };

  const Submit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ name: fileName, contents: fileContents });
    setFileName("");
    setFileContents("");
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
                value={fileName}
                onChange={(e) => onNameChange(e)}
                type="text"
                required
                pattern={NO_SPECIAL_CHARS_REGEX}
                maxLength={32}
                className="input input-bordered w-full "
              />
            </div>
            <div className="flex flex-col gap-1 pb-4">
              <label className="mb-1 font-bold">Contents</label>
              <textarea
                value={fileContents}
                onChange={(e) => onContentsChange(e)}
                required
                className="textarea textarea-bordered w-full "
                rows={5}
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
