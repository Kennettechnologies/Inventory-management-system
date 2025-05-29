import React from 'react';
import { OrderList } from './OrderList';
import { OrderForm } from './OrderForm';
import { OrderDetails } from './OrderDetails';
import { Modal } from '../ui/Modal';
import { Card } from '../ui/Card';
import { useToast } from '../../context/ToastContext';

export const Orders = () => {
  const [orders, setOrders] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [viewMode, setViewMode] = React.useState('list'); // 'list' or 'details'
  const { addToast } = useToast();

  // Fetch orders and products on component mount
  React.useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      addToast('Failed to fetch orders. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      addToast('Failed to fetch products. Please try again.', 'error');
    }
  };

  const handleAdd = () => {
    setSelectedOrder(null);
    setIsModalOpen(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setViewMode('details');
  };

  const handleBack = () => {
    setViewMode('list');
    setSelectedOrder(null);
  };

  const handleDelete = async (order) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${order._id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete order');
        }

        setOrders(orders.filter((o) => o._id !== order._id));
        addToast('Order deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting order:', error);
        addToast('Failed to delete order. Please try again.', 'error');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const url = selectedOrder
        ? `http://localhost:5000/api/orders/${selectedOrder._id}`
        : 'http://localhost:5000/api/orders';
      
      const method = selectedOrder ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save order');
      }

      const data = await response.json();

      if (selectedOrder) {
        setOrders(orders.map((o) => 
          o._id === selectedOrder._id ? data : o
        ));
        addToast('Order updated successfully', 'success');
      } else {
        setOrders([...orders, data]);
        addToast('Order created successfully', 'success');
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving order:', error);
      addToast('Failed to save order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (viewMode === 'details' && selectedOrder) {
    return (
      <OrderDetails
        order={selectedOrder}
        onBack={handleBack}
        onPrint={() => addToast('Printing order...', 'info')}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 mt-2">
          Manage customer orders
        </p>
      </div>

      <Card>
        <OrderList
          orders={orders}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          isLoading={isLoading}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedOrder ? 'Edit Order' : 'New Order'}
      >
        <OrderForm
          initialData={selectedOrder}
          products={products}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
}; 