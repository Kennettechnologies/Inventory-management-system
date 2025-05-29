import React from 'react';
import { ProductList } from './ProductList';
import { ProductForm } from './ProductForm';
import { Modal } from '../ui/Modal';
import { Card } from '../ui/Card';

export const Products = () => {
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Fetch products on component mount
  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // TODO: Add error handling UI
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (product) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`http://localhost:5000/api/products/${product._id}`, {
          method: 'DELETE',
        });
        setProducts(products.filter((p) => p._id !== product._id));
      } catch (error) {
        console.error('Error deleting product:', error);
        // TODO: Add error handling UI
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const url = selectedProduct
        ? `http://localhost:5000/api/products/${selectedProduct._id}`
        : 'http://localhost:5000/api/products';
      
      const method = selectedProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (selectedProduct) {
        setProducts(products.map((p) => 
          p._id === selectedProduct._id ? data : p
        ));
      } else {
        setProducts([...products, data]);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving product:', error);
      // TODO: Add error handling UI
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-500 mt-2">
          Manage your product inventory
        </p>
      </div>

      <Card>
        <ProductList
          products={products}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedProduct ? 'Edit Product' : 'Add Product'}
      >
        <ProductForm
          initialData={selectedProduct}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
}; 