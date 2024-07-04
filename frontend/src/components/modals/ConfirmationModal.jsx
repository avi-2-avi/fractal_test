import Modal from "react-modal";
import { CustomButton } from "../CustomButton";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    padding: "20px",
    textAlign: "center",

  },
};

Modal.setAppElement("#root");

export const ConfirmationModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  message,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Confirmation Modal"
    >
      <h2>{message}</h2>
      <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
        <CustomButton onClick={onRequestClose} text="No" type="secondary"></CustomButton>
        <CustomButton onClick={onConfirm} text="Yes" type="danger"></CustomButton>
      </div>
    </Modal>
  );
};
