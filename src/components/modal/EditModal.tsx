"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";

export function EditModal({
  onSubmit,
  isCheckedIn = true,
  id,
  fileId,
}: {
  onSubmit: (form: { name: string; contents: string }) => void;
  isCheckedIn?: boolean;
  id: string;
  fileId: number;
}) {
  const [fileName, setFileName] = useState<string>("");
  const [fileContents, setFileContents] = useState<string>("");
  const { data, isSuccess, isLoading, dataUpdatedAt, refetch } =
    api.file.getFileDetails.useQuery(fileId);

  const fileData = api.file.getRawFile.useQuery(fileId);

  const closeBtn = useRef<HTMLButtonElement | null>(null);

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

  useEffect(() => {
    if (fileData.data && fileData.isSuccess) {
      setFileContents(fileData.data.content);
    }
  }, [fileData.data, fileData.isSuccess, fileId]);

  return (
    <dialog id={id} className="modal">
      <div className="modal-box w-11/12 max-w-5xl ">
        <div className="flex justify-between">
          <h3 className=" text-xl font-bold capitalize">
            {data?.name} details
          </h3>
          <form method="dialog">
            <button ref={closeBtn} className="cursor-pointer ">
              X
            </button>
          </form>
        </div>
        <div className=" mt-6 grid grid-cols-2">
          <div>Creation date : {data?.createdAt.toDateString()}</div>
          <div>Last modified : {data?.updatedAt.toDateString()}</div>
          <div>Owned by : {data?.createdBy.name}</div>
          <div>Taken by : {data?.takenBy?.name || "_"}</div>
        </div>
        <div className="modal-action">
          <form onSubmit={Submit} className=" w-full">
            <div className="flex flex-col gap-1 pb-4">
              <label className="mb-1 font-bold">Contents</label>
              <textarea
                disabled={!isCheckedIn}
                value={fileContents}
                onChange={(e) => onContentsChange(e)}
                required
                className="textarea textarea-bordered w-full "
                rows={5}
              />
            </div>
            {isCheckedIn && (
              <div className=" flex justify-end gap-2">
                <button
                  type="submit"
                  className="btn btn-info w-full  px-8 capitalize text-base-100 lg:w-32"
                >
                  Save
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </dialog>
  );
}
