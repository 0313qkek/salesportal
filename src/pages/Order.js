import React, { useState } from 'react';
import './Order.css';

function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCategory, setSortCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const orders = [
    { id: '#1001', product: 'Bunchful Atlas', name: 'Alice Johnson', email: 'alice@bunchful.com', phone: '(123) 456-7890', date: '08-26-2024' },
    { id: '#1002', product: 'Bunchful MeCard', name: 'Bob Smith', email: 'bob@bunchful.com', phone: '(321) 654-0987', date: '08-27-2024' },
    { id: '#1003', product: 'Bunchful Badge', name: 'Carol White', email: 'carol@bunchful.com', phone: '(111) 222-3333', date: '08-28-2024' },
    { id: '#1004', product: 'Bunchful Atlas', name: 'David Brown', email: 'david@bunchful.com', phone: '(444) 555-6666', date: '08-29-2024' }
  ];

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setEditData(order);
    setIsEditing(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSortCategory(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSaveClick = () => {
    console.log("Saved data:", editData);
    setIsEditing(false);
    setSelectedOrder(editData);
  };

  const sortedOrders = [...orders].sort((a, b) => {
    switch (sortCategory) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'email':
        return a.email.localeCompare(b.email);
      case 'date':
        return new Date(a.date) - new Date(b.date);
      default:
        return 0;
    }
  });

  const filteredOrders = sortedOrders.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='orders-container'>
      <div className='orders-table'>
        <div className='table-header'>
          <h2>Orders</h2>
          <input
            type="text"
            placeholder="Search by Customer Name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <select onChange={handleCategoryChange} className="sort-dropdown">
            <option value="">Default</option>
            <option value="name">Customer Name</option>
            <option value="email">Email</option>
            <option value="date">Date</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                onClick={() => handleOrderClick(order)}
                className={selectedOrder && selectedOrder.id === order.id ? 'selected' : ''}
              >
                <td>{order.id}</td>
                <td>{order.product}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="order-detail">
        {selectedOrder ? (
          <>
            <div className="detail-header">
              <h3>{selectedOrder.name}</h3>
              <button onClick={handleEditClick} className="edit-btn">
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            {isEditing ? (
              <div className="edit-form">
                <label>
                  Order ID:
                  <input
                    type="text"
                    name="id"
                    value={editData.id}
                    onChange={handleInputChange}
                    disabled
                  />
                </label>
                <label>
                  Product:
                  <input
                    type="text"
                    name="product"
                    value={editData.product}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Customer Name:
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Phone Number:
                  <input
                    type="text"
                    name="phone"
                    value={editData.phone}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Date:
                  <input
                    type="text"
                    name="date"
                    value={editData.date}
                    disabled
                  />
                </label>
                <button onClick={handleSaveClick} className="save-btn">Save</button>
              </div>
            ) : (
              <>
                <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                <p><strong>Product:</strong> {selectedOrder.product}</p>
                <p><strong>Email:</strong> {selectedOrder.email}</p>
                <p><strong>Phone Number:</strong> {selectedOrder.phone}</p>
                <p><strong>Date:</strong> {selectedOrder.date}</p>
              </>
            )}
          </>
        ) : (
          <p>Please select an order to view details</p>
        )}
      </div>
    </div>
  );
}

export default Orders;