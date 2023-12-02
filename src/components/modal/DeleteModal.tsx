import { connect } from "react-redux";

const mapStateToProps = (state: any) => ({
  ...state.ModalReducer,
});

function DeleteModal(props: any) {
  return (
    <dialog id="delete_modal" className="modal">
      <div className="modal-box">
        <h3 className="text-2xl font-bold text-primary">Delete Group</h3>
        <h3 className="text-lg font-bold">
          Are you sure you want to delete this file !!
        </h3>
        <form method="dialog" className="mt-5">
          <div className="flex justify-end">
            <button className="btn btn-outline ">cancel</button>
            <button className="btn btn-error btn-active mx-2">delete</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default connect(mapStateToProps)(DeleteModal);
