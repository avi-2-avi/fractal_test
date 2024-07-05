const API_BASE_URL = 'http://localhost:8080/api';

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product by id:', error);
        throw error;
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/delete/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};