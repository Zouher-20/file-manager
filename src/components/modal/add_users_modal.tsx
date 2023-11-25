import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { connect } from "react-redux";
import { fileInterface } from "~/pages/interface";

const mapStateToProps = (state: any) => ({
  ...state.ModalReducer,
});

function AddNewUserModal(props: any) {
  var disable: boolean = false;
  const [items, updateItem] = useState([
    { name: "majd", id: 1, email: "alshalabi211@gmail.com", selected: false },
    { name: "majd", id: 2, email: "alshalabi211@gmail.com", selected: false },
    { name: "majd", id: 3, email: "alshalabi211@gmail.com", selected: false },
  ]);

  return (
    <dialog id="add_user_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-lg font-bold">Select user to add to this group!</h3>
        <UserList
          items={items}
          onSelect={(currentItem: any) => {
            const index: number = items.indexOf(currentItem);
            if (index !== -1) {
              const newItems = [...items];
              newItems[index]!.selected = !(newItems[index]?.selected ?? false);
              updateItem(newItems);
            }
          }}
        />
        <ButtonWithDisapleAndLoadingStates
          text="submit"
          disable={disable}
          loading={false}
        />
      </div>
    </dialog>
  );
}

export default connect(mapStateToProps)(AddNewUserModal);

function ButtonWithDisapleAndLoadingStates(props: any) {
  return (
    <div className="m-3 flex justify-end">
      <button className="btn btn-primary btn-sm" disabled={props.disable}>
        {props.text}
      </button>
    </div>
  );
}

function UserList(props: any) {
  return (
    <div className="grid grid-cols-1 divide-y">
      {props.items.map((item: any) => {
        return (
          <div className="flex items-center justify-between p-3" key={item.id}>
            <div className="flex">
              {item.selected && (
                <Icon
                  className="mx-3 h-8 w-8 text-primary"
                  icon={"solar:check-circle-broken"}
                />
              )}
              <div>
                <p className="text-sm font-bold text-black">{item.name}</p>
                <p className="text-xs font-medium text-black">{item.email}</p>
              </div>
            </div>
            <button
              className="btn btn-circle btn-ghost btn-sm"
              onClick={() => {
                props.onSelect(item);
              }}
            >
              {item.selected && (
                <Icon
                  className="h-8 w-8"
                  icon={"solar:user-check-bold-duotone"}
                />
              )}
              {!item.selected && (
                <Icon
                  className="h-8 w-8"
                  icon={"solar:user-cross-bold-duotone"}
                />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
