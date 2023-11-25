import { LOAD_MODAL_DATA } from "../action_type_constant";

const ModalReducer = (state = { file: null }, action: any) => {
  switch (action.type) {
    case LOAD_MODAL_DATA:
      return {
        ...state,
        file: action.file,
      };
    default:
      return state;
  }
};
export default ModalReducer;
