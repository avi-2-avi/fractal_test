import { useEffect } from "react";
import { CustomButton } from "../components/CustomButton";
import { Table } from "../components/Table";
import { useState } from "react";
import { Header } from "../components/Header";
import { deleteproduct, fetchproducts } from "../api/productsApi";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "../components/modals/ConfirmationModal";

export const ProductsListPage = () => {
  const [products, setproducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getproducts = async () => {
      try {
        const data = await fetchproducts();
        setproducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    console.log(products);
    getproducts();
  }, []);

  const productColumns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Unit Price", accessor: "unit_price" },
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
            <CustomButton text="EDIT" 
            onClick={() => onEditProductClick(row)}
             type="secondary"></CustomButton>
            <CustomButton
              text="DELETE"
              type="danger"
              onClick={() => onDeleteProductClick(row)} 
            ></CustomButton>
          </div>
      ),
    },
  ];

  const onNewProductClick = () => {
    navigate(`/add-product`);
  };

  const onEditProductClick = (row) => {
    navigate(`/add-product/${row.id}`);
  };

  const onDeleteProductClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const onConfirmDelete = async () => {
    if (selectedRow) {
      try {
        await deleteproduct(selectedRow.id);
        setproducts(products.filter((product) => product.id !== selectedRow.id));
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error deleting product:", error);
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
        <h1>Products List</h1>
      </div>

      <Table columns={productColumns} data={products} />
      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={onConfirmDelete}
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
};
