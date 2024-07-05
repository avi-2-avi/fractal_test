import Modal from "react-modal";
import { CustomButton } from "../CustomButton";
import { useEffect } from "react";
import { useState } from "react";
import { CustomInput } from "../CustomInput";
import { fetchProducts } from "../../api/productsApi";

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

export const ProductModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  message,
}) => {
  const [productNames, setProductNames] = useState([]);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        setProductNames(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (isOpen) {
      getProducts();
    }
  }, [isOpen]);

  const handleConfirm = () => {
    console.log(product)
    const selectedProduct = productNames.find((p) => p.name === product);
    console.log(selectedProduct);
    if (selectedProduct) {
      onConfirm({
        product_id: selectedProduct.id,
        name: selectedProduct.name,
        unit_price: selectedProduct.unit_price,
        quantity: parseInt(quantity),
        total_price: parseFloat((selectedProduct.unit_price * quantity).toFixed(2)),
      });
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Confirmation Modal"
    >
      <h2>{message}</h2>
      <p id="form-title">Product</p>
      <select
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "100%",
          height: "40px",
          padding: "8px",
        }}
      >
        {productNames.map((product) => (
          <option key={product.id} value={product.name}>
            {product.name}
          </option>
        ))}
      </select>
      <p id="form-title">Quantity</p>
      <CustomInput
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      ></CustomInput>
      <br />
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
