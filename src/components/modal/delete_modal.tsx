import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  ...state.ModalReducer,
});

function DeleteModal(props) {
  return (
    <dialog id="delete_modal" className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">
          are you sure you want to delete this file !!{" "}
        </h3>
        <form method="dialog" className="mt-5">
          <div className="flex justify-end">
            <button className="btn btn-outline btn-primary ">cancel</button>
            <button className="btn btn-primary btn-active mx-2">delete</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default connect(mapStateToProps)(DeleteModal);
