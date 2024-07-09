import { useEffect } from "react";
import { CustomButton } from "../components/CustomButton";
import { Table } from "../components/Table";
import { useState } from "react";
import { Header } from "../components/Header";
import { deleteProduct, fetchProducts } from "../api/productsApi";
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
        const data = await fetchProducts();
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
    alert("New Product");
  };

  const onEditProductClick = (row) => {
    alert("Edit Product");
  };

  const onNavigateBack = () => {
    navigate("/my-orders");
  }

  const onDeleteProductClick = (row) => {
    setSelectedRow(row);
    alert("Delete Product");
  };

  const onConfirmDelete = async () => {
    if (selectedRow) {
      try {
        await deleteProduct(selectedRow.id);
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
        <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
          <CustomButton
            text="RETURN"
            onClick={onNavigateBack}
            type="secondary"
          ></CustomButton>
          <CustomButton
            text="NEW PRODUCT"
            onClick={onNewProductClick}
            type="primary"
          ></CustomButton>
        </div>
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
