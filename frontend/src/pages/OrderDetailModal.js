import React from 'react';
import './OrderDetailModal.css';

function OrderDetailModal({ order, closeModal }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Order Number {order.id}</h2>
        
        <div className="order-detail-grid">
          {/* Product Summary Section */}
          <div className="order-detail-items">
            <h3>Product Details</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{order.product}</td>
                  <td>x1</td>
                </tr>
              </tbody>
            </table>
            
            <div className="customer-info">
              <h4>Customer Information</h4>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Phone Number:</strong> {order.phone}</p>
              <p><strong>Email:</strong> {order.email}</p>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <p><strong>Date:</strong> {order.date}</p>
          </div>
        </div>

        <button className="close-btn" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default OrderDetailModal;