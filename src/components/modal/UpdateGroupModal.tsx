"use client";

import { connect } from "react-redux";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { NO_SPECIAL_CHARS_REGEX, NUMBERS_ONLY_REGEX } from "~/utils/helpers";
import { api } from "~/utils/api";

const mapStateToProps = (state: any) => ({
  ...state.ModalReducer,
});

function UpdateGroupModal({
  onSubmit,
  title,
  btnLabel,
  color,
  id,
  groupId,
}: {
  onSubmit: (input: {
    name: string;
    checkinTimeOut: number;
    filesLimit: number;
    usersLimit: number;
  }) => void;
  title: string;
  btnLabel: string;
  color: string;
  id: string;
  groupId: number;
}) {
  const closeBtn = useRef<HTMLButtonElement | null>(null);
  const [name, setName] = useState<string>("");
  const onChange = (e: ChangeEvent) => {
    let value: string = name;
    value = (e.target as HTMLInputElement).value;
    setName(value);
  };
  const [checkinTimeOut, setCheckinTimeOut] = useState<number>(1);
  const onCheckinTimeOutChange = (e: ChangeEvent) => {
    let value: number = checkinTimeOut;
    value = parseInt((e.target as HTMLInputElement).value);
    setCheckinTimeOut(value);
  };
  const [filesLimit, setFilesLimit] = useState<number>(1);
  const onFilesLimitChange = (e: ChangeEvent) => {
    let value: number = filesLimit;
    value = parseInt((e.target as HTMLInputElement).value);
    setFilesLimit(value);
  };
  const [usersLimit, setUsersLimit] = useState<number>(1);
  const onUsersLimitChange = (e: ChangeEvent) => {
    let value: number = usersLimit;
    value = parseInt((e.target as HTMLInputElement).value);
    setUsersLimit(value);
  };

  const Submit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({
      name: name,
      checkinTimeOut,
      filesLimit,
      usersLimit,
    });
    setName("");
    setCheckinTimeOut(1);
    setFilesLimit(1);
    setUsersLimit(1);
    (closeBtn?.current as HTMLButtonElement).click();
  };

  const groupData = api.file.getGroupById.useQuery(groupId, {
    onSuccess: (data) => {
      if (data) {
        setName(data.name);
        setCheckinTimeOut(data.checkinTimeOut);
        setFilesLimit(data.filesLimit);
        setUsersLimit(data.usersLimit);
      }
    },
  });

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
                value={name}
                onChange={(e) => onChange(e)}
                type="text"
                required
                pattern={NO_SPECIAL_CHARS_REGEX}
                maxLength={32}
                className="input input-bordered w-full "
              />
            </div>
            <div className="flex flex-col gap-1 pb-4">
              <label className="mb-1 font-bold">
                checkin TimeOut (minutes)
              </label>
              <input
                min={1}
                value={checkinTimeOut}
                onChange={(e) => onCheckinTimeOutChange(e)}
                type="number"
                required
                pattern={NUMBERS_ONLY_REGEX}
                maxLength={5}
                className="input input-bordered w-full "
              />
            </div>
            <div className="flex flex-col gap-1 pb-4">
              <label className="mb-1 font-bold">users limit</label>
              <input
                min={1}
                value={usersLimit}
                onChange={(e) => onUsersLimitChange(e)}
                type="number"
                required
                pattern={NUMBERS_ONLY_REGEX}
                maxLength={5}
                className="input input-bordered w-full "
              />
              <small>1 means only group owner</small>
            </div>
            <div className="flex flex-col gap-1 pb-4">
              <label className="mb-1 font-bold">files limit</label>
              <input
                min={1}
                value={filesLimit}
                onChange={(e) => onFilesLimitChange(e)}
                type="number"
                required
                pattern={NUMBERS_ONLY_REGEX}
                maxLength={5}
                className="input input-bordered w-full "
              />
            </div>
            {/* <div className="flex flex-col gap-1 pb-4">
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
            </div> */}
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

export default connect(mapStateToProps)(UpdateGroupModal);
