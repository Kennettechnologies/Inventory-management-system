import { render, screen } from '@testing-library/react';
import { Dashboard } from '../Dashboard';

describe('Dashboard', () => {
  it('renders dashboard title and description', () => {
    render(<Dashboard />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText(/Welcome back!/i)).toBeInTheDocument();
  });

  it('renders all dashboard components', () => {
    render(<Dashboard />);
    
    // Check for StatsCards
    expect(screen.getByText('Total Products')).toBeInTheDocument();
    expect(screen.getByText('Total Orders')).toBeInTheDocument();
    
    // Check for InventoryChart
    expect(screen.getByText('Inventory Trends')).toBeInTheDocument();
    
    // Check for LowStockAlerts
    expect(screen.getByText('Low Stock Alerts')).toBeInTheDocument();
    
    // Check for RecentOrders
    expect(screen.getByText('Recent Orders')).toBeInTheDocument();
  });
}); 