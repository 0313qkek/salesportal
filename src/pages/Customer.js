import React, { useState } from 'react';
import './Customer.css';

const customersData = [
  { id: 1, name: 'Thomas Laub', email: 'tlaub@bunchful.com', phone: '(540)123-4567', dob: '01-01-1900', address: '224 W 35th St, New York, NY 10001' },
  { id: 2, name: 'John Doe', email: 'jdoe@bunchful.com', phone: '(540)987-6543', dob: '02-02-1985', address: '300 Main St, New York, NY 10001' },
  // Add more customers here
];

const reviewsData = [
  { product: 'Mirror', rating: 4, date: 'August 27, 2024', comment: 'I love this product!' },
  { product: 'Mirror', rating: 5, date: 'August 27, 2024', comment: 'this is a great size for my purpose. I needed to add an additional mirror above the sink that my 5yo son can see himself with.' },
];

const paymentsData = [
  { cardType: 'Chase Debit Card', last4: '0000', type: 'Default' },
  { cardType: 'Chase Credit Card', last4: '1234', type: 'Backup' },
];

function Customer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCategory, setSortCategory] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCategory(e.target.value);
  };

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  // Sort customers based on the selected sort category
  const sortedCustomers = [...customersData].sort((a, b) => {
    switch (sortCategory) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'email':
        return a.email.localeCompare(b.email);
      case 'phone':
        return a.phone.localeCompare(b.phone);
      case 'dob':
        return new Date(a.dob) - new Date(b.dob);
      default:
        return 0;
    }
  });

  // Filter customers by search term
  const filteredCustomers = sortedCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customer-container">
      {/* Customer List */}
      <div className="customer-list">
        <h2>Customers</h2>
        <div className="customer-search-sort">
          <select onChange={handleSortChange} className="sort-dropdown">
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone">Phone Number</option>
            <option value="dob">Date of Birth</option>
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
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} onClick={() => handleCustomerClick(customer)}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Details */}
      <div className="customer-details">
        {selectedCustomer ? (
          <>
            <div className="detail-header">
              <h3>{selectedCustomer.name}</h3>
              <button className="edit-btn">Edit</button>
            </div>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Phone Number:</strong> {selectedCustomer.phone}</p>
            <p><strong>Date of Birth:</strong> {selectedCustomer.dob}</p>
            <p><strong>Address:</strong> {selectedCustomer.address}</p>

            {/* Reviews Section */}
            <div className="reviews-section">
              <h4>Reviews</h4>
              {reviewsData.map((review, index) => (
                <div key={index} className="review-item">
                  <p><strong>{review.product}</strong> ⭐⭐⭐⭐ {review.date}</p>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Payments Section */}
            <div className="payments-section">
              <h4>Payments</h4>
              {paymentsData.map((payment, index) => (
                <div key={index}>
                  <p>{payment.cardType} ({payment.type})</p>
                  <p>Debit Card Ending **** {payment.last4}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Please select a customer to view details</p>
        )}
      </div>
    </div>
  );
}

export default Customer;