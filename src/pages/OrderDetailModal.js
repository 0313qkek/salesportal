import React from 'react';
import './OrderDetailModal.css';

function OrderDetailModal({ order, closeModal }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Order Number {order.id}</h2>
        <div className="order-detail-grid">
          {/* Items Summary Section */}
          <div className="order-detail-items">
            <h3>Items Summary</h3>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {/* Replace with dynamic item data */}
                <tr>
                  <td>Mirror</td>
                  <td>x1</td>
                  <td>$120</td>
                  <td>$120</td>
                </tr>
                <tr>
                  <td>Book</td>
                  <td>x2</td>
                  <td>$120</td>
                  <td>$240</td>
                </tr>
              </tbody>
            </table>
            <div className="customer-info">
              <h4>{order.name}</h4>
              <p><strong>Phone Number:</strong> {order.phone}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Payment:</strong> Chase Debit Card Ending **** 0000</p>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <p><strong>Order Created:</strong> {order.date}</p>
            <p><strong>Order Time:</strong> 08:08 AM</p>
            <p><strong>Subtotal:</strong> $360</p>
            <p><strong>Total:</strong> $360</p>
            <p><strong>Status:</strong> <span className="status">{order.status}</span></p>
          </div>
        </div>
        <button className="close-btn" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default OrderDetailModal;