import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

// Sample data for the pie chart (Customer Volume)
const customerData = [
  { name: 'New', value: 62, color: '#4A90E2' },
  { name: 'Returning', value: 13, color: '#50E3C2' },
  { name: 'Inactive', value: 23, color: '#E5E5E5' }
];

// Sales Volume data sets
const dailyData = [
  { day: 'Sun', Vision: 2400, Sale: 2400 },
  { day: 'Mon', Vision: 1398, Sale: 2210 },
  { day: 'Tue', Vision: 9800, Sale: 2290 },
  { day: 'Wed', Vision: 3908, Sale: 2000 },
  { day: 'Thu', Vision: 4800, Sale: 2181 },
  { day: 'Fri', Vision: 3800, Sale: 2500 },
  { day: 'Sat', Vision: 4300, Sale: 2100 },
];

const weeklyData = [
  { week: 'Week 1', Vision: 10000, Sale: 14000 },
  { week: 'Week 2', Vision: 12000, Sale: 18000 },
  { week: 'Week 3', Vision: 8000, Sale: 12000 },
  { week: 'Week 4', Vision: 15000, Sale: 20000 },
];

const monthlyData = [
  { month: 'Jan', Vision: 50000, Sale: 62000 },
  { month: 'Feb', Vision: 45000, Sale: 54000 },
  { month: 'Mar', Vision: 40000, Sale: 52000 },
  { month: 'Apr', Vision: 48000, Sale: 60000 },
  { month: 'May', Vision: 53000, Sale: 68000 },
  { month: 'Jun', Vision: 60000, Sale: 70000 },
  { month: 'Jul', Vision: 62000, Sale: 72000 },
  { month: 'Aug', Vision: 58000, Sale: 68000 },
  { month: 'Sep', Vision: 61000, Sale: 71000 },
  { month: 'Oct', Vision: 65000, Sale: 74000 },
  { month: 'Nov', Vision: 68000, Sale: 77000 },
  { month: 'Dec', Vision: 72000, Sale: 81000 },
];

const yearlyData = [
  { year: '2022', Vision: 600000, Sale: 720000 },
  { year: '2023', Vision: 650000, Sale: 750000 },
  { year: '2024', Vision: 700000, Sale: 800000 },
];

// Low Stock Alerts Data
const lowStockData = [
  { product: 'Book', qty: 10 },
  { product: 'Book', qty: 10 },
];

// Recent Orders Data
const ordersData = [
  { orderId: 12345, product: 'xxxx', time: '12/25/2024, 01:10', status: 'Pending', qty: 'x1', price: '$4.00', customer: 'Thomas Laub' },
  { orderId: 23456, product: 'xxxx', time: '12/25/2024, 01:10', status: 'Completed', qty: 'x1', price: '$4.00', customer: 'Thomas Laub' },
  { orderId: 34567, product: 'xxxx', time: '12/25/2024, 01:10', status: 'Canceled', qty: 'x1', price: '$4.00', customer: 'Thomas Laub' },
  { orderId: 45678, product: 'xxxx', time: '12/25/2024, 01:10', status: 'Canceled', qty: 'x1', price: '$4.00', customer: 'Thomas Laub' },
  { orderId: 56789, product: 'xxxx', time: '12/25/2024, 01:10', status: 'Refunded', qty: 'x1', price: '$4.00', customer: 'Thomas Laub' },
];

// Top 5 Products Data
const topProductsData = [
  { product: 'Book', sold: 450, price: '$120', revenue: '$51,440', rating: 4.82 },
  { product: 'Box', sold: 120, price: '$222', revenue: '$17,123', rating: 3.22 },
  { product: 'Book', sold: 450, price: '$120', revenue: '$51,440', rating: 4.82 },
  { product: 'Book', sold: 450, price: '$120', revenue: '$51,440', rating: 4.82 },
  { product: 'Book', sold: 450, price: '$120', revenue: '$51,440', rating: 4.82 },
];

function Dashboard() {
  const [timePeriod, setTimePeriod] = useState('Daily');
  const [salesData, setSalesData] = useState(dailyData);

  // Handle time period selection
  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
    switch (period) {
      case 'Daily':
        setSalesData(dailyData);
        break;
      case 'Weekly':
        setSalesData(weeklyData);
        break;
      case 'Monthly':
        setSalesData(monthlyData);
        break;
      case 'Yearly':
        setSalesData(yearlyData);
        break;
      default:
        setSalesData(dailyData);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Performance Metrics */}
      <div className="performance-metrics">
        <h2>Performance Metrics</h2>
        <div className="metrics-row">
          <div className="metric-box">
            <h3>Total Profit</h3>
            <p>+$1,000.00</p>
          </div>
          <div className="metric-box">
            <h3>Total Revenue</h3>
            <p>+$1,000.00</p>
          </div>
          <div className="metric-box">
            <h3>Total Visitors</h3>
            <p>+$1,000.00</p>
          </div>
          <div className="metric-box">
            <h3>Product Sold</h3>
            <p>+$1,000.00</p>
          </div>
        </div>
      </div>

      {/* Customer Volume Chart */}
      <div className="charts-row">
        <div className="chart-box">
          <h3>Customer Volume</h3>
          <PieChart width={200} height={200}>
            <Pie
              data={customerData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={5}
            >
              {customerData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" align="center" />
          </PieChart>
        </div>

        {/* Sales Volume Bar Chart */}
        <div className="chart-box">
          <h3>Sales Volume</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={timePeriod === 'Daily' ? 'day' : timePeriod === 'Weekly' ? 'week' : timePeriod === 'Monthly' ? 'month' : 'year'} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Vision" fill="#50E3C2" />
              <Bar dataKey="Sale" fill="#4A90E2" />
            </BarChart>
          </ResponsiveContainer>
          <div className="time-filters">
            {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((period) => (
              <span
                key={period}
                className={timePeriod === period ? 'active' : ''}
                onClick={() => handleTimePeriodChange(period)}
              >
                {period}
              </span>
            ))}
          </div>
        </div>

        <div className="low-stack-alerts">
          <h3>Low Stack Alerts</h3>
          <div className="alerts-grid">
            {lowStockData.map((item, index) => (
              <div key={index} className="alert-item">
                {item.product}: {item.qty}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Orders and Top Products */}
      <div className="orders-products-row">
        <div className="recent-orders">
          <h3>Recent Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Order time</th>
                <th>Status</th>
                <th>Qty</th>
                <th>Total Price</th>
                <th>Customer</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.product}</td>
                  <td>{order.time}</td>
                  <td>{order.status}</td>
                  <td>{order.qty}</td>
                  <td>{order.price}</td>
                  <td>{order.customer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="top-products">
          <h3>Top 5 Products</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Sold Amount</th>
                <th>Unit Price</th>
                <th>Revenue</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {topProductsData.map((product, index) => (
                <tr key={index}>
                  <td>{product.product}</td>
                  <td>{product.sold}</td>
                  <td>{product.price}</td>
                  <td>{product.revenue}</td>
                  <td>⭐ {product.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;