import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalSlice";

import Modal from "./Modal";

export default function ConnectedModal() {
  const { isOpen, title} = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(closeModal());
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div>
      <h2>{title}</h2>
      <div>
        <>
          <p>Your order has been successfully placed on the website.</p>
          <p>A manager will contact you shortly to confirm your order.</p>
        </>
      </div>
      </div>
    </Modal>
  );
}
