import React from 'react';
import { Table } from '../ui/Table';
import { Button } from '../ui/Button';
import { Edit, Trash2, Plus } from 'lucide-react';

export const ProductList = ({
  products,
  onEdit,
  onDelete,
  onAdd,
  isLoading = false,
}) => {
  const [sortColumn, setSortColumn] = React.useState('name');
  const [sortDirection, setSortDirection] = React.useState('asc');

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Product Name',
      sortable: true,
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (row) => `$${row.price.toFixed(2)}`,
    },
    {
      key: 'quantity',
      label: 'Quantity',
      sortable: true,
    },
    {
      key: 'minStock',
      label: 'Min Stock',
      sortable: true,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(row)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(row)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const sortedProducts = React.useMemo(() => {
    return [...products].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    });
  }, [products, sortColumn, sortDirection]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Products</h2>
        <Button onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Table
        columns={columns}
        data={sortedProducts}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />

      {isLoading && (
        <div className="text-center py-4">
          <p className="text-gray-500">Loading products...</p>
        </div>
      )}

      {!isLoading && products.length === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
}; 