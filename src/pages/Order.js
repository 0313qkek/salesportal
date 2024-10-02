import React, { useState } from 'react';
import './Order.css';
import OrderDetailModal from './OrderDetailModal';

const ordersData = [
  { id: '#0001', name: 'Brooklyn Zoe', address: '224 W 35th St, New York, NY 10001', email: 'tlaub@bunchful.com', phone: '(540)123-4567', date: '08-26-2024', price: '$120', status: 'Pending' },
  { id: '#0002', name: 'Brooklyn Zoe', address: '224 W 35th St, New York, NY 10001', email: 'tlaub@bunchful.com', phone: '(540)123-4567', date: '08-26-2024', price: '$360', status: 'Completed' },
  { id: '#0003', name: 'Brooklyn Zoe', address: '224 W 35th St, New York, NY 10001', email: 'tlaub@bunchful.com', phone: '(540)123-4567', date: '08-26-2024', price: '$120', status: 'Pending' },
  { id: '#0004', name: 'Brooklyn Zoe', address: '224 W 35th St, New York, NY 10001', email: 'tlaub@bunchful.com', phone: '(540)123-4567', date: '08-26-2024', price: '$120', status: 'Canceled' },
  { id: '#0005', name: 'Brooklyn Zoe', address: '224 W 35th St, New York, NY 10001', email: 'tlaub@bunchful.com', phone: '(540)123-4567', date: '08-26-2024', price: '$120', status: 'Pending' },
];

function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCategory, setSortCategory] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null); // Track selected order
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCategory(e.target.value);
  };

  // Open modal and set the selected order
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Sort orders based on the selected sort category
  const sortedOrders = [...ordersData].sort((a, b) => {
    switch (sortCategory) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'email':
        return a.email.localeCompare(b.email);
      case 'phone':
        return a.phone.localeCompare(b.phone);
      case 'date':
        return new Date(a.date) - new Date(b.date);
      default:
        return 0;
    }
  });

  // Filter orders by search term
  const filteredOrders = sortedOrders.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      <div className="orders-search-sort">
        <select onChange={handleSortChange} className="sort-dropdown">
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone Number</option>
          <option value="date">Date</option>
        </select>
        <input
          type="text"
          className="search-bar"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} onClick={() => handleOrderClick(order)}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.address}</td>
              <td>{order.email}</td>
              <td>{order.phone}</td>
              <td>{order.date}</td>
              <td>{order.price}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for showing order details */}
      {isModalOpen && selectedOrder && (
        <OrderDetailModal order={selectedOrder} closeModal={closeModal} />
      )}
    </div>
  );
}

export default Orders;