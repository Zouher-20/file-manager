"use client";

import { useRef } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state: any) => ({
  ...state.ModalReducer,
});

function ConfirmModal({
  title,
  text,
  btnLabel,
  color,
  id,
  callback,
}: {
  title: string;
  text: string;
  btnLabel: string;
  color: string;
  id: string;
  callback: () => unknown;
}) {
  const closeBtn = useRef(null);

  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3 className={`text-${color} text-xl font-bold`}>{title}</h3>
        <h3 className="mt-4">{text}</h3>
        <div className="mt-5 flex justify-end">
          <form method="dialog">
            <button ref={closeBtn} className="btn btn-ghost btn-outline ">
              Cancel
            </button>
          </form>
          <button
            onClick={() => {
              callback();
              closeBtn.current.click();
            }}
            className={`btn btn-${color} mx-2`}
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default connect(mapStateToProps)(ConfirmModal);
