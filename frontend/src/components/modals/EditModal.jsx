import Modal from "react-modal";
import { CustomButton } from "../CustomButton";
import { CustomInput } from "../CustomInput";
import { useState } from "react";

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

export const EditModal = ({ isOpen, onRequestClose, message, onConfirm, row }) => {
  const [quantity, setQuantity] = useState(0)
  
  const handleConfirm = () => {
    const updatedRow = { ...row, quantity, total_price: row.unit_price * quantity};
    onConfirm(updatedRow);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Confirmation Modal"
    >
      <h2>{message}</h2>
      <div style={{width: "80%", display: "flex", flexDirection: "row", marginInline: "auto", marginBottom: "20px"}}>

      <CustomInput
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      ></CustomInput>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <CustomButton
          onClick={onRequestClose}
          text="No"
          type="secondary"
        ></CustomButton>
        <CustomButton
          onClick={handleConfirm}
          text="Yes"
          type="danger"
        ></CustomButton>
      </div>
    </Modal>
  );
};
