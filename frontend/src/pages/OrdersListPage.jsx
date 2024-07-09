import { useEffect } from "react";
import { CustomButton } from "../components/CustomButton";
import { Table } from "../components/Table";
import { useState } from "react";
import { Header } from "../components/Header";
import { deleteOrder, fetchOrders } from "../api/ordersApi";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "../components/modals/ConfirmationModal";

export const OrdersListPage = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        const filteredOrders = data.filter(
          (order) => order.status !== "Completed"
        );
        setOrders(filteredOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    console.log(orders);
    getOrders();
  }, []);

  const orderColumns = [
    { header: "ID", accessor: "id" },
    { header: "Order #", accessor: "order_number" },
    {
      header: "Date",
      accessor: "created_at",
      render: (row) => row.created_at.split("T")[0],
    },
    { header: "# Products", accessor: "product_quantity" },
    {
      header: "Final Price",
      accessor: "final_price",
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <>
          <CustomButton text={row.status} type="secondary"></CustomButton>
        </>
      ),
    },
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
            onClick={() => onEditOrderClick(row)}
            type="secondary"
          ></CustomButton>
          <CustomButton
            text="DELETE"
            type="danger"
            onClick={() => onDeleteOrderClick(row)}
          ></CustomButton>
        </div>
      ),
    },
  ];

  const onNewOrderClick = () => {
    navigate(`/add-order`);
  };

  const onRedirectProduct = () => {
    navigate(`/products`);
  };

  const onEditOrderClick = (row) => {
    navigate(`/add-order/${row.id}`);
  };

  const onDeleteOrderClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const onConfirmDelete = async () => {
    if (selectedRow) {
      try {
        await deleteOrder(selectedRow.id);
        setOrders(orders.filter((order) => order.id !== selectedRow.id));
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

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
        <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
          <CustomButton
            text="PRODUCTS"
            onClick={onRedirectProduct}
            type="secondary"
          ></CustomButton>
          <CustomButton
            text="NEW ORDER"
            onClick={onNewOrderClick}
            type="primary"
          ></CustomButton>
        </div>
      </div>

      <Table columns={orderColumns} data={orders} />
      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={onConfirmDelete}
        message="Are you sure you want to delete this order?"
      />
    </div>
  );
};
