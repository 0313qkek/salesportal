import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

// Customer Volume data for pie chart
const customerData = [
  { name: 'New', value: 62, color: '#4A90E2' },
  { name: 'Returning', value: 13, color: '#50E3C2' },
  { name: 'Inactive', value: 23, color: '#E5E5E5' }
];

// Adjusted Sales Volume data sets for different time periods
const dailyData = [
  { day: 'Sun', BunchfulAtlas: 2400, BunchfulMeCard: 1400 },
  { day: 'Mon', BunchfulAtlas: 1398, BunchfulMeCard: 1600 },
  { day: 'Tue', BunchfulAtlas: 9800, BunchfulMeCard: 1700 },
  { day: 'Wed', BunchfulAtlas: 3908, BunchfulMeCard: 2000 },
  { day: 'Thu', BunchfulAtlas: 4800, BunchfulMeCard: 2200 },
  { day: 'Fri', BunchfulAtlas: 3800, BunchfulMeCard: 2100 },
  { day: 'Sat', BunchfulAtlas: 4300, BunchfulMeCard: 2300 },
];

// Recent Orders Data
const ordersData = [
  { orderId: 12345, product: 'Bunchful Atlas', time: '12/25/2024, 01:10', status: 'Pending', qty: 'x1', customer: 'Thomas Laub' },
  { orderId: 23456, product: 'Bunchful MeCard', time: '12/26/2024, 02:30', status: 'Completed', qty: 'x2', customer: 'Alice Johnson' },
  { orderId: 34567, product: 'Bunchful Badge', time: '12/27/2024, 04:15', status: 'Canceled', qty: 'x1', customer: 'Bob Smith' },
];

// Top Products Data
const topProductsData = [
  { product: 'Bunchful Atlas', sold: 450, rating: 4.9 },
  { product: 'Bunchful MeCard', sold: 300, rating: 4.7 },
  { product: 'Bunchful Badge', sold: 200, rating: 4.5 },
];

function Dashboard() {
  const [timePeriod, setTimePeriod] = useState('Daily');
  const [salesData, setSalesData] = useState(dailyData);

  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
    // Adjust data based on period
  };

  return (
    <div className="dashboard-container">
      {/* Performance Metrics */}
      <div className="performance-metrics">
        <h2>Performance Metrics</h2>
        <div className="metrics-row">
          <div className="metric-box">
            <h3>Total Engagement</h3>
            <p>1,300</p>
          </div>
          <div className="metric-box">
            <h3>Total Orders</h3>
            <p>950</p>
          </div>
          <div className="metric-box">
            <h3>New Customers</h3>
            <p>620</p>
          </div>
          <div className="metric-box">
            <h3>Top Product</h3>
            <p>Bunchful Atlas</p>
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
              <XAxis dataKey={timePeriod === 'Daily' ? 'day' : timePeriod === 'Weekly' ? 'week' : 'month'} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="BunchfulAtlas" fill="#50E3C2" name="Bunchful Atlas" />
              <Bar dataKey="BunchfulMeCard" fill="#4A90E2" name="Bunchful MeCard" />
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
                  <td>{order.customer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="top-products">
          <h3>Top Products</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Sold Amount</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {topProductsData.map((product, index) => (
                <tr key={index}>
                  <td>{product.product}</td>
                  <td>{product.sold}</td>
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