import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export const OrderForm = ({
  initialData = {},
  products = [],
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = React.useState({
    customerName: initialData.customerName || '',
    customerEmail: initialData.customerEmail || '',
    status: initialData.status || 'pending',
    items: initialData.items || [{ productId: '', quantity: 1 }],
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleItemChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { productId: '', quantity: 1 }],
    }));
  };

  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Customer email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Invalid email format';
    }
    if (formData.items.length === 0) {
      newErrors.items = 'At least one item is required';
    }
    formData.items.forEach((item, index) => {
      if (!item.productId) {
        newErrors[`items.${index}.productId`] = 'Product is required';
      }
      if (!item.quantity || item.quantity < 1) {
        newErrors[`items.${index}.quantity`] = 'Quantity must be at least 1';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Customer Name"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          error={errors.customerName}
          placeholder="Enter customer name"
        />

        <Input
          label="Customer Email"
          name="customerEmail"
          type="email"
          value={formData.customerEmail}
          onChange={handleChange}
          error={errors.customerEmail}
          placeholder="Enter customer email"
        />
      </div>

      <Select
        label="Order Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        error={errors.status}
        options={statusOptions}
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Order Items</h3>
          <Button
            type="button"
            variant="secondary"
            onClick={addItem}
          >
            Add Item
          </Button>
        </div>

        {formData.items.map((item, index) => (
          <div key={index} className="flex items-end space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <Select
                label="Product"
                value={item.productId}
                onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                error={errors[`items.${index}.productId`]}
                options={products.map((product) => ({
                  value: product._id,
                  label: product.name,
                }))}
              />
            </div>
            <div className="w-32">
              <Input
                label="Quantity"
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                error={errors[`items.${index}.quantity`]}
              />
            </div>
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => removeItem(index)}
            >
              Remove
            </Button>
          </div>
        ))}

        {errors.items && (
          <p className="text-sm text-red-600">{errors.items}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : initialData.id ? 'Update Order' : 'Create Order'}
        </Button>
      </div>
    </form>
  );
}; 