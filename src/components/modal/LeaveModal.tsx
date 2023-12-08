import { connect } from "react-redux";

const mapStateToProps = (state: any) => ({
  ...state.ModalReducer,
});

function LeaveModal(props: any) {
  return (
    <dialog id="leave_modal" className="modal">
      <div className="modal-box">
        <h3 className="text-xl font-bold text-error">Confirm leaving group</h3>
        <h3 className="mt-4">
          Are you sure you want to leave this group ?
        </h3>
        <form method="dialog" className="mt-5">
          <div className="flex justify-end">
            <button className="btn btn-ghost btn-outline ">Cancel</button>
            <button className="btn btn-error btn-active mx-2">Leave</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default connect(mapStateToProps)(LeaveModal);
