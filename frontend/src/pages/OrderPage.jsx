import { useState } from "react";
import { CustomButton } from "../components/CustomButton";
import { Header } from "../components/Header";
import { Table } from "../components/Table";
import { CustomInput } from "../components/CustomInput";
import { useEffect } from "react";
import { createOrder, fetchOrderById, updateOrder } from "../api/ordersApi";
import { useParams } from "react-router-dom";
import { EditModal } from "../components/modals/EditModal";
import { ProductModal } from "../components/modals/ProductModal";
import { useNavigate } from "react-router-dom";

export const OrderPage = () => {
  const [orderProducts, setOrderProducts] = useState([]);
  const [orderID, setOrderID] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [numProducts, setNumProducts] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        if (id) {
          const data = await fetchOrderById(id);
          setOrderID(data.order_number);
          setDate(data.created_at.split("T")[0]);
          setNumProducts(data.product_quantity);
          setFinalPrice(data.final_price);
          setStatus(data.status);
          setOrderProducts(data.orderProductList);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    getOrderDetails();
  }, [id]);

  const onEditOrProdClick = (row) => {
    setSelectedRow(row);
    setIsModalEditOpen(true);
  };

  const onDeleteOrProdClick = (row) => {
    try {
      const newOrderProducts = orderProducts.filter(
        (product) => product.product_id !== row.product_id
      );
      setOrderProducts(newOrderProducts);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const onSaveClick = () => {
    if(id) {    
      const order = {
        id: id,
        order_number: orderID,
        status: status,
        created_at: date,
        product_quantity: numProducts,
        final_price: finalPrice,
        orderProducts: orderProducts.map((product) => ({
          product_id: product.product_id,
          quantity: product.quantity,
        })),
      };

      updateOrder(order);
      navigate("/my-orders");
    } else {
      const order = {
        order_number: orderID,
        status: status,
        orderProducts: orderProducts.map((product) => ({
          product_id: product.product_id,
          quantity: product.quantity,
        })),
      }

      createOrder(order);
      navigate("/my-orders");
    }
  };

  const onNavigateBack = () => {
    navigate("/my-orders");
  };

  const onSaveProduct = (newProduct) => {
    setOrderProducts([...orderProducts, newProduct]);
    setIsModalProductOpen(false);
  };

  const onSaveEdit = (editedRow) => {
    const updatedOrderProducts = orderProducts.map((product) =>
      product.product_id === editedRow.product_id ? editedRow : product
    );
    setOrderProducts(updatedOrderProducts);
    setIsModalEditOpen(false);
  };

  const orderProductsColumns = [
    { header: "ID", accessor: "product_id" },
    { header: "Name", accessor: "name" },
    { header: "Unit Price", accessor: "unit_price" },
    {
      header: "Qty",
      accessor: "quantity",
    },
    { header: "Total Price", accessor: "total_price" },
    {
      header: "Options",
      render: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            gap: "8px",
          }}
        >
          <CustomButton
            text="EDIT"
            onClick={() => onEditOrProdClick(row)}
            type="secondary"
          ></CustomButton>
          <CustomButton
            text="DELETE"
            type="danger"
            onClick={() => onDeleteOrProdClick(row)}
          ></CustomButton>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h1>Orders List</h1>
        <div style={{display: "flex", flexDirection: "row", gap: "8px" }}>
        <CustomButton
          text="RETURN"
          type="secondary"
          onClick={() => onNavigateBack()}
        ></CustomButton>
        <CustomButton
          text="ADD PRODUCT"
          type="primary"
          onClick={() => setIsModalProductOpen(true)}
        ></CustomButton>
        </div>
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <div id="form" style={{ width: "25%", paddingRight: "40px" }}>
          <p id="form-title">Order #</p>
          <CustomInput
            type="text"
            value={orderID}
            onChange={(e) => setOrderID(e.target.value)}
          />
          <p id="form-title">Date</p>
          <CustomInput type="disabled" value={date} />
          <p id="form-title"># Products</p>
          <CustomInput type="disabled" value={numProducts} />
          <p id="form-title">Final Price</p>
          <CustomInput type="disabled" value={finalPrice} />
          <p id="form-title">Status</p>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
              height: "40px",
              padding: "8px",
            }}
          >
            <option value="Pending">Pending</option>
            <option value="InProgress">InProgress</option>
            <option value="Completed">Completed</option>
          </select>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <CustomButton
              text="SAVE"
              type="primary"
              onClick={() => onSaveClick()}
            ></CustomButton>
          </div>
        </div>
        <div id="products-table" style={{ width: "100%" }}>
          <Table columns={orderProductsColumns} data={orderProducts} />
        </div>
      </div>
      <EditModal
        isOpen={isModalEditOpen}
        onRequestClose={() => setIsModalEditOpen(false)}
        message="Change the product quantity"
        onConfirm={onSaveEdit}
        row={selectedRow}
      />
      <ProductModal
        isOpen={isModalProductOpen}
        onRequestClose={() => setIsModalProductOpen(false)}
        onConfirm={onSaveProduct}
        message="Add a new product"
      />
    </div>
  );
};
