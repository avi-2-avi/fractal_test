const API_BASE_URL = 'http://localhost:8080/api';

export const fetchOrders = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const fetchOrderById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching order by id:', error);
        throw error;
    }
}

export const deleteOrder = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/delete/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Error deleting order:', error);
        throw error;
    }
};